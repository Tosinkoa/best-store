import LoadingUIWithLogo from "@/components/01Utils/LoadingUIWithLogo";
import { useGetAuthQuery } from "@/store/APIs/authenticationApi";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AlreadyAuthorizeHOC = (ChildComponent, Layout) => {
  const ComposeComponent = (props) => {
    const router = useRouter();
    const authResult = useGetAuthQuery();
    const { isError, isSuccess, isLoading, isFetching } = authResult;

    useEffect(() => {
      if (
        (router.pathname === "/auth/login" || router.pathname === "/auth/register") &&
        !isError &&
        isSuccess &&
        !isFetching
      ) {
        router.back();
      }
    }, [authResult, router]);

    return (
      <div>
        {!isLoading && isError && !isFetching && <ChildComponent {...props} />}
        {isLoading && <LoadingUIWithLogo />}
      </div>
    );
  };

  ComposeComponent.getLayout = Layout;
  return ComposeComponent;
};

export default AlreadyAuthorizeHOC;
