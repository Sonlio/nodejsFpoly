const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.header('token');
    if(!token) {
        return res.status(401).json({message: "Chưa được phép truy cập đouu bé ưii!"});
    }
    
    jwt.verify(token, "FPT", (decoded, err) => {
        if(!err) {
            return res.status(500).json({message: "Bé chưa được phép truy cập đâu nè :(("});
        }
        req.user=decoded;
        next();
    })
}