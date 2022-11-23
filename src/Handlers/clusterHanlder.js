import process from 'process'
import cluster from 'cluster'

export const bigTask = (req, res) => {
    for (let i = 0; i < 8000000000; i++) {
    }
    res.send(`ok ${process.pid}`)
}

export const killCurrentWorker = (req, res) => {
    res.send(`${process.pid} will be killed`)
    cluster.worker.kill()
}