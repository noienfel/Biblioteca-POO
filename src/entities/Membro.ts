import { Pessoa } from './Pessoa';

export class Membro extends Pessoa {
  private _matricula: string;

  constructor(nome: string, matricula: string, telefone: string) {
    super(); // Chamando o construtor de Pessoa sem parâmetros
    this._nome = nome; // Atribui o nome diretamente
    this._telefone = telefone; // Atribui o telefone diretamente
    this._matricula = matricula;
  }

  set matricula(novaMatricula: string) {
    this._matricula = novaMatricula;
  }
  set nome(novoNome: string) {
    this._nome = novoNome;
  }
  set telefone(novoTelefone: string) {
    this._telefone = novoTelefone;
  }

  get nome(): string {
    return this._nome;
  }

  get telefone(): string {
    return this._telefone;
  }

  get matricula(): string {
    return this._matricula;
  }
}
