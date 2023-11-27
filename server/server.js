const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt'); 
const { title } = require('process');
var cors = require('cors')

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

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
connection.connect();
const PORT = 3000;

const secretKey = "My super secret key";
const jwtMW = exjwt.expressjwt({ 
    secret: secretKey,
    algorithms: ['HS256']
});

app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("Token missing or Invalid token");
    } else {
      next(err);
    }
  });


app.post('/api/signup', (req, res) =>{
    const  username= req.body.username;
    const  password = req.body.password;
    if (!username || !password) {
        res.status(400).send("username and password are required")
        return
    }
    const pwd = encryptPassword(password);
   
    connection.query('Insert INTO users (username, passwordHash) VALUES ( ?, ?)',[username, pwd], function (error, results, fields) {
       
        if (error)  {
            console.log("user creation failed" + error.message)
            if (error.code == "ER_DUP_ENTRY") {
                res.status(409).send({
                    success: false,
                    message : "User name already exists"
                })
            } else {
                res.status(400).send("Something went wrong")
            }
            
        } else  {
            console.log("user is created")
            res.status(200).send({
                success: true,
                message : "User successfully created"
            })
        }
        //connection.end();
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
                message: 'Username or password is incorrect'
            });
        } else {
            let user = results[0]
            let token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '30m' });
            res.json({
                success: true,
                message: "Login Successful",
                body: {
                    token: token
                }
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


app.get('/api/categories', jwtMW,(req,res) => {
    let userId = req.auth.id
    connection.query('SELECT * FROM budget_category where userId = ?', [userId], function (error, results, fields) {
        if (error)  {
            console.log(error)
            res.status(500).json({
                success: false,
                err: 'Internal Server Error'
            });
        } else {
            res.json({
                categories: results
            });
        }
    });  
}); 

app.post('/api/category', jwtMW,(req, res) =>{
    const  name= req.body.name;
    const  limit = req.body.limit;

    if (!name || !limit) {
        res.status(400).send("all fields are required")
        return
    }
    
    connection.query('Insert INTO budget_category ( `name`, `userId`, `limit`) VALUES (?, ?, ?)',[name.toUpperCase(), req.auth.id, limit], function (error, results, fields) {
        if (error)  {
            console.log("category creation failed" + error.message)
            if (error.code == "ER_DUP_ENTRY") {
                res.status(409).send("category already exists")
            } else {
                res.status(400).send("Something went wrong")
            }
            
        } else  {
            console.log("budget_category is created")
            res.status(200).json( {message: "Budget successfully Created"})

        }
       
    });
});

app.put('/api/category', jwtMW,(req, res) =>{
    const  name= req.body.name;
    const  limit = req.body.limit;
    const  id = req.body.id;

    if (!id || !name || !limit) {
        res.status(400).send("all fields are required")
        return
    }
    
    connection.query('UPDATE budget_category SET `name` = ?, `userId` = ?, `limit` = ?  WHERE id = ?',[name.toUpperCase(), req.auth.id, limit, id], function (error, results, fields) {
        if (error)  {
            console.log("category creation failed" + error.message)
            if (error.code == "ER_DUP_ENTRY") {
                res.status(409).send("category already exists")
            } else {
                res.status(400).send("Something went wrong")
            }
            
        } else  {
            console.log("budget_category is created")
            res.status(200).json( {message: "Budget successfully updated"})
        }
       
    });
});

app.post('/api/transaction', jwtMW,(req, res) =>{
    const  title= req.body.title;
    const  amount = req.body.amount;
    const  createdDate = req.body.createdDate;
    const  categoryId = req.body.categoryId;

    if (!title || !amount) {
        res.status(400).send("all fields are required")
        return
    }
    connection.query('Insert INTO budget_spending (title, amount, userId, createdDate, categoryId) VALUES ( ?, ?, ?, ? , ?)',[title, amount, req.auth.id, createdDate, categoryId], function (error, results, fields) {

        if (error)  {
            console.log("budget creation failed" + error.message)
            if (error.code == "ER_DUP_ENTRY") {
                res.status(409).send("Budget already exists")
            } else {
                res.status(400).send("Something went wrong")
            }
            
        } else  {
            console.log("Budget is created")
            res.status(200).send({
                success: true,
                message : "Budget successfully created"
            })
        }
       
    });
});



app.get('/api/transactions', jwtMW, async (req,res) => {
    let userId = req.auth.id
    connection.query('SELECT * FROM budget_spending where userId = ? AND  createdDate >= ? and createdDate <= ?',[userId, req.query.startDate, req.query.endDate], async function (error, results, fields) {
        if (error)  {
            console.log(error)
            res.status(500).json({
                success: false,
                err: 'Internal Server Error'
            });
        } else {
            const categoryMap = await getCategoriesMap(userId)
            let num = 1;
            const resultModified = JSON.parse(JSON.stringify(results))
            res.json({
                transactions: resultModified.map(value => {
                    return  {
                        "id": value.id,
                        "title": value.title,
                        "amount": value.amount,
                        "userId": value.userId,
                        "categoryId":  categoryMap[value.categoryId][0].name,
                        "createdDate": value.createdDate,
                        "modifiedAt": value.modifiedAt
                    }
                })
            });
        }
    });  
});  

app.get('/api/spendingByCategory', jwtMW, async (req,res) => {
    let userId = req.auth.id
    connection.query('SELECT * FROM budget_spending where userId = ? AND  MONTH(createdDate) = ? and YEAR(createdDate) = ?',[userId, req.query.month, req.query.year], async function (error, results, fields) {
        if (error)  {
            console.log(error)
            res.status(500).json({
                success: false,
                err: 'Internal Server Error'
            });
        } else {
            const groupByCat = []
             const categoryMap = await getCategoriesMap(userId)

            const resultModified = JSON.parse(JSON.stringify(results))
            const groupByCategory = resultModified.reduce((group, product) => {
                const { categoryId } = product;
                group[categoryId] = group[categoryId] ?? [];
                group[categoryId].push(product);
                return group;
              }, {});

            for (const [key, value] of Object.entries(groupByCategory)) {
                groupByCat.push({categoryId: categoryMap[key][0].name, limit: categoryMap[key][0].limit, amount: value.reduce((ac, cv) =>  ac + cv.amount, 0)})
              }
            res.json({
                 spendingByCategory: groupByCat
            });
        }
    });  
});  

app.get('/api/budgetByMonth', jwtMW,(req,res) => {
    let userId = req.auth.id
    let date = new Date()
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let startDate = year + "-01-01"
    let endDate = `${year}-${month}-${day}`
    console.log(startDate)
    console.log(endDate)
    connection.query('SELECT * FROM budget_spending where userId = ? AND createdDate >= ? and createdDate <= ?',[userId, startDate, endDate], function (error, results, fields) {
             if (error)  {
            console.log(error)
            res.status(500).json({
                success: false,
                err: 'Internal Server Error'
            });
        } else {
            connection.query('SELECT * FROM budget_category where userId = ?', [userId], function (error2, categories, fields2) {
                if (error2)  {
                    console.log(error2)
                    res.status(500).json({
                        success: false,
                        err: 'Internal Server Error'
                    });
                } else {
                    const groupByCat = []
                    const resultModified = JSON.parse(JSON.stringify(results))
                    console.log(resultModified)
                    const groupByCategory = resultModified.reduce((group, product) => {
                        const { createdDate } = product;
                        const month = new Date(createdDate).getMonth();
                        group[month] = group[month] ?? [];
                        group[month].push(product);
                        return group;
                    }, {});
                    let budgetSet = categories.reduce((t, cv) => t + cv.limit,0)
                    for (const [key, value] of Object.entries(groupByCategory)) {
                        value.reduce((ac, cv) =>  {
                            ac + cv.amount
                        }, 0)
                        groupByCat.push({month: monthNames[key], amount: value.reduce((ac, cv) =>  ac + cv.amount, 0), limit: budgetSet})
                    }
                    
                    res.json({
                        spendingByCategory: groupByCat
                    });
            }
        })
        }
    });  
}); 

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {(rv[x[key]] = rv[x[key]] || []).push(x); return rv; }, {});
};

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

async function getCategoriesMap(userId) {
    return new Promise(resolve => {
    connection.query('SELECT * FROM budget_category where userId = ?', [userId], function (error, results, fields) {
        const resultModified = JSON.parse(JSON.stringify(results))
        const groupByCategory = resultModified.reduce((group, product) => {
            const { id } = product;
            group[id] = group[id] ?? [];
            group[id].push(product);
            return group
          }, {});
          return resolve(groupByCategory)
    });  
})
}