const express = require('express')
const ejs = require('ejs')
const path = require('path')
const qrcode = require('qrcode')
const PORT = process.env.PORT || 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/scan', (req, res) => {
    var inputdata = req.body.qrtext;
    qrcode.toDataURL(inputdata, (err, src) => {
        if (err) throw err
        res.render('scan', { qrcode: src });
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})