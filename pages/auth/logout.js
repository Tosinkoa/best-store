import LoadingUICart from "@/components/01Utils/LoadingUICart";
import { getLayout } from "@/components/Layouts/Layout";
import { useLogoutUserMutation } from "@/store/APIs/authenticationApi";
import { fetcherApi } from "@/store/fetcherApi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser, { isLoading: isLoggingOutUser }] = useLogoutUserMutation();

  useEffect(() => {
    const logoutUserHandler = async () => {
      const logoutResult = await logoutUser();
      console.log("logoutResult:", logoutResult);
      if (!isLoggingOutUser) {
        dispatch(fetcherApi.util.resetApiState());
        router.push("/auth/login");
      }
    };
    logoutUserHandler();
  }, [router]);

  return (
    <>
      <h1 className="sr-only">Blank</h1>
      <LoadingUICart />
    </>
  );
};

Logout.getLayout = getLayout;
export default Logout;
