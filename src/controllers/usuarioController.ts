import { Response, Request } from "express"
import {PrismaClient} from '@prisma/client'
import { jogadoresType } from "../../types"
const prisma = new PrismaClient()


export const getUsuario =async (req:Request,res:Response)=>{
   const u = await prisma.usuario.findMany({
      include:{
         jogadore:{
            orderBy:{
               OVER:'desc'
            }
         }

      }
      
   })
   res.json(u)
}

export const getUsuarioPoId =async (req:Request,res:Response)=>{
   const {id} = req.params
   const u = await  prisma.usuario.findUnique({
      where:{
         id
      },
      include:{
         jogadore:{
            orderBy:{
               OVER:'desc'
            }
         }
      }
   })
   res.json(u)
}

export const getUsuarioPeloNome =async (req:Request,res:Response)=>{
   const {id} = req.params
   const u = await  prisma.usuario.findMany({
      where:{
         nome:id
      },
      include:{
         jogadore:{
            orderBy:{
               OVER:'desc'
            },
         }
      }
   })
   res.json(u)
}


export const criar =async (req:Request, res:Response)=>{
   const {nome,folha,saldo,time,jogadores} = req.body
   try {
      const p = await prisma.usuario.create({
         data:{
            nome,
            folha:parseFloat(folha),
            saldo:parseFloat(saldo),
            time
         }
      })
      jogadores.map(async(e:any) => {
         await prisma.jogadore.create({
            data:{
               label:e.label,
               CLUBE:e.CLUBE,
               OVER:e.OVER,
               Posicao:e.Posicao,
               idUsuario:p.id,
               valor:0     
            }
         })
      });
      res.json("usuario criado com sucesso")
   } catch (error) {
      res.json({falha:error})
   }
}

export const deletar =async (req:Request,res:Response)=>{
   const {id} = req.body
   const u = await  prisma.usuario.delete({
     where:{
       id
     }
   })
   res.json(u)
}

export const atualizar =async (req:Request,res:Response)=>{
   const {id, folha, saldo, nome, time} = req.body
   try {
      
      if (!folha) {
         const u = await  prisma.usuario.update({
            where:{
              id
            },
            data:{
             nome,
             saldo:parseFloat(saldo),
             time
            }
          })
          res.json(u)         
      }

      if (!saldo) {
         const u = await  prisma.usuario.update({
            where:{
              id
            },
            data:{
             nome,
             folha:parseFloat(folha),
             time
            }
          })
          res.json(u)
      }
      if (saldo && folha) {      
         const u = await  prisma.usuario.update({
           where:{
             id
           },
           data:{
            nome,
            folha:parseFloat(folha),
            saldo:parseFloat(saldo),
            time
           }
         })
         res.json(u)
      }
   } catch (error) {
      res.json(error)
   }
}

export const bugado =async (req:Request,res:Response)=>{
   const {id, bugado} = req.body
   try {
         const u = await  prisma.usuario.update({
            where:{
              id
            },
            data:{
              bugado
            }
          })
          res.json(u)         
   } catch (error) {
      res.json(error)
   }
}