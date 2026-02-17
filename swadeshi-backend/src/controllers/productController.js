const { Product } = require('../config/database');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { title, price, vendor } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'title is required.' });
    }

    const product = await Product.create({ title, price, vendor });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
