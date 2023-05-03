import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import Select from "./common/SelectComponent";
import CheckBoxInput from "./common/CheckBoxInput";

const chekBoxOption = [
  { label: "React.js", value: "React.js" },
  { label: "vue.js", value: "Vue.js" },
];

const radioOptions = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];

const selectOptions = [
  { label: "select nationality....", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];

const initialValues = {
  name: "",
  email: "",
  password: "", // _______________  user data
  passwordConfirm: "",
  phoneNumber: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: false,
};
const onSubmit = (values) => {
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const validationSchema = Yup.object({
  //
  name: Yup.string()
    .required("Name is Required")
    .min(6, "Name length is not valid"),
  email: Yup.string()
    .email("invalid Email format")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, //    The main part of our code is related to form validation
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  phoneNumber: Yup.string()
    .required("phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid phone Number")
    .nullable(),
  passwordConfirm: Yup.string()
    .required("Password confrimation is required")
    .oneOf([Yup.ref("password"), null], "Password must machd"),
  gender: Yup.string().required("Gender is requider"),
  nationality: Yup.string().required("select nationality!"),
  intrests: Yup.array().min(1).required("at least select one expertise"),
  terms: Yup.bool()
    .required("the terms and conditions must be accsepted")
    .oneOf([true], "You must accept the terms and conditions"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    //    |_________________________________   Use this option to tell Formik to run validations when the <Formik /> component mounts and/or initialValues change.
    enableReinitialize: true,
  });
  // console.log(formik.values);

  useEffect(() => {
    // axios.get("http://localhost:3001/users").then((res)=setFormValues(res.data)).catch((err)=>console.log(err))
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/*        _________________________________  The onsubmit event occurs when a form is submitted. 
                |       */}
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phoneNumber" label="Phone Number" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirm"
          type="password"
        />
        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
        <Select
          selectOptions={selectOptions}
          name="nationality"
          formik={formik}
        />
        <CheckBoxInput
          formik={formik}
          checkBoxOptions={chekBoxOption}
          name="intrests"
        />
        <div className="borderTop">
          <input
            className="br"
            type="checkbox"
            id="terms"
            name="terms"
            value={true}
            onChange={formik.handleChange}
            checked={formik.values.terms}
          />
          <label htmlFor="terms">terms and conditions</label>

          {formik.errors.terms && formik.touched.terms && (
            <div className="error">{formik.errors.terms}</div>
          )}
          <button type="submit" disabled={!formik.isValid} className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

// 1. managing state
// 2. handeling form submition
// 3. validation - error massage
// => formik
