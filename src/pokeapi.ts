import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(10000);
  }
  
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fetchURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;

    const cachedResult = this.#cache.get(fetchURL);

    if(cachedResult) {
      return cachedResult;
    }

    try { 
      const response = await fetch(fetchURL, {
          method: "GET",
          mode: "cors"
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const locations: ShallowLocations = await response.json();
      this.#cache.add(fetchURL, locations);
      return locations;
    } catch (err) {
      throw new Error(`Error getting locations: ${(err as Error).message}`)
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fetchURL = `${PokeAPI.baseURL}/location-area/${locationName}`

    const cachedResult = this.#cache.get(fetchURL);

    if(cachedResult) {
      return cachedResult;
    }

    try {
      const response = await fetch(fetchURL, {
          method: "GET",
          mode: "cors"
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const location: Location = await response.json();
      this.#cache.add(fetchURL, location);
      return location;
    } catch (err) {
      throw new Error(`Error getting location ${locationName}: ${(err as Error).message}`)
    }
  }

  async fetchPokemon(pokemon: string): Promise<Pokemon> {
    const fetchURL = `${PokeAPI.baseURL}/pokemon/${pokemon}`

    const cachedResult = this.#cache.get(fetchURL);

    if(cachedResult) { 
      return cachedResult;
    }

    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const pokemonDetails: Pokemon = await response.json();
      this.#cache.add(fetchURL, pokemonDetails);
      return pokemonDetails;
    } catch (err) {
        throw new Error(`Error fetching pokemon ${pokemon}: ${(err as Error).message}`)
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  }
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      }
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      }
      order?: number;
      version_group: {
        name: string;
        url: string;
      }
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: {
    abilities: {
      ability: any;
      is_hidden: boolean;
      slot: number;
    }[];
    generation: {
      name: string;
      url: string;
    }
  }[];
  past_stats: {
    generation: {
      name: string;
      url: string;
    };
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
  }[];
  past_types: any[]
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        }
        yellow: {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        platinum: {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      "generation-ix": {
        "scarlet-violet": {
          front_default: string;
          front_female: any;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: string;
            back_shiny: string;
            back_shiny_female: string;
            front_default: string;
            front_female: string;
            front_shiny: string;
            front_shiny_female: string;
          };
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        "x-y": {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: any;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      "generation-viii": {
        "brilliant-diamond-shining-pearl": {
          front_default: string;
          front_female: any;
        };
        icons: {
          front_default: string;
          front_female: string;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];
  weight: number;
};