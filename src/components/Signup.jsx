import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
// import './App.css';

function Signup() {
    const navigate = useNavigate();
    let blankObj = {
        username: '',
        email: '',
        password: '',
        referperson: ''
    }
    const [obj, setobj] = useState({ ...blankObj })


    const handleInputChange = (event) => {

        const { name, value } = event.target;

        setobj((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {

        event.preventDefault();
        
        if (obj.username !== "" && obj.email !== "" && obj.password !== "" && obj.referperson !== "") 
       
        {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };

            let response = await fetch('http://localhost:4000/api/auth/signup', requestOptions).then((res) => res.json())
            if (response.status == true) {
                navigate('/login')
            }
        } else {
            alert("something went wrong")
        }

        setobj({ ...blankObj })
    };

    return <>

        <section class="vh-100 bg-image"
            Style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div class="card" Style="border-radius: 15px;">
                                <div class="card-body p-5">
                                    <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                                    <form onSubmit={handleSubmit}>

                                        <div class="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="name"
                                                name="username"
                                                value={obj.username}
                                                onChange={handleInputChange}
                                                placeholder='Your Name'
                                                class="form-control form-control-lg"
                                            />

                                        </div>

                                        <div class="form-outline mb-4">
                                            <input
                                                placeholder=' Email'
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={obj.email}
                                                onChange={handleInputChange}
                                                required
                                                class="form-control form-control-lg"
                                            />

                                        </div>

                                        <div class="form-outline mb-4">

                                            <input
                                                placeholder='Password'
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={obj.password}
                                                onChange={handleInputChange}
                                                required
                                                class="form-control form-control-lg"
                                            />

                                        </div>

                                        <div class="form-outline mb-4">
                                            <input
                                                placeholder='Refer Coupon'
                                                type="text"
                                                id="referperson"
                                                name="referperson"
                                                value={obj.referperson}
                                                onChange={handleInputChange}
                                                class="form-control form-control-lg" />

                                        </div>

                                        <div class="form-check d-flex justify-content-center mb-5">
                                           
                                            <label class="form-check-label" for="form2Example3g">
                                               Use The Coupon  {''}<a href="#!" class="text-body"><u>	zqWKd#</u></a>
                                            </label>
                                        </div>

                                        <div class="d-flex justify-content-center">
                                            <button type="submit"
                                                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                        </div>

                                        <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                                            class="fw-bold text-body"><u><Link to='/login'>Login here</Link></u></a></p>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
























        {/* <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="username"
                    value={obj.username}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={obj.email}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={obj.password}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="referperson">Referral Person:</label>
                <input
                    type="text"
                    id="referperson"
                    name="referperson"
                    value={obj.referperson}
                    onChange={handleInputChange}
                />

                <button type="submit">Sign Up</button>
                <p className="forgot-password text-right mt-2">
                    Go to  <Link to="/login">Login Page</Link>
                </p>
            </form> */}



    </>

}

export default Signup;
