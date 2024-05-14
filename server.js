import express from "express";

const app=express();

app.get('/', (req, res) => {
    res.send('This is first kubernets demo again!');
});

app.get('/new', (req, res) => {
    res.send('This is new route.');
});

app.get('/error', (req, res) => {
    process.exit(1);
});

app.listen(8000,()=>console.log("Server is running on 8000"))