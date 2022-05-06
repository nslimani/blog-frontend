import { useCallback, useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../../components/AppContext.jsx";
import FormField from "../../components/FormField.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import Button from "../../components/Button.jsx";

const ProfileEdit = () => {
  const { router, session, profileEdit } = useContext(AppContext);
  const { id } = router.query;
  const [displayErr, setDisplayErr] = useState(false);
  const profileEditSchema = Yup.object().shape({
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
      const result = editAccount(id, pseudo, email, password);

      if (result) {
        resetForm();
      }
    },
    [profileEdit, id]
  );

  return (
    <>
      <ErrorMessage display={displayErr}>Email déjà utilisé.</ErrorMessage>
      <div className="flex flex-col p-4 rounded-lg border-2 border-black justify-center w-3/4 mx-auto my-5 items-center gap-y-10">
        <div className="text-3xl font-bold">Modifier mon compte</div>
        <Formik
          initialValues={{
            pseudo: "",
            email: "",
            password: "",
          }}
          validationSchema={profileEditSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <form
              noValidate
              className="flex flex-col gap-y-7 items-center h-25 w-80"
              onSubmit={handleSubmit}
            >
              <FormField name="pseudo" placeholder="Pseudo" />
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
                Modifier !
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProfileEdit;
