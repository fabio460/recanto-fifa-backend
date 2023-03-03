import express from 'express'
const app = express()
import cors from 'cors'
import route from './src/rotas'
app.use(express.json())
app.use(cors())
route.forEach(elem=>{
   return app.use(elem.endpoint,elem.rota)
})

app.listen(4000,()=>console.log("escutando na porta 4000"))