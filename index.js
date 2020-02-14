const express = require('express');
const path = require("path");
const bodyParser = require('body-parser')
const shortId = require("shortid");
const fs = require("fs").promises;
const app = express();
const port = 3000;

const dbFilePath = path.resolve(__dirname, "Develop", "db", "db.json")

app.use(express.static(('Develop/public')))

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', (_, res) =>{
    const filePath = path.resolve(__dirname,"Develop","public","index.html");
    res.sendFile(filePath);
});


app.get('/notes', (_, res) => {
	const filePath = path.resolve(__dirname, "Develop", "public", "notes.html");

	res.sendFile(filePath);
});

app.get('/api/notes',async (_, res) => {
    const fileData = await fs.readFile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);
    res.json(data);
});

app.post('/api/notes',async (req, res) => {
    const {title, text }  = req.body;
    
    const fileData = await fs.readFile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);

    const gen_id = shortId.generate();

    console.log(gen_id)

    data.push({
        id: gen_id,
        title,
        text
    })

    await fs.writeFile(dbFilePath, JSON.stringify(data));
    // res.json(data);
    res.json({
        success: true
    });
});

app.delete('/api/notes/:id', async (req, res) => {
    const notesId = req.params.id;
    const fileData = await fs.readFile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);
    console.log(JSON.stringify(data))
    const newData = data.filter(note => note.id != notesId);
    console.log(JSON.stringify(newData))
    await fs.writeFile(dbFilePath, JSON.stringify(newData));

    res.json({
        success: true
    });
});



// redirect takes you back to the root file.
 app.use("*",(_, res)=>{
     res.redirect("/");
 })

app.listen(port, () => console.log(`Example app listening on port  ${port}!`));