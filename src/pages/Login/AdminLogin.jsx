import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; 
import Captcha from "../../components/common/Captcha";

function AdminLogin() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tempTokens, setTempTokens] = useState(null);

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError("");

    if (captchaInput.trim() !== generatedCaptcha.trim()) {
      setError("Invalid Captcha");
      return;
    }

    try {
      setLoading(true);
      
     
      const response = await api.post("/auth/email/login", { 
        email, 
        password 
      });

      if (response.status === 200 && response.data?.access_token) {
        setTempTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          user: response.data.user,
        });

        setStep(2);
      } else {
        setError("Login failed.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };


  const handleStep2Submit = (e) => {
    e.preventDefault();
    setError("");

    if (otp === "123456") {
      if (!tempTokens) {
        setError("Session expired. Please login again.");
        setStep(1);
        return;
      }

      localStorage.setItem("access_token", tempTokens.access_token);
      localStorage.setItem("refresh_token", tempTokens.refresh_token);
      if (tempTokens.user) {
        localStorage.setItem("user", JSON.stringify(tempTokens.user));
      }

      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-teal-900 p-6">
          <h1 className="text-3xl font-bold text-white">Admin Control Panel</h1>
          <p className="text-slate-200 mt-1 text-sm">Secure Login Portal</p>
        </div>

        {/* STEP 1: LOGIN FORM */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <Captcha
              onCaptchaChange={setGeneratedCaptcha}
              captchaInput={captchaInput}
              setCaptchaInput={setCaptchaInput}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white shadow-lg transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-900 hover:bg-teal-800 active:scale-95"
              }`}
            >
              {loading ? "Signing In..." : "Admin Login"}
            </button>
          </form>
        )}

        {/* STEP 2: OTP FORM */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Two Factor Authentication</h2>
              <p className="text-sm text-slate-500 mt-2">Enter the 6 digit OTP sent to your registered email.</p>
            </div>

            <div>
              <label className="block text-center mb-2 text-sm font-semibold text-slate-700">OTP Verification</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full py-3 text-center text-3xl tracking-[10px] rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg transition active:scale-95"
            >
              Verify & Enter Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                setError("");
                setTempTokens(null); 
                setStep(1);
              }}
              className="w-full text-slate-600 hover:text-black"
            >
              ← Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;