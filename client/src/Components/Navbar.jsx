import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <nav className="flex items-center justify-between bg-slate-950 px-8 py-4 shadow">
      <Link to="/" className="text-3xl font-bold text-blue-500">
        📸 Momento
      </Link>
      <div className="gap-2">
        <span className="m-2">
          <Link to="/" className="text-white">
            Home
          </Link>
        </span>

        <span className="m-2">
          {user && (
            <Link to="/posts" className="text-white">
              Your Posts
            </Link>
          )}
        </span>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="font-semibold text-white">{user.result?.name}</span>

          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/auth"
            className="rounded border border-gray-600 px-5 py-2 text-white"
          >
            Login
          </Link>

          <Link to="/auth" className="rounded bg-blue-600 px-5 py-2 text-white">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
