import React, { memo } from "react";
import Button from "components/HTML/Button";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import MemoImage from "components/Image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import { aboutCarouselTestimonial } from "components/constants";

const Testimonial: React.FC = () => {
  return (
    <section className="flexCol">
      <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 padding-container max-container">
        <div className="space-y-2 flexColCenter md:flex-row md:flexBetween">
          <div className="max-w-md space-y-4 text-left">
            <h3 className="font-sans text-bold-24 text-slate-700 xl:text-4xl font-bold">
              What Our Customers Says
            </h3>
            <p className="text-slate-600/90">
              Real Estate help's you easily create a real estate trading
              solution. With the fully functional website.{" "}
            </p>
          </div>
          <div className="inline-flex gap-x-2">
            <Button
              type="button"
              title="arrow"
              aria-label="swipe"
              className="p-2.5 xl:p-4 border border-slate-700 rounded-full bg-transparent basic-transition hover:text-white hover:bg-slate-600 hover:scale-105"
            >
              <span className="sr-only">Arrow</span>
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              type="button"
              title="arrow"
              aria-label="swipe"
              className="p-2.5 xl:p-4 border border-slate-700 rounded-full bg-transparent basic-transition hover:text-white hover:bg-slate-600 hover:scale-105"
            >
              <span className="sr-only">Arrow</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
        <CarouselTestimonial />
      </div>
    </section>
  );
};

const MemoTestimonial = memo(Testimonial);

export default MemoTestimonial;

// Figure Out how to add the Carousel Feature..
const CarouselTestimonial = () => {
  return (
    <Carousel className="relative size-full flex">
      <CarouselContent>
        {aboutCarouselTestimonial.map((item) => {
          return (
            <CarouselItem key={item.id} className="basis-full">
              <MemoImage
                imgFormat="jpg"
                altText={item.imgAlt}
                imageName={item.imgSrc}
                className="relative size-full max-h-96 max-w-xl md:max-w-xl rounded-3xl aspect-auto bg-center object-cover object-center shadow-sm shadow-slate-600 basic-transition"
              />
              <div className="hidden lg:flex absolute inset-y-8 right-96 z-20 h-fit w-full max-w-md gap-y-3 flexColStart p-6 rounded-3xl -ml-4 bg-white">
                <span className="inline-flex gap-x-1.5">
                  {[...Array(5)].map((_, index) => {
                    return (
                      <Star
                        key={index}
                        className={`size-4 ${
                          index !== 5 ? "fill-[#f9a101]" : "transparent"
                        }`}
                      />
                    );
                  })}
                </span>
                <p className="text-left regular-16 lg:regular-18 font-sans">
                  {item.description}
                </p>
                <span className="relative size-0.5 w-full -ml-6 mt-4 bg-slate-200">
                  <Quote className="absolute -top-3 -right-8" />
                </span>
                <div className="flexStart gap-x-4 p-4">
                  <MemoImage
                    imgFormat="jpg"
                    altText={item.pImgAlt}
                    imageName={item.personImg}
                    className="size-16 rounded-full"
                  />
                  <div className="flexColStart gap-y-1">
                    <h4 className="regular-18 md:bold-20 font-bold">
                      {item.personName}
                    </h4>
                    <p className="regular-14 md:regular-16">
                      {item.personTitle}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
        <CarouselPrevious />
        <CarouselNext />
      </CarouselContent>
    </Carousel>
  );
};
