import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from "../App";
import axios from 'axios';

function EditUser() {
  let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [username,setUserName] = useState("")
  let [phone, setMobile] = useState("")
  let [company, setCompany] = useState("");
  let [address, setAddress] = useState("");
  let params = useParams();
  let navigate = useNavigate();

  let handleEdit = async () => {
    let id = Number(params.id);
    try {
      let data = {
        id,
        name,
        email,
        username,
        phone,
        company: {
          name : company
        },
        address: {
          street: address
        }
      };
      let res = await axios.put(`${API_URL}/${id}`, data);
      console.log(res);
      if (res.status === 200) {
        navigate('/dashboard');
      }
    }
    catch {

    }
  }
  const getData = async () => {
    let id = Number(params.id);
    try {
      let res = await axios.get(`${API_URL}/${id}`);
      console.log(res);
      if (res.status === 200) {
         setName(res.data.name);
         setEmail(res.data.email);
         setUserName(res.data.username);
         setMobile(res.data.phone);
        setCompany(res.data.company.name);
        setAddress(res.data.address.street);
      }
    }
    catch (err) {
      console.log(err, 'err');
    }
   
  }

  useEffect(() => {
    getData();
  },[])

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile"
                value={phone}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Batch"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={() => handleEdit()}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditUser