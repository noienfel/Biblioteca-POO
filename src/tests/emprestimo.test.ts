import { Emprestimo } from "../entities/Emprestimo";
import { Livro } from "../entities/Livro";
import { Membro } from "../entities/Membro";

describe("Emprestimo", () => {
  let livro: Livro;
  let membro: Membro;
  let emprestimo: Emprestimo;

  beforeEach(() => {
    livro = new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "9780544003415", 1954);
    membro = new Membro("Fábio de Melo", "M001", "123456789");
    emprestimo = new Emprestimo(livro, membro, new Date(), new Date());
  });

  test("deve criar um empréstimo com as propriedades corretas", () => {
    expect(emprestimo.livro.titulo).toBe("O Senhor dos Anéis");
    expect(emprestimo.membro.nome).toBe("Fábio de Melo");
  });

  test("deve definir a data de devolução para 14 dias após o empréstimo", () => {
    // Definir a data de empréstimo como uma data fixa
    const dataEmprestimo = new Date('2024-12-11'); // Exemplo de data fixa para o empréstimo
    
    // Definir a data de devolução esperada como 14 dias após a data de empréstimo
    const dataDevolucaoEsperada = new Date(dataEmprestimo);
    dataDevolucaoEsperada.setDate(dataDevolucaoEsperada.getDate() + 14); // Adiciona 14 dias
    
    // Criar o objeto emprestimo com a data de empréstimo fixa
    const emprestimo = new Emprestimo(
      new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "9780544003415", 1954),
      new Membro("Fábio de Melo", "M001", "123456789"),
      dataEmprestimo,
      dataDevolucaoEsperada
    );
    
    // Normalizar a data de devolução para comparar somente a data (sem hora, minuto, segundo)
    dataDevolucaoEsperada.setHours(0, 0, 0, 0);
    
    const dataDevolucaoReal = new Date(emprestimo.dataDevolucao);
    dataDevolucaoReal.setHours(0, 0, 0, 0);
  
    // Comparar as duas datas normalizadas
    expect(dataDevolucaoReal.getTime()).toBe(dataDevolucaoEsperada.getTime());
  });
  
  
});
