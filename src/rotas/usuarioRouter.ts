import { Router } from "express";
import { getUsuario } from "../controllers/usuarioController";

const usuarioRouter = Router()

usuarioRouter.get("/",getUsuario)

export default usuarioRouter