const ProductModel = require("../models/product.model");

const addProduct = async (req, res) => {
  const { title, img, category, price } = req.body;
  if (!title || !img || !category || !price) {
    res.status(400).json({ msg: "Please Fill all the fields" });
  }
  try {
    const product = new ProductModel({ title, img, category, price });
    await product.save();
    res.status(200).json({ msg: "Product Has Been Added Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//http://localhost:8080/products?search=(for searching the product according to the title or category)
//http://localhost:8080/products?category=(filter the products according to the category)
//http://localhost:8080/products?sort=title&order=asc(sort the products according to the title or price and order to be asce or desc)
//{{url}}products?category=Mobile&sort=price&order=desc 

const getProduct = async (req, res) => {
  try {
    let filter = {};

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { category: { $regex: req.query.search, $options: "i" } },
      ];
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    let sort = {};
    if (req.query.sort && req.query.order) {
      sort[req.query.sort] = req.query.order === "asc" ? 1 : -1;
    }

    const products = await ProductModel.find(filter).sort(sort);
    res.status(200).json({ msg: products });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};




module.exports = { addProduct, getProduct };
