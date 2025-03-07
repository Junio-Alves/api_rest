import User from "../models/User";
class UserController {
    async store(req,res){
        try{
            const novoUser = await User.create(req.body);
            const {id,nome,email} = novoUser;
            return res.json({id,nome,email});
        }catch(e){
            console.log(e);
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    //Index
    async index(req,res){
        try{
            const users = await User.findAll({attributes:["id","nome","email"]});
            if(users.length === 0){
                return res.status(400).json({
                    errors: ["Não há usuários cadastrados!"],
                })
            }
            return res.json(users);
        }catch(e){
            return res.json(null);
        }
    }

    //Show
    async show(req,res){
        try{
            const users = await User.findByPk(req.params.id);
            if(!users){
                return res.status(400).json({
                    errors: ["Usuário não encontrado!"],
                })
            }
            const {id,nome,email} = users;
            return res.json({id,nome,email});
        }catch(e){
            return res.json(null);
        }
    }

    //Update
    async update(req,res){
        try{
            const user = await User.findByPk(req.userId);
            if(!user){
                return res.status(400).json({
                    errors: ["Usuário não encontrado!"],
                })
            }
            const novosDados = await user.update(req.body);
            const {id,nome,email} = novosDados;
            return res.json({id,nome,email});
        }catch(e){
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    //Delete
    async delete(req,res){
        try{
            const user = await User.findByPk(req.userId);
            if(!user){
                return res.status(400).json({
                    errors: ["Usuário não encontrado!"],
                })
            }
            await user.destroy();
            return res.json(null);
        }catch(e){
            console.log(e);
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
    }


export default new UserController();