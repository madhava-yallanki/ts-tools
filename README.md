Dependencies and Rules for linting and formatting TypeScript packages.

## Usage

1. Install the package as a dev dependency

```shell
npm i -D @madhava-yallanki/ts-tools
```

2. `package.json`

```json
"scripts":{
    "build": "npm dedupe && eslint src --fix && tsc",
    ...rest,
}
```

3. `tsconfig.json`

```json
{
  "extends": "./node_modules/@madhava-yallanki/ts-tools/dist/lib/tsconfig.base.json"
}
```

4. `eslint.config.mjs`

```javascript
import { tslintConfig } from "@madhava-yallanki/ts-tools";

export default tslintConfig({
  files: ["src/**/*.ts"],
  tsconfigRootDir: import.meta.dirname,
});
```
