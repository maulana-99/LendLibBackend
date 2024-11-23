const Book = require('../models/Book');
const Category = require('../models/Category');

exports.createBook = async (req, res, next) => {
    const { title, author, publisher, publicationDate, description, pageNumber, language, stock, name } = req.body;

    try {
        // Periksa apakah kategori valid berdasarkan name
        const category = await Category.findOne({ name });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Periksa apakah buku sudah ada berdasarkan title
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
        next(error);
    }
};

exports.updateBook = async (req, res, next) => {
    const { id } = req.params; // ID buku yang akan diupdate
    const { title, author, publisher, publicationDate, description, pageNumber, language, stock, name } = req.body;

    try {
        // Periksa apakah buku dengan ID ini ada
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Jika kategori diubah, periksa apakah kategori valid berdasarkan name
        if (name) {
            const category = await Category.findOne({ name });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            book.category = category._id; // Update kategori jika ditemukan
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

        // Simpan perubahan
        const updatedBook = await book.save();

        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        next(error);
    }
};

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate("category", "name");
        res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

exports.getBooksByCategoryId = async (req, res, next) => {
    const { categoryId } = req.params; // Ambil ID kategori dari parameter URL

    try {
        // Cari buku berdasarkan ID kategori
        const books = await Book.find({ category: categoryId }).populate("category", "name");
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found for this category' });
        }
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
};
