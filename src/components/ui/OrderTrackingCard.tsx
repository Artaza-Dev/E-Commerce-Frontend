import { useEffect } from "react";
import orderStore from "../../store/orderStore";
import { PackageCheck, Truck, CheckCircle, Clock } from "lucide-react";
import Loader from "react-js-loader";

interface IProps {
  onOpen: ( prodId: string, event: any) => void;
}

const OrderTrackingCard: React.FC<IProps> = ({ onOpen }) => {
  const { fetchOrder, Orders, loading } = orderStore();

  useEffect(() => {
    const fetchOrders = async () => {
      window.scrollTo(0, 0);
      await fetchOrder();
    };
    fetchOrders();
  }, []);

  return (
    <div className="w-full max-w-[900px] mx-auto bg-linear-to-br from-gray-50 to-white shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-black bg-clip-text mb-10 tracking-tight">
        Order Tracking
      </h2>

      {loading ? (
        <div className="flex justify-center my-5 min-h-[400px]">
          <Loader
            type="spinner-default"
            bgColor="#000000"
            color="#1D4ED8"
            size={90}
          />
        </div>
      ) : (
        <>
          {Orders?.length > 0 ? (
            Orders.map((order, index) => {
              const statuses = ["Placed", "Processing", "Shipped", "Delivered"];
              const currentStep = statuses.indexOf(order.status);

              const statusIcons = [
                <Clock size={20} />,
                <PackageCheck size={20} />,
                <Truck size={20} />,
                <CheckCircle size={20} />,
              ];

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-md p-6 sm:p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 border-b border-gray-200 pb-4">
                    <p className="text-sm sm:text-base text-gray-700">
                      <span className="font-semibold">Order ID:</span>{" "}
                      <span className="text-gray-900">{order._id}</span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 mt-2 sm:mt-0">
                      <span className="font-semibold">Estimated Delivery:</span>{" "}
                      <span className="text-green-600 font-medium">
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-200 overflow-y-auto max-h-56 pr-2 custom-scroll">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-4"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                            {item?.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-gray-500">
                                No Image
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                              {item?.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Qty: {item?.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-800 mb-4">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </p>

                          {order?.status === "Delivered" && (
                            <button
                              onClick={(e) => onOpen(item.productId, e)}
                              className="w-full bg-black text-white font-semibold py-1 rounded-lg hover:bg-gray-900 transition-all duration-300 cursor-pointer"
                            >
                              Review
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Progress */}
                  <div className="mt-10 px-2 sm:px-6 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2"></div>
                    <div
                      className="absolute top-1/2 left-0 h-1 bg-linear-to-r from-green-500 to-emerald-500 rounded-full -translate-y-1/2 transition-all duration-700"
                      style={{
                        width: `${
                          (currentStep / (statuses.length - 1)) * 100
                        }%`,
                      }}
                    ></div>

                    <div className="relative flex justify-between items-center w-full">
                      {statuses.map((step, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center w-full text-center"
                        >
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                              i <= currentStep
                                ? "bg-green-500 border-green-600 text-white shadow-lg scale-105"
                                : "bg-white border-gray-300 text-gray-400"
                            }`}
                          >
                            {statusIcons[i]}
                          </div>
                          <p
                            className={`mt-2 text-xs sm:text-sm font-medium ${
                              i <= currentStep
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left">
                    <div className="text-sm sm:text-base text-gray-600">
                      Payment:{" "}
                      <span className="font-semibold text-gray-800">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-green-700 mt-3 sm:mt-0">
                      Total: Rs {order.totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No orders found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default OrderTrackingCard;
