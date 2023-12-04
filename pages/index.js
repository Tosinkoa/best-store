import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import Footer from "@/components/03Helper/Footer";
import LandingPageBanner from "@/components/LandingPage/LandingPageBanner";
import LandingPageBestSelling from "@/components/LandingPage/LandingPageBestSelling";
import LandingPageFlashDeals from "@/components/LandingPage/LandingPageFlashDeals";
import LandingPageHotDeals from "@/components/LandingPage/LandingPageHotDeals";
import LandingPageInsight from "@/components/LandingPage/LandingPageInsight";
import LandingPageShowcaseCard from "@/components/LandingPage/LandingPageShowcaseCard";
import LandingPageSponsors from "@/components/LandingPage/LandingPageSponsors";
import LandingPageSupport from "@/components/LandingPage/LandingPageSupport";

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
