import js from "@eslint/js";
import globals from "globals";
import eqeqeFix from "eslint-plugin-eqeqeq-fix";

export default [
	{
		files: ["**/*.{js,mjs,cjs}"],
		ignores: ["**/node_modules/**", "**/html2canvas.js", "**/pako.js"],
		...js.configs.recommended,
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		plugins: {
			"eqeqeq-fix": eqeqeFix,
			"autofix": {
				 
				extends: ["plugin:eqeqeq-fix/recommended"],
			},
		},
		rules: {
			"one-var": ["error", "never"],
			curly: ["error", "all"],
			"eqeqeq-fix/eqeqeq": ["error", "smart"],
			// "no-var": "error",
			// "prefer-const": "error",
			"object-shorthand": "error",
			// "prefer-template": "error",
			// "prefer-destructuring": ["error", { object: true, array: true }],
			"prefer-spread": "error",
			"prefer-rest-params": "error",
			"no-sequences": "error",
			"no-nested-ternary": "error",
			"no-unneeded-ternary": "error",
			"no-else-return": "error",
			"dot-notation": "error",
			"operator-assignment": "error",
			// "no-multi-assign": "error",
			"no-useless-rename": "error",
			"no-useless-computed-key": "error",
			"no-useless-concat": "error",
			"no-useless-return": "error",

			complexity: ["warn", 15],
			// "max-lines-per-function": ["warn", 75],
			// "max-depth": ["warn", 4],
			// "max-params": ["warn", 5],
			// "no-shadow": "warn",
			// "no-param-reassign": ["warn", { props: false }],
			"prefer-arrow-callback": "warn",
			"prefer-object-spread": "warn",
			"no-lonely-if": "warn",
			"no-extra-boolean-cast": "warn",
		},
	},

	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "script",
		},
	},
];

