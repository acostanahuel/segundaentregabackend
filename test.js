const ProductManager = require("./ProductManager");

const test = async () => {
  let productManager = new ProductManager();
  productManager.fileCreator();
  productManager.addProduct("Cerveza", "Scottish Ale", 280, "scottish.jpg", 22);
  productManager.addProduct("Cerveza", "Ipa atomica", 300, "atomica.jpg", 20);
  productManager.addProduct("Cerveza", "Apa Revolution", 250, "apa.jpg", 23);
  productManager.getProductById(1);
  console.log("----------");
  // ObjetoModificado para actualizar
  const ObjUpdated = {
    title: "modicado",
    description: "modicado",
    price: "modicado",
    thumbnail: "modicado",
    stock: "modicado"
  }
  productManager.updateProduct(1, ObjUpdated)
  console.log("----------");
  productManager.deleteProduct(2)
}

test()
