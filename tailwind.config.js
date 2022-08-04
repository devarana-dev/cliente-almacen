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
			"primary" : "#56739B",
			"secondary" : "#d64767",
			"info" : "#a9c0e4",
			"success" : "#00b76d",
			"warning" : "#e5d100",
			"danger" : "#f72500",
            "primary-lighter": "#6186b5",
            "info-lighter": "#B3CBF3",
            "secondary-lighter": "#F75379",
            "danger-lighter": "#f72500",
            "warning-lighter": "#f0c200",
            "dark-lighter": "#646375",
            "orange" : "#ff6b2c",
		},
		backgroundImage:{
			'royalview' : "url('assets/img/royalview.jpg')",
		},
    },
  },
  plugins: [],
}
