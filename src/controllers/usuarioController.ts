import { Response, Request } from "express"
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
export const getUsuario =async (req:Request,res:Response)=>{
   const u = await  prisma.usuario.findMany()
   res.json(u)
}