import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "lists all commands",
            callback: commandHelp,
        },
    };
}


export function cleanInput(input: string): string[] {
    let output = input
    .toLowerCase()
    .trim()
    .split(/\s+/);
    output = output.filter((item) => item.length > 0);
    return output;
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on("line", (input) => {
        const inputArray = cleanInput(input);
        if (inputArray.length === 0) {
            rl.prompt();
            return;
        }
        const command = getCommands()[inputArray[0]];
        if (command) {
            try {
                command.callback(getCommands());
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Error encounterd: ", err);
                }
            }
        } else {
            console.log("Unknown command");
        }
        
        rl.prompt();
      }
    )
}
