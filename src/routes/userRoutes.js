import { Router} from "express";
import userController from "../controllers/userController";
import loginRequired from "../middlewares/loginRequired";
const router = new Router();

//Não deveria existir
router.get("/",loginRequired,userController.index);
//router.get("/:id",userController.show);

router.post("/",userController.store);
router.put("/",loginRequired,userController.update);
router.delete("/",loginRequired,userController.delete);


export default router;

/*
    index ->  Lista todos os usuários -> GET,
    store/create -> cria um novo usuário -> POST,
    delete -> apaga um usuario -> DELETE,
    show -> mostra um usuário -> GET,
    update -> atualiza um usuário -> PATCH OU PUT, 
*/
 
