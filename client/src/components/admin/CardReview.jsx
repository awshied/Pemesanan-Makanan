import React from "react";
import Cards from "../Cards";
import { assets } from "../../assets/data";

const CardReview = () => {
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
        "Aku suka banget sama rasanya yang berani bumbu, porsinya pas, dan penyajiannya cepat.",
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
        "Saat berkunjung ke Indonesia, saya mencoba Sedap Malam dan langsung jatuh cinta dengan cita rasanya.",
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
  return (
    <div>
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
  );
};

export default CardReview;
