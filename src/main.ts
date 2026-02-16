import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const cacheTimeout = 1000 * 60 * 10 // 10 minute cache
  const state = initState(cacheTimeout);
  await startREPL(state);
}

main();