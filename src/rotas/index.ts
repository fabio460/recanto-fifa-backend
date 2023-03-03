import { rotaType } from "../../types";
import jogadorRouter from "./jogadorRouter";
import usuarioRouter from "./usuarioRouter";

const route:rotaType[] = [
    {endpoint:"/usuario",rota:usuarioRouter},
    {endpoint:"/jogador",rota:jogadorRouter}
]

export default route