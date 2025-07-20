import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import"; // ✅ ES import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "import/no-anonymous-default-export": [
        "error",
        {
          allowArrowFunction: true,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
        },
      ],
    },
  },
];

export default eslintConfig;
