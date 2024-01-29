import React, { useEffect, useState } from "react";
import Card from "./Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";
import { Link } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();
  let [user, setUser] = useState([]);
  let handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        getUsersData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getUsersData = async () => {
    try {
      let res = await axios.get(API_URL);
      if (res.status === 200) {
        console.log(res.data);
        setUser(res.data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-around mb-4">
            <h1 className="h3 mb-0 text-gray-800">User Details</h1>
            <Link to="/add-user">
              <span>Add User</span>
            </Link>
          </div>
          <div className="row">
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Company</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.username}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>{e.company.name}</td>
                      <td style={{ width: "5%" }}>
                        {e.address.street}
                      </td>
                      <td>
                        <span
                          style={{ color: "green", cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/edit-user/${e.id}`);
                          }}
                        >
                          Edit
                        </span>
                        &nbsp;
                        <span
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            handleDelete(e.id);
                          }}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
