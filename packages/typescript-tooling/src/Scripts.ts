import * as FS from "fs";

import * as Log from "./Log";
import * as Utils from "./Utils";

export const help = `Generates ${Log.tool("npm scripts")} for packages`;

export const action = (_args: any, options: any, logger: Logger) => {
  const packages = Utils.packages();

  logger.info("");
  options.save ? save(logger, packages) : print(logger, packages);
};

export const print = (logger: Logger, packages: string[]) =>
  logger.info(
    `${Log.notification(Log.icons.info)} These ${Log.tool(
      "npm scripts"
    )} can be added to your ${Log.file("package.json")}...\n\n${Log.code(
      JSON.stringify(scripts(packages), null, 2)
    )}`
  );

export const save = (logger: Logger, packages: string[]) => {
  const userPackageJSONContents = JSON.parse(
    FS.readFileSync("package.json").toString()
  );

  const updatedScripts = {
    ...scripts(packages),
    ...userPackageJSONContents.scripts
  };

  const updatedUserPackageJSONContents = {
    ...userPackageJSONContents,
    scripts: updatedScripts
  };

  FS.writeFileSync(
    "package.json",
    JSON.stringify(updatedUserPackageJSONContents, null, 2)
  );

  logger.info(
    `${Log.notification(Log.icons.checkMark)} These ${Log.tool(
      "npm scripts"
    )} were added to your ${Log.file("package.json")}...\n\n${Log.code(
      JSON.stringify(updatedScripts, null, 2)
    )}`
  );
};

export const scripts = (packages: string[]) =>
  packages.reduce(
    (acc, packageName) => ({
      ...acc,
      [`${packageName}:test`]: `tst test ${packageName}`,
      [`${packageName}:test:watch`]: `tst test ${packageName} --watch`,
      [`${packageName}:dev`]: `tst dev ${packageName}`,
      [`${packageName}:build`]: `tst build ${packageName}`
    }),
    {
      ["tst:init"]: "tst init --install false",
      ["tst:scripts"]: "tst scripts",
      ["tst:deps"]: "tst deps"
    }
  );
