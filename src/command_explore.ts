import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const locationName = args[0] ?? "";
    if (locationName === "") {
        console.log("please provide a location to explore");
        return;
    }

    const locationDetails = await state.pokeAPI.fetchLocation(locationName);
    console.log(`Exploring ${locationName}`);
    console.log(`Found Pokemon:`);
    for (const pokemon of locationDetails.pokemon_encounters) {
        console.log(` - ${pokemon.pokemon.name}`);
    }
}