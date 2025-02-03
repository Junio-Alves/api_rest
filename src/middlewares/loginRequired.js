require("dotenv").config();
import jwt from "jsonwebtoken";
export default (req,res,next) => {
    const { authorization } = req.headers;

    if( !authorization){
        res.status(401).json({
            errors: ["Login required"],
        });
    }

    const[ ,token] = authorization.split(" ");
    console.log(token);
    try{
        const dados = jwt.verify(token,process.env.TOKEN_SECRET);
        const {id,email} = dados;
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