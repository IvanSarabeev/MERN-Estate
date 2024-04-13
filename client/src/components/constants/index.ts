import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";
import { TbUserStar } from "react-icons/tb";
import { BsHouseGear } from "react-icons/bs";
import { PiWarehouseLight } from "react-icons/pi";
import { RiSecurePaymentFill } from "react-icons/ri";

export const headerLinks = [
    {id: 1, label: "Home", href: "/"},
    {id: 2, label: "About", href: "/about"},
    {id: 3, label: "Contact", href: "/contact"},
    {id: 4, label: "Property", href: "/listing/:id"},
] as const;

export const userNavigation = [
    {id: 1, label: "Login", href: "/sign-in", cssAttribute: 'rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow'},
    {id: 2, label: "Register", href: "/sign-up", cssAttribute: 'rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600'},
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
