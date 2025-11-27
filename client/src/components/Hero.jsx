import React from "react";
import Rating from "./Rating";

const Hero = () => {
  return (
    <section className="max-padd-container">
      <div className="lg:bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat h-screen w-full rounded-2xl relative">
        <div className="mx-auto max-w-[1440px] px-4 flex flex-col justify-between h-full">
          {/* Bagian Atas */}
          <div
            className="max-w-[500px] pt-40"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            <h3>Menu Sedap yang Bikin Nagih</h3>
            <h2 className="uppercase mb-0 tracking-[0.22rem]">
              <span className="text-solidThree">Dapatkan Promo</span> -{" "}
              <span className="text-solidTwo">25% Off!</span>
            </h2>
            <h3 className="font-extrabold leading-none">
              untuk Aneka Favorit Kamu
            </h3>
            <div className="flex items-center">
              <h3>Mulai Dari</h3>
              <span className="bg-transparent p-1 inline-block -rotate-2 ml-2.5 text-5xl font-extrabold">
                <span className="text-2xl relative bottom-3">IDR </span>
                <big className="text-solidThree">11.</big>
                <span className="text-2xl text-solidThree">99k</span>
              </span>
            </div>
            <button className="rounded-xl p-4 w-52 active:scale-95 text-lg transition bg-solidThree hover:opacity-70 text-solidFour font-bold mt-6 cursor-pointer">
              Pesan Sekarang
            </button>
          </div>

          {/* Bagian Bawah */}
          <div className="mt-8 pb-9">
            <Rating />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
