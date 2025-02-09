import * as Yup from "yup";

export const userRegisterSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Name must be alphanumeric"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).+$/,
      "Password must follow the rules below"
    )
    .max(20, "Password cannot exceed 20 characters"),

    confirmPassword: Yup.string()
    .required("Confirm Password is required") 
    .oneOf([Yup.ref("password")], "Passwords must match"), 
    // Ensures (confirm password) matches the (password) field

  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Not a valid email address."
    ),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
}).required();

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Not a valid email address."
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
}).required();



/*export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
  .required("Password is required")
  .min(8, "Use 8 or more characters with a mix of letters, numbers, and symbols")
  .matches(
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).+$/,
    "Password must have upper "
  )
  .max(20, "Password cannot exceed 20 characters"),

  confirmPassword: Yup.string()
  .required("Confirm Password is required") 
  .oneOf([Yup.ref("password")], "Passwords must match"), 
  // Ensures (confirm password) matches the (password) field
});*/



export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Use 8 or more characters with a mix of letters, numbers, and symbols.")
    .matches(/[A-Z]/, "Password must contain an uppercase letter.")
    .matches(/[0-9]/, "Password must contain a number.")
    .matches(/[!@#$%]/, "Password must contain a special character (!@#$%).")
    .max(20, "Password cannot exceed 20 characters"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Both passwords must match"),
});

export const requirements = [
  {
    text: "Uppercase Letter",
    test: (pass: string) => /[A-Z]/.test(pass),
  },
  {
    text: "Minimum 1 Number",
    test: (pass: string) => /[0-9]/.test(pass),
  },
  {
    text: "Special Character(!@#$%)",
    test: (pass: string) => /[!@#$%]/.test(pass),
  },
];
