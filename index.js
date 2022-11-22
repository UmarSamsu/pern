
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

addAppRoutes(app)

//get a todo
// app.get('/todos/:id', async (req, res) => {
//     res.writeHead(200, { "Content-type": "image/png" })
//     res.header('Content-Disposition: attachment; filename=file.exe')
// })

if (cluster.isPrimary) {
    for (let i = 0; i < 2; i++) {
        cluster.fork()
    }
    cluster.schedulingPolicy = 2
    console.log('cluster', cluster.schedulingPolicy)
    // cluster.on('exit', (worker, code, signal) => {
    //     console.log('worker id', worker.process.pid)
    //     cluster.fork()
    // })
} else if (cluster.isWorker) {
    // console.log('process', process.pid)
    app.listen(5000, () => {
        console.log('started', process.pid);
    })
}

// app.listen(5000, () => {
//     console.log('started');
// })