const Contact = require('../../models/Contact');

const getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({});
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const upsertContact = async (req, res) => {
    try {
        const { phone, email, address, phoneVisible, emailVisible, addressVisible } = req.body;

        const updatedContact = await Contact.findOneAndUpdate(
            {},
            { $set: { phone, email, address, phoneVisible, emailVisible, addressVisible } },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: 'Contact information updated successfully', data: updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getContact,
    upsertContact,
};