const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/', (req, res) => {
    let input = req.body['num'] + ''
    let command = ''

    for (let i = 0; i < input.length; i+=3) {
        let char = String.fromCharCode(parseInt(input.charAt(i) + input.charAt(i + 1) + input.charAt(i + 2)))

        command += char
    }

    try {
        res.send(eval(command))
    } catch (error) {
        res.sendFile(path.join(__dirname, '/wrongcommand.html'))
    }
    
})

function getFlag() {
    return 'FLAG{PLEASE_DONT_USE_EVAL_WITH_USER_INPUT}'
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})