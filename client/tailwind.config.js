/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: "rgb(20,117,225)",
        buttonHover: "rgb(16,94,180)",
        button2: "rgb(0,231,1)",
        buttonHover2: "rgb(31,255,32)",
        header: "rgb(255,255,255)",
        border: "#e2e8f033",
        bg: "#0f212e",
        sbg: "#1a2c38",
        tbg: "#213743",
        sbgHover: "rgb(47,69,83)",
        stext: "rgb(177,186,211)",
        // tbg: "#141d2c",
        // fbg: "#33415580",
        gold: "#Ffd700",
        bronze: "#CD7F32",
        silver: "#C0c0c0",
        platinum: "#E5e4e2",
        diamond: "#B9F2FF",
        green: "rgb(31,255,32)",
        p: "#747c88",
        valid: "#B6F09C",
        error: "#d32f2f",
      },
    },
    boxShadow: {
      custom: '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.12)',
    },
  },
  plugins: [],
};
