/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito"],
        RobotoSlab: ["RobotoSlab"],
        RobotoSlabSemi: ["RobotoSlabSemi"],
        Nunitosemi: ["Nunitosemi"],
      },
      flex: {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
    },
    colors: {
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
      },
      danger: {
        DEFAULT: "var(--danger)",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      1.5: "1.5px",
      2: "2px",
      3: "3px",
    },
  },
  plugins: [],
};
