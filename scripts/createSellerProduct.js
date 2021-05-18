const {
    sellerProdController,
    sellerController,
    productController
} = require("../controllers");
const { randInt } = require('./common');
const faker = require("faker");

const input = process.argv.length >= 3 ? Number(process.argv[2]) : null;
const numProducts = input && Number.isNaN(input) ? input : 1000;

async function getRefData() {
    const result = {
        sellers: await sellerController.getAllSellers(),
        products: await productController.getAllProducts()    
    };
    console.log(result);
    return result;
}

async function createSellerProduct(refData) {
    const { sellers, products } = refData;

    const createData = {
        productId: faker.random.arrayElement(products).id,
        originalPrice: randInt(2, 500) * 1000,
        stockQty: randInt(1, 100)
    };

    if (Math.random() < 0.2) {
        const discount = randInt(5, 30);
        const discountVal = Math.floor(createData.originalPrice * (discount / 100));
        createData.salePrice = createData.originalPrice - discountVal;
    }

    const seller = faker.random.arrayElement(sellers);

    return sellerProdController.addProduct(
        seller, { id: seller.ownerId }, createData
    );
}

if (require.main === module) {
    getRefData().then((refData) => {
        const promises = [];
        for (let i = 0; i < numProducts; i += 1) {
            promises.push(createSellerProduct(refData))
        }
        Promise.all(promises).then((products) =>
            console.log(`Successfully created ${numProducts} seller products:`, products)
        );
    });
}
