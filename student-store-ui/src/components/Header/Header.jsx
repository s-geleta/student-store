import "./Header.css"
import { Link } from "react-router-dom";
import books from "../../assets/books.jpg";    


function Header() {
  return (
    <header className="Header">
      <div className="content">
        
        <Link to="/">
            <img src={books} alt="books" />
              <h1>Student Store</h1>        
        </Link>
        
        <p>Shop for all your favorite products</p>
      </div>
    </header>
  )
}

export default Header;