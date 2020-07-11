const express = require("express");
const router = express.Router();

const Products = require("../../database/models/Products");

router.get("/", (req, res) => {
  Products.find({}).then((product) => {
    console.log(product);
    if (!product) {
      return res.status(404).json({ productNotFound: "Product Not found" });
    }
    return res.send({
      product: product,
    });
  });
});

router.post("/add", (req, res) => {
  const newProduct = new Products({
    name: req.body.name,
    price: req.body.price,
  });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => console.log(err));
});

module.exports = router;
