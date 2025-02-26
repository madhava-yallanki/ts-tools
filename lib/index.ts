import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

type ConfigArgs = {
  files: string[];
  tsconfigRootDir: string;
};

export function eslintConfig({ files, tsconfigRootDir }: ConfigArgs) {
  return tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    prettierPlugin,
    importPlugin.flatConfigs.recommended,
    {
      files: files,
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: tsconfigRootDir,
          ecmaVersion: "latest",
          sourceType: "module",
        },
      },
      rules: {
        "import/extensions": ["error", "ignorePackages"],
        "import/no-unresolved": "off",
        "@typescript-eslint/require-await": "off",
      },
    }
  );
}
