import { ErrorGetter } from "@/components/01Utils/ErrorGetter";
import LoadingUIWithLogo from "@/components/01Utils/LoadingUIWithLogo";
import { getLayout } from "@/components/Layouts/Layout";
import {
  useCreateUserOtpQuery,
  useValidateUserOtpMutation,
} from "@/store/APIs/authenticationApi";
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import { ToastContainer, toast } from "react-toastify";
import CustomToast from "@/components/01Utils/CustomToast";
import { useRouter } from "next/router";

const CodeInput = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const [validateUserOtp, { isLoading: isValidatingOtp }] = useValidateUserOtpMutation();
  const {
    data: createUserOtpData,
    isSuccess: isCreateUserOtpDataSuccess,
    isError: isCreateUserOtpError,
    isLoading: isCreateUserOtpDataLoading,
  } = useCreateUserOtpQuery();

  const validateUserOtpHandler = async () => {
    const body = { token };
    const result = await validateUserOtp(body);
    if (result?.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);
      return toast.warning(errorResult);
    } else {
      // Check if loggedin user  have any product in their cart before logging in
      toast.success("Verification successful!");
      setTimeout(() => {
        router.push("/product");
      }, 1000);
    }
  };
  return (
    <>
      {isCreateUserOtpDataLoading && <LoadingUIWithLogo />}
      {!isCreateUserOtpDataLoading && isCreateUserOtpDataSuccess && (
        <div className="code-input-bg">
          <div className="flex flex-col gap-y-4 items-center justify-center h-fit w-[95%] max-w-[500px] rounded-xl bg-white py-20 border-neutral-200">
            <h1 className="font-semibold text-2xl">OTP Verification</h1>
            <p className="bg-green-100 p-4 rounded-md text-center">
              We've sent a verification code to your email.
            </p>
            <VerificationInput
              onChange={setToken}
              validChars="0-9"
              classNames={{
                characterInactive: "bg-primary-100",
                character: "rounded-md ",
              }}
            />
            <button
              onClick={validateUserOtpHandler}
              className="bg-primary-700 text-secondary-50 mt-5 font-semibold h-12 w-28 rounded-md"
            >
              {isValidatingOtp ? <div className="loading_spinner"></div> : "Verify"}
            </button>
          </div>
          <CustomToast />
        </div>
      )}
    </>
  );
};

CodeInput.getLayout = getLayout;
export default CodeInput;
