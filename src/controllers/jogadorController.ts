import { Response, Request } from "express"
import {PrismaClient} from '@prisma/client'
import { jogadoresType } from "../../types"
const prisma = new PrismaClient()

export const criar =async (req:Request, res:Response)=>{
    const {label,CLUBE,OVER,Posicao,idUsuario} = req.body
    try {
        const r = await prisma.jogadore.create({
          data:{
             label,
             CLUBE,
             OVER,
             Posicao,
             idUsuario
          }
        })
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}

export const deletar =async (req:Request, res:Response)=>{
    const {id} = req.body
    try {
        const r = await prisma.jogadore.delete({
            where:{
                id
            }
        })
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}