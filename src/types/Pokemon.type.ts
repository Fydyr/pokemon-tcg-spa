export interface PokemonType {
    id: number;
    name: string;
}

export interface PokemonAttack {
    id: number;
    name: string;
    damages: number;
    typeId: number;
    type: PokemonType;
}

export interface IPokemon {
    id: number;
    name: string;
    pokedexId: number;
    typeId: number;
    lifePoints: number;
    imageUrl: string;
    height: number;
    weight: number;
    attackId: number;
    weaknessId: number;
    type: PokemonType;
    attack: PokemonAttack;
    weakness: PokemonType;
}