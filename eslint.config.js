// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
			eslintPluginPrettierRecommended
		],
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: '',
					style: 'camelCase'
				}
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: '',
					style: 'kebab-case'
				}
			],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/dot-notation': 'off',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-member-accessibility': 'off',
			'@typescript-eslint/no-inferrable-types': 'off',
			'brace-style': 'off',
			'import/order': 'off',
			'max-len': [
				'error',
				{
					code: 180,
					ignorePattern: '^import |^export | implements'
				}
			],
			'no-underscore-dangle': 'off',
			'object-shorthand': 'off'
		}
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {
			'@angular-eslint/template/interactive-supports-focus': 'off',
			'@angular-eslint/template/click-events-have-key-events': 'off',
			'@angular-eslint/template/alt-text': 'off'
		}
	}
);
