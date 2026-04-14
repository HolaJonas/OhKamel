import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(scriptDir, "..");
const repoRoot = resolve(webRoot, "..");
const ocamlRoot = resolve(repoRoot, "ocaml_inception");
const sourceJs = resolve(ocamlRoot, "_build", "default", "bin", "main.bc.js");
const targetJs = resolve(webRoot, "public", "ocaml", "main.bc.js");

execSync("opam exec -- dune build bin/main.bc.js", {
  cwd: ocamlRoot,
  stdio: "inherit",
});

if (!existsSync(sourceJs)) {
  throw new Error("OCaml not found at " + sourceJs);
}

mkdirSync(dirname(targetJs), { recursive: true });
if (existsSync(targetJs)) {
  rmSync(targetJs);
}

copyFileSync(sourceJs, targetJs);
