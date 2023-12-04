import { useField } from "formik";
import useAutosizeTextArea from "../ReusableHooks/useAutoResizeTextArea";
import { useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { IoMdArrowDropup } from "react-icons/io";

export default function MyInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      {label && <label className="label_style">{label}</label>}
      <input {...field} {...props} />

      <div className="form_error">{meta.touched && meta.error ? meta.error : ""}</div>
    </>
  );
}

export function MySelect({ label, name, options, selectClassName }) {
  const [field, meta] = useField(name);

  return (
    <>
      {label && <label className="label_style">{label}</label>}
      <select className={selectClassName} {...field}>
        {options.map((option) => (
          <option key={option.value} className=" animate-select border-b-2 border-gray-700">
            {option.name}
          </option>
        ))}
      </select>
      <div className="form_error">{meta.touched && meta.error ? meta.error : ""}</div>
    </>
  );
}

export function MyTextArea({ label, labelClassName, maxHeightPx, ...props }) {
  const textAreaRef = useRef(null);
  const [field, meta, helpers] = useField(props);
  useAutosizeTextArea(textAreaRef, field.value, maxHeightPx);

  return (
    <>
      {label && <label className="label_style">{label}</label>}
      <textarea {...field} {...props} ref={textAreaRef} />
      {meta.touched && meta.error ? <div className="form_error">{meta.error}</div> : ""}
    </>
  );
}
