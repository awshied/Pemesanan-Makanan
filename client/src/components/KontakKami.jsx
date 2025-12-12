import React from "react";
import FloatingInput from "../components/floatingInput";
import { assets } from "../assets/data";

const Kontak = ({ onClose }) => {
  return (
    <div className="w-full flex justify-center py-20 px-4 animate-fadeIn">
      <form className="flex flex-col py-8 w-full items-center text-sm bg-primary shadow-md rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer"
        >
          <img src={assets.cancel} width={20} className="icon-filter-yellow" />
        </button>
        <h1 className="md:text-4xl text-3xl font-bold py-4 text-center text-textColor">
          <span className="text-solidThree">Kuy</span> Ngobrol
        </h1>

        <p className="text-xs md:text-sm text-textColor pb-10 text-center px-8 leading-relaxed">
          Atau langsung aja kirim email ke{" "}
          <a href="#" className="text-solidThree hover:underline">
            sedapmalam@mangtektek.com
          </a>
        </p>

        <div className="flex flex-col gap-6 w-full px-8">
          <div className="flex gap-5">
            <FloatingInput label="Nama" name="fullName" icon={assets.user} />
            <FloatingInput
              label="Email"
              name="email"
              type="email"
              icon={assets.email}
            />
          </div>
          <FloatingInput
            label="Pesan"
            name="pesan"
            type="textarea"
            icon={assets.textArea}
          />

          {/* Submit */}
          <button
            type="submit"
            className="active:scale-95 transition bg-secondary border border-gray-500/20 text-textColor hover:bg-[#262b32] text-sm font-medium rounded-md cursor-pointer flexCenter w-full mt-4 py-4 gap-2"
          >
            <img src={assets.send} width={18} />
            Kirim Pesan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Kontak;
