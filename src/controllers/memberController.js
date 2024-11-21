const User = require('../models/User');
const Staff = require('../models/Staff');
const Member = require('../models/Member');
const Address = require('../models/Address');

exports.createMember = async (req, res, next) => {
    const { email, fullname, telp, dateBorn, gender, housecode, city, province, posCode, rtRw } = req.body;

    try {
        // Cari user berdasarkan email
        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(404).json({ message: 'User with this email not found' });
        }

        // Periksa apakah user sudah menjadi Staff
        const staffExists = await Staff.findOne({ address: userExists._id });
        if (staffExists) {
            return res.status(400).json({ message: 'This user is already registered as Staff' });
        }

        // Periksa apakah user sudah menjadi Member
        const memberExists = await Member.findOne({ address: userExists._id });
        if (memberExists) {
            return res.status(400).json({ message: 'This user is already registered as Member' });
        }

        // Buat entri di koleksi Address
        const address = await Address.create({ housecode, city, province, posCode, rtRw });

        // Buat entri di tabel Member
        const member = await Member.create({
            fullname,
            telp,
            dateBorn,
            gender,
            address: address._id,
            user: userExists._id
        });

        res.status(201).json({ message: 'Member created successfully', member });
    } catch (error) {
        next(error);
    }
};

exports.getMember = async (req, res, next) => {
    try {
        const member = await Member.find().populate('address').populate('user');
        res.status(200).json({ member });
    } catch (error) {
        next(error);
    }

};


exports.updateMember = async (req, res, next) => {
    const { id } = req.params;
    const { fullname, telp, dateBorn, gender, housecode, city, province, posCode, rtRw } = req.body;

    try {
        // Cari Member berdasarkan ID
        const member = await Member.findById(id);
        if (!Member) {
            return res.status(404).json({ message: 'Mwmbwr not found' });
        }

        // Perbarui data Address jika diberikan
        if (housecode || city || province || posCode || rtRw) {
            const address = await Address.findById(member.address);
            if (!address) {
                return res.status(404).json({ message: 'Address not found for this Member' });
            }

            address.housecode = housecode || address.housecode;
            address.city = city || address.city;
            address.province = province || address.province;
            address.posCode = posCode || address.posCode;
            address.rtRw = rtRw || address.rtRw;

            await address.save(); // Simpan perubahan Address
        }

        // Perbarui data Mwmbwr
        member.fullname = fullname || member.fullname;
        member.telp = telp || member.telp;
        member.dateBorn = dateBorn || member.dateBorn;
        member.gender = gender || member.gender;

        await member.save(); // Simpan perubahan Member

        res.status(200).json({ message: 'Member updated successfully', member });
    } catch (error) {
        next(error);
    }
};
