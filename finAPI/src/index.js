const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

const customers = [];

app.get("/", (req, res) => {
	return res.send("FinAPI accounts");
});

/**
 * 
 */
app.post("/account", (req, res) => {
    const {name, cpf} = req.body;
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf);
    if(customerAlreadyExists){
        return res.status(400).json("Customer already exists!");
    }
    customers.push({
        id: uuidv4(),
        cpf,
        name,
        statement: []

    });
    return res.status(200).send(customers);
});





app.listen(3001, () => console.log("Running..."))