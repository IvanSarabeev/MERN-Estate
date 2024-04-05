import Layout from "components/Layouts/Layout";
import {achievmentTestimonial} from "components/constants";

const Home = () => {
  return (
    <Layout>
      <section className="relative h-screen w-screen bg-home-wallpaper bg-cover bg-top aspect-auto">
          <div className="absolute left-[20%] top-1/4 p-16 rounded-2xl bg-slate-100">
              <h1 className="text-slate-700 text-3xl xl:text-6xl">We'll Build House of Your Dream</h1>
          </div>
      </section>
      <section className='w-screen padding-container bg-white'>
          <div className="flex flex-col text-center items-center justify-center mx-auto">
              <h2 className="text-2xl xl:text-5xl text-slate-900 font-bold">Achievement</h2>
              <p className="max-w-lg text-[#252525] regular-14 lg:regular-16 xl:regular-18 mt-4 xl:mt-6 font-semibold">
                  Mentioned began rural, oval that developed from trial and successful.
              </p>
              <div className="gap-20 flex flex-wrap items-center self-center justify-around 2xl:flex-nowrap mx-auto py-12">
                  {achievmentTestimonial.map((item) => {
                      const Icon = item.icon;
                      return (
                          <div className="flex flex-col items-center justify-center mx-auto" key={item.id}>
                              <Icon className="size-14"/>
                              <h3 className="bold-20 lg:text-2xl font-bold">{item.review}+</h3>
                              <p className="text-slate-600 font-medium">{item.label}</p>
                          </div>
                      )
                  })}
              </div>
          </div>
      </section>
    </Layout>
  );
};

export default Home;
