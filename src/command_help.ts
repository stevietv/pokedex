import { State } from "./state.js";

export function commandHelp(state: State): void {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    for (const [key, command] of Object.entries(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    };
    console.log();
}