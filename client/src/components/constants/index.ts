import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaPhoneAlt, FaFacebookSquare  } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TbUserStar } from "react-icons/tb";
import { BsHouseGear } from "react-icons/bs";
import { PiWarehouseLight } from "react-icons/pi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdEmail, MdSupport  } from "react-icons/md";
import SellProperty from "assets/images/sell_property.jpg";
import DeviceMockup from "assets/images/signup-page-mockup.png";

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

export const accents = [
    {id: 1, title: "120k", label: "People believe in our service"},
    {id: 2, title: "3200", label: "Property and house ready for occupancy"},
    {id: 3, title: "45k", label: "Partners who have worked with us"},
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

export const gridItemInfo = [
    {
        id: 1,
        title: 'Hi, what we do?',
        text: 'We have years of leading experience and a proven track record of excellence work',
        article: 'flex flex-col items-center md:items-start justify-center text-left space-y-4',
        style: 'relative col-span-2 md:col-span-1 row-span-1 size-fit px-2.5 pt-2 pb-6 xl:pl-4 flex flex-col items-start justify-center text-left space-y-6 rounded-2xl border border-slate-400 transition-all ease-in-out duration-150',
    },
    {
        id: 2,
        title: 'Your Dream Home Awaits',
        text: 'Don\'t hesitate, you are one step closer of acquiring your home',
        imageSrc: 'https://static.photocdn.pt/images/articles/2021/01/07/quality_real_estate_photos.webp',
        imageStyle: 'h-40 w-full rounded-t-2xl aspect-auto object-scale bg-no-repeat',
        article: 'flex flex-col items-center justify-center py-4 text-center p-2.5 xl:px-4',
        style: 'col-span-2 md:col-span-1 xl:col-span-1 h-fit w-full rounded-2xl border border-gray-700 transition-all ease-in-out duration-150 transition-all ease-in-out duration-150 hover:shadow-md hover:shadow-blue-400',
    },
    {
        id: 3,
        imageSrc: DeviceMockup,
        imageStyle: 'h-96 w-full lg:size-full xl:max-h-[650px] bg-cover bg-no-repeat aspect-auto object-contain mx-auto',
        style: 'ml-1 col-span-2 md:col-span-1 xl:row-span-2 size-full rounded-xl shadow-xl transition-all ease-in-out duration-150 hover:shadow-xl hover:shadow-blue-400 hover:-rotate-1'
    },
    {
        id: 4,
        title: 'Amazing place to relax and enjoy',
        text: 'Feel welcome the second you enter, on the south–eastern coast of Sardinia, between the most famous and renowned areas of Villasimius and Costa Rei. ',
        imageSrc: SellProperty,
        imageStyle: 'relative size-full max-h-64 md:h-screen rounded-t-2xl shadow-md aspect-auto object-cover bg-cover bg-center bg-no-repeat',
        article: 'w-full flex flex-col items-center md:items-start justify-center p-2.5 md:p-4 xl:px-6 2xl:pl-4 pt-2.5 pb-4',
        style: 'size-full md:w-full md:h-fit lg:size-full col-span-2 md:col-span-1 lg:col-span-2 flex flex-col justify-center rounded-t-2xl rounded-b-xl lg:rounded-2xl border border-gray-700 hover:shadow-lg transition-all ease-in-out duration-150 hover:shadow-blue-400',
    },
    // {
    //     id: 5,
    //     title: 'Rent with Confidence',
    //     // text: 'Enjoy exclusive perks such as discounted rent, waived fees, and flexible lease terms.',
    //     text: 'Take advantage of our special offer and rent your next home with confidence. Enjoy exclusive perks such as discounted rent, waived fees, and flexible lease terms. Whether you\'re relocating for work or searching for a new place to call home, we\'re here to help you find the perfect rental property.',
    //     // imageSrc: 'bg-sixst-el',
    //     // imageSrc: 'https://img.freepik.com/premium-vector/exclusive-offer-label-badge-shop-now-vector-stock-illustration_100456-11056.jpg?w=360',
    //     // imageStyle: 'h-24 ',
    //     style: 'size-full flex flex-col items-start justify-end px-4 rounded-2xl border border-pink-600'
    // },
    // {
    //     id: 6,
    //     title: 'Luxury Waterfront Villa',
    //     text: 'Boasting panoramic views, private beach access, and luxurious amenities,',
    //     imageSrc: RentProperty,
    //     imageStyle: 'h-[182px] w-full',
    //     style: 'h-full w-full col-span-2 text-right p-4 rounded-xl border border-green-600'
    // },
] as const;

export const socialItem = [
    {id: 1, href: '#', label: 'Facebook', icon: FaFacebookSquare, iconBg: 'fill-blue-600'},
    {id: 2, href: '#', label: 'X', icon: FaSquareXTwitter, iconBg: 'fill-[#252525]'},
    {id: 3, href: '#', label: 'Github', icon: FaGithub, iconBg: 'size-10 fill-slate-700'}
] as const;