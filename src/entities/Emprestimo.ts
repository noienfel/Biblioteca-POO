import { Livro } from './Livro';
import { Membro } from './Membro';

export class Emprestimo {
  private _livro: Livro;
  private _membro: Membro;
  private _dataEmprestimo: Date;
  private _dataDevolucao: Date;

  constructor(livro: Livro, membro: Membro, dataEmprestimo: Date, dataDevolucao?: Date | null) {
    if (dataDevolucao && dataDevolucao < dataEmprestimo) {
      throw new Error("A data de devolução não pode ser anterior à data de empréstimo.");
    }

    this._livro = livro;
    this._membro = membro;
    this._dataEmprestimo = dataEmprestimo;
    // Se dataDevolucao não for fornecida, calcular automaticamente 14 dias
    this._dataDevolucao = dataDevolucao ?? new Date(dataEmprestimo.getTime() + 14 * 24 * 60 * 60 * 1000);
  }

  // Getters
  get livro(): Livro {
    return this._livro;
  }

  get membro(): Membro {
    return this._membro;
  }

  get dataEmprestimo(): Date {
    return this._dataEmprestimo;
  }

  get dataDevolucao(): Date {
    return this._dataDevolucao;
  }

  // Método para exibir as informações do empréstimo
  exibirEmprestimo(): string {
    const dataEmprestimoFormatada = this._dataEmprestimo.toLocaleDateString();
    const dataDevolucaoFormatada = this._dataDevolucao.toLocaleDateString();

    return `Livro: ${this._livro.titulo}, Membro: ${this._membro.nome}, Emprestado em: ${dataEmprestimoFormatada}, Devolução prevista: ${dataDevolucaoFormatada}`;
  }
}
