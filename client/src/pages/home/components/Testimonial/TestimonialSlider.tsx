import React from "react";
import { testimonials } from "components/constants";
import { IoStar } from "react-icons/io5";

interface TestimonialSliderProps {
  row1Ref: React.RefObject<HTMLDivElement>;
  row2Ref: React.RefObject<HTMLDivElement>;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  row1Ref,
  row2Ref,
}) => {
  return (
    <>
      <div ref={row1Ref} className="flex overflow-x-hidden">
        {[...testimonials, ...testimonials].map((item, index) => {
          return (
            <div key={index} className="h-fit w-1/5 p-2 flex-shrink-0">
              <div className="bg-white py-4 px-6 shadow-md rounded-lg text-center">
                <div className="w-fit flex items-start justify-start space-x-4">
                  <img
                    src={item.avatar}
                    alt={item.username}
                    decoding="async"
                    loading="lazy"
                    className="size-16 rounded-full border-4 border-gray-400 mx-auto mb-4"
                  />
                  <div className="flexColStart items-start">
                    <h3 className="text-xl font-bold">{item.username}</h3>
                    <p className="text-gray-500">{item.alias}</p>
                  </div>
                </div>
                <div className="flexColStart items-start">
                  <p className="text-yellow-500">
                    {[...Array(item.rating)].map((_, index) => {
                      return (
                        <span className="inline-flex items-center">
                          <IoStar
                            key={index}
                            className={`size-4 ml-1 ${
                              index < item.rating
                                ? "fill-[#f9a101]"
                                : "fill-black"
                            }`}
                          />
                        </span>
                      );
                    })}
                    <strong className="ml-3 text-slate-950 regular-16">
                      {item.rating}.0
                    </strong>
                  </p>
                  <p className="text-gray-600 mt-2 text-start text-balance">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={row2Ref} className="flex overflow-x-hidden mt-2">
        {[...testimonials, ...testimonials].map((item, index) => {
          return (
            <div key={index} className="h-fit w-1/5 p-2 flex-shrink-0">
              <div className="rounded-lg text-center py-4 px-6 shadow-md bg-white ">
                <div className="w-fit flex items-start justify-start space-x-2">
                  <img
                    src={item.avatar}
                    alt={item.username}
                    decoding="async"
                    loading="lazy"
                    className="size-16 rounded-full border-4 border-gray-400 mx-auto mb-4"
                  />
                  <div className="flexColStart items-start">
                    <h3 className="text-xl font-bold">{item.username}</h3>
                    <p className="text-gray-500 capitalize">{item.alias}</p>
                  </div>
                </div>
                <div className="flexColStart items-start">
                  <p className="text-yellow-500">
                    {[...Array(item.rating)].map((_, index) => {
                      return (
                        <span className="inline-flex items-center">
                          <IoStar
                            key={index}
                            className={`size-4 ml-1 ${
                              index < item.rating
                                ? "fill-[#f9a101]"
                                : "fill-black"
                            }`}
                          />
                        </span>
                      );
                    })}
                    <strong className="ml-3 text-slate-950 regular-16">
                      {item.rating}.0
                    </strong>
                  </p>
                  <p className="text-gray-600 mt-2 text-start text-balance">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TestimonialSlider;
