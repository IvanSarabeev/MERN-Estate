import {Link, Outlet, useLocation} from "react-router-dom";
import Button from "components/HTML/Button.tsx";

const ProfileLayout = () => {
    const location = useLocation();

    // TODO: Add prefix /account to the remaining routes
    const asideNavigation = [
        {id: 1, title: 'Profile', href: '/account/profiles'},
        {id: 2, title: 'Account', href: '/account'},
        {id: 3, title: 'Appearance', href: '/appearance'},
        {id: 4, title: 'Notifications', href: '/notifications'},
        {id: 5, title: 'Display', href: '/display'},
    ];

    return (
        <>
            <header className="pb-6 border-b border-slate-200">
                <h2 className="bold-20 xl:bold-24 font-bold">Settings</h2>
                <p className="regular-16 xl:regular-18 font-normal mt-2 text-slate-600">Manage your account settings and set e-mail preferences.</p>
            </header>
            <aside className="max-w-sm gap-x-8 flex flex-row md:flex-col justify-start">
                {asideNavigation.map((item) => {
                    return (
                        <Button
                            key={item.id}
                            type="button"
                            aria-label={item.title}
                            title={item.title}
                            className={`w-fit lg:w-64 regular-14 xl:regular-16 py-1.5 px-3 text-left font-medium text-slate-900 rounded-md bg-transparent hover:bg-[#f4f4f5] hover:font-semibold transition-all ease-in-out duration-150 
                            ${location.pathname === item.href ? 'font-semibold bg-slate-400/70 hover:bg-slate-400/70' : 'bg-transparent'}`
                        }>
                            {/*Use the following background inside the buttons bg-[#f4f4f5] */}
                            <Link to={item.href}>
                                {item.title}
                            </Link>
                        </Button>
                    )
                })}
            </aside>
            <main className="max-w-4xl">
                <Outlet />
            </main>
        </>
    )
}

export default ProfileLayout;