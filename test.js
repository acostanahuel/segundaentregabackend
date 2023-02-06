const ProductManager = require("./ProductManager");

const test = async () => {
  let productManager = new ProductManager();
  productManager.fileCreator();
  productManager.addProduct("Cerveza", "Scottish Ale", 280, "scottish.jpg", 22);
  productManager.addProduct("Cerveza", "Ipa atomica", 300, "atomica.jpg", 20);
  productManager.addProduct("Cerveza", "Apa Revolution", 250, "apa.jpg", 23);
  productManager.addProduct("Cerveza", "Mamut", 270, "mamut.jpg", 80);
  productManager.addProduct("Cerveza", "Blonde Ale", 230, "blonde.jpg", 23);
  productManager.addProduct("Cerveza", "Cabutiña Pumpkin Ale", 320, "cabu.jpg", 10);
  productManager.addProduct("Cerveza", "American Pale Ale", 290, "ale.jpg", 23);
  productManager.addProduct("Cerveza", "Barbara Weizen", 200, "barbara.jpg", 93);
  productManager.addProduct("Cerveza", "Doble Ipa", 350, "doble.jpg", 78);
  productManager.addProduct("Cerveza", "Sabotaje Oatmeal", 250, "sabotaje.jpg", 20);
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
