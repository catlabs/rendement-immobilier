export interface Simulation {
    achat: {
        prix: Number;
        type: Number;
    };
    extraCosts: {
        charges: Number;
        precompte: Number;
        travauxAchat: Number;
        chargesCopro: Number;
    };
    financement: {
        cash: Number;
        taux: Number;
        years: Number;
    };
    incomes: {
        loyer: Number;
        videLocatif: Number;
    };
    store: {
        name: String;
        url: String;
    };
}

export interface SimulationId extends Simulation { id: string; }
