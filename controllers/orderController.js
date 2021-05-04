const db = require('../db');
const { pick } = require('../utils');
const APIError = require('../utils/APIError');

async function getById(user, id) {
    const order = await db.order.findUnique({
        where: { id },
        include: { seller: { include: { owner: true } } }
    });

    if (
        user.role !== "Admin"
        && order.userId !== user.id
        && order.seller.owner.id !== user.id
    ) {
        throw new APIError("Not authorized to view this order", 401);
    }

    delete order.seller;
    return order;
}

function groupBySeller(items) {
    const result = []
    let rest = [...items];
    do {
        result.push(rest.filter(i => i.sellerId === rest[0].sellerId));
        rest = rest.filter(i => i.sellerId !== rest[0].sellerId);
    } while(rest.length > 0);

    return result;
}

async function createOrders(user, data) {
    if (
        data === undefined
        || data.items === undefined
        || data.items.length === 0
        || data.items.some(oi => oi.sellerProductId === undefined || oi.quantity === undefined)
    ) {
        throw new APIError("Missing required fields", 400);
    }

    const items = await db.sellerToProducts.findMany({
        where: { id: { in: data.items.map(oi => oi.sellerProductId) } }
    });

    const promises = [];
    groupBySeller(items).forEach((sellerItems) => {
        promises.push(db.order.create({
            data: {
                userId: user.id,
                sellerId: sellerItems[0].sellerId,
                items: {
                    createMany: {
                        data: [
                            sellerItems.map(item => {
                                const entry = data.items.find(i => i.id === item.id);
                                if (entry) {
                                    return {
                                        sellerProductId: item.id,
                                        quantity: entry.quantity,
                                        pricePaid: item.salePrice ? item.salePrice : item.originalPrice
                                    }
                                }
                            })
                        ]
                    }
                }
            }
        }));
    });

    return Promise.all(promises);
}


module.exports = {
    getById,
    createOrders
}