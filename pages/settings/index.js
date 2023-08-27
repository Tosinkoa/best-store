import { getLayout } from "@/components/Layouts/DashboardLayout";
import StoreSetting from "@/components/SellerComponent/Settings/StoreSetting";
import { Tab } from "@headlessui/react";

const Settings = () => {
  return (
    <div className="w-full flex">
      <Tab.Group as="div" className="flex flex-col w-full">
        <Tab.List className="w-fit z-10 flex mx-auto rounded-t-none border-t-0 rounded-md fixed lg:left-[300px] inset-x-0 bg-secondary-50 top-[55px] font-bold border border-secondary-400">
          <Tab>
            <div className="p-2">General Settings</div>
          </Tab>
          <div className="border-r my-2 border-secondary-400 "></div>
          <Tab>
            <div className="p-2">Store Settings</div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-12 flex w-full">
          <Tab.Panel>
            <div>General Settings</div>
          </Tab.Panel>
          <Tab.Panel className="w-full">
            <StoreSetting />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Settings.getLayout = getLayout;
export default Settings;
