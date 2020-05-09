"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
var user = {
    nome: "Diego Capassi",
    email: "diego@test.com.br",
    senha: "123456",
    endereço: [
        { rua: "Rua dos Jabutis", numero: 10, complemento: "Casa 2" },
        { rua: "Av. Bandeira Verde", numero: 12 },
    ],
};
exports.helloWorld = function (req, res) {
    var _a = CreateUser_1.default(user), nome = _a.nome, email = _a.email, senha = _a.senha, endereço = _a.endereço;
    return res.json({ nome: nome, email: email, senha: senha, endereço: endereço });
};
