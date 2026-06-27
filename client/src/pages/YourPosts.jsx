import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../features/posts/postsSlice";
import Post from "../Components/Posts/Post";

const YourPosts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const userId = user?.result?._id || user?.result?.id || user?._id || user?.id;
  const userName = user?.result?.name || user?.name;

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const yourPosts = posts.filter((post) => {
    if (post.creatorId && userId) {
      return post.creatorId === userId;
    }

    return post.creator === userName;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black px-6 py-8">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-bold">Please sign in</h1>
          <p className="mt-2 text-gray-500">
            Sign in to view the memories you have posted.
          </p>
          <Link
            to="/auth"
            className="mt-5 inline-block rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black">
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-6 text-3xl font-bold text-white">Your Posts</h1>

        {loading ? (
          <h2 className="text-white">Loading...</h2>
        ) : yourPosts.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <h2 className="text-xl font-semibold">No posts yet</h2>
            <p className="mt-2 text-gray-500">
              Create a memory from the home page and it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yourPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default YourPosts;
