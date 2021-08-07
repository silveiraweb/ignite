import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Rentalk API")
})
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(3333, () => console.log("Running on port 3333"));
