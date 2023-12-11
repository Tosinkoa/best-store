import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import BusinessSetting from "@/components/PagesComponent/Settings/BusinessSetting";
import ProfileSettings from "@/components/PagesComponent/Settings/ProfileSettings";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Settings = () => {
  const tabButtons = ["Profile Settings", "Business Settings"];
  const tabData = [<ProfileSettings />, <BusinessSetting />];

  return (
    <div className="mx-auto bg-primary-50">
      <Tab.Group>
        <div className="fixed top-[55px] z-10 h-fit w-full bg-primary-50">
          <Tab.List className=" w-fit flex h-fit border-b space-x-5 ">
            {tabButtons.map((eachTabButtons, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "py-2.5 text-sm font-semibold outline-none",
                    " focus:outline-none",
                    selected
                      ? "border-primary-800 text-primary-800  border-b-2"
                      : "text-secondary-500"
                  )
                }
              >
                {eachTabButtons}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="mt-10">
          {tabData.map((eachTabData, index) => (
            <Tab.Panel key={index} className="rounded-xl focus:outline-none">
              {eachTabData}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AuthorizeHOC(Settings, getLayout);
