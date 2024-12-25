const defaultTheme = require('tailwindcss/defaultTheme');

const brandShades = ['brand', 'brand-light', 'brand-extralight', 'brand-dark']; // Define shades
const utilities = [
	'bg',
	'text',
	'border',
	'fill',
	'stroke',
	'placeholder',
	'ring',
	'ring-offset',
	'divide',
	'shadow',
	'decoration',
	'accent',
	'caret',
	'outline',
]; // Define common utilities
const states = [
	'hover',
	'focus',
	'active',
	'disabled',
	'group-hover',
	'focus-visible',
	'checked',
]; // Define states

const safelist = brandShades.reduce((classes, shade) => {
	// Base utilities (e.g., bg-brand, text-brand)
	utilities.forEach((util) => classes.push(`${util}-${shade}`));

	// State-based utilities (e.g., hover:bg-brand, focus:text-brand)
	states.forEach((state) =>
		utilities.forEach((util) => classes.push(`${state}:${util}-${shade}`)),
	);

	// Add opacity-based utilities (e.g., bg-brand/50)
	classes.push(`${shade}/50`, `${shade}/70`, `${shade}/25`);

	return classes;
}, []);

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
		'../../packages/javascript-sdk/**/*.{js,ts}',
		'../../packages/react-sdk/**/*.{js,ts,jsx,tsx}',
		'../../node_modules/ergonomic-react/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	mode: 'jit',
	safelist,
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				background: 'hsl(var(--background))',
				border: 'hsl(var(--border))',
				brand: {
					DEFAULT: '#7F43D7', // Main logo color
					extralight: '#C5A3F0', // Extra light variant
					light: '#A573E8', // Lighter variant
					dark: '#5B2FA5', // Darker variant
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				foreground: 'hsl(var(--foreground))',
				input: 'hsl(var(--input))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				ring: 'hsl(var(--ring))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
			},
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
