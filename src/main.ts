import { world } from "@minecraft/server";
import { sum } from "scriptup-sample-pkg";

world.afterEvents.worldLoad.subscribe(() => {
    const result = sum(1, 2);
    console.log(`sum(1, 2) = ${result}`);
});
