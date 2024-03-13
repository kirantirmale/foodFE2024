import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/fast-food-meal-set-vector.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';

const Example = (props) => {

    const navigate = useNavigate();

    const [data, setData] = useState([])

    const getdata = async () => {
        await axios.get('http://localhost:4000/api/product/getdata').then((res) => {
            setData(res.data)
            console.log("res.data", res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/product")
            getdata()
        } else {
            navigate("/login")
        }
    }, []);

    const submitBtn = (post) => {

        alert("buy product")

        let obj = {
            token: localStorage.getItem("token"),
            productId: post._id
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };

        axios.post('http://localhost:4000/api/buyproduct', requestOptions).then((res) => {

        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <Layout>
            <>

                <div class="container">
                    <div class="row">
                        {
                            data.length > 0 && data.map((post) => {
                                return (
                                    <Box sx={{ m: 1 }} class='col-3 mb-2' >
                                        <Card sx={{ width: 320 }} class=''>
                                            <div>
                                                <Typography level="title-lg"><h3>{post.name}</h3></Typography>
                                                <Typography level="body-sm">{post.description
                                                }</Typography>

                                            </div>
                                            <AspectRatio minHeight="120px" maxHeight="200px">
                                                <img
                                                    src={img}

                                                />
                                            </AspectRatio>
                                            <CardContent orientation="horizontal">
                                                <div>
                                                    <Typography level="body-xs">Total price:</Typography>
                                                    <Typography fontSize="lg" fontWeight="lg">
                                                        ${post.price}
                                                    </Typography>
                                                </div>
                                                <Button
                                                    variant="solid"
                                                    size="sm"
                                                    color="primary"
                                                    aria-label="Explore Bahamas Islands"
                                                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                                    onClick={() => submitBtn(post)}
                                                >
                                                    BUY
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Example;