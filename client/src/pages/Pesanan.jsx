import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import { assets, dummyOrdersData } from "../assets/data";

const Pesanan = () => {
  const { currency, user } = useAppContext();
  const [orders, setOrders] = useState([]);

  const loadOrderData = () => {
    setOrders(dummyOrdersData);
  };

  useEffect(() => {
    if (user) {
      loadOrderData();
    }
  }, [user]);

  return (
    <div className="max-padd-container pb-16 pt-28 bg-primary">
      <Title
        title1={"Pesanan"}
        title2={"Gue"}
        titleStyles={"pb-5 items-start"}
        paraStyles={"text-start max-w-xl leading-relaxed"}
        para={
          "Segera laporkan melalui kontak yang tertera pada website Mang TekTek jika pengirim tidak kunjung tiba."
        }
      />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img src={assets.emptyOrder} alt="empty-cart" className="w-80 mb-6" />
          <h3 className="text-lg md:text-xl font-semibold text-textColor">
            Waduh, kamu belum memesan menu apapun!
          </h3>
          <p className="text-[11px] md:text-sm text-textColor font-medium mt-2">
            Ayo pilih dulu menu favoritmu dan segera pesan sekarang juga.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-secondary p-2 mt-3 rounded-2xl">
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-3">
              {order.items.map((item, idx) => {
                const sizeName = item.product.sizeMeans[item.size] || item.size;

                return (
                  <div
                    key={idx}
                    className="text-textColor px-2 py-3 w-full lg:w-[40%]"
                  >
                    <div className="flex flex-2 gap-x-3">
                      <div className="flexCenter">
                        <img
                          src={item.product.images[0]}
                          alt="menu"
                          className="max-h-20 max-w-20 object-contain"
                        />
                      </div>
                      <div className="block w-full">
                        <h5 className="text-lg line-clamp-1">
                          {item.product.title}
                        </h5>

                        <div className="flex items-center gap-y-2 gap-x-5 mt-3">
                          <div className="flex items-center gap-x-2">
                            <h5 className="text-sm font-bold">Harga: </h5>
                            <p className="text-sm text-solidThree font-medium">
                              {currency}{" "}
                              {Number(item.product.price[item.size]).toFixed(3)}
                            </p>
                          </div>

                          <div className="flex items-center gap-x-2">
                            <h5 className="text-sm font-bold">Kuantitas: </h5>
                            <p className="text-sm text-solidThree font-medium">
                              {item.quantity}
                            </p>
                          </div>

                          <div className="flex items-center gap-x-2">
                            <h5 className="text-sm font-bold">Ukuran: </h5>
                            <p className="text-sm text-solidThree font-medium">
                              {sizeName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t-2 border-primary p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-x-2">
                  <h5 className="text-sm font-bold">Kode Pesanan: </h5>
                  <p className="text-solidThree font-medium text-sm break-all">
                    {order._id}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center gap-x-2">
                    <h5 className="text-sm font-bold">Status: </h5>
                    <p className="text-solidThree font-medium text-sm">
                      {order.isPaid ? "Sudah Bayar" : "Belum Bayar"}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <h5 className="text-sm font-bold">Metode: </h5>
                    <p className="text-solidThree font-medium text-sm">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center gap-x-2">
                    <h5 className="text-sm font-bold">Tanggal: </h5>
                    <p className="text-solidThree font-medium text-sm">
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        timeZone: "Asia/Jakarta",
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <h5 className="text-sm font-bold">Jumlah: </h5>
                    <p className="text-solidThree font-medium text-sm">
                      {order.amount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <span className="min-w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-solidThree font-medium text-sm">
                    {order.status}
                  </p>
                </div>

                <button
                  onClick={loadOrderData}
                  className="btn-dark py-1 text-sm rounded-sm"
                >
                  Lacak
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Pesanan;
