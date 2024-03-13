import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Form, Link, useNavigate } from 'react-router-dom';

const Admin = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  console.log("data", data)



  const getdata = async (data) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    let result = await axios.get('http://localhost:4000/api/user/getdata', requestOptions).then((res) => {
      setData(res.data)
      localStorage.setItem('token', result.token)
      console.log("res.data", res.data)
      navigate('/admin')
    }).catch((error) => {
      console.log(error)
    })

  }

  const onDelete = (id) => {
    axios
      .delete(
        `http://localhost:4000/api/user/deletedata?id=${id}`
      )
      .then((res) => {
        setData();
      })
      getdata()
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onDelete()
    if (localStorage.getItem('token')) {
      navigate("/admin")
      getdata()
    } else {
      navigate("/home")
    }
  }, []);
  return (

    <>
      <Container fluid>
        <Row>
          <Col
            md="12">
            <Card className="mt-3">
              <Card.Header>
                <Row>
                  <Col className="d-flex justify-content-between align-items-center ">
                    <Card.Title as="h4">STUDENT RECORDS</Card.Title>

                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Table hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PASSWORD</th>
                      <th>ROLE</th>
                      <th>COUPON</th>
                      <th>USERID</th>
                      <th>SPONSORCODE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value.username}</td>
                          <td>{value.email}</td>
                          <td>******</td>
                          <td>{value.role}</td>
                          <td>{value.coupon}</td>
                          <td>{value.userid}</td>
                          <td>{value.sponsorCode}</td>
                          <td>
                            <Button
                              onClick={() => onDelete(value._id)}
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>

              <Link to={"/home"} >
                <button id='btn2' className='btn1'>BACK TO HOME </button>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Admin;
