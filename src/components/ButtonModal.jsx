import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addAcceptanceToken } from "../redux/paymentSlice.js"
import environment from "../environments/environment.js"
import FormCreditCard from "./FormCreditCard.jsx"

const ButtonModal = () => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [isChecked, setChecked] = useState(false)
    const [permaLink, setPermaLink] = useState('')

    useEffect(() => {
        fetch(`${environment.apiUrlWompi}/merchants/${environment.keyPublic}`)
            .then((response) => response.json())
            .then((data) => {
                setPermaLink(data.data.presigned_acceptance.permalink)
                dispatch(addAcceptanceToken(data.data.presigned_acceptance.acceptance_token))
            })
    }, [])

    return (
        <>
            <Form>
                <Form.Check
                    type = "checkbox"
                    value={isChecked}
                >
                    <Form.Check.Input type='checkbox' onChange={() => setChecked(!isChecked)}/>
                    <Form.Check.Label>
                        Acepto haber leido los
                        <a href={permaLink} target="_blank" style={{ textDecoration: 'underline', color: 'blue' }}>
                            términos y condiciones y la politica de privacidad 
                        </a>
                        para hacer esta compra
                    </Form.Check.Label>
                </Form.Check>
            </Form>

            <Button variant="success" onClick={() => setShow(true)} disabled = {!isChecked}>
                Pay with credit card
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Credit card info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <FormCreditCard/>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger">Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ButtonModal
