import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const Captcha = ({
  onCaptchaChange,
  captchaInput,
  setCaptchaInput,
}) => {
  const [captcha, setCaptcha] = useState("");

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < 5; i++) {
      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setCaptcha(result);

    if (onCaptchaChange) {
      onCaptchaChange(result);
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700">
        Verification
      </label>

      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-slate-100 border rounded-lg flex justify-center items-center">
          <span
            className="text-2xl font-bold tracking-[5px] text-teal-900 select-none"
            style={{
              fontFamily: "monospace",
              textDecorationColor: "#f97316",
            }}
          >
            {captcha}
          </span>
        </div>

        <button
          type="button"
          onClick={generateCaptcha}
          className="h-12 w-12 flex items-center justify-center rounded-lg bg-teal-900 text-white hover:bg-teal-800"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <input
        type="text"
        required
        placeholder="Enter Captcha"
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
      />
    </div>
  );
};

export default Captcha;