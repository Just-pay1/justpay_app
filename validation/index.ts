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

export const userNameSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('Username is required') 
    .min(3, 'Username must be at least 3 characters') 
    .max(12, 'Username must not exceed 12 characters') 
    .matches(/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'), 
});


// pinPage

 export const isValidPin = (pin: string): boolean => {
  //  if all numbers are the same (111111 - 999999)
  if (/^(\d)\1{5}$/.test(pin)) {
    return false;
  }

  // full sequence (123456 - 654321)
  const sequences = [
    "123456",
    "234567",
    "345678",
    "456789",
    "987654",
    "876543",
    "765432",
    "654321",
  ];
  if (sequences.includes(pin)) {
    return false;
  }

  // more than 2 repeated numbers in a row
  if (/(\d)\1{2,}/.test(pin)) {
    return false;
  }

  return true;
};
