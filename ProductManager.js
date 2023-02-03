class Product {
  static id = 0
  static code = () => parseInt(Math.random() * 10000);
  constructor(title, description, price, thumbnail, stock) {
    this.id = Product.id++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = Product.code();
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = new Array();
    this.productsDirPath = "./database";
    this.productsFilePath = this.productsDirPath + "/products.json";
    this.fileSystem = require("fs");
  }

  fileCreator = async () => {
    await this.fileSystem.promises.mkdir(this.productsDirPath, { recursive: true });
    if (!this.fileSystem.existsSync(this.productsFilePath)) {
      await this.fileSystem.promises.writeFile(this.productsFilePath, "[]");
    }
  }

  addProduct = async (title, description, price, thumbnail, stock) => {
    let newProduct = new Product(title, description, price, thumbnail, stock);
    console.log("Creando nuevo producto:");
    console.log(newProduct);
    try {
      await this.fileCreator();
      this.products.push(newProduct);
      console.log("Actualizando lista de productos:");
      console.log(this.products);
      await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
    } catch (error) {
      console.error(Error`Creando nuevo producto" ${JSON.stringify(newProduct)}, detalle error: ${error}`);
      throw Error(Error`Creando nuevo producto:" ${JSON.stringify(newProduct)}, detalle error: ${error}`);
    }
  }

  getProducts = async () => {
    try {
      await this.fileCreator();
      let productsPath = await this.fileSystem.promises.readFile(this.productsFilePath, "utf-8");
      console.info("JSON file obtenido from file:");
      console.log(productsPath);
      this.products = JSON.parse(productsPath);
      console.log("Productos no encontrados:");
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.error(`Error consultando los productos por archivo, validar el archivo: ${this.products},detalle error ${error}`);
      throw Error(`Error consultando los productos por archivo, validar el archivo: ${this.products}, detalle error ${error}`);
    }
  }

  getProductById = async (id) => {
    await this.getProducts();
    const productId = this.products.find(p => p.id == id);
    if (productId) {
      console.log("Producto encontrado:");
      console.log(productId);
    } else {
      console.warn("Producto no encontrado por ID" + productId);
    }
  }

  updateProduct = async (id, newProduct) => {
    await this.getProducts();
    const updateProduct = this.products.map((prod) => {
      if (prod.id === id) { return { ...prod, ...newProduct }; } else { return prod; }
    });
    this.products = updateProduct;

    await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
    console.log(this.products);
  }

  deleteProduct = async (id) => {
    await this.getProducts();
    if (this.products.find((prod) => prod.id === id)) {
      const delet = this.products.indexOf(id);
      this.products.splice(delet, 1);
      console.log("El producto con el  " + id + " fue eliminado");
      await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
    }
  }
}
module.exports = ProductManager;
