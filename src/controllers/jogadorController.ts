import { Response, Request } from "express"
import {PrismaClient} from '@prisma/client'
import { jogadoresType } from "../../types"
const prisma = new PrismaClient()

export const criar =async (req:Request, res:Response)=>{
    const {label,CLUBE,OVER,Posicao,idUsuario,valor=0} = req.body
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
            },
            orderBy:{
                OVER:'desc'
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

export const listarPoloNome =async (req:Request, res:Response)=>{
    const {id} = req.params
    try {
        const r = await prisma.jogadore.findUnique({
            where:{
                label:id
            },
            include:{
                usuario:true
            }
        })
        res.json(r)
    } catch (error) {
        res.json(error)
    }
}

export const atualizar =async (req:Request, res:Response)=>{
    const {label,CLUBE,OVER,Posicao,idUsuario,valor=0, id} = req.body
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
    const {id, valor=0} = req.body
    try {
        const proprietarioDoJogador = await prisma.jogadore.findUnique({
            where:{
                id
            },
            include:{
                usuario:true
            }
        })
        const idDoProprietario = proprietarioDoJogador?.usuario.id
        const saldoDoProprietario = proprietarioDoJogador?.usuario.saldo
        await prisma.usuario.update({
            where:{
                id:idDoProprietario
            },
            data:{
                saldo:valor + saldoDoProprietario
            }
        })
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

export const tranferenciaMonetariaDeJogador =async (req:Request, res:Response)=>{
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
        const folhaDoPropAntigo = proprietarioAntigo?.usuario.folha || 0
        const folhaDoPropNovo = proprietarioNovo?.folha || 0
        const valorDoJogador = proprietarioAntigo?.valor || 0

        await prisma.usuario.update({
            where:{
                id:idDoPropAntigo
            },
            data:{
                saldo:saldoDoPropAntigo + valor,
                folha: folhaDoPropAntigo - (valorDoJogador*0.03)
            },
            
        })

        await prisma.usuario.update({
            where:{
                id:idDoPropNovo
            },
            data:{
                saldo:saldoDoPropNovo - valor,
                folha: folhaDoPropNovo + valorDoJogador*0.03
            }
        })
        
        res.json("transferência monetaria feita com sucesso")
    } catch (error) {
        res.json(error)
    }
}

export const tranferenciaFisicaDeJogador =async (req:Request, res:Response)=>{
    const {idUsuario, id, valor} = req.body
    try {
        await prisma.jogadore.update({
            where:{
              id
            },  
            data:{
               idUsuario,
               valor
            }
          })
        res.json("transferência fisica feita com sucesso")
    } catch (error) {
        res.json(error)
    }
}