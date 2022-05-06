import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../../components/AppContext.jsx";
import FormField from "../../components/FormField.jsx";
//import ErrorMessage from "../src/components/ErrorMessage";
import Button from "../../components/Button.jsx";

const Register = () => {
  const { register } = useContext(AppContext);
  //const [displayErr, setDisplayErr] = useState(false);
  const registerSchema = Yup.object().shape({
    pseudo: Yup.string()
      .matches("[a-zA-Z]", "No special characters allowed")
      .max(255)
      .required("Le champ est requis"),
    email: Yup.string()
      .email("Invalid email")
      .max(255)
      .required("Le champ est requis"),
    password: Yup.string().required("Le champ est requis"),
  });

  const handleFormSubmit = useCallback(
    async ({ pseudo, email, password }, { resetForm }) => {
      const result = register(pseudo, email, password);

      if (result) {
        setDisplayErr(true);
        resetForm();
      }
    },
    [register]
  );

  return (
    <>
      <div className="flex flex-col p-4 rounded-lg border-2 border-black justify-center w-3/4 mx-auto my-5 items-center gap-y-10">
        <div className="text-3xl font-bold">Nous rejoindre !</div>
        <Formik
          initialValues={{ pseudo: "", email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <form
              noValidate
              className="flex flex-col gap-y-7 items-center h-25 w-80"
              onSubmit={handleSubmit}
            >
              <FormField type="text" name="pseudo" placeholder="Pseudo" />

              <FormField type="test" name="email" placeholder="E-mail" />
              <FormField
                name="password"
                placeholder="Password"
                type="password"
              />
              <Button
                disabled={isSubmitting && !isValid}
                className="self-center"
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
