import path from "path";

/**
 * Copied from https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function
 * Author: @Rhionin
 */
function getCallerFile() {
  const originalFunc = Error.prepareStackTrace;

  let callerfile;
  try {
    const err = new Error() as any as Omit<Error, "stack"> & {
      stack: NodeJS.CallSite[];
    };

    Error.prepareStackTrace = (_, stack) => stack;

    const currentfile = err.stack.shift()?.getFileName();

    while (err.stack && err.stack.length) {
      callerfile = err.stack.shift()?.getFileName();

      if (currentfile !== callerfile) break;
    }
  } catch (e) {}

  Error.prepareStackTrace = originalFunc;

  return callerfile;
}

export function log(...data: any[]): void {
  const caller = getCallerFile();
  if (caller)
    console.log("\x1b[36m%s\x1b[0m", `${path.basename(caller)} |`, ...data);
  else console.log(...data);
}

export function error(...data: any[]): void {
  const caller = getCallerFile();
  if (caller)
    console.error("\x1b[36m%s\x1b[0m", `${path.basename(caller)} |`, ...data);
  else console.error(...data);
}

export function warn(...data: any[]): void {
  const caller = getCallerFile();
  if (caller)
    console.warn("\x1b[36m%s\x1b[0m", `${path.basename(caller)} |`, ...data);
  else console.warn(...data);
}
