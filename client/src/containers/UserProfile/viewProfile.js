import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { viewProfile } from '../../actions';
import Layout from '../../components/Layout';
import loadingImg from '../../images/Ball-Drop-Preloader-1-1.gif';
import { imgUrl } from '../../urlConfig';

/**
* @author Rakesh kumawat
* @function ViewProfile
**/

const ViewProfile = () => {
    toast.configure();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);
    const local = localStorage.getItem('user');

    useEffect(() => {
        let data = { "user": local._id }
        dispatch(viewProfile(data))
    }, [local])

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo.info);
        }
        if (userInfo.error != null) {
            toast.error(userInfo.error.data.error, {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }, [userInfo])

    return (
        <Layout>
            {userInfo.info != null ?
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                        <h5 className="my-3">Hello {userInfo.info.data.firstName}!</h5>
                                        <p className="text-muted mb-1">Full Stack Developer</p>
                                        <p className="text-muted mb-4">IT1-10 sitapura industrila area jaipur 302022 </p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button type="button" className="btn btn-primary">Follow</button>
                                            <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fas fa-globe fa-lg text-warning"></i>
                                            <p className="mb-0">https://mdbootstrap.com</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-github fa-lg" style={{ color: "#333333" }}></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-twitter fa-lg" style={{ color: "#55acee" }}></i>
                                            <p className="mb-0">@mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-instagram fa-lg" style={{ color: "#ac2bac" }}></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-facebook-f fa-lg" style={{ color: "#3b5998" }}></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userInfo.info.data.firstName + " " + userInfo.info.data.lastName}</p>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userInfo.info.data.email}</p>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Mobile</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userInfo.info.data.mobile ? userInfo.info.data.mobile : "--"}</p>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row" >
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            {userInfo.info.address.map((obj, key) =>
                                                <div className="col-sm-9" key={key}>
                                                    <p className="text-muted mb-0">{"(" + obj.addressType + ") " + obj.address + " " + obj.state + " " + obj.pinCode}</p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="mb-4"><span className="text-primary font-italic me-1">Orders</span> with their Status(success/panding) </p>
                                                <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "80%", ariaValuenow: "80", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Website Markup</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "72%", ariaValuenow: "72", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "89%", ariaValuenow: "89", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Mobile Template</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "55%", ariaValuenow: "55", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>
                                                <div className="progress rounded mb-2" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "66%", ariaValuenow: "66", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="mb-4"><span className="text-primary font-italic me-1">Orders</span> with their Status(failure)</p>
                                                <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "80%", ariaValuenow: "80", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Website Markup</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "72%", ariaValuenow: "72", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "89%", ariaValuenow: "89", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Mobile Template</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "55%", ariaValuenow: "55", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>
                                                <div className="progress rounded mb-2" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "66%", ariaValuenow: "66", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                :
                <div className='container text-center'>
                    <img src={loadingImg} style={{ width: "300px", height: "300px", marginTop: "auto" }} alt="Loading..." />
                </div>
            }
        </Layout>


    )
}

export default ViewProfile