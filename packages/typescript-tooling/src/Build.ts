import * as Log from "./Log";
import * as Shell from "./Shell";
import * as Utils from "./Utils";

export const help = `Builds package with ${Log.tool("Parcel")}`;

export const action = (args: any, _options: any, logger: Logger) => {
  const packagePath = Utils.packagePath(args.packageName);

  const command = `npx parcel build ${packagePath}/src/index.ts --out-dir ${packagePath}/dist --target node`;
  const status = Shell.run(logger, command);

  logger.info("");
  process.exit(status);
};
