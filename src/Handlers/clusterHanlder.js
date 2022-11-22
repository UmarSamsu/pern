import process from 'process'
import cluster from 'cluster'

export const bigTask = async (req, res) => {

    await handle()
    res.send(`ok ${process.pid}`)
    // cluster.worker.kill()
}

const handle = () => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < 8000000000; i++) {
        }
        resolve('ok')
    })
}