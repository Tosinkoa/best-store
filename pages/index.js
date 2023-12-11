import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import Footer from "@/components/03Helper/Footer";
import LandingPageBanner from "@/components/PagesComponent/LandingPage/LandingPageBanner";
import LandingPageBestSelling from "@/components/PagesComponent/LandingPage/LandingPageBestSelling";
import LandingPageFlashDeals from "@/components/PagesComponent/LandingPage/LandingPageFlashDeals";
import LandingPageHotDeals from "@/components/PagesComponent/LandingPage/LandingPageHotDeals";
import LandingPageInsight from "@/components/PagesComponent/LandingPage/LandingPageInsight";
import LandingPageShowcaseCard from "@/components/PagesComponent/LandingPage/LandingPageShowcaseCard";
import LandingPageSponsors from "@/components/PagesComponent/LandingPage/LandingPageSponsors";
import LandingPageSupport from "@/components/PagesComponent/LandingPage/LandingPageSupport";

import { getLayout } from "@/components/Layouts/LandingPageLayout";

const Home = () => {
  /**
   * @TODO A message on the dashboard page for new user to ask if they want to set up their store
   */

  return (
    <WebsiteMetadata>
      <LandingPageBanner />
      <LandingPageInsight />
      <LandingPageFlashDeals />
      <LandingPageHotDeals />
      <LandingPageShowcaseCard />
      <LandingPageBestSelling />
      <LandingPageSupport />
      <LandingPageSponsors />
    </WebsiteMetadata>
  );
};
Home.getLayout = getLayout;
export default Home;
