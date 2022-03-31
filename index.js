const express = require("express");
const app = express();
const { csvTOjson } = require("./csvTojson");
const { jsonTOcsvFile } = require("./jsonTocsvFile");
var cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// app.get('/',(req,res)=>{
//   res.render('index')
// })

app.get("/authors", (req, res) => {
  fs.readFile('authors.csv', 'utf8', function (err, data) {
    if(err){
      res.status(500).json({error:"unable to fetch data"});
    }

    const dt = csvTOjson(data);
    // console.log(dt)
    // res.render("authors", { authors: dt,page: "authors.csv" });s
    res.status(200).json({data:dt,type:"authors"});
  });
});

app.get("/books", (req, res) => {
  fs.readFile('books.csv', 'utf8', function (err, data) {
    if(err){
      res.status(500).json({error:"unable to fetch data"});
    }
    const dt = csvTOjson(data);
    // console.log(dt)
    // res.render("books", { books: dt,page: "books.csv" });
    res.status(200).json({data:dt,type:"books"});
  });
});

app.get("/magazines", (req, res) => {
  fs.readFile('magazines.csv', 'utf8', function (err, data) {
    if(err){
      res.status(500).json({error:"unable to fetch data"});
    }
    const dt = csvTOjson(data);
    // console.log(dt)
    // res.render("magazines", { magazines: dt,page: "magazines.csv" });
    res.status(200).json({data:dt,type:"magazines"})
  });
});

app.post('/newbook',(req,res)=>{
    let book={
        title:req.body.title,
        isbn:req.body.isbn,
        authors:req.body.authors,
        description:req.body.description
    }

    const response=jsonTOcsvFile(book, "books.csv", false);

    res.json(response)
})

app.post('/newmagazine',(req,res)=>{
    let magazine={
        title:req.body.title,
        isbn:req.body.isbn,
        authors:req.body.authors,
        publishedAt:req.body.publishedAt
    }

    const response=jsonTOcsvFile(magazine, "magazines.csv", false);

    res.json(response)
})
app.post('/newauthor',(req,res)=>{
    let author={
        email:req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }

    const response=jsonTOcsvFile(author, "authors.csv", false);

    res.json(response)
})

app.post("/download/:file", async (req, res) => {
  let fil = req.params.file;
  console.log(fil);
  const admzip = require("adm-zip");
  var zip = new admzip();
  var outputFilePath = `./${Date.now()}${fil}.zip`;
  zip.addLocalFile(`./${fil}.csv`);
  fs.writeFileSync(outputFilePath, zip.toBuffer());
  res.download(outputFilePath, (err) => {
    if (err){
      res.status(500).json({error: "something went wrong!"});
    } 
    fs.unlink(outputFilePath, function (err) {
      res.status(500).json({error: "something went wrong!"})
    });
  });
});

app.listen(3001, () => {
  console.log("server started");
});
