// post.routes.js

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/product.model')

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom =  async (req, res) => {

  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.getProduct =  async (req, res) => {

  try {
    const dep = await Product.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.createProduct = async (req, res) => {

  try {

    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json(newProduct);

  } catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.editProduct =  async (req, res) => {
  const { name, client } = req.body;

  try {
    await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
    const dep = await Product.findOne({ _id: req.params.id })
    res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.deleteProduct =  async (req, res) => {

  try {
    const dep = await Product.findById(req.params.id);
    if(dep) {
      await Product.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}


