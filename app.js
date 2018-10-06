const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req,res) => {
    res.json({
        message: 'Welcome to API'
    })
})

app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created...',
                authData,

            })
        }
    })
})

app.post('/api/login', (req,res) => {
    //mock user
    const user = {
        id: 1,
        userName: 'Nick',
        email: 'nick@gmail.com'
    }
    jwt.sign({user}, 'secretKey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        })
    })
})

//Format of Token


//Verify Token
function verifyToken(req,res,next) {
    //Get Auth Header Value
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1]
        //set token
        req.token = bearerToken
        //Next middleware
        next()
    } else {
       res.sendStatus(403) 
    }
}

app.listen(5000, () => console.log('listening to 5000'))
