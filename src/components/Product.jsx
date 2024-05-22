import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box, Modal } from '@mui/material';
import scanner from '../Images/scanner.jpg';
import confetti from 'canvas-confetti';
import {PropagateLoader} from 'react-spinners'

const Example = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [scannerPopup, setScannerPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const getdata = async () => {
        await axios.get('http://localhost:4000/api/product/getdata')
            .then((res) => {
                setData(res.data);
                console.log("res.data", res.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/product");
            getdata();
        } else {
            navigate("/login");
        }
    }, []);

    const handleCardClick = (post) => {
        setSelectedCard(post);
        setOpenPopup(true);
    };

    const handleBuyConfirmation = (post) => {
        setSelectedCard(post);
        setConfirmOrder(true);
        setOpenPopup(false);
    };

    const handleConfirmOrder = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },

        });


        if (selectedCard) {
            setConfirmOrder(true);
            setOpenPopup(false);
            handleCancelOrder();
            let obj = {
                token: localStorage.getItem("token"),
                productId: selectedCard._id
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };

            axios.post('http://localhost:4000/api/buyproduct', requestOptions)
                .then((res) => {
                    console.log("Order confirmed successfully");
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setConfirmOrder(false);
                    setOpenPopup(false);
                });
        } else {
            console.error("No selected card found");
        }
    };

    const handleCancelOrder = () => {
        setConfirmOrder(false);
    };

    const handleViewScanner = () => {
        setScannerPopup(true);
    };

    const handleCloseScannerPopup = () => {
        setScannerPopup(false);
    };

    const submitBtn = (post) => {
        handleBuyConfirmation(post);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((post) =>
        post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <>
               

                <div className="container p-2">
                    <div>
                        <div className='text-center flex flex-col gap-5 py-3 wii'>
                            <p className="bgcolor text-black p-1 w-48 text-center rounded-md m-auto">Awesome Products</p>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="form-control w-50 m-auto  my-4"
                            />
                        </div>
                    </div>

                    {loading && (
                    <div className="text-center load">

                        <PropagateLoader color="#d7b736" />
                    </div>
                )}

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 m-auto">
                        {filteredData.length > 0 && filteredData.map((post, index) => {
                            return (
                                <Box key={index} className='col mb-2 '>
                                    <Card sx={{ width: 290 }} className='m-auto md:mt-10 ' >
                                        <div>
                                            <Typography level="title-lg "><h5>{post.name}  <div className="text-end ">
                                                <i className="fa-solid fa-cart-shopping"></i>
                                            </div></h5> </Typography>
                                            <Typography level="body-sm" >{post.description}</Typography>
                                        </div>
                                        <AspectRatio minHeight="120px" maxHeight="200px" className='card'>
                                            <img src={post.img} alt={post.name} onClick={() => handleCardClick(post)} />
                                        </AspectRatio>
                                        <CardContent orientation="vertical">
                                            <div>
                                                <div className="text-lg font-bold">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div>
                                                            <div className="text-xs">Total price:</div>
                                                            <div className="text-lg">${post.price}</div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                style={{ borderRadius: '5px' }}
                                                                className="px-4 py-2"
                                                                onClick={() => submitBtn(post)}
                                                            >
                                                                BUY
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Box>
                            );
                        })}
                    </div>
                </div>

                <Modal open={openPopup} onClose={() => setOpenPopup(false)}>
                    <div className="popup">
                        {selectedCard && (
                            <Box className='col mb-2 ' >
                                <Card sx={{ width: 290 }} className='m-auto md:mt-10 cursor-grab' >
                                    <div>
                                        <Typography level="title-lg "><h5>{selectedCard.name}  </h5> </Typography>
                                        <Typography level="body-sm" >{selectedCard.description}</Typography>
                                    </div>
                                    <AspectRatio minHeight="280px" maxHeight="200px" >
                                        <img src={selectedCard.img} alt={selectedCard.name} />
                                    </AspectRatio>
                                    <CardContent orientation="vertical">
                                        <div>
                                            <div className="text-lg font-bold">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <div className="text-xs">Total price:</div>
                                                        <div className="text-lg">${selectedCard.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}
                    </div>
                </Modal>

                <Modal open={confirmOrder} onClose={() => setConfirmOrder(false)}>
                    <div className="maincard  items-center justify-center z-50 ">
                        <div className="bg-black text-white   rounded-lg p-3 ">
                            {selectedCard && (
                                <div>
                                    <h2 className="text-lg font-bold mb-4">Confirm ({selectedCard.name}) Order</h2>
                                    <p className="text-sm mb-4">Are you sure you want to place this  order?</p>
                                    <AspectRatio minHeight="280px" maxHeight="200px" >
                                        <img src={selectedCard.img} alt={selectedCard.name} />
                                    </AspectRatio>
                                    <p className="text-sm mb-2">Product: {selectedCard.name}</p>
                                    <p className="text-sm mb-2">Price:🤑${selectedCard.price}</p>
                                </div>
                            )}
                            <div className="flex justify-between gap-3">
                                <Button
                                    variant="contained"
                                    className='mr-2'
                                    onClick={handleConfirmOrder}
                                >
                                    Confirm😎
                                </Button>
                                <Button variant="contained" onClick={handleViewScanner}><i className="fa-solid fa-eye"></i> View Scanner</Button>
                                <Button variant="contained" className='mr-2' onClick={handleCancelOrder}>Cancel Order 😥 </Button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={scannerPopup} onClose={handleCloseScannerPopup}>
                    <div className="maincard z-50 mt-20">
                        <div className="bg-white w-80 rounded-lg p-3">
                            <h2 className="text-lg font-bold mb-4">Scan And Pay 💲</h2>
                            {selectedCard && (
                                <div>
                                    <AspectRatio minHeight="280px" maxHeight="200px" >
                                        <img src={scanner} alt={selectedCard.name} />
                                    </AspectRatio>
                                    <p className="text-sm mb-2">Pay Product Amount:🤑${selectedCard.price}</p>
                                </div>
                            )}
                            <div className="flex justify-end gap-3 mt-3">
                                <Button variant="contained" onClick={handleCloseScannerPopup}>Close</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        </Layout>
    );
};

export default Example;









// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Layout from './Layout/Layout';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import { Box } from '@mui/material';

// const Example = (props) => {

//     const navigate = useNavigate();

//     const [data, setData] = useState([])

//     const getdata = async () => {
//         await axios.get('http://localhost:4000/api/product/getdata').then((res) => {
//             setData(res.data)
//             console.log("res.data", res.data)
//         }).catch((error) => {
//             console.log(error)
//         })
//     }

//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             navigate("/product")
//             getdata()
//         } else {
//             navigate("/login")
//         }
//     }, []);

//     const submitBtn = (post) => {

//         alert("buy product")

//         let obj = {
//             token: localStorage.getItem("token"),
//             productId: post._id
//         }

//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(obj)
//         };

//         axios.post('http://localhost:4000/api/buyproduct', requestOptions).then((res) => {

//         }).catch((error) => {
//             console.log(error)
//         })
//     }


//     return (
//         <Layout>
//             <>
//                 <div className="container p-2">
//                     <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 m-auto"> {/* Change the number of columns based on your design */}
//                         {
//                             data.length > 0 && data.map((post, index) => {
//                                 return (
//                                     <Box key={index} className='col mb-2 mobile-mt-10'>
//                                         <Card sx={{ width: 300 }} className='m-auto md:mt-10'>
//                                             <div>
//                                                 <Typography level="title-lg"><h3>{post.name}</h3></Typography>
//                                                 <Typography level="body-sm">{post.description}</Typography>
//                                             </div>
//                                             <AspectRatio minHeight="120px" maxHeight="200px">
//                                                 <img src={post.img} alt={post.name} />
//                                             </AspectRatio>
//                                             <CardContent orientation="vertical">
//                                                 <div>
//                                                     <Typography level="body-xs">Total price:</Typography>
//                                                     <Typography fontSize="lg" fontWeight="lg">
//                                                         ${post.price}
//                                                     </Typography>
//                                                 </div>
//                                                 <Button
//                                                     variant="solid"
//                                                     size="sm"
//                                                     color="primary"
//                                                     aria-label="Explore Bahamas Islands"
//                                                     sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
//                                                     onClick={() => submitBtn(post)}
//                                                 >
//                                                     BUY
//                                                 </Button>
//                                             </CardContent>
//                                         </Card>
//                                     </Box>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//             </>
//         </Layout>

//     );
// };

// export default Example;