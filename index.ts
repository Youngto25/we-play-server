const { PrismaClient } =  require('@prisma/client')
import { Request, Response } from 'express'
const express = require('express')
const { Request } = express
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
const port = 3000
const prisma = new PrismaClient()


app.get('/users', async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany({
    orderBy: [{ id: "desc" }],
    select: {
      id: true,
      nickname: true,
      _count: {
        select: { actions: true }
      }
    }
  });
  res.json(allUsers);
})

app.get('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      actions: {
        orderBy: [{ id: "desc" }],
      },
      
    }
  })
  res.json({ errcode: 0, user })
})

app.put('/update/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);  // 路径参数
  const user = await prisma.user.update({
    where: { id },
    data: { nickname: "update good" },
  })
  res.json(user)
})

app.post('/create', async (req: Request, res: Response) => {
  await prisma.user.create({
    data: {
      nickname: 'small wang'
    }
  })
  res.send("ni hao")
})

app.get('/action/get/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const actions = await prisma.action.findMany({
    where: {
      userId
    }
  })
  res.json({ "errcode": 0, actions })
})

app.post('/action/create', async (req: Request, res: Response) => {
  const body = req.body;
  const action = await prisma.action.create({
    data: {
      type: body.type,
      userId: body.userId,
      value: body.value
    }
  })
  res.json({ "errcode": 0, action })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

