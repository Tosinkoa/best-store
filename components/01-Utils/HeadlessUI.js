import { Listbox, Switch } from "@headlessui/react";
import { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export const MyListbox = ({ options, label, labelIcon, getSelectedData }) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="flex flex-col w-full">
      {
        <label
          htmlFor="cartegory"
          className="flex-row items-center space-x-2 label_style"
        >
          <span>{label ? label : ""}</span>
          {labelIcon ? labelIcon : ""}
        </label>
      }

      <Listbox
        value={selected}
        onChange={(newValue) => {
          setSelected(newValue);
          getSelectedData(newValue);
        }}
      >
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="border-primary-200 rounded-md border-2 focus:border-primary-700 outline-none  px-3 py-2 w-full bg-inherit text-sm font-semibold text-primary-500 text-left">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <IoMdArrowDropdown
                  className={`h-5 w-5 text-primary-800 ${
                    open
                      ? "-rotate-180 transform duration-500"
                      : "rotate-0 transform duration-500"
                  } `}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-100 text-primary-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export const MyToggle = ({ label, labelIcon, getSelectedData }) => {
  const [enabled, setEnabled] = useState(false);

  console.log("enabled:", enabled);

  /**
   * @todo Make css nested
   */

  return (
    <div className="flex flex-col">
      <>
        <span className="label_style ">{label ? label : ""}</span>
        {labelIcon ? labelIcon : ""}
      </>
      <Switch
        checked={enabled}
        onChange={(newValue) => {
          setEnabled(newValue);
          getSelectedData(newValue);
        }}
        className={`${enabled ? "bg-primary-600" : "bg-primary-300"}
          relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer  mt-2 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-8" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};
