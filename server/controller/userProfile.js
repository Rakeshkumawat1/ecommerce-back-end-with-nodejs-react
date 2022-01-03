const User = require("../models/user");
const UserAddress = require("../models/address");
// const asyncLib = require("async");

module.exports.viewProfile = async (req, res) => {
    try {
        let result = {}
        let { user } = req.body;
        if (!user) return res.status(404).json({ error: "Invalid request!" });

        let data = await User.findOne({ _id: user })
        if (data == null) return res.status(404).json({ error: "Invalid user!" });
        let userAddress = await UserAddress.findOne({ user });
        userAddress ? result = { data, address: userAddress.address } : result = { data, address: null }
        res.status(200).json({ result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internel server error!" })
    }
}

module.exports.editProfile = async (req, res) => {
    try {
        let { _id } = req.body;
        if (!_id) return res.status(404).json({ error: "Invalid request!" });
        let checkUser = await User.findOneAndUpdate({ _id }, {}, { returnOriginal: false, upsert: false });
        // let checkUser = await User.findOne({ _id });
        // if(checkUser)

    } catch (error) {
        res.status(500).json({ error: "Internel server error!" });
    }
}