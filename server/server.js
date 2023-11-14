const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database: 'budget_app',
});

const PORT = 3000;

const secretKey = "My super secret key";
const jwtMW = exjwt.expressjwt({ 
    secret: secretKey,
    algorithms: ['HS256']
});


app.post('/api/signup', (req, res) =>{
    const  username= req.body.username;
    const  password = req.body.password;
    if (!username || !password) {
        res.status(400).send("username and password are required")
        return
    }
    const pwd = encryptPassword(password);
    const date = transformDate(new Date());
    connection.connect();
    connection.query('Insert INTO users (username, passwordHash, registeredAt) VALUES ( ?, ?, ?)',[username, pwd, date], function (error, results, fields) {
       connection.end();
        if (error)  {
            console.log("user creation failed" + error.message)
            if (error.code == "ER_DUP_ENTRY") {
                res.status(400).send("username already exists")
            } else {
                res.status(400).send("Something went wrong")
            }
            
        } else  {
            console.log("user is created")
            res.status(200).send("user successfully created")
        }
       
    });
});


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const pwd = encryptPassword(password);
    connection.query('SELECT * FROM users where username = ? and passwordHash = ?',[username, pwd], function (error, results, fields) {
        if (error)  {
            res.status(500).json({
                success: false,
                err: 'Internal Server Error'
            });
        } else if (results.length == 0) {
            res.status(401).json({
                success: false,
                err: 'Username or password is incorrect'
            });
        } else {
            let user = results[0]
            let token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '3m' });
            console.log(token)
            res.json({
                success: true,
                err: null,
                token
            });
        }    
})
});

app.get('/api/dashboard', jwtMW, (req, res) => {
    res.json ({
        success: true,
        myContent: 'Secret content that only logged in people can see'
    });
});

app.get('/api/settings', jwtMW, (req, res) => {
    console .log (req)
    res.json ({
        success: true,
        myContent: 'Authorized to access settings page.'
    });
});

app.get('/', (req, res) => {
    console.log("request received")
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function (err,req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            success: false,
            officialError: err,
            err: 'Username or password is incorrect 2'
        });
    }
    else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
}); 

function encryptPassword(password){ 
    const hash = crypto.createHash('sha256').update(password).digest('hex'); 
    return hash;
    }
    
    function transformDate(date){
        return date.getYear() + "-"+ date.getMonth() + "-" + date.getDay()
    }