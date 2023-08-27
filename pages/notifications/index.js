import WebsiteMetadata from "@/components/00-WebsiteMetadata/WebsiteMetadata";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Notifications = () => {
  const tabButtonOptions = ["All", "Read", "Unread"];
  const tabContent = [<p>Hellioou</p>, <p>Hellioow</p>, <p>Helliooo</p>];

  return (
    <WebsiteMetadata>
      <div className="mx-4 mb-0 mt-2 md:mt-4">
        <Tab.Group>
          <Tab.List className="flex w-[11/12]  space-x-1 rounded-xl bg-secondary-200 p-1">
            {tabButtonOptions.map((eachTabButtonOption, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 md:text-sm text-xs  font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-secondary-50 shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {eachTabButtonOption}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {tabContent.map((eachTabContent, index) => (
              <Tab.Panel
                key={index}
                className={classNames(
                  "rounded-md h-[73vh] md:h-[78vh]  overflow-y-auto bg-secondary-50 p-4",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 outline-none "
                )}
              >
                {eachTabContent}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </WebsiteMetadata>
  );
};

Notifications.getLayout = getLayout;
export default Notifications;
