import { socialMedia, serviceMenu, companyMenu } from "components/constants";
import { Link } from "react-router-dom";
import Logo from "assets/images/estate-logo.png";

const Footer = () => {
  return (
    <footer className="w-full h-fit padding-container bg-white">
      <article className="max-container flex flex-wrap justify-around py-4 xl:pb-12">
        <div className="flex flex-col items-start">
          <img
              src={Logo}
              alt="logo"
              loading="lazy"
              decoding="async"
              title="Footer logo"
              className="size-32 aspect-auto object-cover"
          />
          <p className="regular-14 xl:regular-16 text-slate-700 font-medium leading-6 max-w-xs">
            Estate is a service provider site for finding the best places to live.
          </p>
        </div>
        <div className="flexColCenter">
          <h3 className="bold-20 font-semibold">Our service</h3>
          <ul className="flex flex-col gap-y-4 mt-4">
            {serviceMenu.map((item) => {
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
        <div className="flexColCenter">
          <h3 className="bold-20 font-semibold">Company</h3>
          <ul className="flex flex-col gap-y-4 mt-4">
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
        <div className="flexColCenter">
          <h3 className="bold-20 font-semibold">Get in touch</h3>
          <Link to={"mailto:estate@example.com"} className="regular-16 text-slate-700/75 mt-4">estate@example.com</Link>
          <p className="regular-16 text-slate-700/75 mt-4">Varna, Bulgaria</p>
          <ul className="mt-8 flex justify-center gap-6 md:gap-8">
            {socialMedia.map((item) => {
              const Icon = item.icon;
              return (
                  <li key={item.id}>
                    <Link
                        to={item.href}
                        title={item.label}
                        target="_blank"
                        className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <span className="sr-only">{item.label}</span>
                      <Icon height={24} width={24}/>
                    </Link>
                  </li>
              );
            })}
          </ul>
        </div>
      </article>
      <hr className="h-[2px] w-full bg-slate-400 mt-5"/>
      <div className="flexCenter">
        <p className="regular-18 text-slate-700 font-semibold mt-5">
          &copy; 2023/2024 Copyright ~ Estate.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
