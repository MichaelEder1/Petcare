module.exports = {
    purge: {
        enabled: true,
        content: ['./js/classes/*.js', './js/kwmJS/templates/*.tpl', './*.html'],
        options: {
            safelist: ["dark"],
        },
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {
            "sans": ["Montserrat, Quicksand, sans-serif"],
            "hero": ["Montserrat, sans-serif"]
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
