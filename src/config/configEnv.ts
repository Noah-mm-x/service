import { CONFIG_LOCAL } from "./configEnvLocal";
import { CONFIG_DEV } from "./configDevEnv";
import { CONFIG_PROD } from "./configProdEnv";

export const configEnv = () => {
  const env: any = process.env.RUNNING_ENV;
  // console.log("process.env", process.env);
  if (env === "local") {
    return CONFIG_LOCAL || CONFIG_DEV;
  }
  if (env === "dev") {
    return CONFIG_DEV;
  }
  if (env === "prod") {
    return CONFIG_PROD;
  }
};
