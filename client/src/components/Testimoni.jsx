import React from "react";
import { testimonials } from "../assets/data";
import Cards from "./Cards";
import Title from "./Title";

const Testimoni = () => {
  return (
    <section className="max-padd-container py-10 bg-primary">
      <Title
        title1={"Ulasan"}
        title2={" Penikmat Kuliner"}
        titleStyles={"pb-10"}
        para={
          "Ikuti terus Mang TekTek untuk merasakan setiap sensasi yang memikat hati influencer terkenal."
        }
      />
      <div
        className="w-full h-full md:px-10 px-5"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {testimonials.map(
            ({ _id, imgPath, name, role, review, location }, index) => (
              <Cards key={_id} index={index} card={{ review, location }}>
                <div className="flex items-center gap-5">
                  <div>
                    <img
                      src={imgPath}
                      alt={name}
                      className="size-12 rounded-full"
                      style={{
                        filter: "drop-shadow(8px 5px 6px hsla(0, 0%, 0%, 0.8))",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p
                      className="font-bold text-solidThree"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {name}
                    </p>
                    <p
                      className="text-textColor"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {role}
                    </p>
                  </div>
                </div>
              </Cards>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
