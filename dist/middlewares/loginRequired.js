"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require("dotenv").config();
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
exports. default = async (req,res,next) => {
    const { authorization } = req.headers;

    if( !authorization){
        return res.status(401).json({
            errors: ["Login required"],
        });
    }

    const[ ,token] = authorization.split(" ");
    try{
        const dados = _jsonwebtoken2.default.verify(token,process.env.TOKEN_SECRET);
        const { id,email } = dados;
        const user = await _User2.default.findOne({
            where: {
                id,
                email
            }
        });
        if(!user){
            return res.status(401).json({
                errors: ["usuario invalido."],
            });
        }
        req.userId = id;
        req.email = email;
        return next();
    }catch(e){
        return res.status(401).json({
            errors: ["Token expirado ou inválido"],
            e,
        });
    }
}