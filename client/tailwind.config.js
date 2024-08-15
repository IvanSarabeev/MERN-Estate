/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      grayscale: {
        50: '50%',
      },
      backgroundImage: {
        "contact": "url(https://flowbite.s3.amazonaws.com/blocks/marketing-ui/contact/laptop-human.jpg)",
        "home": "url(https://res.cloudinary.com/dplqrjsty/image/upload/v1713689912/homepage_fjssvr.jpg)",
        "test": "url(https://media.assettype.com/outlooktraveller%2F2023-08%2Fc3c25578-1ade-424d-8ce9-80b48ff0fdf9%2Fshutterstock_2050060145.jpeg)",
        "contact-info": "url(../src/assets/images/real-estate-bg.avif)",

        // Bento Grid Images
        "first-el": "url(../src/assets/images/banner.png)",
        "second-el": "url(https://static.photocdn.pt/images/articles/2021/01/07/quality_real_estate_photos.webp)",
        "third-el": "url(https://img.freepik.com/premium-vector/five-stars-customer-product-rating-review-badge-design-with-star-label-modern-vector-illustration_172533-1985.jpg)",
        "fourth-el": "url(../src/assets/images/sell_property.jpg)",
        "fifth-el": "url(../src/assets/images/luxury_rent.jpg)",
        "sixst-el": "url(https://img.freepik.com/premium-vector/exclusive-offer-label-badge-shop-now-vector-stock-illustration_100456-11056.jpg?w=360)",
        "sevent-el": "url(../src/assets/images/virtual-tour.png)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}