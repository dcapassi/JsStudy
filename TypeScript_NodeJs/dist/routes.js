"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
var icmp_1 = __importDefault(require("./services/icmp"));
var user = {
    nome: "Diego Capassi",
    email: "diego@test.com.br",
    senha: "123456",
    endereço: [
        { rua: "Rua dos Jabutis", numero: 10, complemento: "Casa 2" },
        { rua: "Av. Bandeira Verde", numero: 12 },
    ],
};
exports.createUser = function (req, res) {
    var _a = CreateUser_1.default(user), nome = _a.nome, email = _a.email, senha = _a.senha, endereço = _a.endereço;
    return res.json({ nome: nome, email: email, senha: senha, endereço: endereço });
};
exports.icmp = function (req, res) {
    var arrayPromisses = icmp_1.default();
    arrayPromisses.then(function (response) {
        var arrayObj = [];
        response.map(function (entry) {
            var obj = {
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
