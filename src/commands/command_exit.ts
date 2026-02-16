import { State } from "../state.js";

export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    state.pokeAPI.closeCache();
    process.exit(0);
}