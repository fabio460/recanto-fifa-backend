import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()


export const listar = async(req:Request, res:Response)=>{
    const l =  await prisma.temporada.findFirst()
    res.json(l)
 }

export const criar = async(req:Request, res:Response)=>{
   const t = await prisma.temporada.create({
    data:{
        numero:1
    }
   })
   res.json(t)
}
export const atualizar = async(req:Request, res:Response)=>{
   const {id, numero} = req.body;
   const temporada = await prisma.temporada.findFirst({
  
   }) 
   if (temporada?.numero === 1) {    
       await prisma.temporada.update({
        where:{
            id:temporada?.id
        },
        data:{
            numero:2
        }
       })
   } else {
    await prisma.temporada.update({
        where:{
            id:temporada?.id
        },
        data:{
            numero:1
        }
       })
   }
   res.json(temporada)
}