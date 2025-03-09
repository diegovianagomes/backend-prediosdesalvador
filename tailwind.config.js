/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Include any other content paths your project uses
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ['"Abril Fatface"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    // ...outros plugins
  ],
}