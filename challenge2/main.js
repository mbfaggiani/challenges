import fs from 'fs/promises';

let counter = 0
let loadSuccess = true

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        const map = new Map([[title], [description], [price], [thumbnail], [code], [stock]])
        if (map.has("") || map.has(0)) {
            console.log("Try again!");
        } else {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code
            this.stock = stock
            console.log("The product has been created");
        }
    }
}

class ProductManager {

    constructor(path) {
        this.path = path
        this.products = []
    }

    async cargar() {
        let file, prod = null
        loadSuccess
            ? (
                file = await fs.readFile(this.path, 'utf-8'),
                prod = JSON.parse(file),
                prod.forEach(element => {
                    counter++
                    element.id = counter
                    this.products.push(element)
                },
                    loadSuccess = false)
            )
            : ''
    }

    async getProducts() {
        await this.cargar()
        console.log("Products list")
        return console.log(this.products)
    }

    async addProduct(product) {
        await this.cargar()
        let json = null;
        if (Object.entries(product).length === 0) {
            console.log('The product hasnt been added');
        } else {
            const codeRepeated = this.products.some((prod) => prod.code === product.code)
            codeRepeated
                ? console.log('It is repeted, the product hasnt been added')
                : (
                    counter++,
                    product.id = counter,
                    this.products.push(product),
                    json = JSON.stringify(this.products, null, 4),
                    await fs.writeFile(this.path, json),
                    console.log('The product has been added')
                )
        }
    }

    async getProductById(id) {
        await this.cargar()
        console.log('Looking for this product - ID: ' + id );
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? console.log(this.products.find((prod) => prod.id === id))
            : console.log('Not found')
    }

    async updateProduct(id, campo, data) {
        await this.cargar()
        let json, i = null;
        const modificar = (i, campo, data) => {
            switch (campo) {
                case 'title':
                    this.products[i].title = data
                    break
                case 'description':
                    this.products[i].description = data
                    break
                case 'price':
                    this.products[i].price = data
                    break
                case 'thumbnail':
                    this.products[i].thumbnail = data
                    break
                case 'code':
                    this.products[i].code = data
                    break
                case 'stock':
                    this.products[i].stock = data
                    break
            }
        }
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? (console.log('Modifing this products - ID:' + id),
                i = this.products.findIndex((prod) => prod.id === id),
                modificar(i, campo, data),
                json = JSON.stringify(this.products, null, 4),
                await fs.writeFile(this.path, json))
            : console.log('Not found')

    }

    async deleteProduct(id) {
        await this.cargar()
        let json, i = null
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? (
                i = this.products.findIndex((prod) => prod.id === id),
                this.products.splice(i, 1),
                json = JSON.stringify(this.products, null, 4),
                await fs.writeFile(this.path, json),
                console.log( 'ID:'+ id + ' It has been deleted')
            )
            : console.log('Not found')
    }

}

const manager = new ProductManager("prueba.txt")

await manager.addProduct(new Product("producto4", "description4", 500, "thumbnail4", 444, 10))
await manager.addProduct(new Product("producto5", "description5", 600, "thumbnail5", 555, 20))

await manager.updateProduct(2, 'description', 'Modifing description product 2')
await manager.updateProduct(3, 'stock', 40)

await manager.getProducts()

await manager.deleteProduct(2)
await manager.getProducts()

manager.getProductById(3)