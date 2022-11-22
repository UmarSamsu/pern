import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.resolve();


export const uploadFile = async (req, res) => {
    console.log('req', req)
    res.json('upload success')
}
// ('../../assets/1666351089082_qr paramount.png')
const videoPath = path.join(__dirname, 'assets', 'ngrok.exe');
// console.log('filePath', filePath)

export const downloadFile = (req, res) => {
    const { fileName } = req.params
    const filePath = path.join(__dirname, 'assets', fileName);

    const fileStream = fs.createReadStream(filePath)

    fileStream.on('open', () => {
        fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
        console.log('err', err)
    })
    // res.download(filePath)
}
// downloadFile()