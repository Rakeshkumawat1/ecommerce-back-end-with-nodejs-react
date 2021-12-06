import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Col, Container, Row, Modal, Button, Table } from 'react-bootstrap';
import Input from '../../components/UI/Inputs/signupinput';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions';
import './style.css';
import { imgUrl } from '../../urlConfig';

/**
* @author
* @function Products
**/

const Products = (props) => {

  const [name, setName] = useState(''),
    [quantity, setQuantity] = useState(''),
    [price, setPrice] = useState(''),
    [description, setDescription] = useState(''),
    [categoryId, setCategoryId] = useState(''),
    [productPictures, setProductPictures] = useState([]);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    for (let pic of productPictures) {
      form.append('productPictures', pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  }

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive>
        <thead>
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ?
              product.products.map(product =>
                <tr onClick={() => showProductDetailModal(product)} key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>

                </tr>
              ) : null

          }

        </tbody>
      </Table>
    )
  }

  const handleSubmitProduct = () => {
    setProductDetailModal(false)
  }

  const handleCloseProduct = () => setProductDetailModal(false)

  const showProductDetailModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true)
  }

  const renderProductDetailsModel = () => {
    if (productDetails === null) {
      return null
    }
    return (
      <Modal
        size="lg"
        show={productDetailModal}
        onHide={handleCloseProduct}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="6">
              <label className="key">Name</label>
              <p className="value">{productDetails.name} </p>
            </Col>
            <Col md="6">
              <label className="key">Price</label>
              <p className="value">{productDetails.price} </p>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <label className="key">Quantity</label>
              <p className="value">{productDetails.quantity} </p>
            </Col>
            <Col md="6">
              <label className="key">Category</label>
              <p className="value">{productDetails.category.name} </p>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label className="key">Description</label>
              <p className="value">{productDetails.description} </p>
            </Col>

          </Row>
          <Row>
            <Col >
              <label className="key">Product Pictures</label>
              <div style={{ display: "flex" }}>
                {productDetails.productPictures.map(picture =>
                  <div className="pictureContainer">
                    <img src={`${imgUrl}${picture.img}`} />
                  </div>
                )}
              </div>

            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitProduct}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return (
    <Layout sidebar>

      <Container>
        <Row>
          <Col md={12}>
            <div>
              <div className="d-flex justify-content-center mt-2 mb-2">
                <h3>Products</h3>
              </div>
              <button onClick={handleShow}>Add Product</button>
            </div>

          </Col>
        </Row>

        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            value={quantity}
            placeholder={`Product Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Input
            value={price}
            placeholder={`Product Price`}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            value={description}
            placeholder={`Product Description`}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select className='form-control'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}>
            <option>Select category</option>
            {
              createCategoryList(category.categories).map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </select>

          {
            productPictures.length > 0 ?
              productPictures.map((pic, index) => <div key={index}>{JSON.stringify(pic.name)}</div>) : null
          }
          <input type="file" name="productPicture" onChange={handleProductPictures} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {renderProductDetailsModel()}
    </Layout>
  )

}

export default Products