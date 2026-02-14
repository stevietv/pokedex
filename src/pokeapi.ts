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