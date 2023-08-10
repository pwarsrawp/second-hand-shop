import { Link } from 'react-router-dom'

function Reserved({productId}) {
    console.log('productId: ', productId);

  return (
    <div className="error-background">
      <h2 className="error-h2">Oh no! This one is reserved already</h2>
      <h2 className="error-h2">You can still save it to your wishlist</h2>
      <Link to={`/products/${productId}`}>
        <button className="error-page-button">Back to Item</button>
      </Link>
    </div>
  )
}

export default Reserved