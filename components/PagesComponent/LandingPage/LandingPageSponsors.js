import Image from "next/legacy/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingPageSponsors = () => {
  const sponsorsData = [
    { id: 1, image: "/assets/images/tesla.png" },
    { id: 2, image: "/assets/images/paypal.png" },
    { id: 3, image: "/assets/images/microsoft.png" },
    { id: 4, image: "/assets/images/shopify.png" },
    { id: 5, image: "/assets/images/ebay.png" },
    { id: 6, image: "/assets/images/amazon.png" },
    { id: 6, image: "/assets/images/mac-donald.png" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  return (
    <div>
      <Slider className="md:px-5 flex lg:px-12 px-2 my-10 overflow-hidden" {...settings}>
        {sponsorsData.map((eachSponsorData) => (
          <div key={eachSponsorData.id} className="relative block h-[60px] w-full">
            <Image
              src={eachSponsorData.image}
              alt="sponsor image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LandingPageSponsors;
