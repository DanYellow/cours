/** @type {import('tailwindcss').Config} */

import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,njk}"],
    safelist: [
        {
            pattern: /!?(bg|text)-.+/,
        },
    ],
    theme: {
        extend: {
            spacing: {
                11: "2.75rem",
                12: "3.25rem",
                13: "3.75rem",
                14: "4.25rem",
            },
            containers: {
                "5.5xl": "69rem",
            },
        },
    },
    plugins: [containerQueries, forms],
};
