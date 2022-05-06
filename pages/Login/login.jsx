import { useCallback, useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../../components/AppContext.jsx";
import FormField from "../../components/FormField.jsx";
//import ErrorMessage from "../src/components/ErrorMessage";
import Button from "../../components/Button.jsx";

const Login = () => {
  const { login } = useContext(AppContext);
  //const [displayErr, setDisplayErr] = useState(false);
  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      const result = await login(email, password);

      if (!result) {
        setDisplayErr(true);
      }
    },
    [login]
  );

  const loginSchema = Yup.object()
    .shape({
      email: Yup.string()
        .email("Invalid email")
        .max(255)
        .required("Le champ est requis"),
      password: Yup.string().required("Le champ est requis"),
    })
    .required();

  return (
    <>
      <div className="flex flex-col p-4 rounded-lg border-2 border-black justify-center w-3/4 mx-auto my-5 items-center gap-y-10">
        <div className="text-3xl font-bold">Sign in</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <form
              noValidate
              className="flex flex-col gap-y-7 items-center h-25 w-80"
              onSubmit={handleSubmit}
            >
              <FormField name="email" placeholder="E-mail" />
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
                Connexion
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
