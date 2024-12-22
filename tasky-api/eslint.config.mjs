import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ["**/*.js"],
      languageOptions: {
        globals: globals.node,
        ecmaVersion: 2015, // ES6
        sourceType: "module", // Use ES Module format
      },
      rules: {
        semi: ["warn", "always"], // 警告模式：确保语句以分号结束
        "no-console": "off",     // 允许使用 console
      },
    },
  ],
  ...pluginJs.configs.recommended, // 使用 @eslint/js 推荐的配置
};
