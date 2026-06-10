import { exportJWK, exportPKCS8, generateKeyPair } from "jose";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const keys = await generateKeyPair("RS256", { extractable: true });
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

const dir = mkdtempSync(join(tmpdir(), "voices38-auth-"));
const envFile = join(dir, "auth.env");
writeFileSync(
  envFile,
  `JWT_PRIVATE_KEY="${privateKey.trimEnd()}"\nJWKS=${jwks}\n`,
  "utf8",
);

console.log("Setting JWT_PRIVATE_KEY and JWKS on your Convex deployment...");

const prodFlag = process.argv.includes("--prod");
const deployArgs = ["convex", "env", "set", "--from-file", envFile, "--force"];
if (prodFlag) {
  deployArgs.push("--prod");
}

const result = spawnSync("npx", deployArgs, {
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  console.error("\nFailed to set auth keys. You can paste them manually in the Convex Dashboard:");
  console.error(`JWT_PRIVATE_KEY="${privateKey.trimEnd()}"`);
  console.error(`JWKS=${jwks}`);
  process.exit(result.status ?? 1);
}

console.log("\nDone. Restart npx convex dev if it is running, then try /admin/login again.");
