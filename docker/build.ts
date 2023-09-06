const { exec } = require("child_process");
const { resolve } = require("path");
const url = resolve("./docker/build.sh");

exec(`sh ${url}`, (error: any, stdout: any, stderr: any) => {
  if (error) {
    console.error(`执行脚本时出错：${error}`);
    console.error(`脚本的错误输出：${stderr}`);
    return;
  }
  console.log(`脚本的输出：${stdout}`);
});
