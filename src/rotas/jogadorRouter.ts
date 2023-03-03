import { Router } from "express";
import { criar, deletar } from "../controllers/jogadorController";

const jogadorRouter = Router()
jogadorRouter.post("/",criar)
jogadorRouter.delete("/",deletar)

export default jogadorRouter