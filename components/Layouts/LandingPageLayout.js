import Footer from "../03Helper/Footer";
import LandingPageNavbar from "../PagesComponent/LandingPage/LandingPageNavbar";
import { getLayout as getSiteLayout } from "./Layout";

const LandingPageLayout = ({ children }) => {
  return (
    <div className="text-secondary-700 text-sm md:text-sm relative bg-primary-50 overflow-hidden bottom-0 font-roboto">
      <LandingPageNavbar />
      <div className="w-full overflow-y-auto h-[calc(100%_-_90px)]">{children}</div>
      <Footer />
    </div>
  );
};

export const getLayout = (page) =>
  getSiteLayout(<LandingPageLayout>{page}</LandingPageLayout>);

export default LandingPageLayout;
