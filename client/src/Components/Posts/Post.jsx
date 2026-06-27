import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../features/posts/postsSlice";

function Post({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const creatorName =
    post.creator || post.name || post.creatorName || "Unknown creator";
  const likeCount = post.likes?.length || post.likeCount || 0;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
      <img
        src={post.selectedFile || "https://placehold.co/600x400?text=No+Image"}
        alt={post.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="mt-1 text-sm font-medium text-gray-500">
          By {creatorName}
        </p>

        <p className="mt-2 text-gray-600">{post.message}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex justify-between">
          <button
            onClick={() => dispatch(likePost(post._id))}
            className="text-blue-600 hover:text-blue-800"
          >
            ❤️ {likeCount}
          </button>

          {user && (
            <button
              disabled={!user}
              onClick={() => dispatch(deletePost(post._id))}
              className="text-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
