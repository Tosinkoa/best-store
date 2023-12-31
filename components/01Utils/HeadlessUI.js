import { Dialog, Listbox, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiFillDelete, AiFillInfoCircle, AiOutlineClose } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Image from "next/legacy/image";

export const MyListbox = ({ options, label, labelIcon, getSelectedData, selected }) => {
  return (
    <>
      {label && (
        <label htmlFor="category" className="flex-row items-center space-x-2 label_style">
          <span>{label ? label : ""}</span>
          {labelIcon ? labelIcon : ""}
        </label>
      )}

      <Listbox value={selected} onChange={(newValue) => getSelectedData(newValue)}>
        {({ open }) => (
          <div className="relative w-full">
            <Listbox.Button className="border-primary-200 rounded-md border-2 focus:border-primary-700 outline-none flex px-3 py-2 w-full bg-inherit text-sm  text-primary-500 text-left">
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
    </>
  );
};

export const MyToggle = ({ label, labelIcon, getSelectedData, enabled }) => {
  /**
   * @todo Make css nested
   */

  return (
    <div className="flex flex-col ">
      <>
        <span className="label_style ">{label ? label : ""}</span>
        {labelIcon ? labelIcon : ""}
      </>
      <Switch
        checked={enabled}
        onChange={(newValue) => getSelectedData(newValue)}
        className={`${enabled ? "bg-primary-600" : "bg-primary-300"}
          relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer  mt-2 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export const MyDialog = ({ dialogTitle, children, isModalOpen, closeModal }) => {
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog onClose={() => {}}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={closeModal}
            className="fixed inset-0 lg:left-[250px] top-[55px] z-30 bg-black bg-opacity-25"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="flex-col w-full h-[calc(100%_-_55px)] md:w-10/12 lg:w-2/4 md:h-[75vh] bg-primary-50 lg:rounded-xl md:rounded-md  absolute z-30 flex inset-0 m-auto top-[55px] lg:left-[250px]">
            <div className="font-semibold  py-4 h-16 border-b w-11/12 mx-auto inset-0 sticky text-2xl flex items-center justify-between z-10">
              <h4 className="text-lg text-primary-800 md:text-xl text-center">
                {dialogTitle}
              </h4>
              <AiOutlineClose
                onClick={closeModal}
                className="h-fit w-fit text-2xl cursor-pointer"
              />
            </div>
            <>{children}</>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
