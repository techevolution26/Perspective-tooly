import React from "react";
import {Link} from "react-router-dom";

const Navigation = () => {
    return(
        <nav className=" bg-white p-4">
            <ul className="flex justify-between">
                <li><Link to="/Home" style={{textDecoration: "none", color: "#007BFF"}}>Home</Link></li>
                <li><Link to="/View" style={{ textDecoration: "none", color: "#007BFF" }}>List</Link></li>
                <li><Link to="/Input" style={{ textDecoration: "none", color: "#007BFF" }} >Create Post</Link></li>
                <li><Link to="/Profile" style={{ textDecoration: "none", color: "#007BFF" }} >Profile</Link></li>
                <li><Link to="/Settings" style={{ textDecoration: "none", color: "#007BFF" }}>Settings</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/logout">Logout</Link></li> 
            </ul>

        </nav>
    );
};

export default Navigation;