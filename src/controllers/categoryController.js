const Category = require("../models/Category");

exports.createCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    const categoryExists = await Category.findOne({
      address: categoryExists._id,
    });
    if (categoryExists) {
      return res.status(400).json({ message: "This category is already added" });
    }

    const category = await Category.create({
      name,
    });
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(204).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};
