import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../../features/posts/postsSlice";

function Form() {
  const { user } = useSelector((state) => state.auth);
  const [postData, setPostData] = useState({
    title: "",
    creator: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const clear = () => {
    setPostData({
      title: "",
      creator: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow">
        <h2 className="text-xl font-bold">Please sign in</h2>

        <p className="mt-2 text-gray-500">
          Sign in to create and share memories.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPost({
        ...postData,
        creator: postData.creator || user?.result?.name || user?.name || "",
      }),
    );

    clear();

    console.log(postData);
  };
  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPostData({
        ...postData,
        selectedFile: reader.result,
      });
    };
  };
  return (
    <div className="self-start rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Create a Memory</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        />

        {/* Creator */}
        <input
          type="text"
          placeholder="Creator"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        />

        {/* Message */}
        <textarea
          rows="4"
          placeholder="Message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(","),
            })
          }
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => convertToBase64(e.target.files[0])}
        />

        {/* Buttons */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={() =>
            setPostData({
              title: "",
              creator: "",
              message: "",
              tags: "",
              selectedFile: "",
            })
          }
          className="w-full rounded-lg bg-gray-300 py-3 font-semibold hover:bg-gray-400"
        >
          Clear
        </button>
      </form>
    </div>
  );
}

export default Form;
