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
import userStore from "../../store/userStore";
import { toast } from "react-toastify";

// Define types for errors
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

// Define type for user data
interface UserData {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser } = userStore();
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // Yup Validation Schema (no phone)
  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // show hide password
  const viewHandler = (): void => setShowPassword((s) => !s);

  const signupHandler = async (
    e: FormEvent<HTMLFormElement> | ReactMouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if ("preventDefault" in e) e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await signupSchema.validate(
        { username, email, password },
        { abortEarly: false }
      );

      const data: UserData = { username, email, password };
      const result = await registerUser(data);

      if (result.success) {
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors({});
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        // API error
        toast.error(result.message || "Registration failed");
      }
    } catch (err: any) {
      // Yup validation errors
      if (err?.inner && Array.isArray(err.inner)) {
        const valErrors: FormErrors = {};
        err.inner.forEach((vi: any) => {
          if (vi.path) {
            valErrors[vi.path as keyof FormErrors] = vi.message;
            toast.error(vi.message);
          }
        });
        setErrors(valErrors);
      } else if (err?.path) {
        setErrors({ [err.path]: err.message });
        toast.error(err.message);
      } else {
        toast.error("Something went wrong!");
      }
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
          w-full max-w-[500px] sm:max-w-[450px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[450px] 2xl:max-w-[480px]
    min-h-[500px] bg-gray-200 border 
    rounded-2xl shadow-2xl flex flex-col items-center p-6
        "
      >
        <div className="w-full flex flex-col items-center pt-4">
          <ShoppingCart
            size={50}
            className="text-[150px] sm:text-[180px] md:text-[200px] mb-2 shadow-2xl"
          />
          <p className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Welcome Back
          </p>
          <p className="text-xs sm:text-sm text-gray-700 mt-1">
            Create your account
          </p>
        </div>

        <form onSubmit={signupHandler} className="w-full mt-4 space-y-3">
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
                value={username}
                placeholder="Enter your username"
                className=" placeholder-gray-300"
                onchange={handleChange(setUsername)}
              />
              {errors.username && (
                <p className="text-sm text-red-400">{errors.username}</p>
              )}

              <Input
                type="email"
                value={email}
                placeholder="Enter your email"
                className=" placeholder-gray-300"
                onchange={handleChange(setEmail)}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email}</p>
              )}

              <div className="w-full h-auto relative">
                {showPassword ? (
                  <Eye
                    className="text-md absolute top-4 right-4 cursor-pointer"
                    onClick={viewHandler}
                  />
                ) : (
                  <EyeOff
                    className="text-md absolute top-4 right-4 cursor-pointer"
                    onClick={viewHandler}
                  />
                )}
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  className=" placeholder-gray-300"
                  onchange={handleChange(setPassword)}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
              )}
            </>
          )}
        </form>

        <div className="w-full flex flex-col items-center mt-5">
          <CredientialButton
            className="w-[80%] font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
            text={loading ? "Please wait..." : "Sign Up"}
            onclick={signupHandler as unknown as () => void} // cast if CredientialButton expects no event arg
          />
          <p className=" text-xs sm:text-sm mt-2">
            Do you have an account?{" "}
            <NavLink
              to="/login"
              className=" text-blue-700 font-medium cursor-pointer hover:text-zinc-800"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
