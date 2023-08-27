import { useField } from "formik";
import useAutosizeTextArea from "../ReUsableHooks/useAutoResizeTextArea";
import { useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { IoMdArrowDropup } from "react-icons/io";

export default function MyInput({ label, labelClassName, ...props }) {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      {label && (
        <label className={`${labelClassName ? labelClassName : "mylabel"} label_style`}>
          {label}
        </label>
      )}
      <input {...field} {...props} />

      <div className="text-sm mb-2 h-3 text-rose-600  font-medium">
        {meta.touched && meta.error ? meta.error : ""}
      </div>
    </>
  );
}

export function MySelect({ label, labelClassName, name, options, selectClassName }) {
  const [field, meta] = useField(name);

  return (
    <>
      <label
        className={`${labelClassName ? labelClassName : "mylabel"} font-bold`}
        htmlFor={name}
      >
        {label}
      </label>
      <select className={selectClassName} {...field}>
        {options.map((option) => (
          <option key={option.id} className=" animate-select border-b-2 border-gray-700">
            {option.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? <div className="form_error">{meta.error}</div> : ""}
    </>
  );
}

export function MyTextArea({ label, labelClassName, maxHeightPx, ...props }) {
  const textAreaRef = useRef(null);
  const [field, meta, helpers] = useField(props);
  useAutosizeTextArea(textAreaRef, field.value, maxHeightPx);

  return (
    <>
      <div className={`${labelClassName ? labelClassName : "mylabel"} font-bold`}>
        <label>{label}</label>
      </div>
      <textarea {...field} {...props} ref={textAreaRef} />
      {meta.touched && meta.error ? <div className="form_error">{meta.error}</div> : ""}
    </>
  );
}
