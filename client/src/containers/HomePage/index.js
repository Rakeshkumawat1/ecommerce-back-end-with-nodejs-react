import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getAllProducts } from '../../actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from '../../components/Header'
// import MenuHeader from '../../components/MenuHeader'
// import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import Layout from '../../components/Layout';
import { BiRupee } from "react-icons/bi";
import loadingImg from '../../images/Ball-Drop-Preloader-1-1.gif';
import { IoIosStar } from "react-icons/io";
import './home.css';

import { imgUrl } from '../../urlConfig';

/**
* @author Rakesh kumawat
* @function HomePage
**/

const HomePage = () => {
  toast.configure();

  const dispatch = useDispatch();
  const history = useHistory();
  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    if (allProducts.loadMore) {
      let skip = allProducts.products.length;
      let payload = { skip, limit: 8 }
      dispatch(getAllProducts(payload));
    }

    if (allProducts.error != null) {
      toast.error(allProducts.error.data.error, {
        position: toast.POSITION.TOP_LEFT
      });
      allProducts.error = null;
    }

  }, [allProducts]);

  const handleCheckNow = ({ slug, id }) => { history.push(`/${slug}/${id}/p`) }
  return (
    <Layout>
      {allProducts.products.length ?
        <div className="container" style={{ marginTop: "10px" }}>
          <div className="row">
            {allProducts.products.map((product) => (
              <div className="col-sm-3" style={{ marginTop: "10px" }}>
                <div className="card">
                  <div className="caContainer">
                    <Link className="caImgContainer" to={`/${product.slug}/${product._id}/p`} >
                      {/* <img classNameName="card-img-top" style={{ margin: "10px 0 0 30px", height: "250px", width: "200px" }} src={`${imgUrl}${product.productPictures[0].img}`} /> */}
                      <img classNameName="card-img-top" style={{ margin: "10px 0 0 30px", height: "200px", width: "200px" }} src="http://localhost:4000/public/f99d6T-57-download1.jpg" />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <BiRupee />
                    {product.price}
                    <span className="discountHome">
                      22% off
                    </span>
                    <span className="ratingCountHome " >
                      4.3 <IoIosStar />
                    </span>
                    <div>
                      <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => handleCheckNow({ slug: product.slug, id: product._id })}>Check now</button>
                      {/* <button className="btn btn-primary" style={{ width: "100px" }}>Buy now</button>
                      <button className="btn btn-success" style={{ width: "120px", marginLeft: "5px" }}>Add to cart</button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {allProducts.loadMore ?
            <div className='container text-center'>
              <img src={loadingImg} style={{ width: "300px", height: "100px", marginTop: "auto" }} alt="Loading..." />
            </div>
            :
            <div style={{ textAlign: "center", marginTop: "20px", color: "blue" }}> <h6>No more data!</h6></div>
          }
        </div>
        :
        // allProducts.loadMore ?
        //   <div className='container text-center'>
        //     <img src={loadingImg} style={{ width: "300px", height: "300px", marginTop: "auto" }} alt="Loading..." />
        //   </div>
        //   :
        //   <div style={{ textAlign: "center", marginTop: "20px", color: "blue" }}> <h6>No more data!</h6></div>

        <div className='container text-center'>
          <img src={loadingImg} style={{ width: "300px", height: "300px", marginTop: "auto" }} alt="Loading..." />
        </div>
      }
    </Layout>


  )
}

export default HomePage