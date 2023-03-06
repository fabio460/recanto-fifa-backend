import { Router } from "express";
import { atualizar, criar, deletar, listar, listarPorId, tranferenciaFisicaDeJogador, tranferenciaMonetariaDeJogador,  } from "../controllers/jogadorController";

const jogadorRouter = Router()
jogadorRouter.post("/",criar)
jogadorRouter.delete("/",deletar)
jogadorRouter.get("/",listar)
jogadorRouter.put("/",atualizar)
jogadorRouter.get("/:id",listarPorId)
jogadorRouter.put("/transferenciaMonetaria",tranferenciaMonetariaDeJogador)
jogadorRouter.put("/transferenciaFisica",tranferenciaFisicaDeJogador)

export default jogadorRouter