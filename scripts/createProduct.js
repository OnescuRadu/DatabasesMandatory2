const {
    productController,
    productDescriptionController,
    productImageController,
    categoryController,
    manufacturerController
} = require("../controllers");

const faker = require("faker");

const input = process.argv.length >= 3 ? Number(process.argv[2]) : null;
const numProducts = Number.isNaN(input) ? 100 : input;

async function createProduct() {
    const categories = await categoryController.getAllCategories();
    const manufacturers = await manufacturerController.getManufacturers();
    const description = await productDescriptionController.createProductDescription(
        { description: faker.commerce.productDescription() }
    );

    return productController.createProduct({
        name: faker.commerce.productName(),
        code: faker.random.alphaNumeric(10),
        descriptionId: description.id,
        categoryId: categories[Math.random() * categories.length].id,
        manufacturerId: manufacturers[Math.random() * manufacturers.length].id
    });
}

if (require.main === module) {
    const promises = [];
    createProduct().then();
}
