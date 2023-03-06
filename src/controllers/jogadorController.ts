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
    const {idUsuario, id, valor} = req.body
    try {

        const proprietarioAntigo = await prisma.jogadore.findUnique({
            where:{
                id
            },
            include:{
                usuario:true
            }
        })
        const proprietarioNovo = await prisma.usuario.findUnique({
            where:{
                id:idUsuario
            }
        })
        const idDoPropAntigo = proprietarioAntigo?.usuario.id
        const idDoPropNovo = idUsuario
        const saldoDoPropAntigo = proprietarioAntigo?.usuario.saldo
        const saldoDoPropNovo = proprietarioNovo?.saldo || 0
        await prisma.usuario.update({
            where:{
                id:idDoPropAntigo
            },
            data:{
                saldo:saldoDoPropAntigo + valor
            },
            
        })

        await prisma.usuario.update({
            where:{
                id:idDoPropNovo
            },
            data:{
                saldo:saldoDoPropNovo - valor
            }
        })

        const r = await prisma.jogadore.update({
            where:{
              id
            },  
            data:{
               idUsuario,
               valor
            }
          })
        res.json({
            saldoDoPropAntigo, saldoDoPropNovo
        })
    } catch (error) {
        res.json(error)
    }
}