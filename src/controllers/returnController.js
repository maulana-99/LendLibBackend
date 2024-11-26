const Borrow = require("../models/Borrowed");
const Returned = require("../models/Returned");

exports.getReturned = async (req, res, next) => {
    try {
        const returned = await Returned.find()
            .populate({
                path: "borrowed",
                populate: {
                    path: "book"
                }
            });
        res.status(200).json({ returned });
    } catch (error) {
        next(error);
    }
};

// Start of Selection
exports.createReturn = async (req, res, next) => {
    const { borrowedId } = req.body;

    try {
        // Cari data peminjaman berdasarkan ID
        const borrow = await Borrow.findById(borrowedId).populate("book");
        if (!borrow) {
            return res.status(404).json({ message: "Borrow record not found" });
        }

        // Cek apakah status peminjaman sudah 0
        if (borrow.status === 0) {
            return res.status(400).json({ message: "This borrow record has already been returned" });
        }

        // Ubah status peminjaman menjadi 0
        borrow.status = 0;

        // Tambahkan kembali jumlah buku ke stok
        const book = borrow.book;
        book.stock += borrow.qty;
        await book.save();

        // Hitung denda
        const dateReturn = new Date(borrow.dateReturn);
        const dateReturned = new Date(); // Menggunakan tanggal hari ini
        const diffTime = Math.max(dateReturned - dateReturn, 0);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const fine = diffDays * 10000; // Misalnya, denda Rp1000 per hari

        // Simpan data pengembalian
        const returned = await Returned.create({
            dateReturned: dateReturnedDate,
            fine,
            borrowed: borrow._id,
        });

        // Simpan perubahan pada peminjaman
        await borrow.save();

        res.status(201).json({ message: "Return processed successfully", returned });
    } catch (error) {
        next(error);
    }
};
