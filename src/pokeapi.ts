export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fetchURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
    const response = await fetch(fetchURL, {
        method: "GET",
        mode: "cors"
    });
    return response.json()
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fetchURL = `${PokeAPI.baseURL}/location/${locationName}`
    const response = await fetch(fetchURL, {
        method: "GET",
        mode: "cors"
    });
    return response.json()
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};