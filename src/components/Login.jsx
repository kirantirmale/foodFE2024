import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';


function Login() {

  const navigate = useNavigate();

  let token = ''

  let TokenHeader = {
    headers: {
      'Authorization': 'Bearer '.concat(token)
    }
  }

  let blankObject = { email: '', password: '' }

  const [obj, setobj] = useState(blankObject);

  const getValue = (e) => {

    setobj({ ...obj, [e.target.name]: e.target.value })

  }

  const save = async (x) => {

    x.preventDefault()
    
    if (obj.email == '' || obj.password == '') {
      swal({
        title: 'Email or Password is requride'
      })
      setobj({ ...blankObject })
    }
    else {
      getlogin(obj)
    }

  }

  const getlogin = async (obj) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };

    let responce = await fetch(`${url}/api/auth/login`, requestOptions).then((res) => { return res.json() })

    if (responce.status == true) {
      localStorage.setItem('token', responce.token)
      navigate('/home')
    } else {
      alert(responce.message)
    }

  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/home")
    } else {
      navigate("/login")
    }
  }, []);


  return (
    < >
      <section class=" gradient-form" Style="background-color: #eee;">
        <div class="container1 py-5">
          <div class="row d-flex justify-content-center align-items-center ">
            <div class="col-xl-10">
              <div class="card rounded-3 text-black">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="card-body p-md-5 mx-md-4">

                      <div class="text-center">
                        
                        <h4 class="mt-1 mb-5 pb-1">Welcome To My Website</h4>
                      </div>

                      <form className="form1">
                        <p>Please login to your account</p>

                        <div class="form-outline mb-4">
                          <input type="email"
                            name='email'
                            className="form-control mt-1"
                            placeholder="Enter email"
                            onChange={getValue} class="form-control"
                          />
                          {/* <label class="form-label" for="form2Example11">Email</label> */}
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            name='password'
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={getValue} class="form-control" />
                          {/* <label class="form-label" for="form2Example22">Password</label> */}
                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" onClick={save}>Log
                            in</button>
                          <a class="text-muted" href="#!">Forgot password?</a>
                        </div>

                        <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Don't have an account?</p>
                          <button type="button" class="btn btn-outline-danger"><Link to="/signup" class="btn ">Signup</Link></button>
                        </div>

                      </form>
                    </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 class="mb-4">Kiran A Tirmale</h4>
                      <p class="small mb-0"> <h6>Full Stack Developer</h6>
                        To work as contributor in a challenging environment and strengthen my knowledge and skills to assure
                        that my commitment to the job would yield better results..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default Login