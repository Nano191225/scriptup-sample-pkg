import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

/** debug */

function printTree(rootPath, maxDepth = 3, prefix = "", depth = 0) {
  if (depth > maxDepth) {
    return;
  }

  let entries;

  try {
    entries = readdirSync(rootPath, { withFileTypes: true }).sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`${prefix}[unreadable] ${rootPath} (${message})`);
    return;
  }

  for (const entry of entries) {
    const entryPath = join(rootPath, entry.name);
    const isDirectory = entry.isDirectory();
    console.log(`${prefix}${isDirectory ? "[dir] " : "[file] "}${entry.name}`);

    if (isDirectory) {
      printTree(entryPath, maxDepth, `${prefix}  `, depth + 1);
    }
  }
}



const filePath = "./dist/main.d.ts";

if (!existsSync(filePath)) {
  const workspaceRoot = resolve(".");
  const distPath = resolve(filePath);

  console.log(`Current working directory: ${workspaceRoot}`);
  console.log(`Resolved output path: ${distPath}`);
  console.log("Workspace tree (depth 3):");
  printTree(workspaceRoot);

  throw new Error(`Missing file: ${filePath}`);
}

let content = readFileSync(filePath, "utf8");
const hasFooter = /\bexport\s*\{.*\};?\s*$/.test(content);

if (!hasFooter) {
  if (!content.endsWith("\n")) content += "\n";
  content += "export {};\n";
  writeFileSync(filePath, content);
  console.log("Appended export {} to dist/main.d.ts");
} else {
  console.log("dist/main.d.ts already ends with export {}");
}
