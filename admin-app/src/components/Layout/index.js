import React from 'react'
import Header from '../Header';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
        <Header />
        {
          props.sidebar ?
          <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" >
                  <NavLink to="/">Dashboard<span className="sr-only">(current)</span></NavLink> 
                  </a>
                </li>
                <li className="nav-item">
                <a className="nav-link">
                    <NavLink to="/products">Products</NavLink>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link">
                    <NavLink to="/orders">Orders</NavLink>
                </a>                 
                </li>
                <li className="nav-item">
                <a className="nav-link">
                    <NavLink to="/category">Category</NavLink>
                </a>                 
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="users"></span>
                  Customers
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="bar-chart-2"></span>
                  Reports
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="layers"></span>
                  Integrations
                </a>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a className="d-flex align-items-center text-muted" href="#">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Current month
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Last quarter
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Social engagement
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Year-end sale
                </a>
                </li>
              </ul>
            </div>
          </nav>

          <Col md={10} style={{ marginLeft: 'auto' }}>
          {props.children}
          </Col>
        </div>
      </div>
      :
      props.children 
    }
        

    </>
   )

 }

export default Layout;