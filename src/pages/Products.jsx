import '../styles/products.styles.css'
import CardProduct from "../components/CardProducts"
import { Button } from 'react-bootstrap'

const products = [
    {
        name: 'Office 2019',
        price: 37000,
        stock: 30
    },
    {
        name: 'Office 2021 Profession',
        price: 61000,
        stock: 15
    },
    {
        name: 'Office 2019 Home',
        price: 378000,
        stock: 20
    },
    {
        name: 'Project Professional 2021',
        price: 42000,
        stock: 10
    },
]

const Products = () => {

    return (
        <div className='container'>
            <h2>
                Ofimatica
            </h2>

            <div className="container-products">
                {
                    products.map( product => (
                        <CardProduct product={product}/>
                    ))
                }
            </div>

            <Button variant='primary'>
                Comprar
            </Button>
        </div>
    )
}

export default Products
