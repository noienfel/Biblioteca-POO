export class Pessoa {
  protected _nome: string;
  protected _telefone: string;

  constructor() {
    this._nome = '';
    this._telefone = '';
  }

  set nome(novoNome: string) {
    this._nome = novoNome;
  }
  
  set telefone(novoTelefone: string) {
    this._telefone = novoTelefone;
  }
}
