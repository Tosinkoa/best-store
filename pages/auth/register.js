import AlreadyAuthorizeHOC from "@/HOC/AlreadyAuthorizedHOC";
import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import BestAppLogo from "@/components/01Utils/BestAppLogo";
import CustomToast from "@/components/01Utils/CustomToast";
import { ErrorGetter } from "@/components/01Utils/ErrorGetter";
import MyInput from "@/components/01Utils/Formik";
import LoginAndRegisterSidebar from "@/components/Auth/LoginAndRegisterSidebar";
import { getLayout } from "@/components/Layouts/LoginAndRegisterLayout";
import { useRegisterUserMutation } from "@/store/APIs/authenticationApi";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Register = () => {
  const router = useRouter();
  const [registerUser, { isLoading: registerUserIsLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");

  const showPasswordHandler = () => {
    if (showPassword === "password") setShowPassword("text");
    else setShowPassword("password");
  };

  const showConfirmPasswordHandler = () => {
    if (showPassword === "password") setShowConfirmPassword("text");
    else setShowConfirmPassword("password");
  };

  const registerUserHandler = async (values) => {
    const { confirm_password, ...newValues } = values;
    const result = await registerUser(newValues);
    if (result?.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      toast.warning(errorResult);
    } else router.push("/product");
  };

  const validation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Kindly enter a valid email")
      .max(120, "Email character is too long, kindly use a different email address"),
    first_name: Yup.string()
      .required("First name is required")
      .min(2, "First name must be a min of 2 characters")
      .max(40, "First name must be a max of 40 characters"),
    last_name: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be a min of 2 characters")
      .max(40, "Last name must be a max of 40 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be max of 20 characters"),
    confirm_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <WebsiteMetadata>
      <LoginAndRegisterSidebar>
        <div className="flex w-full h-[100vh] relative pb-10 overflow-y-auto">
          <div className="w-full px-7 lg:px-20 h-fit md:my-auto mt-16 text-secondary-600">
            <Link href="/" passHref className=" md:hidden text-primary-500 text-2xl mb-10">
              <BestAppLogo />
            </Link>
            <div className=" my-6 flex-col flex gapy-3 font-semibold text-secondary-500">
              <h1 className="text-3xl md:text-4xl tracking-tight font-semibold">
                Create an account
              </h1>
              <p>Find seller around you easily or create a free store to become seller</p>
            </div>
            <Formik
              onSubmit={registerUserHandler}
              validationSchema={validation}
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirm_password: "",
              }}
            >
              {() => (
                <Form className="gap-y-4 w-full flex flex-col">
                  <div className=" flex flex-col">
                    <MyInput
                      placeholder="First Name"
                      name="first_name"
                      className="h-10  focus:outline-none focus:placeholder:text-xs w-full font-semibold pb-2 border-0 focus:border-b-2 focus:border-blue-600 focus:border-0 border-b border-secondary-500 focus:ring-0 pl-4"
                    />
                  </div>
                  <div className=" flex flex-col">
                    <MyInput
                      placeholder="Last Name"
                      name="last_name"
                      className="h-10  focus:outline-none  focus:placeholder:text-xs  w-full font-semibold  pb-2 border-0 focus:border-b-2 focus:border-blue-600 focus:border-0 border-b border-secondary-500 focus:ring-0 pl-3"
                    />
                  </div>
                  <div className=" flex flex-col">
                    <MyInput
                      placeholder="Email"
                      name="email"
                      className="h-10  focus:outline-none  focus:placeholder:text-xs  w-full font-semibold  pb-2 border-0 focus:border-b-2 focus:border-blue-600 focus:border-0 border-b border-secondary-500 focus:ring-0 pl-3"
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <button
                      type="button"
                      onClick={showPasswordHandler}
                      className=" absolute right-4 top-5 text-xl border-none flex text-gray-800  bottom-3 cursor-pointer "
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
                  <div className="flex flex-col relative">
                    <button
                      type="button"
                      onClick={showConfirmPasswordHandler}
                      className=" absolute right-4 top-5 text-xl border-none flex text-gray-800  bottom-3 cursor-pointer "
                    >
                      {showConfirmPassword === "password" ? (
                        <BsEye className="text-gray-800" />
                      ) : (
                        <BsEyeSlash className="text-gray-800" />
                      )}
                    </button>
                    <MyInput
                      placeholder="Confirm Password"
                      type={showConfirmPassword}
                      name="confirm_password"
                      className="h-10 focus:outline-none px-0 focus:ring-0 focus:placeholder:text-xs  w-full font-semibold mt-3 border-0 focus:border-b-2 focus:border-0 border-b pb-2 pl-3"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={registerUserIsLoading}
                    className="flex mt-4 w-full py-2 lg:py-3 place-content-center items-center bg-secondary-900 font-semibold rounded-md text-secondary-50 shadow h-12"
                  >
                    {registerUserIsLoading ? (
                      <span className="loading_spinner"></span>
                    ) : (
                      "Register"
                    )}
                  </button>
                  <div className="border rounded-md flex flex-row items-center gap-x-2 md:text-sm lg:text-base font-semibold w-full place-content-center py-2">
                    <FcGoogle className="text-2xl" />
                    <p>Sign up with Google</p>
                  </div>
                  <div className="font-semibold w-fit mx-auto">
                    <span>Have an account?</span>{" "}
                    <Link href="/auth/login" passHref className="underline text-secondary-800">
                      Sign In
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

export default AlreadyAuthorizeHOC(Register);
