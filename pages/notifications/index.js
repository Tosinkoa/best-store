import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import Image from "next/legacy/image";
import { Tab } from "@headlessui/react";

const Notifications = () => {
  return (
    <WebsiteMetadata>
      <div className="space-y-5 lg:w-10/12 mx-auto">
        <div className="flex w-fit flex-col">
          <p className="flex text-lg font-semibold text-primary-800">Notifications</p>
          <div className="border-b-2 border-green-600 w-2/4"></div>
        </div>

        <div className="flex flex-col space-y-2">
          {Array(10)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="relative w-full rounded-md shadow-md bg-neutral-50 md:h-36 h-32 flex items-center px-3 md:px-6"
              >
                <div className="absolute h-20 w-20 border rounded-md right-3 md:right-6">
                  <Image
                    src="/assets/images/speaker.png"
                    alt="product image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="gap-x-4 flex items-center">
                  <div className="relative h-16 w-16 block">
                    <Image
                      src="/assets/images/girl.jpg"
                      objectFit="cover"
                      layout="fill"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <div>
                      <span className="font-semibold">John Doe</span>{" "}
                      <span>added 2 of your product to cart</span>
                    </div>
                    <p className="font-medium text-secondary-400">
                      Best clipper model 2023 with good teeth
                    </p>
                    <p className="font-medium text-secondary-400 text-xs">10min ago</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </WebsiteMetadata>
  );
};

export default AuthorizeHOC(Notifications, getLayout);
