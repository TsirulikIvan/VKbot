const token = '53b97c437c06fec81f2ba157488fd10e969c046df2ee0b2e813ecb97bc5fb9ee8ba9d6edb1fa0abf7ef11'
const translator_token ='trnsl.1.1.20191026T174457Z.7e356ea206c2263e.78d33487dccf51d9cbcf0ad15f091a1fc66a9521'
const dict_token = 'dict.1.1.20191101T171153Z.1e577238203af2bb.22780e1cb7d4b840979e581502e34e9ca357c8e1'
const group_id = 187996771
const conf = 'e29de505'
const v = 5.102
const express = require('express')
const parser = require('body-parser')
const request = require('request')
const app = express()

//https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=API-ключ&lang=en-ru&text=time
/*
let arr = ['Привет', 'Оооо, круто', 'Странные вещи', 'Легкие деньги', 'Мама мыла раму', 'Программирование']
arr.forEach((item) => {
  if (item.split(' ').length != 1 ){
    request(encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translator_token}&text=${item}&lang=ru-en`), (error, response, body) => {
     tmp = JSON.parse(response.body)
     console.log(tmp.text[0])
     console.log('-------------------------------------------------------------------')})
  }
    else {
    request(encodeURI(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${dict_token}&lang=ru-en&text=${item}`), (error, response, body) => {
     let tmp = JSON.parse(response.body)
     console.log(tmp.def[0].tr)
     console.log('-------------------------------------------------------------------')
     console.log('')
     let res = tmp.def[0].tr.map((item) => {return item.text})
     console.log(res)
     console.log(res.toString())
     console.log('-------------------------------------------------------------------')
})
} })
*/
app.use(parser.json())
app.post('/', (req, res) => {
  let msg = req.body
  console.log(msg)
  if (msg.type == 'message_new') {
    res.send('ok')
    let ri = parseInt(Math.random() * 1000000)
    console.log(msg.object.text.split(' '))
    if (msg.object.text.split(' ').length != 1) {
      console.log('Call translator')
      request(encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translator_token}&text=${msg.object.text}&lang=ru-en`), (error, response, body) => {
        let bot_msg = `Привет, ты решил написать мне чтоб воспользоваться моими знаниями иностранных языков?
          Если да, то пиши выражения вида:
           /translate То_что_хочешь_перевести.
          Я вижу ты написал ${msg.object.text},
          вот как это выглядит на иностранном языке:
          ${JSON.parse(response.body).text[0]} `
        console.log('-------------------------------------------------------------------')
        request(encodeURI(`https://api.vk.com/method/messages.send?user_id=${msg.object.from_id}&message=${bot_msg}&access_token=${token}&v=${v}&random_id=${ri}`), (error, response, body) => {
        console.log('error:', error)
      console.log('-------------------------------------------------------------------')
      })
    })
    } else {
      console.log('Call dict')
      request(encodeURI(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${dict_token}&lang=ru-en&text=${msg.object.text}`), (error, response, body) => {
        let tmp = JSON.parse(response.body)
        let res = tmp.def[0].tr.map((item) => {return item.text})
        let bot_msg = `Привет, ты решил написать мне чтоб воспользоваться моими знаниями иностранных языков?
          Если да, то пиши выражения вида:
           /translate То_что_хочешь_перевести.
          Я вижу ты написал ${msg.object.text}. Ого, это слово имеет несколько переводов, вот их список:
          ${res.toString()}`
        console.log('-------------------------------------------------------------------')
        request(encodeURI(`https://api.vk.com/method/messages.send?user_id=${msg.object.from_id}&message=${bot_msg}&access_token=${token}&v=${v}&random_id=${ri}`), (error, response, body) => {
        console.log('error:', error)
      console.log('-------------------------------------------------------------------')
    })
  })
    }
}
})
app.get('/', (req, res) => res.send('Works!!!'))

app.listen(process.env.PORT || 5000, () => console.log('Listening!'))
