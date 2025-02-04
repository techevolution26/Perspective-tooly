import React, {useState} from "react";
import signUp from "./SignUp.css";

const SignUpForm = () => {
    //state to manage form inputs

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const[errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const{name,value} = e.target;
        setFormData({...formData, [name]: value});
    };


    const validateForm = (data) => {
      const errors = {};
    
      if (!data.username || !data.username.trim()) {
        errors.username = 'Username is required';
      }
      if (!data.email || !data.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
      }
      if (!data.password || !data.password.trim()) {
        errors.password = 'Password is required';
      } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 6 characters';
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
          const response = await fetch('http://localhost/PurePHP/servers/signUptooly.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }),
          });
      
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
            console.error('Registration failed:', result.error);
            setErrors({ server: result.error || 'Registration failed' });
          }
        } catch (error) {
          console.error('Error:', error);
          setErrors({ server: 'An error occurred. Please try again.' });
        }
      };

      console.log('Sending data:', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                />
                {errors.server && <span className="error">{errors.server}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                />
                {errors.server && <span className="error">{errors.server}</span>}
            </div>

            <div>
                <label>Password:</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                />
                {errors.server && <span className="error">{errors.server}</span>}
            </div>

            <div>
                <label>Confirm Password:</label>
                <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                />
                {errors.server && <span className="error">{errors.server}</span>}
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}; 

export default SignUpForm;