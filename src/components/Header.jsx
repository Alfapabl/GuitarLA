export default function Header(props) {

  const isEmpty = () => props.cart.length === 0
  const totalPay = () => props.cart.reduce( (total, items) => total + (items.quantity * items.price), 0)

  return (
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img
                  className="img-fluid"
                  src="./img/logo.svg"
                  alt="imagen logo"
                />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img
                  className="img-fluid"
                  src="./public/img/carrito.png"
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-3">
                  {isEmpty() ?  <p className="text-center">El carrito esta vacio</p> :
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody> 
                          {props.cart.map(guitars => 
                                                  <tr key={guitars.id}>
                                                  <td>
                                                    <img
                                                      className="img-fluid"
                                                      src={`/img/${guitars.image}.jpg`}
                                                      alt="imagen guitarra"
                                                    />
                                                  </td>
                                                  <td>{guitars.name}</td>
                                                  <td className="fw-bold">${guitars.price}</td>
                                                  <td className="flex align-items-start gap-4">
                                                    <button type="button" className="btn btn-dark" onClick={() => props.decreaseQuantity(guitars.id)}>
                                                      -
                                                    </button>
                                                    {guitars.quantity}
                                                    <button type="button" className="btn btn-dark" onClick={()=> props.increaseQuantity(guitars.id)}>
                                                      +
                                                    </button>
                                                  </td>
                                                  <td>
                                                    <button onClick={() => props.removeCart(guitars.id)} className="btn btn-danger" type="button">
                                                      X
                                                    </button>
                                                  </td>
                                                  </tr>
                          )}
                        </tbody>
                      </table>

                      <p className="text-end">
                        Total pagar: <span className="fw-bold">${totalPay()}</span>
                      </p>
                    </>
                  }
                  <button className="btn btn-dark w-100 mt-3 p-2" onClick={props.cleanCart}>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}