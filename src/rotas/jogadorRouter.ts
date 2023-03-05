import { Router } from "express";
import { atualizar, criar, deletar, listar, listarPorId, tranferenciaDeJogador } from "../controllers/jogadorController";

const jogadorRouter = Router()
jogadorRouter.post("/",criar)
jogadorRouter.delete("/",deletar)
jogadorRouter.get("/",listar)
jogadorRouter.put("/",atualizar)
jogadorRouter.get("/:id",listarPorId)
jogadorRouter.put("/transferencia",tranferenciaDeJogador)

export default jogadorRouter