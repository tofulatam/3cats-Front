const path = require('path');
const colors = require('tailwindcss/colors');

/**
 * Extended sizes
 */
const SIZES = {
	13: '3.25rem',
	15: '3.75rem',
	17: '4.25rem',
	18: '4.5rem',
	22: '5.5rem',
	25: '6.25rem',
	26: '6.5rem',
	30: '7.5rem',
	34: '8.5rem',
	38: '9.5rem',
	42: '10.5rem',
	46: '11.5rem',
	50: '12.5rem',
	54: '13.5rem',
	58: '14.5rem',
	62: '15.5rem',
	66: '16.5rem',
	70: '17.5rem',
	75: '18.75rem',
	76: '19rem',
	84: '21rem',
	88: '22rem',
	92: '23rem',
	100: '25rem',
	104: '26rem',
	102: '25.5rem',
	108: '27rem',
	112: '28rem',
	116: '29rem',
	120: '30rem',
	124: '31rem',
	128: '32rem',
	132: '33rem',
	136: '34rem',
	140: '35rem',
	144: '36rem',
	148: '37rem',
	150: '37.5rem',
	154: '38.5rem',
	152: '38rem',
	156: '39rem',
	157: '39.25rem',
	160: '40rem',
	180: '45rem',
	192: '48rem',
	200: '50rem',
	240: '60rem',
	256: '64rem',
	280: '70rem',
	320: '80rem',
	360: '90rem',
	400: '100rem',
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
				dashboardGrayText: '#A0AEC0',
				//
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
				},
				'on-warn': {
					500: colors.red['50']
				}
			},
			flex: {
				0: '0 0 auto'
			},
			opacity: {
				12: '0.12',
				38: '0.38',
				87: '0.87'
			},
			zIndex: {
				'-1': -1,
				49: 49,
				60: 60,
				70: 70,
				80: 80,
				90: 90,
				99: 99,
				999: 999,
				9999: 9999,
				99999: 99999
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
		// Tailwind plugins
		require(path.resolve(__dirname, 'src/app/core/tailwind/icon-size'))
	]
};

export default config;
