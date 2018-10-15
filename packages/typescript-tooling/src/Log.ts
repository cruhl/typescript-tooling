import _ from "lodash";
import { default as Chalk } from "chalk";

export const icons = {
  error: Chalk.red("×"),
  info: Chalk.cyan("i"),
  checkMark: Chalk.green("✔")
};

export const tool = _.curry<string, string>(Chalk.bold.italic);
export const code = _.curry<string, string>(Chalk.bgBlack.yellow);
export const file = _.curry<string, string>(Chalk.blue);
export const arg = file;

export const notification = (icon: string): string =>
  `${Chalk.grey("(")}${icon}${Chalk.grey(")")}`;

export const success = (message: string): string =>
  `${notification(icons.checkMark)} ${Chalk.green(message)}`;

export const error = (message: string): string =>
  `${notification(icons.error)} ${Chalk.red(message)}`;

export const packages = (packageNames: string[]): string =>
  packageNames.join(Chalk.grey("|"));

export const fileAction = (icon: string, verb: string, path: string) =>
  `${notification(icon)} ${verb} ${file(path)}`;
