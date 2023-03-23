const lad = require('lodash');
const validator = require('validator');

exports.require = async (req, res, next) => {
    let errors = {};
    
    const email = lad.get(req.body, "email", "");
    const password = lad.get(req.body, "password", "");
    const password2 = lad.get(req.body, "confirmPassword", "");
    const typeUser = lad.get(req.body, "typeUser", "");
    
    if(validator.isEmpty(email)) {
        errors.email = "Phải nhập email!";
    }

    if(validator.isEmpty(password)) {
        errors.password = "Phải nhập password!";
    } else if(!validator.isLength(password, {min: 6})) {
        errors.password = "Password ít nhất 6 ký tự!";
    }

    if(validator.isEmpty(password2)) {
        errors.email = "Phải nhập xác nhận mật khẩu!";
    } else if(!validator.equals(password, password2)) {
        errors.email = "Mật khẩu không trùng khớp!";
    }

    if(validator.isEmpty(typeUser)) {
        errors.email = "Phải nhập typeUser!";
    }

    if(lad.isEmpty(errors)) return next();

    return res.status(400).json(errors)
}