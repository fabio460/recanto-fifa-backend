import { rotaType } from "../../types";
import jogadorRouter from "./jogadorRouter";
import temporadaRouter from "./temporadaRouter";
import usuarioRouter from "./usuarioRouter";

const route:rotaType[] = [
    {endpoint:"/usuario",rota:usuarioRouter},
    {endpoint:"/jogador",rota:jogadorRouter},
    {endpoint:"/temporada",rota:temporadaRouter}
]

export default route