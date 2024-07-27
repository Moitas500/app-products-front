import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import environment from "../environments/environment"
import { useSelector } from "react-redux"

const FormCreditCard = () => {

    const payment = useSelector((state) => state.payment)

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [cvc, setCSV] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [installments, setinstallments] = useState('')

    const sha256 = async (chain) => {
        const encondedText = new TextEncoder().encode(chain);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        console.log(hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""))
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    const submit = () => {
        fetch(`${environment.apiUrlWompi}/tokens/cards`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${environment.keyPublic}`
            },
            body: JSON.stringify({
                number,
                cvc,
                exp_month: month,
                exp_year: year,
                card_holder: name
            })
        })
            .then((response) => response.json())
            .then((data) => {
                fetch(`${environment.apiUrlWompi}/transactions`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${environment.keyPublic}`
                    },
                    body: JSON.stringify({
                        acceptance_token: `${payment.acceptanceToken}`,
                        amount_in_cents: 1000000,
                        currency: "COP",
                        signature: `${sha256('ABCABVBC100000COPstagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp')}`,
                        reference: "dasdas",
                        customer_email: "camilofour1@gmail.com",
                        payment_method: {
                            type: "CARD",
                            installments: installments,
                            token: data.data.id
                        }
                    })
                })
                .then((response) => response.json())
                .then((data2) => console.log(data2))
            })
    }

    return (
        <Form style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Form.Group style={{
                width: "100%"
            }}>
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" placeholder="Escriba el nombre completo" value={name} onChange={(event) => setName(event.target.value)}/>
                <Form.Label>Numero</Form.Label>
                <Form.Control type="text" placeholder="4000 0000 0000" value={number} onChange={(event) => setNumber(event.target.value)}/>
                <Form.Label>CSV</Form.Label>
                <Form.Control type="text" placeholder="000" value={cvc} onChange={(event) => setCSV(event.target.value)}/>
                <Form.Label>Mes de fecha de expedicion</Form.Label>
                <Form.Control type="text" placeholder="00" value={month} onChange={(event) => setMonth(event.target.value)}/>
                <Form.Label>Año de expedicion</Form.Label>
                <Form.Control type="text" placeholder="00" value={year} onChange={(event) => setYear(event.target.value)}/>
                <Form.Label>Numero de cuotas</Form.Label>
                <Form.Control type="text" placeholder="00" value={installments} onChange={(event) => setinstallments(event.target.value)}/>
            </Form.Group>

            <Button variant="primary" onClick={submit} >
                Pay
            </Button>
        </Form>
    )

}

export default FormCreditCard
