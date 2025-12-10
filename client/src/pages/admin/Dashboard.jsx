import React, { useEffect, useState } from "react";
import {
  assets,
  customerActive,
  dummyDashboardData,
  dummyTopSell,
} from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import { CountUpAnimation } from "../../components/admin/CountUpAnimation";
import ChartPenjualanMenu from "../../components/admin/ChartPenjualanMenu";
import ChartPendapatanTahunan from "../../components/admin/ChartPendapatanTahunan";
import ChartPertumbuhanPembeli from "../../components/admin/ChartPertumbuhanPembeli";
import { formatPendapatan } from "../../utils/formatNumber";

const Dashboard = () => {
  const { user, currency } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    orders: [],
    totalDelivered: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });

  const delivered = CountUpAnimation(dashboardData.totalDelivered);
  const revenue = CountUpAnimation(dashboardData.totalRevenue);
  const customers = CountUpAnimation(dashboardData.totalCustomers);

  const [topMenu, setTopMenu] = useState([]);
  const [customerStatus, setCustomerStatus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Makanan");

  const getDashboardData = () => {
    setDashboardData(dummyDashboardData);
  };

  const getTopMenu = () => {
    setTopMenu(dummyTopSell);
  };

  const getCustomerStatus = () => {
    setCustomerStatus(customerActive);
  };

  useEffect(() => {
    if (user) {
      getDashboardData();
      getTopMenu();
      getCustomerStatus();
    }
  }, [user]);

  const filteredTopMenu = topMenu.filter(
    (item) =>
      item.product?.category?.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="flex flex-col pl-3 md:px-0 mt-5 overflow-y-scroll w-full gap-3 md:gap-2">
      {/* Header */}
      <div className="flex md:pl-3 pl-2 items-start justify-center flex-col gap-2">
        <big className="text-2xl font-bold text-white">Dashboard</big>
        <small className="text-sm leading-relaxed">
          Halo,{" "}
          <span className="text-solidThree font-medium">
            {user?.firstName} {user?.lastName}
          </span>
          . Selamat datang kembali di Mang TekTek.
        </small>
      </div>
      {/* Grid Utama */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3 md:gap-2">
        <div className="flex flex-col gap-3 md:gap-2 max-w-full">
          <div className="grid grid-cols-3 gap-3 md:gap-2">
            {/* Orderan Terkirim */}
            <div className="flexStart flex-col md:flex-row gap-3 md:gap-7 p-5 bg-secondary rounded-xl">
              <img src={assets.myOrder} alt="" className="w-8" />
              <div className="flex justify-center flex-col">
                <big className="md:text-xl text-sm font-bold text-solidThree">
                  {delivered.toString().padStart(2, "0")}
                </big>
                <span className="hidden md:flex text-sm font-medium text-textColor">
                  Pesanan Terkirim
                </span>
              </div>
            </div>
            {/* Pendapatan Total */}
            <div className="flexStart flex-col md:flex-row gap-3 md:gap-7 p-5 bg-secondary rounded-xl">
              <img src={assets.revenue} alt="" className="w-8" />
              <div className="flex justify-center flex-col">
                <big className="gap-x-2 md:text-xl text-sm flex font-bold text-solidThree">
                  <span className="hidden md:flex">{currency}</span>{" "}
                  {formatPendapatan(revenue)}
                </big>
                <span className="hidden md:flex text-sm font-medium text-textColor">
                  Pendapatan
                </span>
              </div>
            </div>
            {/* Jumlah Pelanggan Total */}
            <div className="flexStart flex-col md:flex-row gap-3 md:gap-7 p-5 bg-secondary rounded-xl">
              <img src={assets.client} alt="" className="w-8" />
              <div className="flex justify-center flex-col">
                <big className="md:text-xl text-sm font-bold text-solidThree">
                  {customers.toString().padStart(2, "0")}
                </big>
                <span className="hidden md:flex text-sm font-medium text-textColor">
                  Jumlah Pelanggan
                </span>
              </div>
            </div>
          </div>

          {/* Chart Pendapatan dan Top Menu */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-2">
            {/* Pendapatan Harian */}
            <div className="bg-secondary flex p-5 w-full rounded-xl">
              <ChartPendapatanTahunan />
            </div>
            {/* Menu yang Laku */}
            <div className="flex flex-col md:w-1/2 w-full bg-secondary p-2 gap-2 md:gap-0 rounded-xl">
              <div className="grid grid-cols-2 p-2 md:pb-4 pb-3 border-0 md:border-b md:border-[#49535d] items-center gap-2">
                <span className="text-base font-bold text-textColor">
                  Top Menu
                </span>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="hidden md:flex outline-none bg-primary text-textColor text-xs font-medium h-8 p-1 rounded-md cursor-pointer"
                >
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>
              <div className="flexCenter md:hidden gap-2 w-full">
                <button
                  className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
                    selectedCategory === "Makanan"
                      ? "bg-gray-600 font-bold"
                      : "bg-primary"
                  }`}
                  onClick={() => setSelectedCategory("Makanan")}
                >
                  Makanan
                </button>

                <button
                  className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
                    selectedCategory === "Minuman"
                      ? "bg-gray-600 font-bold"
                      : "bg-primary"
                  }`}
                  onClick={() => setSelectedCategory("Minuman")}
                >
                  Minuman
                </button>
                <button
                  className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
                    selectedCategory === "Appetizer"
                      ? "bg-gray-600 font-bold"
                      : "bg-primary"
                  }`}
                  onClick={() => setSelectedCategory("Appetizer")}
                >
                  Appetizer
                </button>
                <button
                  className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
                    selectedCategory === "Dessert"
                      ? "bg-gray-600 font-bold"
                      : "bg-primary"
                  }`}
                  onClick={() => setSelectedCategory("Dessert")}
                >
                  Dessert
                </button>
              </div>
              <div className="flex flex-col mt-3 h-[260px] md:h-[270px] overflow-y-auto">
                {filteredTopMenu.map((top, index) => (
                  <div key={index} className="flex flex-col gap-2 p-1 md:p-2">
                    <div className="flex gap-2 items-center">
                      <img
                        src={top.product?.images[0]}
                        alt={top.product?.title}
                        className="w-12 h-12 object-cover rounded-full"
                      />

                      <div className="flex flex-col gap-2">
                        <h5 className="text-sm font-semibold text-textColor">
                          {top.product?.title}
                        </h5>
                        <span className="text-xs text-textColor">
                          Terjual:{" "}
                          <span className="text-solidThree">{top.selling}</span>
                        </span>
                      </div>
                    </div>

                    {index !== filteredTopMenu.length - 1 && (
                      <hr className="border-b border-[#49535d] mt-0 md:mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Client */}
        <div className="flex p-2 flex-col w-full bg-secondary rounded-xl gap-4">
          <span className="text-base pt-2 pl-2 font-bold text-textColor">
            Pelanggan
          </span>
          <hr className="w-full border-b border-[#49535d]" />
          <div className="flex flex-col gap-2 w-full h-[370px] overflow-y-auto">
            {[...customerStatus]
              .sort((a, b) => {
                if (a.status === "Online" && b.status !== "Online") return -1;
                if (a.status !== "Online" && b.status === "Online") return 1;
                return a.person.name.localeCompare(b.person.name);
              })
              .map((stats, on) => (
                <div
                  key={on}
                  className={`flex flex-col gap-2 py-1 px-2 transition-opacity ${
                    stats.status === "Offline" ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={stats.person?.imgPath}
                      alt={stats.person?.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="flex w-full justify-center flex-col gap-1">
                      <h5 className="text-xs font-semibold text-textColor">
                        {stats.person?.name}
                      </h5>
                      <div className="flexBetween">
                        <div className="flex items-center gap-1">
                          <img src={assets.location} className="w-3" />
                          <span className="text-xs text-textColor">
                            {stats.person?.location}
                          </span>
                        </div>
                        <small
                          className={`text-xs text-end ${
                            stats.status === "Online"
                              ? "text-solidThree font-semibold"
                              : "text-textColor"
                          }`}
                        >
                          {stats.status}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Chart Bawah */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3 md:gap-2 mb-3">
        <ChartPenjualanMenu />
        <div className="grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ChartPertumbuhanPembeli />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
