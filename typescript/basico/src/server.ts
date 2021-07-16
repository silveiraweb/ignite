import express from "express";
import {createCourse} from "./routes";

const app = express();

app.get("/", (req, res) => {
    return res.json({message:"Hello world"})
});
app.get("/course", createCourse);

app.listen(4000);
