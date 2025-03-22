const path = require('path');
const colors = require('tailwindcss/colors');

/**
 * Extended sizes
 */
const SIZES = {
	38: '9.5rem',
	46: '11.5rem',
	50: '12.5rem',
	58: '14.5rem',
	62: '15.5rem',
	70: '17.5rem',
	76: '19rem',
	84: '21rem',
	92: '23rem',
	100: '25rem',
	116: '29rem',
	128: '32rem',
	132: '33rem',
	154: '38.5rem',
	180: '45rem',
	200: '50rem',
	256: '64rem',
	480: '120rem'
};

/**
 * Primary theme colors
 */
const THEME_PALETTE = {
	DEFAULT: '#4ecdc4',
	50: '#f1faf9',
	100: '#e5f5f4',
	200: '#caece9',
	300: '#abe2dd',
	400: '#85d8d1',
	500: '#4ecdc4',
	600: '#47bab2',
	700: '#3fa59d',
	800: '#358c86',
	900: '#2a6e69'
};

/**
 * Tailwind configuration
 */
const config = {
	content: ['./src/**/*.{html,scss,ts}'],
	important: true,
	theme: {
		screens: {
			'2xs': '375px',
			xs: '480px',
			sm: '600px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		fontFamily: {
			sans: ['Montserrat', 'sans-serif']
		},
		extend: {
			colors: {
				colorSecundario: '#1A535C',
				colorBlancoMenta: '#F7FFF7',
				colorGrisClaro: '#BFBFBF',
				colorGris: '#424242',
				colorRojo: '#FF6B6B',
				colorAmarillo: '#F3F781',
				colorAzul: '#3B5998',
				primary: THEME_PALETTE,
				warn: {
					...colors.red,
					DEFAULT: colors.red[600]
				}
			},
			flex: {
				0: '0 0 auto'
			},
			spacing: SIZES,
			minHeight: SIZES,
			maxHeight: SIZES,
			minWidth: SIZES,
			maxWidth: SIZES,
			transitionDuration: {
				400: '400ms'
			},
			transitionTimingFunction: {
				drawer: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
			},
			boxShadow: {
				card: '0px 4px 10.4px rgba(0, 0, 0, 0.15)',
				cardFeature: '0 0 6.4px 0 rgba(0, 0, 0, 0.24)'
			}
		}
	},
	plugins: [
		require(path.resolve(__dirname, 'src/app/core/tailwind/icon-size'))
	]
};

export default config;
