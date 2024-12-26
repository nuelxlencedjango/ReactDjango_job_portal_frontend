/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'; // Use ESM import

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Correct Flowbite React path
  ],
  
  theme: {
    extend: {
      colors: {
        blueColor: "#2a68ff",
        greyIsh: "#f1f4f8",
        cardShadow: "#f7f8f9",
        textColor: "#252b36",
      },
    },
  },
  plugins: [flowbitePlugin], // Include the Flowbite plugin
};
