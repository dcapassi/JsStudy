import { Request, Response } from "express";
import createUsers from "./services/CreateUser";
import pingLoopback from "./services/icmp";

const user = {
  nome: "Diego Capassi",
  email: "diego@test.com.br",
  senha: "123456",
  endereço: [
    { rua: "Rua dos Jabutis", numero: 10, complemento: "Casa 2" },
    { rua: "Av. Bandeira Verde", numero: 12 },
  ],
};

interface arrayObj {
  host: string;
  numeric_host: string;
  alive: boolean;
  avg: string;
  packetLoss: string;
}

export const createUser = (req: Request, res: Response) => {
  const { nome, email, senha, endereço } = createUsers(user);
  return res.json({ nome, email, senha, endereço });
};

export const icmp = (req: Request, res: Response) => {
  let arrayPromisses = pingLoopback();
  arrayPromisses.then((response) => {
    let arrayObj: Array<arrayObj> = [];
    response.map((entry) => {
      let obj = {
        host: entry.host,
        numeric_host: entry.numeric_host,
        alive: entry.alive,
        avg: entry.avg,
        packetLoss: entry.packetLoss,
      };
      arrayObj.push(obj);
    });
    return res.json(arrayObj);
  });
};

/*
  setTimeout(() => {
    return res.json(arrayResponse);
  }, 30000);*/
