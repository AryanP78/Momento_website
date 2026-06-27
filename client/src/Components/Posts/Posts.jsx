import { useSelector } from "react-redux";
import Post from "./Post";

function Posts() {
  const { posts, loading } = useSelector((state) => state.posts);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <h2 className="text-xl font-semibold">No memories yet 📸</h2>

        <p className="mt-2 text-gray-500">
          Create your first memory using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
