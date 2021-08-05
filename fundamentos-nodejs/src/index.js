const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
  return res.json({ message: "Hello world Ignite! - Fundamentos NodeJs." });
});

app.get("/courses", (req, res) => {
    const query = req.query;
    console.log("Query params get: " + query);
    return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (req, res) => {
    const body = req.body;
    console.log("Body params post: " + body);
    return res.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4", body]);
});

app.put("/courses/:id", (req,  res) => {
    //const param = req.params.id;
    //console.log("Route params put " + param);
    const { id } = req.params; // desestruturação  recuperando o id
    console.log("Route params put " + id);
    return res.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
})

app.patch("/courses/:id", (req,  res) => {
    const param = req.params.id;
    console.log("Route params patch " + param);
    return res.json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"]);
});

app.delete("/courses/:id", (req, res) => {
    const param = req.params.id;
    console.log("Route params delete " +  param);
    return res.json(["Curso 6"]);
});

app.listen(3001);

