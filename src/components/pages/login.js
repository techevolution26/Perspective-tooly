import React, { useState } from "react";
// import './SignIn.css';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username || !data.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!data.password || !data.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost/PurePHP/Pure/servers/logIntooly.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login successful:', result);
        // Save user data (e.g., in local storage, context, etc.)
        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirect user to the home page or profile
        window.location.href = '/home'; // You can change the redirect based on your needs
      } else {
        console.error('Login failed:', result);
        setErrors({ server: result.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Server error:', error);
      setErrors({ server: 'Server error. Please try again later.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Sign In</h2>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit">Sign In</button>
      {errors.server && <span className="error">{errors.server}</span>}
    </form>
  );
};

export default SignInForm;
