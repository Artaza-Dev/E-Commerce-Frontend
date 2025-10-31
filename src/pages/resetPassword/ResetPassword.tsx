import React from "react";
import type {
  ChangeEvent,
  FormEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { Eye, EyeOff, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loader from "react-js-loader";
import Input from "../../components/ui/Input";
import CredientialButton from "../../components/ui/CredientialButton";

// Define error type
interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

// Define user data type
interface PasswordData {
  password: string;
  confirmPassword: string;
}

const NewPassword: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  // Yup validation schema for password reset
  const resetSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  });

  // toggle view handlers
  const togglePassword = (): void => setShowPassword((s) => !s);
  const toggleConfirmPassword = (): void => setShowConfirmPassword((s) => !s);

  // reset handler
  const resetHandler = async (
    e: FormEvent<HTMLFormElement> | ReactMouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if ("preventDefault" in e) e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate
      await resetSchema.validate({ password, confirmPassword }, { abortEarly: false });

      // Replace with API call to actually reset password
      const data: PasswordData = { password, confirmPassword };
      console.log("Password Reset Successful", data);

      // clear states
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      navigate("/login");
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

  // generic change handler
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
          h-auto min-h-[400px]
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
            Reset Password
          </p>
          <p className="text-xs sm:text-sm text-gray-700 mt-1 text-center">
            Enter your new password below
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={resetHandler} className="w-full mt-6 space-y-3">
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
              {/* New Password Input */}
              <div className="w-full h-auto relative">
                {showPassword ? (
                  <Eye
                    className="text-md absolute top-4 right-4 cursor-pointer"
                    onClick={togglePassword}
                  />
                ) : (
                  <EyeOff
                    className="text-md absolute top-4 right-4 cursor-pointer"
                    onClick={togglePassword}
                  />
                )}
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter new password"
                  className="placeholder-gray-300"
                  onchange={handleChange(setPassword)}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}

              {/* Confirm Password Input */}
              <div className="w-full h-auto relative">
                {showConfirmPassword ? (
                  <Eye
                    className="text-md absolute top-4 right-4 cursor-pointer"
                    onClick={toggleConfirmPassword}
                  />
                ) : (
                  <EyeOff
                    className="text-md absolute top-4 right-4 cursor-pointer"
                    onClick={toggleConfirmPassword}
                  />
                )}
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Confirm new password"
                  className="placeholder-gray-300"
                  onchange={handleChange(setConfirmPassword)}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </>
          )}
        </form>

        {/* Buttons */}
        <div className="w-full flex flex-col items-center mt-6">
          <CredientialButton
            className="w-[80%] font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
            text={loading ? "Resetting..." : "Reset Password"}
            onclick={resetHandler as unknown as () => void}
          />

          <p className="text-xs sm:text-sm mt-3 text-gray-700">
            Remembered your password?{" "}
            <NavLink
              to="/login"
              className="text-blue-700 font-medium cursor-pointer hover:text-zinc-800"
            >
              Go to Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
