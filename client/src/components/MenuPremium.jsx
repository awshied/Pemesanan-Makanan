import { useEffect, useState } from "react";
import Title from "./Title";
import { dummyProducts } from "../assets/data";
import Item from "./Item";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";

const MenuPremium = () => {
  const [premiumMenu, setPremiumMenu] = useState([]);

  useEffect(() => {
    const data = dummyProducts.filter((item) => item.inStock).slice(0, 10);
    setPremiumMenu(data);
  }, [dummyProducts]);
  return (
    <section className="max-padd-container py-22 xl:py-28 bg-primary">
      <Title title1={"Menu"} title2={"Premium"} titleStyles={"pb-10"} />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          500: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1022: {
            slidesPerView: 4,
          },
          1350: {
            slidesPerView: 5,
          },
        }}
        modules={[Autoplay]}
        className="min-h-[399px]"
      >
        {premiumMenu.map((product) => (
          <SwiperSlide key={product._id}>
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MenuPremium;
