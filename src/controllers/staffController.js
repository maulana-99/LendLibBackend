const User = require('../models/User');
const Staff = require('../models/Staff');
const Member = require('../models/Member');
const Address = require('../models/Address');

exports.createStaff = async (req, res, next) => {
    const { email, fullname, telp, dateBorn, gender, housecode, city, province, posCode, rtRw } = req.body;

    try {
        // Cari user berdasarkan email
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ message: 'User with this email not found' });
        }

        // Periksa apakah user sudah menjadi Staff
        const staffExists = await Staff.findOne({ user: userExists._id });
        if (staffExists) {
            return res.status(400).json({ message: 'This user is already registered as Staff' });
        }

        // Periksa apakah user sudah menjadi Member
        const memberExists = await Member.findOne({ user: userExists._id });
        if (memberExists) {
            return res.status(400).json({ message: 'This user is already registered as Member' });
        }

        // Periksa apakah nomor telepon sudah digunakan di Staff
        const telpExistsInStaff = await Staff.findOne({ telp });
        if (telpExistsInStaff) {
            return res.status(400).json({ message: 'Phone number is already registered to a Staff' });
        }

        // Periksa apakah nomor telepon sudah digunakan di Member
        const telpExistsInMember = await Member.findOne({ telp });
        if (telpExistsInMember) {
            return res.status(400).json({ message: 'Phone number is already registered to a Member' });
        }

        // Buat entri di koleksi Address
        const address = await Address.create({ housecode, city, province, posCode, rtRw });

        // Buat entri di tabel Staff
        const staff = await Staff.create({
            fullname,
            telp,
            dateBorn,
            gender,
            address: address._id,
            user: userExists._id
        });

        res.status(201).json({ message: 'Staff created successfully', staff });
    } catch (error) {
        next(error);
    }
};

exports.getStaff = async (req, res, next) => {
    try {
        const staff = await Staff.find().populate('address').populate('user');
        res.status(200).json({ staff });
    } catch (error) {
        next(error);
    }

};

exports.updateStaff = async (req, res, next) => {
    const { id } = req.params;
    const { fullname, telp, dateBorn, gender, housecode, city, province, posCode, rtRw } = req.body;

    try {
        // Cari Staff berdasarkan ID
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Perbarui data Address jika diberikan
        if (housecode || city || province || posCode || rtRw) {
            const address = await Address.findById(staff.address);
            if (!address) {
                return res.status(404).json({ message: 'Address not found for this Staff' });
            }

            address.housecode = housecode || address.housecode;
            address.city = city || address.city;
            address.province = province || address.province;
            address.posCode = posCode || address.posCode;
            address.rtRw = rtRw || address.rtRw;

            await address.save(); // Simpan perubahan Address
        }

        // Perbarui data Staff
        staff.fullname = fullname || staff.fullname;
        staff.telp = telp || staff.telp;
        staff.dateBorn = dateBorn || staff.dateBorn;
        staff.gender = gender || staff.gender;

        await staff.save(); // Simpan perubahan Staff

        res.status(200).json({ message: 'Staff updated successfully', staff });
    } catch (error) {
        next(error);
    }
};
