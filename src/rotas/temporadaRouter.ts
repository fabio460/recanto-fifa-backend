import { Router } from "express";
import { atualizar, criar, listar } from "../controllers/temporada";

const temporadaRouter =  Router()
temporadaRouter.get("/",listar)
temporadaRouter.post("/",criar)
temporadaRouter.put("/",atualizar)
export default temporadaRouter