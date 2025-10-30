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

// Define types for errors
interface FormErrors {
  email?: string;
  password?: string;
}

// Define type for user data
interface UserData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();

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

  const viewHandler = (): void => setShowPassword((s) => !s);

  // signupHandler accepts either a form submit event OR a button click event
  const signupHandler = async (
    e: FormEvent<HTMLFormElement> | ReactMouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    // prevent default for form submit or button click
    if ("preventDefault" in e) e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // mimic server delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // validate
      await signupSchema.validate(
        {  email, password },
        { abortEarly: false }
      );

      // TODO: replace with your real user store / API call
      const users: UserData[] = []; // placeholder

      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setErrors({
          email: "This email is already registered. Please log in.",
        });
        setLoading(false);
        return;
      }

      const data: UserData = { email, password };
      console.log("Registered:", data);
      setEmail("");
      setPassword("");
      setErrors({});
      navigate("/");
    } catch (err: any) {
      // collect yup validation errors
      const valErrors: FormErrors = {};
      if (err?.inner && Array.isArray(err.inner)) {
        err.inner.forEach((vi: any) => {
          if (vi.path) valErrors[vi.path as keyof FormErrors] = vi.message;
        });
      } else if (err?.path) {
        valErrors[err.path as keyof FormErrors] = err.message;
      } else {
        console.error(err);
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
    <>
        <div className="w-full min-h-screen flex items-center justify-center p-4">
              <div
                className="
                  w-full max-w-[500px] sm:max-w-[450px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[450px] 2xl:max-w-[480px]
            min-h-[500px] bg-gray-200 border 
            rounded-2xl shadow-2xl flex flex-col items-center p-6
                "
              >
                <div className="w-full flex flex-col items-center pt-4">
                 <ShoppingCart size={50} className="text-[150px] sm:text-[180px] md:text-[200px] mb-2 shadow-2xl" />
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
                      to="/"
                      className=" text-blue-700 font-medium cursor-pointer hover:text-zinc-800"
                    >
                      Sign In
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
    </>
  )
}

export default Login