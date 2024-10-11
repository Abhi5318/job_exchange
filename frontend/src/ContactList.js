import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactList.css"; // CSS file for styling

const ContactList = () => {
  //const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [contacts, setContacts] = useState([]);
  // Get the base API URL from the environment variable
  /* const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
    process.env.REACT_APP_API_BASE_URL ||
    ""; */

  //const API_BASE_URL = "https://http://localhost:5000"; // Hardcoded as a temporary solution

  // Log to ensure the correct API URL is being used
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);


  console.log("API_BASE_URL:", API_BASE_URL);

  // Fetch contact list from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/contact/list`); // Use dynamic API URL
        console.log("Response:", response.data); // Log the response for debugging
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contact list", error); // Log any errors
      }
    };

    fetchContacts();
  }, [API_BASE_URL]);
  return (
    <div className="contact-list-container">
      <h1 className="list-title">Contact Submissions</h1>
      {contacts.length > 0 ? (
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>{contact.message}</td>
                <td>{new Date(contact.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default ContactList;
