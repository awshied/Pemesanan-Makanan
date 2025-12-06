import React from "react";
import Cards from "../Cards";
import { assets } from "../../assets/data";

export const testimonials = [
  {
    _id: "1resufirst",
    name: "Farhan Kalingga Anhar",
    role: "Content Creator",
    location: "Yogyakarta",
    review:
      "Tempat Makan Sedap Malam benar-benar jadi tempat favorit baru saya! Menu makanannya variatif dan rasanya konsisten enak.",
    imgPath: assets.user1,
  },
  {
    _id: "2resusecond",
    name: "Chelsea Campbell",
    role: "YouTube Vlogger",
    location: "Bali",
    review:
      "Sebagai vlogger, saya sering mencari tempat makan yang bukan hanya lezat, tapi juga memiliki ambience menarik.",
    imgPath: assets.user2,
  },
  {
    _id: "3resuthird",
    name: "Bianca Krstić",
    role: "TikTok Influencer",
    location: "Jakarta",
    review:
      "Aku suka banget sama rasanya yang berani bumbu, porsinya pas, penyajiannya cepat, dan pelayanannya yang memanjakan",
    imgPath: assets.user3,
  },
  {
    _id: "4resuforth",
    name: "Wildan Gilang Ardhana",
    role: "Instagram Influencer",
    location: "Sulawesi Barat",
    review:
      "Tempat makan ini punya vibe malam yang cozy banget. Banyak spot estetik untuk foto, dan makanannya pun luar biasa enak.",
    imgPath: assets.user4,
  },
  {
    _id: "5resufifth",
    name: "Ren Gojou",
    role: "JAV Actress",
    location: "Yamanashi",
    review:
      "Saat berkunjung ke Indonesia, saya mencoba Sedap Malam dan langsung jatuh cinta dengan cita rasanya yang khas.",
    imgPath: assets.user5,
  },
  {
    _id: "6resusixth",
    name: "Kallen Vinicius Earl",
    role: "Content Creator",
    location: "Jawa Timur",
    review: "Joslah pokoknya.",
    imgPath: assets.user6,
  },
];

const CardReview = () => {
  return (
    <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-primary to-transparent"></div>

      <div className="marquee-inner h-auto flex transform-gpu min-w-[250%] gap-2">
        {[...testimonials, ...testimonials].map(
          ({ _id, imgPath, name, role, review, location }, index) => (
            <Cards
              key={`${_id}-${index}`}
              index={index}
              card={{ review, location }}
            >
              <div className="flex items-center gap-5 mt-2">
                <img
                  src={imgPath}
                  alt={name}
                  className="size-12 rounded-full"
                  style={{
                    filter: "drop-shadow(8px 5px 6px hsla(0, 0%, 0%, 0.8))",
                  }}
                />

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

      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-primary to-transparent"></div>
    </div>
  );
};

export default CardReview;
