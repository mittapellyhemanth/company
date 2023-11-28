import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import "../Styles/Login.css";
import './Form.css'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

export default function ReUseForm({ Method, inputs, onSubmit, btnText, urlData }) {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Reset password visibility whenever form data changes
    setShowPassword(false);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ ...formData }, urlData);
  };

  return (
    <>
      <Form method={Method} onSubmit={handleSubmit} encType="multipart/form-data">
        {inputs.map((input) => (
          <div key={input.name} className={input.clasename}>
            <Form.Group className="mb-3 input-text" controlId={`formGroup${input.name}`}>
              {input.type !== "select" && input.type !== "password" && (
                <>
                  <Form.Control
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={formData[input.name] || ""}
                    onChange={handleChange}
                    required={input.required}
                    
                  />
                  
                 
                </>
              )}
              
                {input.type === "password" && (
                    <Form.Group className="mb-3 input-text password-input "controlId={`formGroup${input.name}`}>
                      <div className="input-group ">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder={input.placeholder}
                          name={input.name}
                          value={formData[input.name] || ""}
                          onChange={handleChange}
                          required={input.required}
                        />
                        
                        <button
                          className="password-toggle btn border password-input bg-white "
                          type="button"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ?  <FaRegEye /> : <FaRegEyeSlash /> }
                        </button>
                      </div>
                    </Form.Group>
                  )}
              {input.type === "select" && (
                <div className="select-my">
                  <Form.Group as={Col} controlId="formGridState" className="mb-3 input-text">
                    <Form.Select
                      name={input.name}
                      value={formData[input.name] || ""}
                      onChange={handleChange}
                    >
                      <option disabled value=''>select</option>
                      {input.options.map((option, index) => (
                        <option key={index} name={option.name} value={option.value}>{option.value}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
            </Form.Group>
          </div>
        ))}
        <button type="submit">{btnText}</button>
      </Form>
    </>
  );
}
