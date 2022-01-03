import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { imgUrl } from '../../../urlConfig';
import loadingImg from '../../../images/Ball-Drop-Preloader-1-1.gif';
import { IoIosStar } from "react-icons/io";


import "./style.css";

/**
 * @author Rakesh kumawat
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  toast.configure();

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  useEffect(() => {
    if (product.error != null) {
      toast.error(product.error.data.error, {
        position: toast.POSITION.TOP_LEFT
      });
      product.error = null;
    }
  }, [product])

  const handleCheckNow = ({ slug, id }) => { history.push(`/${slug}/${id}/p`) }

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      {product.products.length ?
        <div className="row">
          {product.products.map((product) => (
            <div className="col-sm-3" style={{ marginTop: "10px" }}>
              <div className="card">
                <div className="caContainer">
                  <Link className="caImgContainer" to={`/${product.slug}/${product._id}/p`} >
                    <img classNameName="card-img-top" style={{ margin: "10px 0 0 30px", height: "200px", width: "200px" }} src={`${imgUrl}${product.productPictures[0].img}` || null} />
                  </Link>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <BiRupee />
                  {product.price}
                  <span className="discountProductList">
                    22% off
                  </span>
                  <span className="ratingCountProductList" >
                    4.3 <IoIosStar />
                  </span>
                  <div>
                    <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => handleCheckNow({ slug: product.slug, id: product._id })}>Check now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {product.loadMore ?
            <div className='container text-center'>
              <img src={loadingImg} style={{ width: "300px", height: "100px", marginTop: "auto" }} alt="Loading..." />
            </div>
            :
            <div style={{ textAlign: "center", marginTop: "20px", color: "blue" }}> <h6>No more data!</h6></div>
          }
        </div>
        :
        product.loadMore ?
          <div className='container text-center'>
            <img src={loadingImg} style={{ width: "300px", height: "300px", marginTop: "auto" }} alt="Loading..." />
          </div>
          :
          <div style={{ textAlign: "center", marginTop: "20px", color: "blue" }}> <h6>No more data!</h6></div>
      }

    </div>
  );
};

export default ClothingAndAccessories;
