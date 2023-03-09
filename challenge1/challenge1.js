class ProductManager {
    constructor () {
        this.products = [];
    }
    addProduct (item) {
        const products = this.getProducts ();
        const addSuccessfully = 'Product has been add succesfully'
        if (products.lenght) {
            const result = products.find (element => element.code === item.code)
            if (result) {
                return console.log ('This product has already been added!')
            } else {
                let lastIndex = products.lenght -1;
                let lastId = products[lastIndex].id;
                item.id = lastId + 1;
                let id = item.id;
                this.products.push (item);
                console.log (addSuccessfully);
                return id;
            }
        } else {
            item.id = 1;
            this.products.push (item);
            console.log (addSuccessfully)
        }
    }
    
    getProducts () {
        const products = this.products;
        return products;
    }

    getProductbyId (id) {
        const products = this.getProducts();
        let productsById;
        const notFound = 'Not Found'
        products.map (el => {
            el.id === id && (productsById = el);
        });
        return productsById ? console.log(productsById) : console.log(notFound);
    }
}

const productManager = new ProductManager();

console.log(productManager.getProducts())

productManager.addProduct({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 500,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
})
console.log(productManager.getProducts());

productManager.addProduct({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 500,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
});

productsManager.getProductbyId(2);
