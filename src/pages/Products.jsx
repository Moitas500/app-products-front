import '../styles/products.styles.css'
import { useSelector } from 'react-redux'
import CardProduct from "../components/CardProducts"
import ShoppingCart from '../components/ShoppingCart'
import ButtonModal from '../components/ButtonModal'

const Products = () => {
    const products = useSelector((state) => state.products)

    return (
        <div className='container'>

            <div className = 'container-header'>
                <h2>
                    Ofimatica
                </h2>

                <ShoppingCart/>
            </div>

            <div className="container-products">
                {
                    products.map( (product, index) => (
                        <CardProduct product={product} key={index}/>
                    ))
                }
            </div>

            <ButtonModal/>
        </div>
    )
}

export default Products
