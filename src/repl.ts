import { State } from "./state.js";

export async function startREPL(state: State) {
    let rl = state.rl;
    rl.prompt();

    rl.on("line", async (input) => {
        const inputArray = cleanInput(input);
        if (inputArray.length === 0) {
            rl.prompt();
            return;
        }

        const command = state.commands[inputArray[0]];
        const args: string[] = inputArray.slice(1);

        if (command) {
            try {
                await command.callback(state, ...args);
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Error encounterd: ", err.message);
                }
            }
        } else {
            console.log("Unknown command. Type 'help' for a list of commands.");
        }
        
        rl.prompt();
      }
    )
}


export function cleanInput(input: string): string[] {
    let output = input
    .toLowerCase()
    .trim()
    .split(/\s+/);
    output = output.filter((item) => item.length > 0);
    return output;
}