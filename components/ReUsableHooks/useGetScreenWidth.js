import { useEffect, useState } from "react";

const useGetScreenWidth = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [isMediumScreen, setIsMediumScreen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isMediumAndSmallScreen, setIsMediumAndSmallScreen] = useState(true);

  useEffect(() => {
    const handleResize = () =>
      innerWidth <= 640 ? setIsSmallScreen(true) : setIsSmallScreen(false);
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () =>
      innerWidth <= 768 ? setIsMediumScreen(true) : setIsMediumScreen(false);
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () =>
      innerWidth >= 1024 ? setIsLargeScreen(true) : setIsLargeScreen(false);
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () =>
      innerWidth < 1024 ? setIsMediumAndSmallScreen(true) : setIsMediumAndSmallScreen(false);
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isMediumAndSmallScreen,
  };
};

export default useGetScreenWidth;
