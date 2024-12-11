import fs from 'fs';
import path from 'path';
import prompt from 'prompt-sync';
import { Livro } from './entities/Livro';
import { Membro } from './entities/Membro';
import { Emprestimo } from './entities/Emprestimo';

const teclado = prompt();

// Listas para armazenar os livros, membros e empréstimos
let livros: Livro[] = [];
let membros: Membro[] = [];
let emprestimos: Emprestimo[] = [];

// Função para exibir os livros cadastrados
const exibirLivros = () => {
  console.log('===== Livros Cadastrados =====');
  livros.forEach((livro, index) => {
    console.log(`${index + 1}. Título: ${livro.titulo}, Autor: ${livro.autor}, ISBN: ${livro.isbn}, Ano: ${livro.ano}`);
  });
  console.log('=============================');
};

// Função para exibir os membros cadastrados
const exibirMembros = () => {
  console.log('===== Membros Cadastrados =====');
  membros.forEach((membro, index) => {
    console.log(`${index + 1}. Nome: ${membro.nome}, Matrícula: ${membro.matricula}, Telefone: ${membro.telefone}`);
  });
  console.log('=============================');
};


// Função para exibir os empréstimos ativos
const exibirEmprestimos = () => {
  console.log('===== Empréstimos Ativos =====');
  emprestimos.forEach((emprestimo, index) => {
    if (emprestimo.livro && emprestimo.membro && emprestimo.dataEmprestimo && emprestimo.dataDevolucao) {
      console.log(
        `${index + 1}. Livro: ${emprestimo.livro.titulo}, Membro: ${emprestimo.membro.nome}, Emprestado em: ${emprestimo.dataEmprestimo.toLocaleDateString()}, Devolução prevista: ${emprestimo.dataDevolucao.toLocaleDateString()}`
      );
    } else {
      console.log(`Empréstimo ${index + 1} com dados incompletos.`);
    }
  });
  console.log('=============================');
};

// Função para salvar os dados no arquivo JSON
const salvarDados = () => {
  const dados = {
    livros: livros,
    membros: membros,
    emprestimos: emprestimos
  };

  const filePath = path.join(__dirname, 'helpers', 'data.JSON');  // Caminho para o arquivo JSON

  // Verificar se o arquivo existe, caso contrário, criar um arquivo novo
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
  } else {
    // Se o arquivo já existir, fazer a leitura e atualizar
    const dadosExistentes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    dadosExistentes.livros = dados.livros;
    dadosExistentes.membros = dados.membros;
    dadosExistentes.emprestimos = dados.emprestimos;

    // Salvar os dados atualizados no arquivo
    fs.writeFileSync(filePath, JSON.stringify(dadosExistentes, null, 2));
  }

  console.log('Dados salvos com sucesso!');
};

// Função para carregar os dados do arquivo JSON
const carregarDados = () => {
  const filePath = path.join(__dirname, 'helpers', 'data.JSON'); // Caminho para o arquivo JSON

  if (fs.existsSync(filePath)) {
    const dadosExistentes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    livros = dadosExistentes.livros || [];
    membros = dadosExistentes.membros || [];
    emprestimos = dadosExistentes.emprestimos || [];
  } else {
    console.log('Nenhum dado encontrado, iniciando com listas vazias.');
  }
};

// Carregar os dados no início
carregarDados();

