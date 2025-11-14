// import express from "express";
// import bodyParser from "body-parser";


// const app = express();
// const port = 3000;
// let blogs = [];

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));


// app.get("/", (req,res) =>{
//     res.render("index.ejs");
// })

// app.post("/form",(req,res) =>{
//    const titleContent = req.body["title"];
//     const bodyContent = req.body["content"];
    
//     const newBlog = {
//         title: titleContent,
//         content: bodyContent,
//         createdAt: new Date() 
//     };
    
//     blogs.push(newBlog);

//     res.render("index.ejs",{blogs : blogs})
// })

// app.post("/clear-blogs", (req, res) => {
//     blogs = []; // Reset the blogs array to empty
//     res.redirect("/"); // Redirect back to the home page
// });


// app.listen(port, ()=>{
//     console.log(`Listening on port ${port}`)
// })

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogs = [];
let isLoggedIn = false;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Middleware to check if user is logged in
app.use((req, res, next) => {
    res.locals.isLoggedIn = isLoggedIn;
    next();
});

app.get("/", (req,res) =>{
    if (!isLoggedIn) {
        return res.render("login.ejs");
    }
    res.render("index.ejs", {blogs: blogs});
})

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // Simple authentication (in real app, use proper authentication)
    if (username === "admin" && password === "password") {
        isLoggedIn = true;
        res.redirect("/");
    } else {
        res.render("login.ejs", {error: "Invalid credentials"});
    }
});

app.post("/logout", (req, res) => {
    isLoggedIn = false;
    res.redirect("/login");
});

app.post("/form",(req,res) =>{
    if (!isLoggedIn) {
        return res.redirect("/login");
    }
    
    const titleContent = req.body["title"];
    const bodyContent = req.body["content"];
    
    const newBlog = {
        title: titleContent,
        content: bodyContent,
        createdAt: new Date() 
    };
    
    blogs.push(newBlog);
    res.render("index.ejs", {blogs: blogs});
})

app.post("/clear-blogs", (req, res) => {
    if (!isLoggedIn) {
        return res.redirect("/login");
    }
    blogs = [];
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})