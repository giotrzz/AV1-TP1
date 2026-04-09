# ✈️ AeroCode - Sistema de Gerenciamento de Fábrica de Aeronaves

Este é um sistema de linha de comando (CLI) desenvolvido em **TypeScript** para gerenciar o ciclo de produção de aeronaves, desde o cadastro de funcionários e peças até a entrega final com relatórios detalhados.

## 🚀 Funcionalidades

- **Gestão de Funcionários:** Cadastro com níveis de permissão e sistema de login.
- **Controle de Aeronaves:** Cadastro de modelos comerciais e militares com persistência de dados.
- **Gestão de Peças:** Associação de peças às aeronaves com rastreio de status (Produção, Transporte, Pronta).
- **Fluxo de Produção:** Controle de etapas com ordem lógica (uma etapa só inicia se a anterior estiver concluída).
- **Relatórios:** Geração de arquivos `.txt` com o resumo completo da aeronave para o cliente.
- **Persistência:** Todos os dados são salvos em arquivos na pasta `/data`.

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ts-node](https://typestrong.org/ts-node/) (para execução direta)

## 📦 Como rodar o projeto

### Pré-requisitos
Você precisará ter o **Node.js** instalado em sua máquina.

### Instalação
1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)

2. Entre na pasta do projeto:
    cd AV1-TP1

3. Instale as dependências:
    npm install

### Execução 
npm start