import { useEffect, useState } from "react";
import KeranjangBelanjaTotal from "../components/KeranjangBelanjaTotal";
import Title from "../components/Title";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import FloatingInput from "../components/floatingInput";
import { assets } from "../assets/data";

const Alamat = () => {
  const { navigate, user } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    village: "",
    district: "",
    city: "",
    zipcode: "",
    province: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddress((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/keranjang");
    }
  }, []);
  return (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      <div className="grid xl:grid-cols-[2fr_1fr] grid-cols-1 gap-20">
        {/* Bagian Kiri - Form Alamat */}
        <form className="flex flex-col gap-6 animate-fadeIn">
          <Title
            title1={"Alamat"}
            title2={"Pengiriman"}
            titleStyles={"pb-5 tracking-wide"}
            para={"Ayo, ganti lokasi pengirimanmu dulu sebelum memesan."}
          />

          <div className="flex gap-5">
            <FloatingInput
              label="Nama"
              name="firstName"
              value={address.firstName}
              onChange={onChangeHandler}
              icon={assets.user}
            />
            <FloatingInput
              label="Nama"
              name="lastName"
              value={address.lastName}
              onChange={onChangeHandler}
              icon={assets.user}
            />
          </div>
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            value={address.email}
            onChange={onChangeHandler}
            icon={assets.email}
          />

          <FloatingInput
            label="Telepon"
            name="phone"
            value={address.phone}
            onChange={onChangeHandler}
            icon={assets.phone}
          />

          <FloatingInput
            label="Jalan/Gang"
            name="street"
            value={address.street}
            onChange={onChangeHandler}
            icon={assets.street}
          />

          <div className="flex gap-5">
            <FloatingInput
              label="Kelurahan"
              name="village"
              value={address.village}
              onChange={onChangeHandler}
              icon={assets.village}
            />
            <FloatingInput
              label="Kecamatan"
              name="district"
              value={address.district}
              onChange={onChangeHandler}
              icon={assets.district}
            />
          </div>

          <div className="flex gap-5">
            <FloatingInput
              label="Kabupaten/Kota"
              name="city"
              value={address.city}
              onChange={onChangeHandler}
              icon={assets.city}
            />
            <FloatingInput
              label="Kode Pos"
              name="zipcode"
              value={address.zipcode}
              onChange={onChangeHandler}
              icon={assets.zipcode}
            />
          </div>

          <FloatingInput
            label="Provinsi"
            name="province"
            value={address.province}
            onChange={onChangeHandler}
            icon={assets.province}
          />

          <button
            type="submit"
            className="active:scale-95 transition bg-secondary border border-gray-500/20 text-textColor hover:bg-[#262b32] text-sm font-medium rounded-md cursor-pointer flexCenter w-full mt-4 py-4 gap-2"
          >
            <img src={assets.locationEdit} width={18} />
            Ubah Alamat
          </button>
        </form>

        {/* Bagian Kanan - Checkout */}
        <div className="flex flex-1 flex-col">
          <div className="w-full bg-secondary px-5 py-10 max-md:mt-16 rounded-xl">
            <KeranjangBelanjaTotal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alamat;
