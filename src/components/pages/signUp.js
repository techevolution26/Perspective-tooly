import React, { useState } from "react";
import signUp from "./SignUp.css";

const SignUpForm = () => {
  //state to manage form inputs

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username || !data.username.trim()) {
      errors.username = "Username is required";
    }
    if (!data.email || !data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.password || !data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Send data to the backend
      const response = await fetch(
        "http://localhost/PurePHP/Pure/servers/signUptooly.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log('User registered successfully:', result);
        // Reset form
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setErrors({});
    } else {
        console.error('Registration failed:', result);
        if (result.error === "Username already exists") {
            setErrors({ username: "Username already exists" });
        } else {
            setErrors({ server: result.error || 'Registration failed' });
        }
    }
    
    } catch (error) {
      console.error("Server error:", error);
      setErrors({ server: "Server error. Please try again later." });
    }
  };

  // console.log('Sending data:', {
  //   username: formData.username,
  //   email: formData.email,
  //   password: formData.password,
  // });

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div>
        <h2 className="h2">Sign Up</h2>
        <label className="sign-label" >Username:</label>
        <input
        className="sign-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      {errors.username && <span className="error">{errors.username}</span>}

      <div>
        <label className="sign-label">Email:</label>
        <input
        className="sign-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      {errors.email && <span className="error">{errors.email}</span>}

      <div>
        <label className="sign-label" >Password:</label>
        <input
        className="sign-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      {errors.password && <span className="error">{errors.password}</span>}

      <div>
        <label className="sign-label" >Confirm Password:</label>
        <input
        className="sign-input"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit" className ="signupbtn">Sign Up</button>
      {errors.server && <span className="error">{errors.server}</span>}

    </form>
  );
};

export default SignUpForm;
