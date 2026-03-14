//#region package/main.d.ts
declare module "@minecraft/server" {
  interface Player {
    health: number | undefined;
  }
}
export {};
