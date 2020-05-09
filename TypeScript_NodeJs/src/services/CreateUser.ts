/**
 * Criação de usário: nome, email, senha, endereço
 */

interface intEndereço {
  rua: String;
  numero: number;
  complemento?: String;
}

interface CreateUserData {
  nome?: String;
  email: String;
  senha: String;
  endereço?: Array<intEndereço>;
}

export default function createUser({
  nome = "",
  email,
  senha,
  endereço,
}: CreateUserData) {
  const user = {
    nome,
    email,
    senha,
    endereço,
  };
  return user;
}
