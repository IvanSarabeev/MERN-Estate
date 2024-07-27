import { socialMedia, serviceMenu, companyMenu } from "components/constants";
import { Link } from "react-router-dom";
import Logo from "assets/images/estate-logo.png";

const Footer = () => {
  return (
    <footer className="w-full h-fit py-4 xl:pb-8 bg-white">
      <article className="max-container padding-container grid grid-cols-1 md:grid-cols-2 justify-around md:justify-between">
        <div className="flex items-center md:flex-col md:items-start">
          <img
              src={Logo}
              alt="logo"
              loading="lazy"
              decoding="async"
              title="Footer logo"
              className="size-32 aspect-auto object-cover"
          />
          <p className="regular-16 md:regular-18 text-slate-700 leading-6 max-w-xs">
            Estate is a service provider site for finding the best places to live.
          </p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-baseline justify-between space-y-6">
          <div className="flexColCenter flex-1">
            <h3 className="bold-20 font-semibold">Our service</h3>
            <ul className="flex flex-col gap-y-4 mt-4 pl-2">
              {serviceMenu.map((item) => {
                return (
                    <li
                      key={item.id}
                    >
                      <Link
                          to={"#"}
                          title={item.title}
                          className="regular-16 md:regular-18 whitespace-nowrap leading-8 text-slate-700/75"
                      >
                        {item.title}
                      </Link>
                    </li>
                )
              })}
            </ul>
          </div>
          <div className="flexColCenter flex-1">
            <h3 className="bold-20 font-semibold">Company</h3>
            <ul className="flex flex-col gap-y-4 mt-4 pl-2">
              {companyMenu.map((item) => {
                return (
                    <li
                      key={item.id}
                      >
                      <Link
                          to={"#"}
                          title={item.title}
                          className="regular-16 text-slate-700/75"
                      >
                        {item.title}
                      </Link>
                    </li>
                )
              })}
            </ul>
          </div>
          <div className="flexColCenter flex-1">
            <h3 className="bold-20 font-semibold">Get in touch</h3>
            <Link to={"mailto:estate@example.com"} className="regular-16 text-slate-700/75 mt-4 pl-2">estate@example.com</Link>
            <p className="regular-16 text-slate-700/75 mt-4 pl-2">Varna, Bulgaria</p>
            <ul className="mt-4 md:mt-6 xl:mt-8 flex justify-start gap-x-2 md:gap-x-4 lg:gap-x-6 pl-2">
              {socialMedia.map((item) => {
                const Icon = item.icon;
                return (
                    <li key={item.id}>
                      <Link
                          to={item.href}
                          title={item.label}
                          target="_blank"
                          className="group text-gray-700 transition hover:text-gray-700/75"
                      >
                        <span className="sr-only">{item.label}</span>
                        <div className="p-2.5 rounded-full shadow-md group-hover:scale-105 bg-[#f0f5fd] transition-all ease-in-out duration-150 group-hover:bg-[#0066ff]">
                          <Icon className="size-4 xl:size-5 group-hover:fill-[#f0f5fd]"/>
                        </div>
                      </Link>
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
      </article>
      <hr className="h-[2px] w-full bg-slate-400 mt-5"/>
      <div className="flexCenter">
        <p className="regular-14 md:regular-16 text-slate-700 text-center mt-5">
          &copy; 2023/2024 Copyright ~ Estate.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
