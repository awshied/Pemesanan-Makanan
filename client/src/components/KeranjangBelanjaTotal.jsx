import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/data";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const KeranjangBelanjaTotal = () => {
  const {
    navigate,
    currency,
    method,
    setMethod,
    delivery_charges,
    hitunganKeranjang,
    hitunganJumlah,
    isSignedIn,
    cartItems,
    setCartItems,
    products,
  } = useAppContext();

  const [addresses, setAddresses] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const formatValue = (value) => {
    return value === 0 ? "0" : value.toFixed(3);
  };

  return (
    <div>
      <h3>
        Detail Pesanan
        <span className="text-base font-bold text-solidThree">
          {" "}
          ({hitunganKeranjang()}) Menu
        </span>
      </h3>
      <hr className="border-textColor my-5" />
      <div className="mb-5">
        <div className="my-5">
          <h4 className="mb-3">Alamat</h4>
          <div className="relative flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flexStart gap-x-2 pb-1">
                <span className="text-base text-solidThree font-semibold">
                  Dummy Boy
                </span>
                <hr className="w-px bg-textColor h-4" />
                <small className="text-sm font-medium">+1 234 567 890</small>
              </div>
              <p className="text-sm max-w-70">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.village}, ${selectedAddress.district}, ${selectedAddress.city}, ${selectedAddress.province}, ${selectedAddress.zipcode}`
                  : "Alamat tidak ditemukan."}
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="cursor-pointer pr-1"
                >
                  <img
                    src={assets.locationEdit}
                    className="w-6 icon-filter-yellow"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>Ganti Lokasi</TooltipContent>
            </Tooltip>
            {showAddress && (
              <div className="absolute top-10 py-1 bg-primary rounded-xl text-sm w-full">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-secondary text-sm"
                  >
                    {address.street}, {address.village}, {address.district},{" "}
                    {address.city}, {address.province}, {address.zipcode}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/alamat");
                    scrollTo(0, 0);
                  }}
                  className="p-2 text-center cursor-pointer hover:bg-tertiary hover:text-solidThree"
                >
                  Tambah Alamat
                </p>
              </div>
            )}
          </div>
        </div>
        <hr className="border-textColor mt-5" />
        <div className="my-6">
          <h4 className="mb-5">Metode Pembayaran</h4>
          <div className="flex gap-3">
            <div
              onClick={() => setMethod("COD")}
              className={`${
                method === "COD" ? "btn-outline" : "btn-dark"
              } py-1 text-xs cursor-pointer `}
            >
              COD
            </div>
            <div
              onClick={() => setMethod("stripe")}
              className={`${
                method === "COD" ? "btn-dark" : "btn-outline"
              } py-1 text-xs cursor-pointer`}
            >
              Transfer
            </div>
          </div>
        </div>
        <hr className="border-textColor mt-5" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <h5>Subtotal</h5>
          <p className="font-bold">
            {currency} {formatValue(hitunganJumlah())}
          </p>
        </div>
        <div className="flex justify-between">
          <h5>Ongkos Kirim</h5>
          <p className="font-bold">
            {currency}{" "}
            {formatValue(hitunganJumlah() === 0 ? 0 : delivery_charges)}
          </p>
        </div>
        <div className="flex justify-between">
          <h5>Pajak (6%)</h5>
          <p className="font-bold">
            {currency} {formatValue((hitunganJumlah() * 6) / 100)}
          </p>
        </div>
        <div className="flex justify-between text-lg font-medium mt-3">
          <h4>Total</h4>
          <p className=" text-lg font-bold">
            {currency}{" "}
            {formatValue(
              hitunganJumlah() === 0
                ? 0
                : hitunganJumlah() +
                    delivery_charges +
                    (hitunganJumlah() * 6) / 100
            )}
          </p>
        </div>
      </div>
      <button className="btn-dark flexCenter w-full mt-8 rounded-md py-2 gap-2">
        <img src={assets.order} width={20} />
        Buat Pesanan
      </button>
    </div>
  );
};

export default KeranjangBelanjaTotal;
