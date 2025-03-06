import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

function updateBundleDependencies(args: string[]) {
  console.log({ args }, "Update bundle dependencies invoked.");
  const [rootDir] = args;
  const packageRoot = dirname(fileURLToPath(rootDir));
  const filePath = join(packageRoot, `../package.json`);
  const stringData = readFileSync(filePath).toString();
  const data = JSON.parse(stringData);
  data.bundleDependencies = Object.keys(data.dependencies);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

updateBundleDependencies(process.argv.slice(2));
