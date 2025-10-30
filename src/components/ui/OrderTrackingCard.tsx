interface orderData {
  label: string;
  completed: boolean;
  date: string | null;
}

const OrderTrackingCard = () => {
  const orderSteps: orderData[] = [
    { label: "Order Placed", completed: true, date: "Oct 25, 2025" },
    { label: "Order Confirmed", completed: true, date: "Oct 26, 2025" },
    { label: "Order Packed", completed: true, date: "Oct 27, 2025" },
    { label: "Out for Delivery", completed: true, date: "Oct 28, 2025" },
    { label: "Delivered", completed: true, date: "Oct 29, 2025"  },
  ];

  return (
    <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px] 2xl:w-[800px] bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
         Order Tracking
      </h2>

      {/* Order Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 mb-6">
        <p>
          <span className="font-semibold text-gray-700">Order ID:</span> #ORD123456
        </p>
        <p>
          <span className="font-semibold text-gray-700">Estimated Delivery:</span> Nov 2, 2025
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-1 bg-gray-200"></div>
        <div className="space-y-6">
          {orderSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {step.completed ? "✓" : index + 1}
              </div>
              <div>
                <p
                  className={`font-medium ${
                    step.completed ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-gray-400 mt-1">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-center text-sm font-medium">
        Current Status: <span className="font-semibold">Delivered</span>
      </div>
    </div>
  );
};

export default OrderTrackingCard;
