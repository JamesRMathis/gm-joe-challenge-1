const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.post('/', (req, res) => {
    let input = req.body['input']

    console.log(input);

    let re = /\^\/\(\d+, \d+\)/g
    let badRE = /\^\/\(\)/g

    if (input.match(badRE)) {
        console.log('found bad root');
        res.render(path.join(__dirname, '/views/badInput.ejs'), {'expression': input})
    }
    
    if (input.match(re)) {
        console.log('replacing ^/ with root');
        input = input.replace(/\^\//g, 'root')
    }

    try {
        if (input == 0) throw new Error
        let output = eval(input)

        if (input.match(/root/g)) {
            console.log('replacing root with ^/');
            input = input.replace(/root/g, '^/')
        }

        console.log(output);

        res.render(path.join(__dirname, '/views/output.ejs'), {'expression': input, 'result': output})
    } catch (error) {
        res.render(path.join(__dirname, '/views/badInput.ejs'), {'expression': input})
    }
})

function root(num, index) {
    console.log('taking the root');

    try {
        result = Math.pow(num, 1/index)
        if (isNaN(result)) throw new Error

        return result
    } catch (error) {
        return 'FLAG{PLEASE_DONT_USE_EVAL_WITH_USER_INPUT}'
    }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})