import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaPhoneAlt  } from "react-icons/fa";
import { TbUserStar } from "react-icons/tb";
import { BsHouseGear } from "react-icons/bs";
import { PiWarehouseLight } from "react-icons/pi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdEmail, MdSupport  } from "react-icons/md";

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