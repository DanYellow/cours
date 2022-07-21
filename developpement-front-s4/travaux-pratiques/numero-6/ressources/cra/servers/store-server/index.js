const faker = require("@faker-js/faker").faker;
faker.locale = 'fr';

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const createProduct = () => {
    return {
        id: faker.datatype.uuid(),
        name: faker.animal.cat(),
        description: faker.commerce.productDescription(),
        images: Array.from({ length: randomIntFromInterval(1, 4) }, faker.image.cats),
        avis: Array.from({ length: randomIntFromInterval(0, 9) }, () => faker.lorem.sentence()),
        price: faker.commerce.price(250, 1500, 2)
    };
};

module.exports = () => {
    const data = { produits: [] };
    for (let i = 0; i < 25; i++) {
        data.produits.push(createProduct());
    }
    return data;
}; 
