import { Livro } from "../entities/Livro";

describe("Livro", () => {
  let livro: Livro;

  beforeEach(() => {
    livro = new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "9780544003415", 1954);
  });

  test("deve criar um livro com as propriedades corretas", () => {
    expect(livro.titulo).toBe("O Senhor dos Anéis");
    expect(livro.autor).toBe("J.R.R. Tolkien");
    expect(livro.isbn).toBe("9780544003415");
    expect(livro.ano).toBe(1954);
  });
});
