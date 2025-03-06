import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";

type ConfigArgs = {
  files: string[];
  tsconfigRootDir: string;
};

//@deprecated Use tslintConfig instead.
export const eslintConfig = tslintConfig;

export function tslintConfig({ files, tsconfigRootDir }: ConfigArgs) {
  return tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    prettierPlugin,
    importPlugin.flatConfigs.recommended,
    {
      ignores: ["eslint.config.mjs", "dist/**"],
    },
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

export function tsxlintConfig({ files, tsconfigRootDir }: ConfigArgs) {
  return tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    prettierPlugin,
    importPlugin.flatConfigs.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
    {
      ignores: ["eslint.config.mjs", "dist/**"],
    },
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
      plugins: {
        "react-hooks": hooksPlugin,
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...hooksPlugin.configs.recommended.rules,
        "import/extensions": ["error", "ignorePackages"],
        "import/no-unresolved": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "react/react-in-jsx-scope": "off",
      },
    }
  );
}
