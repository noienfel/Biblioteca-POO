import { Membro } from "../entities/Membro";

describe("Membro", () => {
  let membro: Membro;

  beforeEach(() => {
    membro = new Membro("Fábio de Melo", "M001", "123456789");
  });

  test("deve criar um membro com as propriedades corretas", () => {
    expect(membro.nome).toBe("Fábio de Melo");
    expect(membro.matricula).toBe("M001");
    expect(membro.telefone).toBe("123456789");
  });
});
