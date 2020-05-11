import express from "express";
import { createUser } from "./routes";
import { icmp } from "./routes";


const app = express();
app.get("/", createUser);
app.get("/icmp", icmp);


app.listen(3333);
