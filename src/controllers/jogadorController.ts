import { Response, Request } from "express"
import {PrismaClient} from '@prisma/client'
import { jogadoresType } from "../../types"
const prisma = new PrismaClient()

export const criar =async (req:Request, res:Response)=>{
    const {label,CLUBE,OVER,Posicao,idUsuario,valor} = req.body
    try {
        const r = await prisma.jogadore.create({
          data:{
             label,
             CLUBE,
             OVER,
             Posicao,
             idUsuario,
             valor
          }
        })
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}

export const listar =async (req:Request, res:Response)=>{
    try {
        const r = await prisma.jogadore.findMany({
            include:{
                usuario:true
            }
        })
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}

export const listarPorId =async (req:Request, res:Response)=>{
    const {id} = req.params
    try {
        const r = await prisma.jogadore.findUnique({
            where:{
                id
            }
        })
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}

export const atualizar =async (req:Request, res:Response)=>{
    const {label,CLUBE,OVER,Posicao,idUsuario,valor, id} = req.body
    try {
        const r = await prisma.jogadore.update({
          where:{
            id
          },  
          data:{
             label,
             CLUBE,
             OVER,
             Posicao,
             idUsuario,
             valor
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

export const tranferenciaDeJogador =async (req:Request, res:Response)=>{
    const {idUsuario, id} = req.body
    try {
        const r = await prisma.jogadore.update({
          where:{
            id
          },  
          data:{
             idUsuario
          }
        })
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}