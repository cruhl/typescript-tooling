import * as FS from "fs";
import * as Path from "path";

import CLI from "caporal";

import * as Log from "./Log";
import * as Utils from "./Utils";

import * as Init from "./Init";
import * as Scripts from "./Scripts";
import * as Deps from "./Deps";

import * as Test from "./Test";
import * as Lint from "./Lint";
import * as Dev from "./Dev";
import * as Build from "./Build";

export = (argv: string[]) => CLI.parse(argv);

const packageJSON = JSON.parse(
  FS.readFileSync(Path.join(__dirname, `../package.json`)).toString()
);

CLI.version(packageJSON.version).description("TypeScript Tooling");

if (process.env.NODE_ENV === "test") {
  CLI.logger({
    debug: console.log,
    info: console.log,
    log: console.log,
    warn: console.log,
    error: console.log
  });
}

CLI.command("init", Init.help)
  .help(Init.help)
  .option(
    "--install",
    `Install and save required ${Log.tool("peerDependencies")}`,
    CLI.BOOLEAN,
    true
  )
  .option(
    "--example",
    `Creates ${Log.file("packages/example")} if ${Log.file(
      "packages"
    )} directory isn't found`,
    CLI.BOOLEAN,
    true
  )
  .option(
    "--scripts",
    `Save ${Log.tool("npm scripts")} to ${Log.file("package.json")}`,
    CLI.BOOLEAN,
    true
  )
  .action(Init.action(packageJSON));

CLI.command("deps", Deps.help)
  .help(Deps.help)
  .option(
    "--install",
    `Install ${Log.tool("peerDependencies")}`,
    CLI.BOOLEAN,
    true
  )
  .option(
    "--save",
    `Save ${Log.tool("peerDependencies")} to ${Log.file("package.json")}`,
    CLI.BOOLEAN,
    true
  )
  .action(Deps.action(packageJSON));

CLI.command("scripts", Scripts.help)
  .help(Scripts.help)
  .option(
    "--save",
    `Save generated ${Log.tool("npm scripts")} to your ${Log.file(
      "package.json"
    )}`,
    CLI.BOOLEAN,
    true
  )
  .action(Scripts.action);

const packages = Utils.packages();

CLI.command("test", Test.help)
  .help(Test.help)
  .argument("<package-name>", Log.packages(packages), packages)
  .option("-w --watch", "Re-run tests on file changes", CLI.BOOLEAN, false)
  .action(Test.action);

CLI.command("lint", Lint.help)
  .help(Lint.help)
  .argument("<package-name>", Log.packages(packages), packages)
  .action(Lint.action);

CLI.command("dev", Dev.help)
  .help(Dev.help)
  .argument("<package-name>", Log.packages(packages), packages)
  .action(Dev.action);

CLI.command("build", Build.help)
  .help(Build.help)
  .argument("<package-name>", Log.packages(packages), packages)
  .action(Build.action);
