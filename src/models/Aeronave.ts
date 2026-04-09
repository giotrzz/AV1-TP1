import { TipoAeronave } from '../enums/Enums';
import { Peca } from './Peca';
import { Etapa } from './Etapa'

export class Aeronave {
    public pecas: Peca[] = [];
    public etapas: Etapa[] = [];

    constructor(
        public readonly codigo: string, 
        public modelo: string,
        public tipo: TipoAeronave,
        public capacidade: number,
        public alcance: number
    ) {}

    adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
    }

    exibirDetalhes(): void {
        console.log(`--- Detalhes da Aeronave [${this.codigo}] ---`);
        console.log(`Modelo: ${this.modelo} | Tipo: ${this.tipo}`);
        console.log(`Capacidade: ${this.capacidade} passageiros`);
        console.log(`Alcance: ${this.alcance} km`);
        console.log(`Total de peças: ${this.pecas.length}`);
    }
}