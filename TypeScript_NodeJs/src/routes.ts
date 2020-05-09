import { Request, Response } from "express";
import createUsers from "./services/CreateUser";

const user = {
  nome: "Diego Capassi",
  email: "diego@test.com.br",
  senha: "123456",
  endereço: [
    { rua: "Rua dos Jabutis", numero: 10, complemento: "Casa 2" },
    { rua: "Av. Bandeira Verde", numero: 12 },
  ],
};

export const helloWorld = (req: Request, res: Response) => {
  const { nome, email, senha, endereço } = createUsers(user);
  return res.json({ nome, email, senha, endereço });
};
