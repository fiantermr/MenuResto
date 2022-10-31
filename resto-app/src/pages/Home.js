import React, { Component } from 'react'
import { Col, Container, Row, Button} from "react-bootstrap";
import { Hasil, Listcat, Menus } from "../components/";
import { API_URL } from '../utils/constant';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      categoridipilih: 'Makanan',
      keranjangs: []
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoridipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log(error);
      });

  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then(res => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoridipilih: value,
      menus: []
    })

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      })
  }

  masukKeranjang = (value) => {

    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then(res => {
        if (res.data.length === 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
            timer: 1500,
          }

          axios
            .post(API_URL + "keranjangs", cart)
            .then(res => {
              swal({
                title: "Success, add to cart",
                text: cart.product.nama + ", success add to cart",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cart)
            .then(res => {
              swal({
                title: "Success, add to cart",
                text: cart.product.nama + ", success add to cart",
                icon: "success",
                button: false,
              });
            })
            .catch(error => {
              console.log(error);
            });

        }
      })
      .catch(error => {
        console.log(error);
      })


  }

  render() {
    const { menus, categoridipilih, keranjangs } = this.state
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Listcat changeCategory={this.changeCategory} categoridipilih={categoridipilih} />
              <Col className="mt-3">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus && menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props} />
            </Row>
          </Container>
        </div>
    )
  }
}
