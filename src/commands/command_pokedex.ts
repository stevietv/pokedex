import { State } from "../state.js";
import { Pokemon } from "../pokeapi.js";

export async function commandPokedex(state: State): Promise<void> {
    if (Object.keys(state.pokedex).length === 0) {
        throw new Error("Your pokedex is empty, go out and catch some pokemon!");
    }

    console.log("Your Pokedex:");
    for (const entry of Object.values(state.pokedex)) {
        console.log(`  - ${entry.name}`);
    }
}