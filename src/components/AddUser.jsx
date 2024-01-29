import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";

function AddUser() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [username, setUserName] = useState("");
  let [company, setCompany] = useState("");
  let [phone, setMobile] = useState("");
  let [address, setAddress] = useState("");
  let navigate = useNavigate();
  let handleCreate = async () => {
    try {
      let data = {
        name,
        email,
        username,
        phone,
        company: {
          name: company,
        },
        address: {
          street: address
        },
      };
      let res = await axios.post(`${API_URL}`, data);
      navigate("/dashboard");
    } catch {}
  };
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Add User</h1>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Batch"
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => handleCreate()}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
