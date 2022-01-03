import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
// import { IoIosArrowForward } from "react-icons/io";
import { imgUrl } from '../../urlConfig';

import "./style.css";

/**
 * @author Rakesh kumawt
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "10px auto" }}>
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link to={`/order_details/${order._id}`} className="orderItemContainer">
                <div className="orderImgContainer">
                  <img className="orderImg" src={`${imgUrl}${item.productId.productPictures[0].img}`} />
                </div>

                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                    <BiRupee />
                    {item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>

              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
