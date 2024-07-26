import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { useDispatch } from 'react-redux'
import { addProductCart } from "../redux/shopingCartSlice.js"

const CardProduct = ({product}) => {

    const dispatch = useDispatch()

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant='top'/>

            <Card.Header>{ product.name }</Card.Header>

            <Card.Body style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center' 
            }}>
                <Card.Text>
                    Precio: { product.price }
                    <br></br>
                    Stock: { product.stock }
                </Card.Text>
                <Button variant='primary' style={{ width: '100%' }} onClick={() => dispatch(addProductCart(product))}>
                    Agregar al carrito
                </Button>
            </Card.Body>
        </Card>
    )

}

export default CardProduct
