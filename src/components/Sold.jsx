import { Link, useParams } from 'react-router-dom'

function Sold() {
    const {productId} = useParams()
    console.log('productId: ', productId);

  return (
    <div className="error-background">
      <h2 className="error-h2">This item found a new home</h2>
      <h2 className="error-h2">Let's go back exploring!</h2>
      <Link to="/">
        <button className="error-page-button">Homepage</button>
      </Link>
    </div>
  )
}

export default Sold