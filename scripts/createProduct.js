const {
    productController,
    productDescriptionController,
    productImageController,
    categoryController,
    manufacturerController
} = require("../controllers");

const faker = require("faker");

const input = process.argv.length >= 3 ? Number(process.argv[2]) : null;
const numProducts = input && Number.isNaN(input) ? 100 : input;

async function getRefData() {
    return {
        categories: await categoryController.getAllCategories(),
        manufacturers: await manufacturerController.getManufacturers()    
    }
}

async function createProduct(refData) {
    const { categories, manufacturers } = refData;
    const description = await productDescriptionController.createProductDescription(
        { description: faker.commerce.productDescription() }
    );

    const createData = {
        name: faker.commerce.productName(),
        code: faker.random.alphaNumeric(10).toUpperCase(),
        descriptionId: description.id,
        categoryId: faker.random.arrayElement(categories).id,
        manufacturerId: faker.random.arrayElement(manufacturers).id,
        approved: true
    };

    return productController.createProduct(createData);
}

if (require.main === module) {
    getRefData().then((refData) => {
        const promises = [];
        for (let i = 0; i < numProducts; i += 1) {
            promises.push(createProduct(refData))
        }
        Promise.all(promises).then((products) =>
            console.log(`Successfully created ${numProducts} products:`, products)
        );
    });
}
