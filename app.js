const express = require('express');
const app = express();

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
con.connect();
app.set("view engine", "ejs");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    var query = "select * from user";
    con.query(query, (error, result, index) => {
        if (error) throw error;
        // res.render('/');
        res.render('dash', { result });
    });
});
app.post('/', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var query = "insert into user(name,email,password) values('" + name + "','" + email + "','" + password + "')";
    con.query(query, (error, result, index) => {
        if (error) throw error;
        res.redirect('/');
    });
});

app.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    var query = "delete  from user where id=" + id;
    con.query(query, (error, result, index) => {
        if (error) throw error;
        res.redirect('/');
    });
});

// update


app.get('/update/:id', (req, res) => {
    var id = req.params.id;
    var query = "select * from user where id = " + id;
    con.query(query, (error, result, index) => {
        if (error) throw error;
        // res.render('/');
        res.render('update', { result });
    });
});
app.post('/update/:id', (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var query = "update user set name='" + name + "'and email='" + email + "' and password='" + password + "' where id = " + id;
    // var query = "update user set name='"+name+"', email='"+email+"',password='"+password+"' where id= "+id;
    var query = "update user set name='"+name+"',email='"+email+"', password='"+password+"' where id = "+id;
    con.query(query, (error, result, index) => {
        if (error) throw error;
        res.redirect('/');
    });
});

app.listen(4000);