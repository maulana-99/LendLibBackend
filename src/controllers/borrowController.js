const Borrow = require("../models/Borrowed");
const Book = require("../models/Book");
const Member = require("../models/Member");
const Staff = require("../models/Staff");

exports.getBorrow = async (req, res, next) => {
  try {
    const borrow = await Borrow.find()
      .populate("book")
      .populate("member")
      .populate("staff");
    res.status(200).json({ borrow });
  } catch (error) {
    next(error);
  }
};

exports.createBorrow = async (req, res, next) => {
  const { dateReturn, qty, book, memberEmail, staffEmail } = req.body;

  try {
    // Cari Member berdasarkan email
    const getMember = await Member.findOne({ email: memberEmail });
    if (!getMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Cari Staff berdasarkan email dari token pengguna login
    const getStaff = await Staff.findOne({ email: staffEmail });
    if (!getStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Cari Buku berdasarkan ID
    const getBook = await Book.findById(book);
    if (!getBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Cek ketersediaan stok buku
    if (getBook.stock < qty) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Kurangi stok buku
    getBook.stock -= qty;
    await getBook.save();

    // Tetapkan status peminjaman
    const status = 1;
    const dateBorrow = new Date();

    // Buat data peminjaman baru
    const borrow = await Borrow.create({
      dateBorrow,
      dateReturn,
      status,
      qty,
      book,
      member: getMember._id,
      staff: getStaff._id, // Menggunakan Staff dari token
    });

    res.status(201).json({ message: "Borrow created successfully", borrow });
  } catch (error) {
    next(error);
  }
};
