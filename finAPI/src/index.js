const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());


const customers = [];
/**
 * id - obj  uuid
 * cpf - string
 * name -string
 * statement []
 */

// middleware
function  verifyIfExistsAccountCPF(req, res, next){
    const { cpf } = req.headers;

	const customer = customers.find((customer) => customer.cpf === cpf);
	if (!customer) {
		return res.status(400).json({ error: "Customer not found" });
	}

    req.customer = customer;
    return next();
}
function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if(operation.type ===  'credit'){
            return acc  + operation.amount;
        }  else {
            return acc - operation.amount;
        }
    }, 0); // valor inicial do reduce = 0
    return balance;
}


app.get("/", (req, res) => {
	return res.send("FinAPI accounts");
});

//  inserindo dados via body
app.post("/account", (req, res) => {
    const {name, cpf} = req.body;
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
        );
    if(customerAlreadyExists){
        return res.status(400).json({error: "Customer already exists!"});
    }
    customers.push({
        id: uuidv4(),
        cpf,
        name,
        statement: []

    });
    return res.status(200).send(customers);
});
//  parametros via params  passados na url
app.get("/statement/:cpf", (req, res) => {
    const  { cpf } = req.params;
    
    const customer = customers.find(
        (customer) => customer.cpf  === cpf
    );
        if(!customer){
            return res.status(400).json({error: "Customer not found"})
        }
    return res.json(customer.statement);
});
//  parametros via headers, middleware passado pelo metodo
app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
	const { customer } = req;  // recuperando customer via request
	return res.json(customer.statement);
});
app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => {
	const { customer } = req; // recuperando customer via request
    const { date } = req.query;
    const dateFormat  = new Date(date + "00:00");
    const statement = customer.statement.filter((statement) =>  statement.created_at.toDateString() === new Date(dateFormat).toDateString())


	return res.json(statement);
});
app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
    const { description, amount } = req.body;
	const { customer } = req; // recuperando customer via request headers

    const statementOperation =  {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);
	return res.json(customer.statement).status(200);
});
app.post("/withdraw",  verifyIfExistsAccountCPF, (req, res) => {
    const { amount } = req.body;
    const { customer } = req;
    const balance = getBalance(customer.statement);
    if(balance < amount){
        return res.status(400).json({error: "Insufficient founds"})
    }

    const statementOperation = {
		amount,
		created_at: new Date(),
		type: "debit",
	};
    customer.statement.push(statementOperation);
	return res.json(customer.statement).status(201);
})
app.put("/account", verifyIfExistsAccountCPF, (req, res) => {
    const {  name } = req.body;
    const { customer } = req;
    customer.name = name;
    return res.status(201).send();
});
app.get("/account", verifyIfExistsAccountCPF, (req, res)  => {
    const { customer } = req;
    return res.json(customer);
})
app.delete("/account", verifyIfExistsAccountCPF, (req, res)  => {
    const { customer } = req;
    // splice
    customers.splice(customer, 1);

    return res.json(customers).status(200);
});
app.get("/balance", verifyIfExistsAccountCPF, (req,  res) => {
    const  { customer } = req;
    const balance = getBalance(customer.statement);
    return  res.json(balance);
})


// ativando middleware para todos  abaixo
// app.use(verifyIfExistsAccountCPF);


app.listen(3001, () => console.log("Running..."))