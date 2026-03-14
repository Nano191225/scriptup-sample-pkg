import { Player } from "@minecraft/server";
//#region package/main.ts
Object.defineProperty(Player.prototype, "health", { get() {
	return this.getComponent("health")?.currentValue;
} });
//#endregion
