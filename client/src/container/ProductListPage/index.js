import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout';
import { imgUrl } from '../../urlConfig';
import './style.css';

const ProductListPage = (props) => {

    const product = useSelector(state => state.product)
    const[ prigeRange, setPriceRange] =useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under25k: 25000,
        under30k: 30000,
    })
    const dispatch = useDispatch();
    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug))
    }, [])

    function BuyProduct(price) {
        alert(price)
    }

    return (
        <Layout>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} mobile under {prigeRange[key]} </div>
                                <button>view all</button>
                            </div>
                            <div style= {{display:'flex'}}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <div className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={`${imgUrl}${product.productPictures[0].img}`
                                                } alt="#"></img>
                                            </div>
                                            <div className="productInfo">
                                                <div style={{margin: '5px 0'}}>{product.name} </div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>3353</span>
                                                </div>
                                                <div className="productPrice">Rs. {product.price}</div>
                                                <button onClick={()=> BuyProduct(product.name)}>Buy Now</button>
                                            </div>
                                        </div>)
                                }
                            </div>
                        </div>
                    )
                })
            }
    <button onClick={()=> BuyProduct(100)}>Buy Now</button>
        </Layout>
    )
}

export default ProductListPage;