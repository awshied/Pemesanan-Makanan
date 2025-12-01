import { useEffect, useState } from "react";
import Title from "./Title";
import Item from "./Item";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import { useAppContext } from "../context/AppContext";

const MenuPremium = () => {
  const [premiumMenu, setPremiumMenu] = useState([]);
  const { products } = useAppContext();

  useEffect(() => {
    const data = products
      .filter((item) => item.popular && item.inStock)
      .slice(0, 10);
    setPremiumMenu(data);
  }, [products]);

  return (
    <section className="max-padd-container py-22 xl:py-28 bg-primary">
      <Title
        title1={"Hot"}
        title2={"Premium"}
        titleStyles={"pb-10"}
        para={
          "Cobain dulu menu sedap malam yang menggugah selera dan siap nemenin malam panjangmu dengan kelezatan yang nikmat."
        }
      />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        centeredSlidesBounds={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.update();
            swiper.autoplay.start();
          }, 250);
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
        className="min-h-[420px]"
      >
        {premiumMenu.map((product) => (
          <SwiperSlide key={product._id} className="min-h-[420px] w-full">
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MenuPremium;
