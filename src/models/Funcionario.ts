import { NivelPermissao } from '../enums/Enums';

export class Funcionario {
    constructor(
        public id: string,
        public nome: string,
        public telefone: string,
        public endereco: string,
        public usuario: string,
        public senha: string,
        public nivelPermissao: NivelPermissao
    ) {}

    podeAcessar(nivelRequerido: NivelPermissao[]): boolean {
        return nivelRequerido.includes(this.nivelPermissao);
    }
}