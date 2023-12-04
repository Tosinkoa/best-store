import * as Yup from "yup";

export const productFormValidator = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required")
    .min(5, "Product must be at least 2 characters")
    .max(100, "You've reach the limit of 100 characters"),
  in_stock: Yup.number("Value must be a number")
    .positive("Number must be positive")
    .min(1, "Mininum amount is 1")
    .max(500000, "Max amount is 50000")
    .optional(),
  price: Yup.number("Price must be a number")
    .positive("Number must be positive")
    .required("Price is required"),
  crossed_out_price: Yup.number("Value must be a number")
    .positive("Number must be positive")
    .optional(),
});
