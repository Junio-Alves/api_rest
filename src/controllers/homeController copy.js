import Aluno from "../models/Aluno";
class HomeController {
    async index(req,res){
        const novoAluno = await Aluno.create({
            nome:"Junio",
            sobrenome: "Alves",
            email: "juniophb2004@gmail.com",
            idade: 21,
            peso: 60,
            altura: 1.70,
        }); 
        res.status(200).json(novoAluno);
    }
}

export default new HomeController();