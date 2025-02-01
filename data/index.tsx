import { ILoginInput, IRegisterInput } from "@/interfaces";

export const welcomeSlides = [
  {
    id: "1",
    img: require("../assets/images/slides/slide1.png"),
    title: "Payment Made Easy",
    description:
      "Experience a hassle-free payment process with our intuitive interface, making transactions quick and convenient.",
  },
  {
    id: "2",
    img: require("../assets/images/slides/slide2.png"),
    title: "A Card That Does It All",
    description:
      "Our all-in-one card simplifies your spending, offering rewards, tracking, and security features in one sleek package.",
  },
  {
    id: "3",
    img: require("../assets/images/slides/slide3.png"),
    title: "Safe Transfer Money",
    description:
      "Transfer money securely with state-of-the-art encryption, ensuring your financial transactions are always protected.",
  },
  {
    id: "4",
    img: require("../assets/images/slides/slide4.png"),
    title: "Offers",
    description:
      "Unlock exclusive offers and discounts tailored just for you, maximizing your savings while enjoying our services.",
  },
];
export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "name",
    placeholder: "Username",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
    
  },// confirm password
];
export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];
