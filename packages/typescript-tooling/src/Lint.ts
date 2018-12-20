import * as Log from "./Log";
import * as Shell from "./Shell";

export const help = `Lints ${Log.arg("<package-name>")} with ${Log.tool(
  "TSLint"
)}`;

export const action = async (args: any, _: any, logger: Logger) => {
  logger.info("");

  const command = `npx tslint 'packages/${args.packageName}/src/**/*.ts?(x)'`;

  process.exit(Shell.run(logger, command));
};
