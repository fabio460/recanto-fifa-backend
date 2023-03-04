import { Router } from "express";
import { atualizar, criar, deletar, getUsuario, getUsuarioPeloNome, getUsuarioPoId } from "../controllers/usuarioController";

const usuarioRouter = Router()

usuarioRouter.get("/",getUsuario)
usuarioRouter.get("/:id",getUsuarioPoId)
usuarioRouter.get("/pelonome/:id",getUsuarioPeloNome)
usuarioRouter.post("/",criar)
usuarioRouter.put('/',atualizar)
usuarioRouter.delete('/',deletar)
export default usuarioRouter