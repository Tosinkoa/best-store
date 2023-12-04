import AlreadyAuthorizeHOC from "@/HOC/AlreadyAuthorizedHOC";
import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import BestAppLogo from "@/components/01Utils/BestAppLogo";
import CustomToast from "@/components/01Utils/CustomToast";
import { ErrorGetter } from "@/components/01Utils/ErrorGetter";
import MyInput from "@/components/01Utils/Formik";
import LoginAndRegisterSidebar from "@/components/Auth/LoginAndRegisterSidebar";
import { getLayout } from "@/components/Layouts/LoginAndRegisterLayout";
import { useLoginUserMutation } from "@/store/APIs/authenticationApi";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [loginUser, { isLoading: loginUserIsLoading }] = useLoginUserMutation();

  const showPasswordHandler = () => {
    if (showPassword === "password") setShowPassword("text");
    else setShowPassword("password");
  };

  const validation = Yup.object({
    email: Yup.string().required("Email is required").email("Kindly enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be max of 20 characters"),
  });

  const loginUserHandler = async (values) => {
    const newValues = { remember, ...values };
    const result = await loginUser(newValues);

    if (result?.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      return toast.warning(errorResult);
    } else router.push("/product");
  };

  return (
    <WebsiteMetadata>
      <LoginAndRegisterSidebar>
        <div className="flex w-full h-[100vh] relative">
          <div className="w-full px-7 lg:px-20 h-fit md:my-auto mt-16  text-secondary-600">
            <Link href="/" passHref className=" md:hidden text-primary-500 text-2xl mb-10">
              <BestAppLogo />
            </Link>
            <h1 className="text-3xl md:text-4xl tracking-tight font-semibold my-6">
              Log in to your account
            </h1>
            <Formik
              onSubmit={loginUserHandler}
              initialValues={{ email: "", password: "" }}
              validationSchema={validation}
            >
              {() => (
                <Form className="gap-y-4 w-full flex flex-col">
                  <div className=" flex flex-col">
                    <MyInput
                      placeholder="Email"
                      type="text"
                      name="email"
                      className="h-10 focus:outline-none focus:placeholder:text-xs  w-full font-semibold  pb-2 border-0 focus:border-b-2 focus:border-blue-600 focus:border-0 border-b border-secondary-500 focus:ring-0 pl-3"
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <button
                      type="button"
                      onClick={showPasswordHandler}
                      className=" absolute right-4 top-5 text-xl border-none flex text-gray-800  bottom-3 cursor-pointer"
                    >
                      {showPassword === "password" ? (
                        <BsEye className="text-gray-800" />
                      ) : (
                        <BsEyeSlash className="text-gray-800" />
                      )}
                    </button>
                    <MyInput
                      placeholder="Password"
                      name="password"
                      type={showPassword}
                      className="h-10 focus:outline-none px-0 focus:ring-0 focus:placeholder:text-xs  w-full font-semibold mt-3 border-0 focus:border-b-2 focus:border-0 border-b pb-2 pl-3"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <label htmlFor="remember" className="flex items-center ">
                      <input
                        type="checkbox"
                        id="remember"
                        defaultChecked={false}
                        name="remember"
                        value={remember}
                        onChange={(e) => setRemember((remember) => !remember)}
                        className="mr-2"
                      />
                      <span className="text-sm">Remember Me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Forgot Password
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="flex mt-4 w-full py-2 lg:py-3 place-content-center items-center bg-secondary-900 font-semibold rounded-md text-secondary-50 shadow h-10"
                  >
                    {loginUserIsLoading ? (
                      <span className="border-2 rounded-full h-6 flex mx-auto w-6 border-b-0 animate-spin"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                  <div className="border rounded-md flex flex-row items-center gap-x-2 md:text-sm lg:text-base font-semibold w-full place-content-center py-2">
                    <FcGoogle className="text-2xl" />
                    <p>Sign in with Google</p>
                  </div>
                  <div className="font-semibold w-fit mx-auto">
                    <span> Don't have an account?</span>{" "}
                    <Link href="/auth/register" className="underline text-secondary-800">
                      {" "}
                      Sign up
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <CustomToast />
        </div>
      </LoginAndRegisterSidebar>
    </WebsiteMetadata>
  );
};

export default AlreadyAuthorizeHOC(Login);
