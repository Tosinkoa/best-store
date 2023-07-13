import BestAppLogo from "@/components/01-Utils/BestAppLogo";
import MyInput from "@/components/01-Utils/Formik";
import { getLayout } from "@/components/Layouts/LoginAndRegisterLayout";
import { Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex w-full h-[100vh] relative">
      <div className="w-full px-7 lg:px-20 h-fit md:my-auto mt-16  text-secondary-600">
        <div className=" md:hidden text-primary-500 text-2xl mb-10">
          <BestAppLogo />
        </div>
        <h1 className="text-3xl md:text-4xl tracking-tight font-semibold my-6">Log in to your account</h1>
        <Formik onSubmit={(values) => console.log(values)} initialValues={{ email: "", password: "" }}>
          {() => (
            <Form className="gap-y-4 w-full flex flex-col">
              <div className=" flex">
                <MyInput
                  placeholder="Email"
                  name="email"
                  className="h-10 focus:outline-none  focus:placeholder:text-xs  w-full border-0 font-semibold border-b pb-2"
                />
              </div>
              <div className=" flex">
                <MyInput
                  placeholder="Password"
                  name="password"
                  className="h-10 focus:outline-none  focus:placeholder:text-xs  w-full border-0 font-semibold mt-3 border-b pb-2"
                />
              </div>
              <button className="flex mt-4 w-full py-2 lg:py-3 place-content-center items-center bg-secondary-900 font-semibold rounded-md text-secondary-50 shadow">
                Login
              </button>
              <div className="border rounded-md flex flex-row items-center gap-x-2 md:text-sm lg:text-base font-semibold w-full place-content-center py-2">
                <FcGoogle className="text-2xl" />
                <p>Sign in with Google</p>
              </div>
              <div className="font-semibold w-fit mx-auto">
                <span> Don't have an account?</span> <span className="underline text-secondary-800"> Sigin</span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

Login.getLayout = getLayout;
export default Login;
