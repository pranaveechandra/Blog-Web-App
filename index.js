import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
let blogs = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req,res) =>{
    res.render("index.ejs");
})

app.post("/form",(req,res) =>{
   const titleContent = req.body["title"];
    const bodyContent = req.body["content"];
    
    const newBlog = {
        title: titleContent,
        content: bodyContent,
        createdAt: new Date() 
    };
    
    blogs.push(newBlog);

    res.render("index.ejs",{blogs : blogs})
})

app.post("/clear-blogs", (req, res) => {
    blogs = []; // Reset the blogs array to empty
    res.redirect("/"); // Redirect back to the home page
});


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})