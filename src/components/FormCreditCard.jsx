import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { changeStatusTransaction } from "../redux/paymentSlice"
import environment from "../environments/environment"

const FormCreditCard = () => {

    const dispatch = useDispatch()

    const payment = useSelector((state) => state.payment)
    const cartShopping = useSelector((state) => state.cart)

    const { register, handleSubmit } = useForm()

    const sha256 = async (chain) => {
        const encondedText = new TextEncoder().encode(chain);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        return hashHex
    }

    const createReference = () => {
        const random = Math.random().toString(36).substring(2,12)
        return random
    }

    const submit = (data) => {
        dispatch(changeStatusTransaction(true))

        fetch(`${environment.apiUrlWompi}/tokens/cards`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${environment.keyPublic}`
            },
            body: JSON.stringify({
                number: data.number,
                cvc: data.cvc,
                exp_month: data.month,
                exp_year: data.year,
                card_holder: data.name
            })
        })
            .then((response) => response.json())
            .then((res) => {
                makeTransaction(res, data)
            })
    }

    const makeTransaction = async (res, data) => {
        const reference = createReference()
        const signature = await sha256(`${reference}${cartShopping.totalInCents}${payment.currency}${payment.integrityKey}`)

        fetch(`${environment.apiUrlWompi}/transactions`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${environment.keyPublic}`
            },
            body: JSON.stringify({
                acceptance_token: `${payment.acceptanceToken}`,
                amount_in_cents: cartShopping.totalInCents,
                currency: payment.currency,
                signature: signature,
                reference: reference,
                customer_email: data.email,
                payment_method: {
                    type: "CARD",
                    installments: data.installments,
                    token: res.data.id
                }
            })
        })
        .then((response) => response.json())
        .then((data2) => {
            console.log(data2)
            dispatch(changeStatusTransaction(false))
        })
    }

    return (
        <Form onSubmit={handleSubmit(submit)} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Form.Group style={{
                width: "100%"
            }}>
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" placeholder="Escriba el nombre completo" {...register('name', {required: true})}/>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" {...register('email', {required: true})}/>
                <Form.Label>Numero</Form.Label>
                <Form.Control type="text" placeholder="4000 0000 0000" {...register('number', {required: true})}/>
                <Form.Label>CSV</Form.Label>
                <Form.Control type="text" placeholder="000" {...register('cvc', {required: true})}/>
                <Form.Label>Mes de fecha de expedicion</Form.Label>
                <Form.Control type="text" placeholder="00" {...register('month', {required: true})}/>
                <Form.Label>Año de expedicion</Form.Label>
                <Form.Control type="text" placeholder="00" {...register('year', {required: true})}/>
                <Form.Label>Numero de cuotas</Form.Label>
                <Form.Control type="text" placeholder="00" {...register('installments', {required: true})}/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={payment.isTransactionMade}>
                Pay
            </Button>
        </Form>
    )

}

export default FormCreditCard
