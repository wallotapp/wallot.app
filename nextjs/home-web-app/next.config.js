/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
	},
	output: 'export',
	reactStrictMode: true,
	transpilePackages: [
		'ergonomic',
		'ergonomic-react',
		'@wallot/js',
		'@wallot/react',
	],
};

module.exports = nextConfig;
