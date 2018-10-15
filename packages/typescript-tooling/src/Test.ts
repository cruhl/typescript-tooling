import * as Log from "./Log";
import * as Shell from "./Shell";

export const help = `Tests ${Log.arg("<package-name>")} with ${Log.tool(
  "Jest"
)}`;

export const action = async (args: any, options: any, logger: Logger) => {
  logger.info("");

  const watch = options.watch ? " --watch" : "";
  const command = `npx jest${watch} packages/${args.packageName}`;

  process.exit(Shell.run(logger, command));
};
