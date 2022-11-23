import express from 'express';
import cors from 'cors';
import { addAppRoutes } from './src/addAppRoutes'
import cluster from 'cluster'
import os from 'os'
import process from 'process'

const app = express()

const cpuCount = os.cpus().length

//middlewares
app.use(cors())
app.use(express.json())

addAppRoutes(app) // all the app routes are added here

//multi instance using workers
if (cluster.isPrimary) {
    // let instanceCount = cpuCount
    let instanceCount = 2

    for (let i = 0; i < instanceCount; i++) { //can't use more than 2 workers in windows but can be created
        cluster.fork()
    }
    cluster.schedulingPolicy = instanceCount

    // forking a new worker whenever a worker is killed
    cluster.on('exit', (worker, code, signal) => {
        cluster.fork()
    })
} else if (cluster.isWorker) {
    app.listen(5000, () => {
        console.log(process.pid, 'new worker started')
    })
}

//single instance
// app.listen(5000, () => {
//     console.log('started');
// })