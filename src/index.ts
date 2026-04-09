import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import { Funcionario } from './models/Funcionario';
import { Aeronave } from './models/Aeronave';
import { Peca } from './models/Peca';
import { TipoPeca } from './enums/Enums';
import { StatusPeca } from './enums/Enums';
import { NivelPermissao, TipoAeronave } from './enums/Enums';
import { Persistence } from './services/Persistence';

const leitura = readline.createInterface({ input, output });

const listaDeFuncionarios: Funcionario[] = [];
const listaDeAeronaves: Aeronave[] = [];

async function cadastrarFuncionario() {
    console.log("\nCADASTRO DE FUNCIONÁRIO ");
    const id = await leitura.question("ID Único: ");
    const nome = await leitura.question("Nome Completo: ");
    const telefone = await leitura.question("Telefone: ");
    const endereco = await leitura.question("Endereço: ");
    const usuario = await leitura.question("Usuário para Login: ");
    const senha = await leitura.question("Senha: ");

    console.log("Nível de Permissão: (1) Administrador, (2) Engenheiro, (3) Operador");
    const nivelResp = await leitura.question("Escolha o número: ");
    
    let nivel: NivelPermissao;
    if (nivelResp === "1") nivel = NivelPermissao.ADMINISTRADOR;
    else if (nivelResp === "2") nivel = NivelPermissao.ENGENHEIRO;
    else nivel = NivelPermissao.OPERADOR;

    const novoFunc = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel);
    listaDeFuncionarios.push(novoFunc);
    Persistence.salvarFuncionarios(listaDeFuncionarios);
    console.log(`Funcionário(a) ${nome} cadastrado(a) com sucesso!`);
}

async function cadastrarAeronave() {
    console.log("\nCADASTRO DE AERONAVE");
    const codigo = await leitura.question("Código Único: ");

    if (listaDeAeronaves.some(a => a.codigo === codigo)) {
        console.log("ERRO: Já existe uma aeronave com este código!");
        return;
    }

    const modelo = await leitura.question("Modelo: ");
    
    console.log("Tipo: (1) Comercial, (2) Militar");
    const tipoResp = await leitura.question("Escolha o número: ");
    const tipo = tipoResp === "2" ? TipoAeronave.MILITAR : TipoAeronave.COMERCIAL;

    const capacidade = parseInt(await leitura.question("Capacidade de passageiros: "));
    const alcance = parseInt(await leitura.question("Alcance máximo (km): "));

    const novaAviao = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
    listaDeAeronaves.push(novaAviao);
    Persistence.salvarAeronaves(listaDeAeronaves);
    console.log(`Aeronave ${modelo} registrada com sucesso!`);
}

async function cadastrarPeca() {
    console.log("\nADICIONAR PEÇA A AERONAVE");
    
    if (listaDeAeronaves.length === 0) {
        console.log("Erro: Cadastre uma aeronave primeiro!");
        return;
    }

    const codAviao = await leitura.question("Digite o código da aeronave: ");
    const aviao = listaDeAeronaves.find(a => a.codigo === codAviao);

    if (!aviao) {
        console.log("Aeronave não encontrada!");
        return;
    }

    const nome = await leitura.question("Nome da Peça: ");
    const fornecedor = await leitura.question("Fornecedor: ");

    console.log("Tipo: (1) Nacional, (2) Importada");
    const tipoResp = await leitura.question("Escolha: ");
    const tipo = tipoResp === "2" ? TipoPeca.IMPORTADA : TipoPeca.NACIONAL;

    const novaPeca = new Peca(nome, tipo, fornecedor, StatusPeca.EM_PRODUCAO);
    
    aviao.pecas.push(novaPeca); 
    Persistence.salvarAeronaves(listaDeAeronaves); 
    
    console.log(`Peça ${nome} adicionada ao avião ${aviao.modelo}!`);
}

async function atualizarStatusPeca() {
    const codAviao = await leitura.question("Código da Aeronave: ");
    const aviao = listaDeAeronaves.find(a => a.codigo === codAviao);

    if (!aviao || aviao.pecas.length === 0) {
        console.log("Aeronave não encontrada ou sem peças.");
        return;
    }

    console.log("\nPeças desta aeronave:");
    aviao.pecas.forEach((p, index) => console.log(`${index} - ${p.nome} [Status: ${p.status}]`));

    const indexPeca = parseInt(await leitura.question("Escolha o número da peça: "));
    const peca = aviao.pecas[indexPeca];

    if (peca) {
        console.log("Novo Status: (1) Produção, (2) Transporte, (3) Pronta");
        const st = await leitura.question("Escolha: ");
        
        if (st === "1") peca.status = StatusPeca.EM_PRODUCAO;
        else if (st === "2") peca.status = StatusPeca.EM_TRANSPORTE;
        else peca.status = StatusPeca.PRONTA;

        Persistence.salvarAeronaves(listaDeAeronaves);
        console.log("✔ Status atualizado!");
    }
}

async function iniciarSistema() {

    const funcsSalvos = Persistence.carregarFuncionarios();
    const avisSalvos = Persistence.carregarAeronaves();

    listaDeFuncionarios.push(...funcsSalvos);
    listaDeAeronaves.push(...avisSalvos);

    console.log(`Carregados: ${listaDeFuncionarios.length} funcionários e ${listaDeAeronaves.length} aeronaves.`);

    let ligarSistema = true;

    while (ligarSistema) {
        console.log("\n AEROCODE MENU");
        console.log("1. Cadastrar um Funcionário");
        console.log("2. Cadastrar uma Aeronave");
        console.log("3. Cadastrar uma Peça");
        console.log("4. Atualizar status de uma peça");
        console.log("5. Ver tudo que foi cadastrado");
        console.log("6. Sair");

        const resposta = await leitura.question("O que deseja fazer? ");

        if (resposta === "1") {
            await cadastrarFuncionario();
        } else if (resposta === "2") {
            await cadastrarAeronave();
        } else if (resposta === "3") {
            await cadastrarPeca();
        } else if (resposta === "4") {
            await atualizarStatusPeca();
        } else if (resposta === "5") {
            console.log("\n-LISTA DE REGISTROS");
            console.log("FUNCIONÁRIOS:", listaDeFuncionarios);
            console.log("AERONAVES:", listaDeAeronaves);
        } else if (resposta === "6") {
            console.log("Saindo do sistema...");
            ligarSistema = false;
        } else {
            console.log("Opção inválida!");
        }
    }

    leitura.close();
}

iniciarSistema();