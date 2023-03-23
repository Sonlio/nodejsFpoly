const User = require('../model/modelRegister');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const typeUser = req.body.typeUser;

    User.findOne({email: email})
        .then(user => {
            if(user) {
                return res.status(400).json({message: "Email đã tồn tại!"})
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            const user = new User({email: email, password: hashedPassword, typeUser: typeUser})

            return user.save();
        })
        .then(user => {
            res.status(200).json({
                message: "Thêm thành công người dùng rồi nè bé iuu ơii <3",
                user: user
            })
        })
        .catch(err => res.status(400).json(err))
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if(!user) {
                return res.status(400).json({message: "Email không tồn tại!"})
            }
            return Promise.all([bcrypt.compare(password, user.password), user]);
        })
        .then(result => {
            const isMatch = result[0];
            const user = result[1];

            if(!isMatch) {
                return res.status(400).json({message: "Password không trùng khớp!"});
            }

            const payload = {
                email: user.email,
                password: user.password
            }
            return jwt.sign(payload, "FPT", {expiresIn: 7200})
        })
        .then(token => {
            res.status(200).json({message: "Login thành công", token})
        })
        .catch(err => res.status(400).json(err))
}

exports.testAuth = (req, res, next) => {
    res.status(200).json({message: "Truy cập thành công rùi nèe <3<3"});
}