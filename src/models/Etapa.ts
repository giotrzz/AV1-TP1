import { StatusEtapa } from '../enums/Enums';
import { Funcionario } from './Funcionario';

export class Etapa {
    public responsaveis: Funcionario[] = [];

    constructor(
        public nome: string,
        public prazo: string,
        public status: StatusEtapa = StatusEtapa.PENDENTE
    ) {}
}