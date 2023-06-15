import React, { useState } from "react";
import avatar from "../../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import useFetch from "../../hooks/fetch.hook";
import { updateUser } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import logo from '../../img/logo.png'
import email from '../../img/email.jpg'
import calender from '../../img/calender.jpg'
import event from '../../img/event.jpg'
import logout from '../../img/logout.png'
import update from '../../img/update.png'

export default function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="logo">
        <img src={logo} alt="easyclass" />
        <h4 className="topic">Yojana Digitech</h4>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card" style={{ width: "25rem" }}>
          <div className="upper-section">
            <div className="card-body">
              <label htmlFor="profile">
                <img
                  className="img"
                  src={apiData?.profile || file || avatar}
                  alt="avatar"
                />
                {/* <img className="pic" src="./img/profile.png" alt="none" ></img> */}
              </label>

              <input
                className="input-fields"
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="card-body name">
              <input
                className="input-fields dist"
                {...formik.getFieldProps("firstName")}
                type="text"
                placeholder="FirstName"
              />
              <input
                className="input-fields dist"
                {...formik.getFieldProps("lastName")}
                type="text"
                placeholder="LastName"
              />
            </div>
          </div>
          <div className="card-body contact">
            <span className="phone">Phone:</span>    
            <input
              className="input-fields"
              {...formik.getFieldProps("mobile")}
              type="text"
              placeholder="Mobile No."
            />
          </div>
          <div className="card-body ">
            <img className="img" src={email} alt="profile" />
            {/* <!-- <i className="fa-solid fa-envelope fa-2xl" style="color: #eb8d0a;"></i> --> */}
            <input
              className="input-fields up"
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="Email*"
            />
          </div>
        </div>

        <div className="card" style={{ width: "25rem" }}>
          
          <div className="card-body ">
            <img className="img" src={calender} alt="profile" />
            {/* <!-- <i className="fa-solid fa-calendar-days fa-2xl" style="color: #eb8d0a;"></i> --> */}
            {/* <!-- <i className="fa-regular fa-calendar-circle-plus" style="color: #eb8d0a;"></i> --> */}
            <span className="up">Your Previous Events</span>
          </div>
          <div className="card-body">
            <img className="img" src={event} alt="profile" />
            {/* <!-- <i className="fa-solid fa-calendar-days fa-2xl" style="color: #eb8d0a;"></i> --> */}
            <span className="up">Add New Events</span>
          </div>
        </div>

        <div className="card" style={{ width: "25rem" }}>
          <div className="card-body">
            <img className="img" src={update} alt="profile" />
            {/* <!-- <i className="fa-solid fa-pen-nib fa-2xl" style="color: #eb8d0a;"></i> --> */}
            {/* <!-- <i className="fa-sharp fa-light fa-file-pen fa-2xl" style="color: #eb8d0a;"></i> --> */}
            <button className="sign-btn up" type="submit">
              Update
            </button>
          </div>
        </div>

        <div className="card" style={{ width: "25rem" }}>
          <div className="card-body">
          <img className="img" src={logout} alt="profile" />
            <button className="sign-btn up" onClick={userLogout} to="/">
              Logout
            </button>
          </div>
        </div>

        {/* <div class="card" style={{"width": "0rem;"}}>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
  </ul>
</div> */}
      </form>
    </div>
  );
}
