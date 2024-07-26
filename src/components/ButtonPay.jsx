import { Button } from 'react-bootstrap'

const ButtonPay = () => {

    const sendData = () => {
        const htmlBody = `
            <html>
                <form action="https://checkout.wompi.co/p/" id="wompi_form" method="GET">
                    <!-- OBLIGATORIOS -->
                    <input type="hidden" name="public-key" value="LLAVE_PUBLICA_DEL_COMERCIO" />
                    <input type="hidden" name="currency" value="MONEDA" />
                    <input type="hidden" name="amount-in-cents" value="MONTO_EN_CENTAVOS" />
                    <input type="hidden" name="reference" value="REFERENCIA_DE_PAGO" />
                    <input type="hidden" name="signature:integrity" value="FIRMA_DE_INTEGRIDAD" />
                    <!-- OPCIONALES -->
                    <input type="hidden" name="redirect-url" value="URL_REDIRECCION" />
                    <input type="hidden" name="expiration-time" value="FECHA_EXPIRACION" />
                    <input type="hidden" name="tax-in-cents:vat" value="IVA_EN_CENTAVOS" />
                    <input
                        type="hidden"
                        name="tax-in-cents:consumption"
                        value="IMPOCONSUMO_EN_CENTAVOS"
                    />
                    <input type="hidden" name="customer-data:email" value="CORREO_DEL_PAGADOR" />
                    <input
                        type="hidden"
                        name="customer-data:full-name"
                        value="NOMBRE_DEL_PAGADOR"
                    />
                    <input
                        type="hidden"
                        name="customer-data:phone-number"
                        value="NUMERO_DE_TELEFONO_DEL_PAGADOR"
                    />
                    <input
                        type="hidden"
                        name="customer-data:legal-id"
                        value="DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR"
                    />
                    <input
                        type="hidden"
                        name="customer-data:legal-id-type"
                        value="TIPO_DEL_DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR"
                    />
                    <input
                        type="hidden"
                        name="shipping-address:address-line-1"
                        value="DIRECCION_DE_ENVIO"
                    />
                    <input type="hidden" name="shipping-address:country" value="PAIS_DE_ENVIO" />
                    <input
                        type="hidden"
                        name="shipping-address:phone-number"
                        value="NUMERO_DE_TELEFONO_DE_QUIEN_RECIBE"
                    />
                    <input type="hidden" name="shipping-address:city" value="CIUDAD_DE_ENVIO" />
                    <input type="hidden" name="shipping-address:region" value="REGION_DE_ENVIO" />
                </form>
                <script type="text/javascript">
                    document.getElementById("wompi_form").submit();
                </script>
            </html>
        `

        const winUrl = URL.createObjectURL(
            new Blob([htmlBody], {type: "text/html"})
          )
          
        window.location.href = winUrl
    }

    return(
        <Button variant='success' onClick={sendData}>
            Comprar
        </Button>
    )

}

export default ButtonPay
