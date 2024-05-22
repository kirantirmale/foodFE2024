import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';

const Admin = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [product, setproduct] = useState([]);


  const [pro, setPro] = useState({
    name: '',
    price: '',
    description: '',
    img: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState(null);

  const handleClose = () => {
    reset();
    toggleModal();
  };

  const toggleModal = () => (setShowModal(!showModal))
  const toggle = () => {
    setShowModal(!showModal);
  };
  
  const getValues = (e) => {
    const { value, name } = e.target;
    // const file = e.target.files[0];
    setPro((prevStudent) => ({
      ...prevStudent,
      // img: file,
      [name]: value,
    }));
  };
  

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

  const getproduct = () => {
    axios
      .get('http://localhost:4000/api/product/getdata')
      .then((res) => {
        setproduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };




const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  Object.keys(pro).forEach((key) => {
    formData.append(key, pro[key]);
  });

  const fileInput = document.querySelector('input[type="file"]');

  if (fileInput && fileInput.files[0]) {
    formData.append('img', fileInput.files[0]);
  }

  const hasFile = fileInput && fileInput.files[0];
  const url = studentId !== null
    ? `http://localhost:4000/api/product/updatedata?id=${studentId}`
    : 'http://localhost:4000/api/product/adddata';

  axios
    .post(url, hasFile ? formData : pro, {
      headers: hasFile ? { 'Content-Type': 'multipart/form-data' } : {},
    })
    .then((res) => {
      setPro({
        ...res.data,
      });
      setShowModal(false);
      getproduct();
    })
    .catch((err) => {
      console.log(err.message);
    });

  reset();
};


// const submitHandler = (e) => {
//   e.preventDefault();
//   if (studentId !== null) {
//     axios
//       .post(`http://localhost:4000/api/product/updatedata?id=${studentId}`, pro)
//       .then((res) => {
//         setPro({
//           ...res.data,
//         });
//         setShowModal(false);
//         getproduct();
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   } else {
//     axios
//       .post('http://localhost:4000/api/product/adddata', pro)
//       .then((res) => {
//         setShowModal(false);
//         getproduct();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   reset()
// };


const onEdit = async (id) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/product/getonedata?id=${id}`);

        if (!response.data) {
            throw new Error('No data found');
        }

        console.log('Response data:', response.data);

        setPro({ ...response.data });
        setStudentId(response.data._id);
        setShowModal(true);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};




  
  const onDeleteP = (id) => {
    axios
      .delete(`http://localhost:4000/api/product/deletedata?id=${id}`)
      .then((res) => {

        const updatedProductList = product.filter(item => item._id !== id);
        setproduct(updatedProductList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    if (localStorage.getItem('token')) {
      navigate("/admin")
      getproduct();
      getdata()
    } else {
      navigate("/home")
    }

  }, []);

  const reset = () => {
    setPro({
      name: '',
      price: '',
      description: '',
      img: '',
    });
    setStudentId(null);
  };

  return (

    <>
      <Container fluid >
        <Row>
          <Col
            md="12">
            <Card className="mt-3 "  >
              <Card.Header>
                <Row>
                  <Col className="d-flex justify-content-between align-items-center ">
                    <Card.Title as="h4">STUDENT RECORDS</Card.Title>

                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className='overflow-x-scroll'>
                <Table hover  >
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
                          {/* <td>{value.password}</td> */}
                          <td>{value.role}</td>
                          <td>{value.coupon}</td>
                          <td>{value.userid}</td>
                          <td>{value.sponsorCode}</td>
                          <td>
                            <Link
                              onClick={() => onDelete(value._id)}
                              variant="danger"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <Col
            md="12">
            <Card className="mt-3">
              <Card.Header>
                <Row className='flex justify-between'>
                  <Col className="d-flex justify-content-between align-items-center ">
                    <Card.Title as="h4">PRODUCT RECORDS</Card.Title>
                  </Col>
                  <Col className="d-flex  justify-content-between align-items-center ">
                    <div className=' '>
                      <Button className="w-32 btn-sm mr-1 border rounded p-2 bg-black text-white no-underline font-bold" onClick={toggle}>
                        Add Data
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className='overflow-x-scroll'>
                <Table hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>PRODUCT NAME</th>
                      <th> PRICE</th>
                      <th> DESCRIPTION</th>
                      <th> IMAGE</th>
                      <th>EDIT</th>
                      <th>DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product?.map((x, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{x.name}</td>
                          <td>{x.price}</td>
                          <td>{x.description}</td>
                          <td><img src={x.img} alt="" width={50} height={10}/></td>
                          <td>
                            <Link
                              onClick={() => onEdit(x._id)}
                              variant="danger"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                          </td>
                          <td>
                            <Link
                              onClick={() => onDeleteP(x._id)}
                              variant="danger"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>

              <Link to={"/home"} className='text-center'>
                BACK TO HOME
              </Link>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} centered  >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{studentId ? 'Edit Student' : 'Add Student'}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="name"
                    value={pro.name}
                    onChange={getValues}
                    placeholder="Product Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">Product Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productPrice"
                    name="price"
                    value={pro.price}
                    onChange={getValues}
                    placeholder="Product Price"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productDescription"
                    name="description"
                    value={pro.description}
                    onChange={getValues}
                    placeholder="Description"
                  />
                </div>
                <div className="mb-3 flex">
                  <div className=''>
                  <label htmlFor="productDescription" className="form-label mr-5">Product Image</label>
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-blue-600" ></i>
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    id="productDescription"
                    name="img"
                    onChange={getValues} 
                    placeholder="IMAGE"
                  />
                </div>
                <button className="btn btn-primary " onClick={submitHandler}>
                  {studentId ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </Modal>


      </Container>

    </>
  );
}

export default Admin;
