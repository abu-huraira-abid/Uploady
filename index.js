import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let database = [];

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        data : database
    })
})

app.post("/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/editForm",(req,res)=>{
    const index = parseInt(req.body["index"]);
    const getTitle = database[index].title;
    const getCategory = database[index].category;
    const getDescription = database[index].description;

    res.render("editForm.ejs",
        {
            title : getTitle,
            category : getCategory,
            description : getDescription
        }
    )
})

app.post("/deleteForm",(req,res)=>{
    const index = parseInt(req.body["index"]);
    database.splice(index, 1);

    res.render("index.ejs",{
        data : database
    })
})

app.post("/upload",(req,res)=>{
    req.body["index"] = database.length;
    database.push(req.body);
    res.render("index.ejs",{
        data : database
    })
});

app.listen(port,()=>{
    console.log(`server start at port : ${port}`);
})