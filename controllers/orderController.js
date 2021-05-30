const db = require('../db');
const { pick } = require('../utils');
const APIError = require('../utils/APIError');

async function getById(user, id) {
    const order = await db.order.findFirst({
        where: { id },
        include: {
            seller: { include: { owner: true } },
            items: true,
        },
    });

    if (!order) {
        throw new APIError('Order not found', 404);
    }

    if (user.role !== 'Admin' && order.userId !== user.id && order.seller.owner.id !== user.id) {
        throw new APIError('Not authorized to view this order', 401);
    }

    delete order.seller;
    return order;
}

function groupBySeller(items) {
    const result = [];
    let rest = [...items];
    do {
        result.push(rest.filter((i) => i.sellerId === rest[0].sellerId));
        rest = rest.filter((i) => i.sellerId !== rest[0].sellerId);
    } while (rest.length > 0);

    return result;
}

async function createOrders(user, data) {
    if (
        data === undefined ||
        data.items === undefined ||
        data.items.length === 0 ||
        data.items.some((oi) => oi.sellerProductId === undefined || oi.quantity === undefined)
    ) {
        throw new APIError('Missing required fields', 400);
    }

    const ids = data.items.map((oi) => oi.sellerProductId);
    const allItems = await db.sellerToProducts.findMany();
    const items = allItems.filter((item) => ids.includes(item.id));

    const promises = [];
    groupBySeller(items).forEach((sellerItems) => {
        const orderItems = sellerItems.map((item) => {
            const entry = data.items.find((i) => i.sellerProductId === item.id);
            if (entry) {
                return {
                    sellerProductId: item.id,
                    quantity: entry.quantity,
                    pricePaid: item.salePrice ? item.salePrice : item.originalPrice,
                };
            }
        });
        promises.push(
            db.order.create({
                data: {
                    userId: user.id,
                    sellerId: sellerItems[0].sellerId,
                    items: {
                        createMany: {
                            data: orderItems,
                        },
                    },
                },
            })
        );
    });

    return Promise.all(promises);
}

module.exports = {
    getById,
    createOrders,
};
