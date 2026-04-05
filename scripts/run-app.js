const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const appDir = path.join(__dirname, "..", "dressify-outfit-main");
const appNodeModules = path.join(appDir, "node_modules");
const packageJsonPath = path.join(appDir, "package.json");
const scriptName = process.argv[2] || "dev";

if (!fs.existsSync(packageJsonPath)) {
  console.error(`Could not find app package.json at: ${packageJsonPath}`);
  process.exit(1);
}

function runNpm(args) {
  const command =
    process.platform === "win32"
      ? {
          file: process.env.ComSpec || "cmd.exe",
          args: ["/d", "/s", "/c", `npm.cmd ${args.join(" ")}`],
        }
      : {
          file: "npm",
          args,
        };

  const result = spawnSync(command.file, command.args, {
    cwd: appDir,
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (typeof result.status === "number" && result.status !== 0) {
    process.exit(result.status);
  }
}

if (scriptName !== "install" && !fs.existsSync(appNodeModules)) {
  console.log("App dependencies not found. Installing them first...");
  runNpm(["install"]);
}

if (scriptName === "install") {
  runNpm(["install"]);
} else {
  runNpm(["run", scriptName]);
}
