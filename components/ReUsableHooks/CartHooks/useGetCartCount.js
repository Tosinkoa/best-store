import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetCartCount = (
  allCartData,
  isUserAuthenticatedLoading,
  isUserAuthenticatedError
) => {
  const [totalProductInCart, setTotalProductInCart] = useState(null);
  const isAddingCartToLocalStorage = useSelector(
    (state) => state.addedCartToLocalStorage.isAddingCartToLocalStorage
  );
  const [localStorageCartProductCount, setLocalStorageCartProductCount] = useState(null);

  useEffect(() => {
    // If user is yet to log in, get cart products from localStorage
    if (!isUserAuthenticatedLoading && isUserAuthenticatedError) {
      if (typeof window !== "undefined") {
        const localStorageCartProduct = localStorage.getItem("cart_products");
        if (localStorageCartProduct) {
          const parsedData = JSON.parse(localStorageCartProduct);
          const allProductCount = parsedData.map((eachCartData) => eachCartData.product_count);
          const totalPrice = allProductCount.reduce((acc, num) => acc + num, 0);
          setLocalStorageCartProductCount(totalPrice);
        }
      }
    }
  }, [isUserAuthenticatedLoading, isUserAuthenticatedError, isAddingCartToLocalStorage]);

  useEffect(() => {
    if (allCartData?.data?.length > 0) {
      const allProductCount = allCartData?.data?.map(
        (eachCartData) => eachCartData.product_count
      );
      const totalPrice = allProductCount.reduce((acc, num) => acc + num, 0);
      setTotalProductInCart(totalPrice);
    }
  }, [allCartData]);

  return {
    totalProductInCart,
    localStorageCartProductCount,
  };
};

export default useGetCartCount;
