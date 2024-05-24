import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `${API_URL}/get-product/${productId}`;
                const response = await axios.get(url);
                if (response.data.product) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                alert("Server Error.");
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleContact = (addedBy) => {
        const url = `${API_URL}/get-user/${addedBy}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
                alert("Server Error.");
            });
    };

    return (
        <>
            <Header />
            <div className="container">

                <div className="row">
                    {product && (
                        <>
                            <div className="col-md-6">
                                <img src={`${API_URL}/${product.pimage}`} alt={product.pname} className="img-fluid mb-3" />
                                {product.pimage2 && <img src={`${API_URL}/${product.pimage2}`} alt={product.pname} className="img-fluid mb-3" />}
                                
                            </div>
                            <div className="col-md-6">
                            <h2>PRODUCTS DETAILS</h2>
                                <h5><p className="m-3">Product Name: {product.pname}</p></h5>
                                <h5><p className="m-3">Category: {product.category}</p></h5>
                                <h5><p className="m-3">Product Description: {product.pdesc}</p></h5>
                                <h3 className="m-3">Rs. {product.price} /-</h3>


                                {product.addedBy &&
                                    <button className="btn btn-success mr-3" onClick={() => handleContact(product.addedBy)}>
                                        SHOW CONTACT DETAILS
                                    </button>}
                                
                                <p className="m-3">{user && user.username && <h5>{user.username}</h5>}</p>
                                <p className="m-3">{user && user.mobile && <h5>{user.mobile}</h5>}</p>
                                <p className="m-3">{user && user.email && <h5>{user.email}</h5>}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