// Menu interativo para o terminal
const menu = () => {
  while (true) {
    console.log('===== Sistema de Biblioteca =====');
    console.log('1. Cadastrar Livro');
    console.log('2. Cadastrar Membro');
    console.log('3. Listar Livros');
    console.log('4. Listar Membros');
    console.log('5. Listar Empréstimos');
    console.log('6. Realizar Empréstimo');
    console.log('7. Atualizar Livro');
    console.log('8. Remover Livro');
    console.log('9. Atualizar Membro');
    console.log('10. Remover Membro');
    console.log('11. Registrar Devolução');
    console.log('12. Listar Histórico de Empréstimos');
    console.log('0. Sair');
    const opcao = parseInt(teclado('Escolha uma opção: '));

    switch (opcao) {
      case 1:

        const titulo = teclado('Título do livro: ');
        const autor = teclado('Autor do livro: ');
        const isbn = teclado('ISBN do livro: ');
        const ano = parseInt(teclado('Ano de publicação: '));
        const livro = new Livro(titulo, autor, isbn, ano);
        livros.push(livro);
        salvarDados();
        console.log('Livro cadastrado com sucesso!');
        break;

      case 2:

        const nome = teclado('Nome do membro: ');
        const matricula = teclado('Matrícula do membro: ');
        const telefone = teclado('Telefone do membro: ');
        const membro = new Membro(nome, matricula, telefone);
        membros.push(membro);
        salvarDados();
        console.log('Membro cadastrado com sucesso!');
        break;

      case 3:

        exibirLivros();
        break;

      case 4:

        exibirMembros();
        break;

      case 5:

        exibirEmprestimos();
        break;

      case 6:

        exibirLivros();
        const livroEscolhidoIndex = parseInt(teclado('Escolha o número do livro para emprestar: ')) - 1;
        exibirMembros();
        const membroEscolhidoIndex = parseInt(teclado('Escolha o número da matrícula do membro: ')) - 1;

        if (
          livroEscolhidoIndex >= 0 &&
          livroEscolhidoIndex < livros.length &&
          membroEscolhidoIndex >= 0 &&
          membroEscolhidoIndex < membros.length
        ) {
          const livroEscolhido = livros[livroEscolhidoIndex];
          const membroEscolhido = membros[membroEscolhidoIndex];

          const dataEmprestimo = new Date();
          const dataDevolucao = new Date();
          dataDevolucao.setDate(dataEmprestimo.getDate() + 14); // Emprestimo de 14 dias

          const emprestimo = new Emprestimo(livroEscolhido, membroEscolhido, dataEmprestimo, dataDevolucao);
          emprestimos.push(emprestimo);
          salvarDados();

          console.log('===== Empréstimo Realizado =====');
          console.log(emprestimo.exibirEmprestimo());
          console.log('=============================');
        } else {
          console.log('Seleção inválida.');
        }
        break;

      case 7:

        exibirLivros();
        const livroIndex = parseInt(teclado('Escolha o número do livro a ser atualizado: ')) - 1;
        if (livroIndex >= 0 && livroIndex < livros.length) {
          const livroAtualizado = livros[livroIndex];
          livroAtualizado.titulo = teclado('Novo título: ') || livroAtualizado.titulo;
          livroAtualizado.autor = teclado('Novo autor: ') || livroAtualizado.autor;
          livroAtualizado.isbn = teclado('Novo ISBN: ') || livroAtualizado.isbn;
          livroAtualizado.ano = parseInt(teclado('Novo ano de publicação: ')) || livroAtualizado.ano;
          salvarDados();
          console.log('Livro atualizado com sucesso!');
        } else {
          console.log('Livro não encontrado.');
        }
        break;

      case 8:

        exibirLivros();
        const livroRemoverIndex = parseInt(teclado('Escolha o número do livro a ser removido: ')) - 1;
        if (livroRemoverIndex >= 0 && livroRemoverIndex < livros.length) {
          livros.splice(livroRemoverIndex, 1);
          salvarDados();
          console.log('Livro removido com sucesso!');
        } else {
          console.log('Livro não encontrado.');
        }
        break;

      case 9:
        exibirMembros();
        const membroIndex = parseInt(teclado('Escolha o número do membro a ser atualizado: ')) - 1;
        if (membroIndex >= 0 && membroIndex < membros.length) {
          const membroAtualizado = membros[membroIndex];
          const novoNome = teclado('Novo nome: ');
          const novaMatricula = teclado('Nova matrícula: ');
          const novoTelefone = teclado('Novo telefone: ');

          if (novoNome) membroAtualizado.nome = novoNome; // Atualiza o nome
          if (novaMatricula) membroAtualizado.matricula = novaMatricula; // Atualiza a matrícula
          if (novoTelefone) membroAtualizado.telefone = novoTelefone; // Atualiza o telefone

          salvarDados();
          console.log('Membro atualizado com sucesso!');
        } else {
          console.log('Membro não encontrado.');
        }
        break;

      case 10:

        exibirMembros();
        const membroRemoverIndex = parseInt(teclado('Escolha o número do membro a ser removido: ')) - 1;
        if (membroRemoverIndex >= 0 && membroRemoverIndex < membros.length) {
          membros.splice(membroRemoverIndex, 1);
          salvarDados();
          console.log('Membro removido com sucesso!');
        } else {
          console.log('Membro não encontrado.');
        }
        break;

      case 11:

        exibirEmprestimos();
        const emprestimoDevolucaoIndex = parseInt(teclado('Escolha o número do empréstimo a ser devolvido: ')) - 1;
        if (emprestimoDevolucaoIndex >= 0 && emprestimoDevolucaoIndex < emprestimos.length) {
          emprestimos.splice(emprestimoDevolucaoIndex, 1);
          salvarDados();
          console.log('Devolução registrada com sucesso!');
        } else {
          console.log('Empréstimo não encontrado.');
        }
        break;

      case 12:

        exibirEmprestimos();
        break;

      case 0:

        console.log('Saindo...');
        return;

      default:
        console.log('Opção inválida!');
    }
  }
};

menu();
