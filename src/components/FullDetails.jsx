// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "./Layout";

// const FullDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const tailor = location.state?.tailor || {};

//   const [photo, setPhoto] = useState(null);

//   const saveData = () => {
//     alert("Details Saved");
//   };

//   const resetPassword = () => {
//     alert("Password Reset Successfully");
//   };

//   const deleteTailor = () => {
//     if (window.confirm("Delete this tailor?")) {
//       alert("Tailor Deleted");
//       navigate(-1);
//     }
//   };

//   return (
//     <>
//     <div className="flex  ">
//     <div>  <Layout /></div>

//     <div className="h-screen  w-full top-0 bg-gray-100 p-2 overflow-hidden">

//       {/* Header */}

//       <div className="bg-[#006B6B] rounded-lg text-white p-2 flex justify-between items-center mb-2">
//         <h1 className="text-sm font-bold">
//           Tailor Full Details
//         </h1>

//         <button
//           onClick={() => navigate(-1)}
//           className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-xs"
//         >
//           Back
//         </button>
//       </div>

//       {/* Main */}

//       <div className="bg-white rounded-lg shadow-lg p-2 h-[calc(100vh-90px)] flex flex-col justify-between">

//         {/* Profile */}

//         <div>

//           <div className="flex items-center gap-4 mb-3">

//             <img
//               src={
//                 photo
//                   ? URL.createObjectURL(photo)
//                   : "https://via.placeholder.com/70"
//               }
//               alt=""
//               className="w-16 h-16 rounded-full border-2 border-teal-700 object-cover"
//             />

//             <div>
//               <p className="text-xs font-semibold mb-1">
//                 Profile Photo
//               </p>

//               <input
//                 type="file"
//                 accept=".jpg,.jpeg,.png"
//                 className="text-[10px]"
//                 onChange={(e) =>
//                   setPhoto(e.target.files[0])
//                 }
//               />
//             </div>

//           </div>

//           {/* Details */}

//           <div className="grid  grid-col-1 md:grid-cols-3 gap-2 text-xs">

//             <div>
//               <label>Name</label>
//               <input
//                 defaultValue={tailor?.name}
//                 className="w-full border rounded p-1"
//               />
//             </div>

//             <div>
//               <label>Email</label>
//               <input
//                 defaultValue={tailor?.email}
//                 className="w-full border rounded p-1"
//               />
//             </div>

//             <div>
//               <label>Phone</label>
//               <input
//                 defaultValue={tailor?.phone}
//                 className="w-full border rounded p-1"
//               />
//             </div>

//             <div>
//               <label>Role</label>
//               <input
//                 defaultValue={tailor?.role}
//                 className="w-full border rounded p-1"
//               />
//             </div>

//             <div>
//               <label>Status</label>
//               <input
//                 defaultValue={
//                   tailor?.active
//                     ? "Active"
//                     : "Inactive"
//                 }
//                 className="w-full border rounded p-1"
//               />
//             </div>

//             <div>
//               <label>Verification</label>
//               <input
//                 defaultValue={
//                   tailor?.verify
//                     ? "Verified"
//                     : "Pending"
//                 }
//                 className="w-full border rounded p-1"
//               />
//             </div>

//             <div className="col-span-3">
//               <label>Address</label>

//               <textarea
//                 rows="1"
//                 defaultValue={tailor?.address}
//                 className="w-full border rounded p-1"
//               />
//             </div>

//           </div>

//           {/* KYC */}

//           <div className="mt-3">

//             <h2 className="text-xs font-bold text-[#006B6B] mb-2">
//               KYC Documents
//             </h2>

//             <div className="grid grid-cols-3 gap-2">

//               <div>
//                 <label className="text-xs">
//                   Aadhaar
//                 </label>

//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.png,.pdf"
//                   className="w-full text-[10px]"
//                 />
//               </div>

//               <div>
//                 <label className="text-xs">
//                   PAN
//                 </label>

//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.png,.pdf"
//                   className="w-full text-[10px]"
//                 />
//               </div>

//               <div>
//                 <label className="text-xs">
//                   Other
//                 </label>

//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.png,.pdf"
//                   className="w-full text-[10px]"
//                 />
//               </div>

//             </div>

//           </div>

//         </div>

//         {/* Buttons */}

//         <div className="border-t pt-2">

//           <div className="flex justify-center gap-2 flex-wrap">

//             <button className="bg-[#006B6B] hover:bg-[#006B6B] text-white px-3 py-1 rounded text-xs">
//               Edit
//             </button>

//             <button
//               onClick={saveData}
//               className="bg-[#006B6B] hover:bg-[#006B6B] text-white px-3 py-1 rounded text-xs"
//             >
//               Save
//             </button>

