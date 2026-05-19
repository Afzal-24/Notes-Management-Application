import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "../store/slices/auth.slice";
import type { RootDispatch, RootState } from "../store";
import { ACCENT } from "./Dashboard";
import { Sparkles } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    await dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #7c3aed 100%)`,
            }}
          >
            <Sparkles size={30} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 transition"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-white font-semibold transition hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: ACCENT }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
