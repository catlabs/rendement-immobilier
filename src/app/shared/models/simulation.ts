export interface Simulation {
    achat: {
        prix: Number;
        type: Number;
    };
    extraCosts: {
        charges: Number;
        precompte: Number;
        travauxAchat: Number;
        travauxEntretien: Number;
    };
}

export interface SimulationId extends Simulation { id: string; }
