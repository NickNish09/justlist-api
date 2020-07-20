import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.database()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private database (): void {
      mongoose.connect('mongodb://mongo:27017/justlist',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        })
        .then(result => {
          console.log('MongoDB Conectado')
        })
        .catch(error => {
          console.log(error)
        })
    }

    private routes ():void {
      this.express.use(routes)
    }
}

export default new App().express
