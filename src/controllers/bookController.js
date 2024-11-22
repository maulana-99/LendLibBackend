const Book = require('../models/Book');
const Category = require('../models/Category');

exports.createBook = async (req, res, next) => {
    const { title, author, publisher, publicationDate, description, pageNumber, language, stock, category } = req.body;

    try {
        // Periksa apakah kategori valid
        const category = await Category.findById(category);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Periksa apakah buku sudah ada
        const bookExists = await Book.findOne({ title });
        if (bookExists) {
            return res.status(400).json({ message: 'This book is already added' });
        }

        // Buat buku baru
        const book = await Book.create({
            title,
            author,
            publisher,
            publicationDate,
            description,
            pageNumber,
            language,
            stock,
            category: category._id,
        });

        res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateBook = async (req, res, next) => {
    const { id } = req.params; // ID buku yang akan diupdate
    const { title, author, publisher, publicationDate, description, pageNumber, language, stock, category } = req.body;

    try {
        // Periksa apakah buku dengan ID ini ada
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Jika kategori diubah, periksa apakah kategori valid
        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(404).json({ message: 'Category not found' });
            }
        }

        // Update data buku
        book.title = title || book.title;
        book.author = author || book.author;
        book.publisher = publisher || book.publisher;
        book.publicationDate = publicationDate || book.publicationDate;
        book.description = description || book.description;
        book.pageNumber = pageNumber || book.pageNumber;
        book.language = language || book.language;
        book.stock = stock || book.stock;
        book.category = category || book.category;

        // Simpan perubahan
        const updatedBook = await book.save();

        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate('category');
        res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
