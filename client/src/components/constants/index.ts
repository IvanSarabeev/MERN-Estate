import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaPhoneAlt  } from "react-icons/fa";
import { TbUserStar } from "react-icons/tb";
import { BsHouseGear } from "react-icons/bs";
import { PiWarehouseLight } from "react-icons/pi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdEmail, MdSupport  } from "react-icons/md";
import RentProperty from "assets/images/luxury_rent.jpg";
import SellProperty from "assets/images/sell_property.jpg";
import VirtualTour from "assets/images/virtual-tour.png";
import Banner from "assets/images/banner.png";

export const headerLinks = [
    {id: 1, label: "Home", href: "/"},
    {id: 2, label: "About", href: "/about"},
    {id: 3, label: "Blog", href: "/blog"},
    {id: 4, label: "Contact", href: "/contact"},
] as const;

export const userNavigation = [
    {id: 1, label: "Login", href: "/sign-in", cssAttribute: 'rounded-md bg-[#0284c7] px-5 py-2.5 text-sm font-medium text-white shadow'},
    {id: 2, label: "Register", href: "/sign-up", cssAttribute: 'rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#0284c7]'},
] as const;

export const userProfile = [
    {id: 1, label: "Profile", href: "/profile"},
] as const;

export const socialMedia = [
    {id: 1, label: 'Facebook', href: 'https://www.facebook.com/?locale=bg_BG', icon: FaFacebook},
    {id: 2, label: 'Instagram', href: 'https://www.instagram.com/', icon: FaInstagram},
    {id: 3, label: 'X / Twitter', href: 'https://twitter.com/?lang=bg', icon: FaTwitter},
    {id: 4, label: 'GitHub', href: 'https://github.com/IvanSarabeev', icon: FaGithub},
    {id: 5, label: 'Dribble', href: 'https://dribbble.com/', icon: FaDribbble},
] as const;

export const achievmentTestimonial = [
    {id: 1, label: 'Completed Contracts', icon: TbUserStar, review: 2500},
    {id: 2, label: 'Property Sales', icon: BsHouseGear, review: 3500},
    {id: 3, label: 'Apartment Rent', icon: PiWarehouseLight, review: 8500},
    {id: 4, label: 'Happy Clients', icon: RiSecurePaymentFill, review: 4500},
] as const;

export const mobileNavigation = [
    {id: 1, label: 'Home', link: '/', text: 'Home'},
    {id: 2, label: 'About', link: '/about', text: 'About'},
    {id: 3, label: 'Contact', link: '/contact', text: 'Contact'},
    {id: 4, label: 'Search', link: '/search', text: 'Search'},
    {id: 5, label: 'Login', link: '/sign-in', text: 'Login'},
    {id: 6, label: 'Register', link: '/sign-up', text: 'Register'},
] as const;

