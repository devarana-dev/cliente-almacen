/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
		colors: {
			"light" : "#dbdbea",
			"dark" : "#646375",
			"primary" : "#8c52ff",
			"secondary" : "#0abab5",
			"info" : "#5271ff",
			"success" : "#00b76d",
			"warning" : "#e5d100",
			"danger" : "#f72500",
		},
		backgroundImage:{
			'royalview' : "url('assets/img/royalview.jpg')",
		},
    },
  },
  plugins: [],
}
