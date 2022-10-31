import React from 'react'
import styles from '../App.js'
import { Modal, Button, Form } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Modalcart = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit }) => {
    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama} {" "}
                        <strong>
                            (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Total Harga :</Form.Label>
                            <p>
                                <strong>
                                    Rp. {numberWithCommas(keranjangDetail.total_harga)}
                                </strong>
                            </p>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Jumlah :</Form.Label>
                            <br></br>
                            <Button variant="primary" size="sm" style={{ marginRight: 2 }} onClick={ () => tambah()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <strong>{jumlah}</strong>
                            <Button variant="primary" size="sm" style={{ marginLeft: 2 }} onClick={ () => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan :</Form.Label>
                            <Form.Control as="textarea" 
                            placeholder="Contoh : Pedas" 
                            rows="3" 
                            name="keterangan" 
                            value={keterangan}
                            onChange={(event) => changeHandler(event)}/>
                        </Form.Group>
                        <Button variant='primary' type="submit" style={{ marginTop: 6 }}>
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Kosong
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default Modalcart