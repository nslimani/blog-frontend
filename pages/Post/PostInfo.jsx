import Link from "next/link";
import { useCallback, useContext } from "react";
import AppContext from "../../components/AppContext.jsx";
import moment from "moment";
import "moment/locale/fr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Post = (props) => {
  moment.locale("fr");
  const { session, router, deletePost } = useContext(AppContext);
  const { post } = props;

  const handleDeleteClick = useCallback(
    async (id) => {
      await deletePost(id);
      router.reload();
    },
    [router, deletePost]
  );

  return (
    <div className="flex flex-col w-2/4 border-b-2 border-green-500 rounded p-3">
      <Link href={"/Post/" + post.id}>
        <a className="text-xl font-bold hover:underline">{post.title}</a>
      </Link>
      <div>{post.content}</div>
      <div className="text-gray-600 text-sm self-end flex gap-x-2 italic">
        par {post.author} le{" "}
        {moment(post.createdAt).format("dddd DD MMM yyyy à HH:mm")}
        {session &&
        (session.payload.user.id === post.author_id ||
          session.payload.user.role === 3) ? (
          <div className="flex text-2xl">
            <Link href={"/Post/" + post.id + "/PostEdit"}>
              <AiFillEdit className="hover:text:bg-green-700 cursor-pointer" />
            </Link>
            <AiFillDelete
              className="hover:text:bg-green-700 cursor-pointer"
              onClick={() => handleDeleteClick(post.id)}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Post;