//             <button
//               onClick={resetPassword}
//               className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded text-xs"
//             >
//               Reset Password
//             </button>

//             <button
//               onClick={deleteTailor}
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
//             >
//               Delete
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//     </div>

//     </>
//   );
// };

// export default FullDetails;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { ArrowLeft, Edit, Save, KeyRound, Trash2,CreditCard, Camera, FileUp, FileSearch, FileX2  } from "lucide-react";

const FullDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tailor = location.state?.tailor || {};

  const [photo, setPhoto] = useState(null);

  const saveData = () => {
    alert("Details Saved Successfully");
  };

  const resetPassword = () => {
    alert("Password Reset Successfully");
  };

  const deleteTailor = () => {
    if (window.confirm("Delete this tailor?")) {
      alert("Tailor Deleted");
      navigate(-1);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Layout />

      {/* Main Content */}
      <div className="flex-1 p-2">
        <div className="h-full bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-white text-lg font-bold">
                Tailor Full Details
              </h1>
              <p className="text-teal-100 text-xs">
                Manage tailor profile information
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-xs font-medium"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
            {/* Profile Section */}
            {/* <div className="border rounded-lg bg-slate-50 p-3 mb-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      photo
                        ? URL.createObjectURL(photo)
                        : "https://via.placeholder.com/80"
                    }
                    alt="profile"
                    className="w-20 h-20 rounded-full border-4 border-teal-600 object-cover"
                  />

                  <label className="absolute bottom-0 right-0 bg-teal-600 p-1 rounded-full cursor-pointer text-white">
                    <Camera size={12} />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-gray-500">
                      Tailor ID
                    </label>
                    <input
                      defaultValue={tailor?.id || "T001"}
                      className="w-full border rounded-md p-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500">Name</label>
                    <input
                      defaultValue={tailor?.name}
                      className="w-full border rounded-md p-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500">Phone</label>
                    <input
                      defaultValue={tailor?.phone}
                      className="w-full border rounded-md p-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div> */}
            {/* Profile Section */}
<div className="border rounded-lg bg-slate-50 p-3 mb-3">
  <div className="flex items-center gap-4">
    <div className="relative">
      <img
        src={
          photo
            ? URL.createObjectURL(photo)
            : "https://via.placeholder.com/80"
        }
        alt="profile"
        className="w-20 h-20 rounded-full border-4 border-teal-600 object-cover"
      />

      <label className="absolute bottom-0 right-0 bg-teal-600 p-1 rounded-full cursor-pointer text-white">
        <Camera size={12} />
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </label>
    </div>

    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <div>
        <label className="text-[11px] text-gray-500">
          Tailor ID
        </label>
        <input
          defaultValue={tailor?.id || "T001"}
          className="w-full border rounded-md p-1.5 text-xs"
        />
      </div>

      <div>
        <label className="text-[11px] text-gray-500">
          Name
        </label>
        <input
          defaultValue={tailor?.name}
          className="w-full border rounded-md p-1.5 text-xs"
        />
      </div>

     

      <div>
        <label className="text-[11px] text-gray-500">
          Phone
        </label>
        <input
          defaultValue={tailor?.phone}
          className="w-full border rounded-md p-1.5 text-xs"
        />
      </div>
    </div>
  </div>
</div>

            {/* Information Grid */}
            {/* <div className="grid grid-cols-4 gap-3 mb-3">
              <select
                defaultValue={tailor?.role || ""}
                className="w-full border rounded-md p-1.5 text-xs"
              >
                <option value="" disabled hidden>
                  Select Role
                </option>

                <option value="Tailor">Tailor</option>
                <option value="Vendor">Vendor</option>
              </select>

              <select
                defaultValue={tailor?.Status || ""}
                className="w-full border rounded-md p-0.5 text-xs"
              >
                 <option value="" disabled hidden>
                  Select Status
                </option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <select
                defaultValue={tailor?.verify || ""}
                className="w-full border rounded-md p-0.5 text-xs"
              > <option value="" disabled hidden>
                  Select Verify
                </option>
                <option>Verified</option>
                <option>Pending</option>
              </select>
            </div> */}
            {/* Information Grid */}
<div className="grid grid-cols-4 gap-2 mb-3">
  <select
    defaultValue={tailor?.role || ""}
    className="w-full border rounded-md px-2 py-1 text-[11px] h-8"
  >
    <option value="" disabled hidden>
      Select Role
    </option>
    <option value="Tailor">Tailor</option>
    <option value="Vendor">Vendor</option>
  </select>

  <select
    defaultValue={tailor?.Status || ""}
    className="w-full border rounded-md px-2 py-1 text-[11px] h-8"
  >
    <option value="" disabled hidden>
      Select Status
    </option>
    <option>Active</option>
    <option>Inactive</option>
  </select>

  <select
    defaultValue={tailor?.verify || ""}
    className="w-full border rounded-md px-2 py-1 text-[11px] h-8"
  >
    <option value="" disabled hidden>
      Select Verify
    </option>
    <option>Verified</option>
    <option>Pending</option>
  </select>

  <input
    type="email"
    defaultValue={tailor?.email}
    placeholder="Email Address"
    className="w-full border rounded-md px-2 py-1 text-[11px] h-8"
  />
</div>

            {/* Address */}
            <div className="mb-3">
              <label className="text-[11px] text-gray-500">Address</label>

              <textarea
                rows="2"
                defaultValue={tailor?.address}
                className="w-full border rounded-md p-2 text-xs resize-none"
              />
            </div>

            {/* KYC Section */}
            {/* <div className="mb-3">
              <h2 className="text-sm font-semibold text-teal-700 mb-2">
                KYC Documents
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <div className="border rounded-lg p-3 bg-slate-50">
                  <p className="text-xs font-medium mb-2">Aadhaar Card</p>
                  <button>Upload</button>
                  <button>View</button>
                  <button>Delete</button>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="text-[10px] w-full"
                  />
                </div>

                <div className="border rounded-lg p-3 bg-slate-50">
                  <p className="text-xs font-medium mb-2">PAN Card</p>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="text-[10px] w-full"
                  />
                </div>

                <div className="border rounded-lg p-3 bg-slate-50">
                  <p className="text-xs font-medium mb-2">Other Document</p>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="text-[10px] w-full"
                  />
                </div>
              </div>
            </div> */}
            {/* KYC Documents */}
<div className="mb-3">
  <h2 className="text-sm font-semibold text-teal-700 mb-2">
    KYC Documents
  </h2>

  <div className="grid grid-cols-3 gap-3">
    {/* Aadhaar Card */}
    <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 hover:shadow-sm transition">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-700">
          Aadhaar Card
        </p>

        <div className="flex items-center gap-1">
          <button
            title="Upload"
            className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 transition"
          >
            <FileUp size={15} className="text-blue-600" />
          </button>

          <button
            title="View"
            className="p-1.5 rounded-md bg-green-50 hover:bg-green-100 transition"
          >
            <FileSearch size={15} className="text-green-600" />
          </button>

          <button
            title="Delete"
            className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 transition"
          >
            <FileX2 size={15} className="text-red-600" />
          </button>
        </div>
      </div>

      {/* <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="w-full text-[10px] border rounded-md p-1"
      /> */}
    </div>

    {/* PAN Card */}
    <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 hover:shadow-sm transition">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-700">
          PAN Card
        </p>

        <div className="flex items-center gap-1">
          <button
            title="Upload"
            className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 transition"
          >
            <FileUp size={15} className="text-blue-600" />
          </button>

          <button
            title="View"
            className="p-1.5 rounded-md bg-green-50 hover:bg-green-100 transition"
          >
            <FileSearch size={15} className="text-green-600" />
          </button>

          <button
            title="Delete"
            className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 transition"
          >
            <FileX2 size={15} className="text-red-600" />
          </button>
        </div>
      </div>

      {/* <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="w-full text-[10px] border rounded-md p-1"
      /> */}
    </div>

    {/* Other Document */}
    <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 hover:shadow-sm transition">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-700">
          Other Document
        </p>

        <div className="flex items-center gap-1">
          <button
            title="Upload"
            className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 transition"
          >
            <FileUp size={15} className="text-blue-600" />
          </button>

          <button
            title="View"
            className="p-1.5 rounded-md bg-green-50 hover:bg-green-100 transition"
          >
            <FileSearch size={15} className="text-green-600" />
          </button>

          <button
            title="Delete"
            className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 transition"
          >
            <FileX2 size={15} className="text-red-600" />
          </button>
        </div>
      </div>

      {/* <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="w-full text-[10px] border rounded-md p-1"
      /> */}
    </div>
  </div>
</div>

            {/* Footer Buttons */}
            <div className="border-t pt-3 mt-auto">
              <div className="flex justify-center gap-3 flex-wrap">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium">
                  <Edit size={14} />
                  Edit
                </button>

                <button
                  onClick={saveData}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-medium"
                >
                  <Save size={14} />
                  Save
                </button>

                <button
                  onClick={resetPassword}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-medium"
                >
                  <KeyRound size={14} />
                  Reset Password
                </button>

                <button
                  onClick={deleteTailor}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-medium"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullDetails;
