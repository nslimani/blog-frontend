import { useCallback, useContext, useEffect, useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import api from "../api/hello";
import AppContext from "../../components/AppContext.jsx";
import FormField from "../../components/FormField.jsx";
import Button from "../../components/Button.jsx";
import TextArea from "../../components/TextArea.jsx";
import Input from "../../components/Input.jsx";

const EditPost = () => {
  const { session, editPost, router } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const { id } = router.query;
  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await editPost(title, content, id);
      router.reload();
    },
    [editPost, id, router]
  );
  const postSchema = Yup.object()
    .shape({
      title: Yup.string().max(72).required("Le champ est requis"),
      content: Yup.string().required("Le champ est requis"),
    })
    .required();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    api.get("/posts/" + id).then((res) => {
      setPost(res.data.post);
    });
  }, [id, router, router.isReady]);

  return (
    <>
      {post && session.payload.user.id === post.author_id ? (
        <div className="pt-16">
          <Formik
            initialValues={{
              title: post.title,
              content: post.content,
            }}
            validationSchema={postSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting, isValid }) => (
              <form
                className="flex flex-col items-center gap-y-7"
                onSubmit={handleSubmit}
              >
                <div className="text-3xl">Modifier mon article !</div>

                <FormField name="title" as={Input} placeholder="Titre" />
                <FormField name="content" as={TextArea} placeholder="Contenu" />
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
      ) : (
        <div>Forbidden</div>
      )}
    </>
  );
};

export default EditPost;
