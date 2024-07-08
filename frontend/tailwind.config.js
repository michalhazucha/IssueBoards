/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				info: "#999",
			},
			animation: {
				"spin-slow": "spin 1.5s linear infinite",
			},
		},
	},
	plugins: [],
};