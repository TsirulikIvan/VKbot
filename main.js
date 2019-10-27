const token = '53b97c437c06fec81f2ba157488fd10e969c046df2ee0b2e813ecb97bc5fb9ee8ba9d6edb1fa0abf7ef11'
const translator_token ='trnsl.1.1.20191026T174457Z.7e356ea206c2263e.78d33487dccf51d9cbcf0ad15f091a1fc66a9521'
const group_id = 187996771
const conf = 'e29de505'
const v = 5.102
const express = require('express')
const parser = require('body-parser')
const request = require('request')
const app = express()

request(encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translator_token}&text=Привет&lang=ru-en`), (error, response, body) => {
 console.log(response.body)
 console.log(typeof(response.body))
})

app.use(parser.json())
app.post('/', (req, res) => {
  let msg = req.body
  console.log(msg)
  if (msg.type == 'message_new') {
    res.send('ok')
    let ri = parseInt(Math.random() * 1000000)
    request(encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translator_token}&text=${msg.object.text}&lang=ru-en`), (error, response, body) => {
      console.log('Yandex res ', body)
      console.log(typeof(body))
      let bot_msg = body.slice(36, body.length - 3)
      console.log(bot_msg)
      request(`https://api.vk.com/method/messages.send?user_id=${msg.object.from_id}&message=${bot_msg}!&access_token=${token}&v=${v}&random_id=${ri}`, (error, response, body) => {
      console.log('error:', error)
    })})}})
app.get('/', (req, res) => res.send('Works!!!'))

app.listen(process.env.PORT || 5000, () => console.log('Listening!'))