export const avatarList = [
    {id: 1, src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png', alt: 'Bonnie-Green'},
    {id: 2, src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png', alt: 'Jese-Leos'},
    {id: 3, src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png', alt: 'Roberta-Casas'},
    {id: 4, src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png', alt: 'Thomas-Lean'},
] as const;

export const loginList = [
    {id: 1, title: "Get started quickly", text: "Browse thought the system flow easily."},
    {id: 2, title: "Chose the property that suits your expectation", text: "You'r on the right place, you have a very rich choise to make."},
    {id: 3, title: "Join millions of businesses", text: "MERN Estate is trusted by thousends of ambitions people from around the globe."},
] as const;

export const boxSection = [
    {id: 1, title:'Email us', text: 'Email us for general queries, including marketing and partnership opportunities.', icon: FaPhoneAlt},
    {id: 2, title:'Call us', text: 'Call us to speak to a member of our team. We are always happy to help.', icon: MdEmail},
    {id: 3, title:'Support', text: 'Email us for general queries, including marketing and partnership opportunities.', icon: MdSupport},
] as const;

export const buttonGroup = [
    {id: 1, label: "Buy", ariaLabel: "Buy Input", style: "btn-group rounded-bl-md rounded-tl-lg"},
    {id: 2, label: "Rent", ariaLabel: "Rent Input", style: "btn-group"},
    {id: 3, label: "Sell", ariaLabel: "Sell Input", style: "btn-group rounded-br-md rounded-tr-lg"},
] as const;

export const bentoGridInfo = [
    {
        id: 1,
        title: 'Premium Management Services',
        text: 'With years of experience and a proven track record of excellence workflox',
        imageSrc: Banner,
        style: 'h-72 w-fit py-6 px-4 space-y-4 rounded-2xl border-slate-600 border',
        imageStyle: 'h-full',
    },
    {
        id: 2,
        title: 'Your Dream Home Awaits',
        text: 'Don\'t hesitate, grab it right now.',
        // imageSrc: 'bg-second-el',
        imageSrc: 'https://static.photocdn.pt/images/articles/2021/01/07/quality_real_estate_photos.webp',
        imageStyle: 'h-40 w-full',
        style: 'h-72 p-4 rounded-xl border-2 border-slate-400',
    },
    {
        id: 3,
        title: 'What Our Clients Say',
        text: '"Don\'t just take our word for it - see what our satisfied clients have to say.',
        // imageSrc: 'bg-third-el',
        imageSrc: 'https://img.freepik.com/premium-vector/five-stars-customer-product-rating-review-badge-design-with-star-label-modern-vector-illustration_172533-1985.jpg',
        imageStyle: 'h-36 w-full',
        style: 'h-72 py-6 px-4 rounded-2xl border border-violet-600'
    },
    {
        id: 4,
        title: 'Exquisite Condo in Downtown',
        text: 'Luxurious 2-bedroom condo with stunning city views.',
        imageSrc: SellProperty,
        imageStyle: 'h-[198px] w-full',
        style: 'h-full w-full col-span-2 flex flex-col items-start justify-end p-6 text-left rounded-md border border-violet-700'
    },
    {
        id: 5,
        title: 'Luxury Waterfront Villa',
        text: 'Boasting panoramic views, private beach access, and luxurious amenities,',
        imageSrc: RentProperty,
        imageStyle: 'h-[182px] w-full',
        style: 'h-full text-right p-4 rounded-xl border border-green-600'
    },
    {
        id: 6,
        title: 'Rent with Confidence',
        // text: 'Enjoy exclusive perks such as discounted rent, waived fees, and flexible lease terms.',
        text: 'Take advantage of our special offer and rent your next home with confidence. Enjoy exclusive perks such as discounted rent, waived fees, and flexible lease terms. Whether you\'re relocating for work or searching for a new place to call home, we\'re here to help you find the perfect rental property.',
        // imageSrc: 'bg-sixst-el',
        imageSrc: 'https://img.freepik.com/premium-vector/exclusive-offer-label-badge-shop-now-vector-stock-illustration_100456-11056.jpg?w=360',
        imageStyle: 'h-24 ',
        style: 'size-full flex flex-col items-start justify-end px-4 py-10 rounded-2xl border border-pink-600'
    },
    {
        id: 7,
        title: 'Take a Virtual Tour',
        text: 'interactive tours provide a convenient way to experience properties without leaving your seat. Start exploring now',
        imageSrc: VirtualTour,
        imageStyle: 'h-56 w-full',
        style: 'size-full col-span-2 flex flex-col items-end justify-end p-6 text-right rounded-md border border-teal-600'
    },
] as const;

// Original Concepts
// export const bentoGridInfo = [
//     {id: 1, title: 'Premium Management Services', text: 'With years of experience and a proven track record of excellence', imageSrc: '', style: 'bg-center h-48 w-fit py-6 px-4 rounded-2xl border-slate-600 border bg-first-el aspect-auto bg-cover object-cover bg-no-repeat'},
//     {id: 2, title: 'Your Dream Home Awaits', text: 'Don\'t hesitate, grab it right now.', imageSrc: 'https://static.photocdn.pt/images/articles/2021/01/07/quality_real_estate_photos.webp', style: 'h-48 py-6 px-4 rounded-xl border-2 border-slate-400 bg-second-el bg-cover bg-no-repeat aspect-auto bg-center object-cover'},
//     // {id: 3, title: 'Hear What Our Clients Say', text: '"Don\'t just take our word for it - see what our satisfied clients have to say.', imageSrc: 'https://img.freepik.com/premium-vector/five-stars-customer-product-rating-review-badge-design-with-star-label-modern-vector-illustration_172533-1985.jpg', style: 'h-48 py-6 px-4 rounded-2xl border border-violet-600 bg-third-el bg-center bg-cover object-cover bg-no-repeat'},
//     {id: 4, title: 'Exquisite Condo in Downtown', text: 'Luxurious 2-bedroom condo with stunning city views.', imageSrc: SellProperty, style: 'h-full w-full col-span-2 flex flex-col items-start justify-end p-6 text-left rounded-md border border-violet-700 bg-fourth-el bg-cover bg-center object-cover bg-no-repeat'},
//     {id: 5, title: 'Featured Listing: Luxury Waterfront Villa', text: 'Boasting panoramic views, private beach access, and luxurious amenities,', imageSrc: RentProperty, style: 'h-60 text-center pt-6 rounded-xl border border-green-600 bg-fifth-el bg-cover bg-center object-cover bg-no-repeat'},
//     {id: 6, title: 'Limited Time Offer: \n Rent with Confidence', text: 'Enjoy exclusive perks such as discounted rent, waived fees, and flexible lease terms.', imageSrc: 'https://img.freepik.com/premium-vector/exclusive-offer-label-badge-shop-now-vector-stock-illustration_100456-11056.jpg?w=360', style: 'bg-center size-full px-4 py-10 rounded-2xl border border-pink-600 bg-sixst-el bg-cover object-cover bg-no-repeat'},
//     {id: 7, title: 'Take a Virtual Tou', text: 'interactive tours provide a convenient way to experience properties without leaving your seat. Start exploring now', imageSrc: VirtualTour, style: 'size-full col-span-2 flex flex-col items-end justify-end p-6 text-right rounded-md border border-teal-600 bg-sevent-el bg-center'},
// ] as const;