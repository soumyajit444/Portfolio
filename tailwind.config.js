/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function({ addUtilities, e, theme, variants }) {
      const textShadowUtilities = theme('textShadow', {});
      const textShadowVariants = variants('textShadow', ['responsive', 'hover', 'focus']);
      
      const textShadow = Object.keys(textShadowUtilities).reduce((acc, key) => {
        acc[`.${e(`text-shadow-${key}`)}`] = { textShadow: textShadowUtilities[key] };
        return acc;
      }, {});
      
      addUtilities(textShadow, {
        variants: textShadowVariants,
      });
    },
  ],
}
