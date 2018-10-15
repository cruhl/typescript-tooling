import * as Log from "./Log";
import * as Shell from "./Shell";

export const help = `Installs and saves ${Log.tool("peerDependencies")}`;

export const action = (packageJSON: any) => (
  _args: any,
  options: any,
  logger: Logger
) => {
  logger.info("");

  const status = options.install
    ? install(logger, packageJSON, options.save)
    : print(logger, packageJSON, options.save) || 0;

  process.exit(status);
};

export const print = (logger: Logger, packageJSON: any, save: boolean) =>
  logger.info(
    `${Log.notification(Log.icons.info)} Install ${Log.tool(
      "peerDependencies"
    )} with this command...\n\n${Log.code(command(packageJSON, save))}`
  );

export const install = (
  logger: Logger,
  packageJSON: any,
  save: boolean
): number => Shell.run(logger, command(packageJSON, save));

const command = (packageJSON: any, save: boolean) =>
  `npm install${save ? " --save-dev " : " "}${all(packageJSON).join(" ")}`;

export const all = (packageJSON: any): string[] =>
  Object.entries(packageJSON.peerDependencies).map(
    ([packageName, version]) => `${packageName}@${version}`
  );
