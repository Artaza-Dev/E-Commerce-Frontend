import React from "react";
import type { ChangeEvent, FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loader from "react-js-loader";
import Input from "../../components/ui/Input";
import CredientialButton from "../../components/ui/CredientialButton";

// Error types
interface FormErrors {
  otp?: string;
}


const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  // Yup schema for OTP
  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{4,6}$/, "OTP must be 4–6 digits only")
      .required("OTP is required"),
  });

  // Handler
  const verifyOtpHandler = async (
    e: FormEvent<HTMLFormElement> | ReactMouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if ("preventDefault" in e) e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // validate otp
      await otpSchema.validate({ otp }, { abortEarly: false });

      // Replace with your backend OTP verification later
      const mockOtp = "123456"; // temporary test otp

      if (otp !== mockOtp) {
        setErrors({ otp: "Invalid OTP. Please try again." });
        setLoading(false);
        return;
      }

      console.log("OTP Verified");
      setOtp("");
      setErrors({});
      // after verification → go to reset password page
      navigate("/reset-password");
    } catch (err: any) {
      const valErrors: FormErrors = {};
      if (err?.inner && Array.isArray(err.inner)) {
        err.inner.forEach((vi: any) => {
          if (vi.path) valErrors[vi.path as keyof FormErrors] = vi.message;
        });
      } else if (err?.path) {
        valErrors[err.path as keyof FormErrors] = err.message;
      }
      setErrors(valErrors);
    } finally {
      setLoading(false);
    }
  };

  // Input handler
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      setter(e.target.value);
    };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div
        className="
          w-full max-w-[500px]
          sm:max-w-[450px]
          md:max-w-[400px]
          lg:max-w-[420px]
          xl:max-w-[450px]
          2xl:max-w-[480px]
          h-auto min-h-[300px]
          sm:min-h-[321px]
          md:min-h-[340px]
          lg:min-h-[360px]
          xl:min-h-[380px]
          2xl:min-h-[400px]
          bg-gray-200 border rounded-2xl shadow-2xl 
          flex flex-col items-center p-6
        "
      >
        {/* Header */}
        <div className="w-full flex flex-col items-center pt-4">
          <ShoppingCart
            size={50}
            className="text-[150px] sm:text-[180px] md:text-[200px] mb-2 shadow-2xl"
          />
          <p className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Verify OTP
          </p>
          <p className="text-xs sm:text-sm text-gray-700 mt-1 text-center">
            Please enter the 6-digit OTP sent to your registered email
          </p>
        </div>

        {/* OTP Input */}
        <form onSubmit={verifyOtpHandler} className="w-full mt-6 space-y-3">
          {loading ? (
            <div className="flex justify-center my-5">
              <Loader
                type="spinner-cub"
                bgColor="#ffffff"
                color="#ffffff"
                size={80}
              />
            </div>
          ) : (
            <>
              <Input
                type="text"
                value={otp}
                placeholder="Enter OTP"
                className="placeholder-gray-300 text-center text-lg tracking-widest"
                onchange={handleChange(setOtp)}
              />
              {errors.otp && (
                <p className="text-sm text-red-600">{errors.otp}</p>
              )}
            </>
          )}
        </form>

        {/* Buttons */}
        <div className="w-full flex flex-col items-center mt-5">
          <CredientialButton
            className="w-[80%] font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
            text={loading ? "Verifying..." : "Verify OTP"}
            onclick={verifyOtpHandler as unknown as () => void}
          />

          <p className="text-xs sm:text-sm mt-3 text-gray-700">
            Didn’t receive OTP?{" "}
            <button
              onClick={() => alert("Resend OTP functionality will be added later")}
              className="text-blue-700 font-medium cursor-pointer hover:text-zinc-800"
            >
              Resend OTP
            </button>
          </p>

          <p className="text-xs sm:text-sm mt-3 text-gray-700">
            Go back to{" "}
            <NavLink
              to="/forgotpassword"
              className="text-blue-700 font-medium cursor-pointer hover:text-zinc-800"
            >
              Forgot Password
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
