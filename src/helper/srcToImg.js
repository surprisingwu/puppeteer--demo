const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path')
const promisify = require('util').promisify
const writeFile = promisify(fs.writeFile)
const urlToImg = promisify((url, dir) => {
  const mod = /^https:/.test(url) ? https : hotUpdate

  const ext = path.extname(url)
  const file = path.join(dir, `${Date.now()}${ext}`)
  mod.get(url, (res) => {
    res.pipe(fs.createWriteStream(file))
      .on('finish', () => {
      console.log(file);
    })
  })
})

const base64ToImg = async (base64, dir) => {
  //data:image/png;base64,iVBORw0KGgo
  const match = base64.match(/^data:(.+?);base64,(.+)/)
  const ext = match[1].split('/')[1].replace('jpeg', 'jpg')
  const file = path.join(dir, `${Date.now()}.${ext}`)
  await writeFile(file, match[2], 'base64')
  console.log(file);
}
module.exports = async(url, dir) => {
  if (/\.(jpg|jpeg|png|gif)$/.test(url)) { 
    await urlToImg(url, dir)
  } else {
    await base64ToImg(url, dir)
  }
}