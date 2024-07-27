import { useSelector } from "react-redux"

const ShoppingCart = () => {
    const cartShopping = useSelector((state) => state.cart)

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            gap: '10px'
        }}>
            <svg style={{marginTop: '0.3rem'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            </svg>
            <h4>
                { cartShopping.cart.length } 
            </h4>
            {
                cartShopping.cart.length > 0 ? 
                (
                    <>
                        <h4>
                            Total =
                        </h4>
                        <h4>
                            {cartShopping.total}
                        </h4>
                    </>
                ) : (<></>)
            }
        </div>
    )

}

export default ShoppingCart
