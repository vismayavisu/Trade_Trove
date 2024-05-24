import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function Header(props) {

    const [loc, setLoc] = useState(null)
    const [showOver, setshowOver] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    let locations = [
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "Dharwad, Karnataka"
        },
        {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "placeName": "Hubli, Karnataka"
        },
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "Sirsi, Karnataka"
        },
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "Udpi, Karnataka"
        },
    ]

    return (
        <div className='header-container d-flex justify-content-between'>

            <div className="header">
            <Link className='links' to="/"><h1 className="custom-heading-style">TRADE TROVE</h1></Link>

                <select value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value)
                    setLoc(e.target.value)
                }}     style={{ width: '267px', 
                borderColor: '#002f34', 
                borderWidth: '2px',
                borderRadius: '4px', // Adjust border radius for soft edges
                outline: 'none', // Remove default outline
                padding: '0 10px', // Add padding for content
                fontSize: '16px', }} // Adjust the height here
                  >
                    {
                        locations.map((item, index) => {
                            return (
                                <option value={`${item.latitude},${item.longitude}`} >
                                    {item.placeName}
                                </option>
                            )
                        })
                    }
                </select>
                <input className='search'
                    type='text'
                    placeholder="Find Vehicles, Home Appliances, Furniture and many more...."
                    value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
                    }
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > <FaSearch /> </button>
            </div>

            <div>

                <div
                    onClick={() => {
                        setshowOver(!showOver)
                    }}
                    className="login-signup-btn"
                >
                    LOGIN/SIGNUP
                </div>

                {showOver && <div style={{
                    minHeight: '100px',
                    width: '200px',
                    background: '#eee',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    zIndex: 1,
                    marginTop: '50px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#002f34',
                    borderRadius: '7px'
                }}>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/add-product">
                                <button className="logout-btn">ADD PRODUCT  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className="logout-btn"> FAVOURITES  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-products">
                                <button className="logout-btn">MY PRODUCTS  </button>
                            </Link>}
                    </div>
                    <div>
                        {!localStorage.getItem('token') ? (
                        <Link to="/login">
                            <button className="login-btn">LOGIN</button>
                        </Link>
                    ) : (
                    <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
                    )}
                    </div>

                </div>}

            </div>

        </div>
    )
}


export default Header;