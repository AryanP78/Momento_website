import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchPosts } from "../features/posts/postsSlice";

import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black">
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Posts />
          </div>

          <Form />
        </div>
      </main>
    </div>
  );
}

export default Home;
