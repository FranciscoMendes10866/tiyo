import type { Config } from "tailwindcss";

export default {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./node_modules/flowbite-react/**/*.js",
	],
	theme: {
		extend: {},
	},
	plugins: [require("flowbite/plugin")],
} satisfies Config;
