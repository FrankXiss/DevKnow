/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // Ejemplo de estilos para la etiqueta code
            code: {
              backgroundColor: "#1a202c",
              color: "#ffffff", // text-white
              padding: "1rem", // p-4
              borderRadius: "0.25rem", // rounded
            },
          },
        },
      },
    },
  },
  plugins: [],
}
