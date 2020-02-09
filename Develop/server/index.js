const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

app.get('/', (_, res) =>{
    const filePath = path.resolve(__dirname, "..","public","index.html");
    res.sendFile(filePath);
}); 


app.get('/notes', (_, res) =>{
    const filePath = path.resolve(__dirname, "..","public","notes.html");
    res.sendFile(filePath);
}); 


app.listen(port, () => console.log(`Example app listening on port  ${port}!`));