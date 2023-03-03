import { Router } from "express";
import { atualizar, criar, deletar, getUsuario, getUsuarioPoId } from "../controllers/usuarioController";

const usuarioRouter = Router()

usuarioRouter.get("/",getUsuario)
usuarioRouter.get("/:id",getUsuarioPoId)
usuarioRouter.post("/",criar)
usuarioRouter.put('/',atualizar)
usuarioRouter.delete('/',deletar)
export default usuarioRouter