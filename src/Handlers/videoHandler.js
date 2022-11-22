import jwt from 'jsonwebtoken'
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv'

const env = dotenv.config().parsed
const __dirname = path.resolve();
const videoPath = path.join(__dirname, 'assets', 'video.mkv');

const chunkSize = 1 * 1e+6

export const generateStreamLink = (req, res) => {
    const token = jwt.sign({ path: `${env.BASE_URL}/` }, env.ACCESS_TOKEN_SECRET, { issuer: env.BASE_URL, expiresIn: '2m' })
    res.send({ token })
}

export const streamVideo = (req, res) => {
    try {
        const { token } = req.params
        const details = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
        console.log('details', details)
        const range = req.headers.range
        const videoSize = fs.statSync(videoPath).size

        console.log('range', range)
        const start = Number(range.replace(/\D/g, ''))
        const end = Math.min(start + chunkSize, videoSize - 1)

        const contentLength = end - start + 1

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/webm"
        }
        res.writeHead(206, headers)

        const stream = fs.createReadStream(videoPath, { start, end })
        stream.pipe(res)

    } catch (error) {
        console.log('error', error)
        res.end('error')
    }
}

export const downloadVideo = () => {

}