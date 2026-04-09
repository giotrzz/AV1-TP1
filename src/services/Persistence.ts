import * as fs from 'fs';

export class Persistence {
    private static PATH_FUNCIONARIOS = './data/funcionarios.txt';
    private static PATH_AERONAVES = './data/aeronave.txt'; 

    static salvar(dados: any[], caminho: string): void {
        try {
            const conteudo = JSON.stringify(dados, null, 2);
            fs.writeFileSync(caminho, conteudo, 'utf-8');
            console.log(`Salvo com sucesso em ${caminho}`);
        } catch (erro) {
            console.error(`Falha ao salvar em ${caminho}. Erro: ${erro}`);
        }
    }

    static carregar(caminho: string): any[] {
        try {
            if (!fs.existsSync(caminho)) return [];
            const conteudo = fs.readFileSync(caminho, 'utf-8');
            if (!conteudo.trim()) return [];
            return JSON.parse(conteudo);
        } catch (erro) {
            return [];
        }
    }

    static salvarFuncionarios(lista: any[]) { this.salvar(lista, this.PATH_FUNCIONARIOS); }
    static salvarAeronaves(lista: any[]) { this.salvar(lista, this.PATH_AERONAVES); }
    static carregarFuncionarios() { return this.carregar(this.PATH_FUNCIONARIOS); }
    static carregarAeronaves() { return this.carregar(this.PATH_AERONAVES); }
}