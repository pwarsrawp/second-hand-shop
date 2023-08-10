import { Link } from 'react-router-dom'

function Requested() {

  return (
    <div className="error-background">
      <h2 className="error-h2">Congratulations!</h2>
      <h2 className="error-h2">You requested the item</h2>
      <Link to="/">
        <button className="error-page-button">Homepage</button>
      </Link>
    </div>
  )
}

export default Requested