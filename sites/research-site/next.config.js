/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
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
