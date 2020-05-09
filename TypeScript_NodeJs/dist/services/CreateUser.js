"use strict";
/**
 * Criação de usário: nome, email, senha, endereço
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createUser(_a) {
    var _b = _a.nome, nome = _b === void 0 ? "" : _b, email = _a.email, senha = _a.senha, endereço = _a.endereço;
    var user = {
        nome: nome,
        email: email,
        senha: senha,
        endereço: endereço,
    };
    return user;
}
exports.default = createUser;
