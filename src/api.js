const { Router } = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const isAdmin = require("./isAdmin");

mongoose.connect(process.env.MONGO_URL);
mongoose.Promise = global.Promise;

const Product = mongoose.model("Product", {
  name: { type: String, required: true },
  quantity: Number,
  size: String,
  price: { type: Number, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  attachments: [Buffer]
});

const api = Router();
module.exports = api;
api.use(bodyParser.json());

/*
 * {username:...,password:...,product:{}}
 */
api.post("/products", isAdmin, (req, res) => {
  new Product(req.body.product)
    .save()
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

// update
api.put("/products/:id", isAdmin, (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, req.body.product)
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

api.delete("/products/:id", isAdmin, (req, res) => {
  Product.findOneAndRemove(req.params.id)
    .then(() => {
      res.send({ success: "ok" });
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

api.get("/products", (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});
