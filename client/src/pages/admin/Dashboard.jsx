import React, { useEffect, useState } from "react";
import { assets, customerActive, dummyDashboardData } from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import { CountUpAnimation } from "../../components/admin/CountUpAnimation";
import ChartPenjualanMenu from "../../components/admin/ChartPenjualanMenu";
import ChartPendapatanTahunan from "../../components/admin/ChartPendapatanTahunan";
import ChartPertumbuhanPembeli from "../../components/admin/ChartPertumbuhanPembeli";
import { formatPendapatan } from "../../utils/formatNumber";
import { useAuthStore } from "../../store/useAuthStore";

const Dashboard = () => {
  const { currency } = useAppContext();
  const { authUser } = useAuthStore();

  const [dashboardData, setDashboardData] = useState({
    orders: [],
    totalDelivered: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });

  const delivered = CountUpAnimation(dashboardData.totalDelivered);
  const revenue = CountUpAnimation(dashboardData.totalRevenue);
  const customers = CountUpAnimation(dashboardData.totalCustomers);

  const [customerStatus, setCustomerStatus] = useState([]);

  const getDashboardData = () => {
    setDashboardData(dummyDashboardData);
  };

  const getCustomerStatus = () => {
    setCustomerStatus(customerActive);
  };

  useEffect(() => {
    if (authUser) {
      getDashboardData();
      getCustomerStatus();
    }
  }, [authUser]);

  return (
    <div className="flex flex-col pl-3 lg:px-0 mt-5 overflow-y-scroll w-full gap-3 lg:gap-2">
      {/* Header */}
      <div className="flex lg:pl-3 pl-2 items-start justify-center flex-col gap-2">
        <big className="text-2xl font-bold text-white">Dashboard</big>
        <small className="text-sm leading-relaxed">
          Halo,{" "}
          <span className="text-solidThree font-medium">
            {authUser?.fullName}
          </span>
          . Selamat datang kembali di Mang TekTek.
        </small>
      </div>
      {/* Grid Utama */}
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-3 lg:gap-2">
        <div className="flex flex-col gap-3 lg:gap-2 max-w-full">
          <div className="grid grid-cols-3 gap-3 lg:gap-2">
            {/* Orderan Terkirim */}
            <div className="flexStart flex-col lg:flex-row gap-3 lg:gap-7 p-5 bg-secondary rounded-xl">
              <img src={assets.myOrder} alt="" className="w-8" />
              <div className="flex justify-center flex-col">
                <big className="lg:text-xl text-sm font-bold text-solidThree">
                  {delivered.toString().padStart(2, "0")}
                </big>
                <span className="hidden lg:flex text-sm font-medium text-textColor">
                  Pesanan Terkirim
                </span>
              </div>
            </div>
            {/* Pendapatan Total */}
            <div className="flexStart flex-col lg:flex-row gap-3 lg:gap-7 p-5 bg-secondary rounded-xl">
              <img src={assets.revenue} alt="" className="w-8" />
              <div className="flex justify-center flex-col">
                <big className="gap-x-2 lg:text-xl text-sm flex font-bold text-solidThree">
                  <span className="hidden lg:flex">{currency}</span>{" "}
                  {formatPendapatan(revenue)}
                </big>
                <span className="hidden lg:flex text-sm font-medium text-textColor">
                  Pendapatan
                </span>
              </div>
            </div>
            {/* Jumlah Pelanggan Total */}
            <div className="flexStart flex-col lg:flex-row gap-3 lg:gap-7 p-5 bg-secondary rounded-xl">
              <img src={assets.client} alt="" className="w-8" />
              <div className="flex justify-center flex-col">
                <big className="lg:text-xl text-sm font-bold text-solidThree">
                  {customers.toString().padStart(2, "0")}
                </big>
                <span className="hidden lg:flex text-sm font-medium text-textColor">
                  Jumlah Pelanggan
                </span>
              </div>
            </div>
          </div>

          {/* Pendapatan Harian */}
          <div className="bg-secondary flex p-5 w-full rounded-xl">
            <ChartPendapatanTahunan />
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-3 lg:gap-2 mb-3">
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
