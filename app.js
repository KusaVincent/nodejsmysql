const express = require("express");
const mysql = require("mysql");

//creating connection to mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KarChunyJaluo",
  database: "Human_Resource_Management"
});
db.connect(err => {
  if (err) throw err;
  console.log("connected");
});

const app = express();
// //creating database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE Human_Resource_Management";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created...");
  });
});
//create table
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE Employees(Employee_id int, FirstName VARCHAR(15) NOT NULL, LastName VARCHAR(15) NOT NULL,Password VARCHAR(15) NOT NULL,Phone_number VARCHAR(15) NOT NULL,Email VARCHAR(25) NOT NULL UNIQUE,Department VARCHAR(30) NOT NULL, Payroll_number VARCHAR(10) NOT NULL,Supervisor_id VARCHAR(7) NOT NULL, PRIMARY KEY (Employee_id))";
  // let sql =
  //   "CREATE TABLE LeaveTable(leave_id int, Type VARCHAR(20), Days_Available VARCHAR(20), PRIMARY KEY (leave_id))";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post created");
  });
});

// insert post
app.get("/addpost", (req, res) => {
  let post = { title: "posted", body: "nice experience" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post added");
  });
});

// desc post
app.get("/addpost", (req, res) => {
  // let post = { title: "posted", body: "nice experience" };
  let sql = "DESC Employees";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post added");
  });
});

//select post
app.get("/getpost", (req, res) => {
  let sql = "SELECT * FROM Employees";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("post fetched");
  });
});

//select specific post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post with id of ${req.params.id} fetched`);
  });
});

// update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Title for post";
  let sql = `UPDATE posts SET title ='${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post with id of ${req.params.id} updated`);
  });
});

//delete post
app.get("/deletepost/:id", (req, res) => {
  let newTitle = "Title for post";
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post with id of ${req.params.id} deleted`);
  });
});

app.listen("3000", () => {
  console.log("server started");
});
