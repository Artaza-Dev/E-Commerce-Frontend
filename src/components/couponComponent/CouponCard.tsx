interface CouponProp {
  index: number;
  isActive: Boolean;
  code: String;
  discount: number;
  expiry: Date;
}

const CouponCard: React.FC<CouponProp> = ({
  index,
  isActive,
  code,
  discount,
  expiry,
}) => {
  const formattedDate = new Date(expiry).toLocaleDateString();
  return (
    <div
      key={index}
      className={`
    w-full max-w-[330px] 
    border border-gray-200 rounded-2xl shadow-md 
    p-6 flex flex-col 
    ${!isActive ? "opacity-50" : ""}
  `}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Coupon</h3>
        {isActive && (
          <span className="px-3 py-1 text-xs font-semibold bg-gray-200 rounded-full text-gray-700">
            Active
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-800 font-semibold text-xl">{code}</p>
        <p className="text-gray-600 mt-1">
          Discount: <span className="font-medium">{discount}%</span>
        </p>
        <p className="text-gray-500 mt-1 text-sm">
          Expires on: {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default CouponCard;
