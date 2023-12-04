import LoadingUIWithLogo from "@/components/01Utils/LoadingUIWithLogo";
import { useGetAuthQuery } from "@/store/APIs/authenticationApi";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthorizeHOC = (ChildComponent, Layout) => {
  const ComposeComponent = (props) => {
    const router = useRouter();
    const authResult = useGetAuthQuery();
    const { isError, isFetching, isLoading, isSuccess } = authResult;

    useEffect(() => {
      if (isError && !isFetching) {
        router.push("/auth/login");
      }
    }, [authResult]);

    return (
      <div>
        {isLoading ? (
          <LoadingUIWithLogo />
        ) : (
          !isLoading && isSuccess && !isFetching && <ChildComponent {...props} />
        )}
      </div>
    );
  };

  ComposeComponent.getLayout = Layout;
  return ComposeComponent;
};

export default AuthorizeHOC;
