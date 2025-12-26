import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  // TypeScript files: enable type-aware rules by pointing to the repo tsconfig
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
        extraFileExtensions: [".mts", ".cts"],
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // JS files: no type-aware parsing
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  // Keep the recommended config from typescript-eslint
  tseslint.configs.recommended,
]);
