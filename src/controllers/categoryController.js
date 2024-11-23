const Category = require("../models/Category");

exports.createCategory = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "This category already exists" });
    }

    const newCategory = await Category.create({ name });
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "This category already exists" });
    }
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "This category already exists" });
    }
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
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

exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};
