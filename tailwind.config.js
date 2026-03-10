/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lightBg: '#f8fafc',
                lightCard: '#ffffff',
                primaryRed: '#dc2626',
                competitorA: '#9ca3af',
                competitorB: '#60a5fa',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
