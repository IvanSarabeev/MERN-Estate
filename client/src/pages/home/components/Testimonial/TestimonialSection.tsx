import React, { useCallback, useEffect, useRef } from "react";
import TestimonialSlider from "./TestimonialSlider";

const TestimonialSection: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const scrollRow1 = useCallback(() => {
    const row1 = row1Ref.current;
    if (row1) {
      row1.scrollLeft += 1;

      if (row1.scrollLeft >= row1.scrollWidth / 2) {
        row1.scrollLeft = 0;
      }
    }
  }, []);

  const scrollRow2 = useCallback(() => {
    const row2 = row2Ref.current;
    if (row2) {
      row2.scrollLeft -= 1;

      if (row2.scrollLeft <= 0) {
        row2.scrollLeft = row2.scrollWidth / 2;
      }
    }
  }, []);

  useEffect(() => {
    const row1Interval = setInterval(scrollRow1, 20);
    const row2Interval = setInterval(scrollRow2, 20);

    return () => {
      clearInterval(row1Interval);
      clearInterval(row2Interval);
    };
  }, [scrollRow1, scrollRow2]);

  return (
    <>
      <h3 className="w-fit text-3xl lg:text-4xl 2xl:text-5xl leading-10 md:leading-[3.35rem] px-4 pb-4 lg:pb-8 2xl:pb-12 text-center font-semibold text-slate-900 mx-auto">
        What's users say about our service
      </h3>
      <div className="w-full flexColCenter items-center">
        <TestimonialSlider row1Ref={row1Ref} row2Ref={row2Ref} />
      </div>
    </>
  );
};

export default TestimonialSection;
