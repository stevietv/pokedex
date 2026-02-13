import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    for (const [key, command] of Object.entries(commands)) {
        console.log(`${command.name}: ${command.description}`);
    };
}