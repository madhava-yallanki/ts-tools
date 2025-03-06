import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

function updateBundleDependencies() {
  const filePath = join(process.cwd(), `package.json`);
  console.log({ filePath }, "Update bundle dependencies invoked.");

  const stringData = readFileSync(filePath).toString();
  const data = JSON.parse(stringData);
  data.bundleDependencies = Object.keys(data.dependencies);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

updateBundleDependencies();
