import { useEffect, useState } from "react";
import {
  assets,
  customerActive,
  dummyDashboardData,
  dummyTopSell,
} from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import { CountUpAnimation } from "../../components/admin/CountUpAnimation";
import ChartPendapatanHarian from "../../components/admin/ChartPendapatanHarian";

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
  const [category, setCategory] = useState("makanan");

  const [customerStatus, setCustomerStatus] = useState([]);

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
    (item) => item.product?.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="flex flex-col mt-5 overflow-y-scroll w-full gap-2">
      <div className="flex pl-3 items-start justify-center flex-col gap-2">
        <big className="text-2xl font-bold text-white">Dashboard</big>
        <small className="text-sm">
          Halo,{" "}
          <span className="text-solidThree">
            {user?.firstName} {user?.lastName}
          </span>
          . Selamat datang kembali di Mang TekTek.
        </small>
      </div>
      <div className="mt-2 grid grid-cols-[3fr_1fr] gap-2">
        <div className="flex flex-col gap-2 max-w-[900px]">
          <div className="grid grid-cols-3 gap-2">
            <div className="flexStart gap-7 p-5 bg-secondary lg:min-w-56 rounded-xl">
              <img src={assets.myOrder} alt="" className="hidden sm:flex w-8" />
              <div className="flex justify-center flex-col">
                <big className="md:text-xl text-lg font-bold text-solidThree">
                  {delivered.toString().padStart(2, "0")}
                </big>
                <span className="md:text-sm text-xs font-medium text-textColor">
                  Pesanan Terkirim
                </span>
              </div>
            </div>
            <div className="flexStart gap-7 p-5 bg-secondary lg:min-w-56 rounded-xl">
              <img src={assets.revenue} alt="" className="hidden sm:flex w-8" />
              <div className="flex justify-center flex-col">
                <big className="md:text-xl text-lg font-bold text-solidThree">
                  {currency} {revenue.toFixed(3)}
                </big>
                <span className="md:text-sm text-xs font-medium text-textColor">
                  Pendapatan
                </span>
              </div>
            </div>
            <div className="flexStart gap-7 p-5 bg-secondary lg:min-w-56 rounded-xl">
              <img src={assets.client} alt="" className="hidden sm:flex w-8" />
              <div className="flex justify-center flex-col">
                <big className="md:text-xl text-lg font-bold text-solidThree">
                  {customers.toString().padStart(2, "0")}
                </big>
                <span className="md:text-sm text-xs font-medium text-textColor">
                  Jumlah Pelanggan
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Pendapatan Harian */}
            <div className="bg-secondary flex p-5 w-full rounded-xl">
              <ChartPendapatanHarian />
            </div>
            {/* Menu yang Laku */}
            <div className="flex flex-col w-1/2 bg-secondary p-2 rounded-xl">
              <div className="grid grid-cols-2 p-2 pb-4 border-b border-[#49535d] items-center gap-2">
                <span className="text-base font-bold text-textColor">
                  Top Menu
                </span>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="outline-none bg-primary text-textColor text-xs font-medium h-8 w-full p-1 rounded-md cursor-pointer"
                >
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="desert">Desert</option>
                </select>
              </div>
              <div className="flex flex-col mt-3 h-[260px] overflow-y-auto">
                {filteredTopMenu.map((top, index) => (
                  <div key={index} className="flex flex-col gap-2 p-2">
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
                      <hr className="border-b border-[#49535d] mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Client */}
        <div className="flex p-2 flex-col items-start w-full bg-secondary rounded-xl gap-4">
          <span className="text-base pt-2 pl-2 font-bold text-textColor">
            Pelanggan
          </span>
          <hr className="w-full border-b border-[#49535d]" />
          <div className="flex flex-col gap-2 w-full h-[360px] overflow-y-auto">
            {customerStatus.map((stats, on) => (
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
      <div className="grid grid-cols-[2fr_1fr] gap-2 mb-3">
        <div className="bg-secondary">
          <span>SSS</span>
        </div>
        <div className="bg-secondary">
          <span>PPP</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
