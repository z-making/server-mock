//http模块，支持创建服务器（内置的）
const http = require('http')
//文件读取模块。可以用来读取本地存储文件（内置的）
const fs = require('fs')
//url模块，可以吧一个url进行解析（内置的）
const url = require('url')

http.createServer((req,res) =>{
  let pathObj=url.parse(req.url,true)
  switch(pathObj.pathname){
    case '/index':
      if(pathObj.query.city === 'beijing'){
        res.end(JSON.stringify({city:'beijing',weather:'sunny'}))
      }else{
        res.end(JSON.stringify({city:pathObj.query.city,weather:'unknown'}))
      }
      break
    default:
      try{
        let pathname = pathObj.pathname === '/' ? '/index.html': pathObj.pathname
        res.end(fs.readFileSync(__dirname + pathname))
      }catch(e){
        res.writeHead(404,'Not Found')
        res.end('<h1>404 Not Found</h1>')
      }
  }
}).listen(8080)