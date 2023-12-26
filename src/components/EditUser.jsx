import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom'

function EditUser({user,setUser}) {
  let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [batch,setBatch] = useState("")
  let [mobile, setMobile] = useState("")
  let params = useParams();
  let navigate = useNavigate();

  const findIndex = (id) => {
    for (let i = 0; i < user.length; i++) {
      if (id === user[i].id) return i;
    }
  };
  let handleEdit = () => {
    let id = Number(params.id);
    let index = findIndex(id);
    let editUser = [...user];
    editUser.splice(index, 1, {
      id,name,email,batch,mobile
    })
    setUser(editUser);
    navigate('/dashboard')
    
  }
  let getData = () => {
    let id = Number(params.id);
    let index = findIndex(id);
    setName(user[index].name);
    setMobile(user[index].mobile);
    setBatch(user[index].batch);
    setEmail(user[index].email);
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
                placeholder="Name" value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email" value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile" value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batch</Form.Label>
              <Form.Control
                type="text"
                placeholder="Batch" value={batch}
                onChange={(e) => setBatch(e.target.value)}
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