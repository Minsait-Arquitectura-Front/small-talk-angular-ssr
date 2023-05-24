export interface PokemonInList {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Ability[];
  types: PokemonType[];
  stats: Stat[];
  sprites: Sprites;
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  }
}

export interface PokemonType {
  type: {
    name: string;
  }
}

export interface Stat {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface Sprites {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;
}