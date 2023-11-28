import React, { useState } from "react";
import ReUseForm from "../Forms/ReUseForm";
import axios from "axios";

import "../Styles/SuperHome.css";
import { useNavigate } from "react-router-dom";

export default function AddAdmin() {
  const [err, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const input = [
    {
      type: "text",
      placeholder: "ADMIN NAME",
      name: "Name",
      required: true,
    },
    {
      type: "date",
      placeholder: "START DATE",
      name: "StartDate",
      required: true,
    },
    {
      type: "number",
      placeholder: "PHONE NUMBER ",
      name: "phoneNumber",
      required: true,
    },
    {
      type: "email",
      placeholder: "EMAIL ADDRESS",
      name: "email",
      required: true,
    },
    {
      type: "password",
      placeholder: "PASSWORD",
      name: "password",
      required: true,
    },
    {
      type: "text",
      placeholder: "AADHAAR",
      name: "aadhaar",
    },
    {
      type: "text",
      placeholder: "COMPANY NAME",
      name: "CompanyName",
    },
    {
      type: "text",
      placeholder: "COMPANY LOCATION",
      name: "CompanyLocation",
    },

    {
      type: "text",
      placeholder: "INDUSTRY",
      name: "Industry",
    },
    {
      type: "text",
      placeholder: "WEBSITE",
      name: "Website",
    },
  ];
  
  const onSubmit = async (formData) => {
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key,
    };
    const SuperAdminId = localStorage.getItem("unique_id");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/superAdmin/addAdmin/${SuperAdminId}`,
        formData,
        { headers }
      );
      if (res) {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setError("");
          setSucess("Admin Added Sucessfully")
          // navigate("/v1/Admins");
        }
      }
    } catch (error) {
      // console.log(error,'error');
    }
  };

  return (
    <>
      <div className="form-addpro">
       
{sucess && <div className="sucess-admin">{sucess}</div>}
        {err && <div className="error">{err}</div>}
        <div></div>
        <ReUseForm
          Method="POST"
          inputs={input}
          onSubmit={onSubmit}
          btnText="Submit"
        />
      </div>
      {/* </div> */}
    </>
  );
}
