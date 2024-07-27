import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { changeStatusTransaction } from "../redux/paymentSlice"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaCcVisa, FaCcMastercard  } from "react-icons/fa"
import environment from "../environments/environment"
import { useState } from "react"

const FormCreditCard = () => {

    const dispatch = useDispatch()

    const payment = useSelector((state) => state.payment)
    const cartShopping = useSelector((state) => state.cart)

    const { register, formState: { errors } , handleSubmit } = useForm()

    const [cardType, setCardType] = useState('')
    const [cardNumber, setCardNumber] = useState('')

    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ')
    }

    const handleCardNumberChange = (event) => {
        const input = event.target.value.replace(/\s+/g, '')
        const formattedNumber = formatCardNumber(input)
        setCardNumber(formattedNumber)
        setCardType(getCardType(input))
    }

    const getCardType = (number) => {
        const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/
        const masterCardPattern = /^5[1-5][0-9]{14}$/

        if (visaPattern.test(number)) {
            return 'visa'
        } else if (masterCardPattern.test(number)) {
            return 'mastercard'
        } else {
            return ''
        }
    }

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
        toast('El pago se esta realizando')

        dispatch(changeStatusTransaction(true))

        fetch(`${environment.apiUrlWompi}/tokens/cards`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${environment.keyPublic}`
            },
            body: JSON.stringify({
                number: data.number.replace(/\s+/g, ''),
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

    const validateErrors = () => {
        const errorMessages = {
            name: {
                required: 'El nombre es requerido',
                minLength: 'El nombre debe tener mínimo 5 caracteres'
            },
            email: {
                required: 'El email es requerido',
                pattern: 'No es un correo electronico'
            },
            number: {
                required: 'El numero de tarjeta es requerido',
                pattern: 'Solo se acepta VISA y MASTERCARD',
            },
            cvc: {
                required: 'El codigo de seguridad es requerido',
                minLength: 'El CSV tiene 3 digitos'
            },
            month: {
                required: 'El mes es requerido',
                minLength: 'Debe estar en el formato 00',
                pattern: 'El mes debe estar desde el 1 al 12'
            },
            year: {
                required: 'El año es requerido',
                minLength: 'Debe estar en el formato 00'
            },
            installments: {
                required: 'El número de cuotas es requerido',
                maxLength: 'El numero de cuotas tiene que ser menor a 99'
            }
        };
        
        Object.keys(errorMessages).forEach((field) => {
            const errorType = errors[field]?.type;
            if (errorType && errorMessages[field][errorType]) {
                toast.warning(errorMessages[field][errorType]);
            }
        });
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
                <Form.Control type="text" placeholder="Escriba el nombre completo" {...register('name', {required: true, minLength: 5})}/>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" {...register('email', {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})}/>
                <Form.Label>Numero</Form.Label>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px'
                }}>
                    {cardType === 'mastercard' && <FaCcMastercard />}
                    {cardType === 'visa' && <FaCcVisa />}
                    <Form.Control value={cardNumber} maxLength={19} type="text" placeholder="4000 0000 0000" {...register('number', {required: true, 
                            pattern: /^(?:4[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}|5[1-5][0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4})$/,
                        })}
                        onChange={handleCardNumberChange}
                    />
                </div>
                <Form.Label>CSV</Form.Label>
                <Form.Control maxLength={3} type="text" placeholder="000" {...register('cvc', {required: true, minLength: 3})}/>
                <Form.Label>Mes de fecha de expedicion</Form.Label>
                <Form.Control maxLength={2} type="text" placeholder="00" {...register('month', {required: true, minLength: 2, pattern: /^(0[0-9]|1[0-2])$/})}/>
                <Form.Label>Año de expedicion</Form.Label>
                <Form.Control maxLength={2} type="text" placeholder="00" {...register('year', {required: true, minLength: 2, pattern: /^(0[0-9]|[1-9][0-9])$/})}/>
                <Form.Label>Numero de cuotas</Form.Label>
                <Form.Control maxLength={2} type="text" placeholder="00" {...register('installments', {required: true, maxLength: 2})}/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={payment.isTransactionMade} onClick={validateErrors}>
                Pay
            </Button>

            <ToastContainer/>
        </Form>
    )

}

export default FormCreditCard
