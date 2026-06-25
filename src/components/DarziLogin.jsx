import { useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  User,
  MapPin,
  Briefcase,
  FileText,
} from "lucide-react";

const DarziLogin = () => {
  const [loginData, setLoginData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    experience_years: "",
    specialization: "",
  });


  
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const inputStyle =
    "w-full bg-white border border-gray-300 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#F26507] focus:border-[#F26507]";

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: loginData.full_name,
      email: loginData.email,
      phone: loginData.phone,
      address: loginData.address,
      city: loginData.city,
      pincode: loginData.pincode,
      experience_years: Number(loginData.experience_years),
      specialization: loginData.specialization
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    console.log("Sending Data :", payload);

    try {
      const response = await axios.post(
        "http://192.168.1.17:8000/api/v1/auth/email/signup",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("API Response :", response.data);

      setIsSuccess(true);
      setMessage("Profile created successfully.");

      setLoginData({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        experience_years: "",
        specialization: "",
      });
    } catch (error) {
      console.log("API Error :", error);
      console.log("Response :", error.response?.data);

      setIsSuccess(false);

      setMessage(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data?.detail) ||
          "Something went wrong!"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  // Reset Form
  const handleReset = () => {
    setLoginData({
      full_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      experience_years: "",
      specialization: "",
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-teal-700 rounded-3xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1
            className="text-4xl mt-2"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            <span className="text-white">Darzi</span>
            <span className="text-[#F26507]">Creation</span>
          </h1>

          <p className="text-sm text-white mt-2">
            Fill your Details here.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`text-sm text-center py-3 rounded-xl mb-4 ${
              isSuccess
                ? "bg-green-100 border border-green-300 text-green-700"
                : "bg-red-100 border border-red-300 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={loginData.full_name}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={loginData.phone}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Address */}
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={loginData.address}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* City */}
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={loginData.city}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Pincode */}
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={loginData.pincode}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Experience */}
          <div className="relative">
            <Briefcase
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="number"
              name="experience_years"
              placeholder="Experience (Years)"
              value={loginData.experience_years}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Specialization */}
          <div className="relative">
            <FileText
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization (Shirt, Pant, Blazer)"
              value={loginData.specialization}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#F26507] hover:bg-[#d95500] text-white font-semibold py-3 rounded-xl transition-all"
            >
              Create
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DarziLogin;