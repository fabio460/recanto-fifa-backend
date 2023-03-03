import { Router } from "express";

export interface rotaType  {endpoint:string, rota: Router}
export interface jogadoresType{
   label:string,Posicao:string,OVER:string,CLUBE:string,idUsuario?:string
}