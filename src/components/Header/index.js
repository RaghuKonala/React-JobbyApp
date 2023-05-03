import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const logoutApp = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <div className="header-elements-container">
        <Link to="/">
          <img
            className="header-website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        <ul className="header-mobile-items">
          <li>
            <Link to="/" className="header-item-link">
              <AiFillHome size={26} className="header-mobile-item" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="header-item-link">
              <BsFillBriefcaseFill size={26} className="header-mobile-item" />
            </Link>
          </li>
          <li>
            <button
              className="mobile-logout-button"
              type="button"
              onClick={logoutApp}
            >
              <FiLogOut color="#ffffff" size={26} />
            </button>
          </li>
        </ul>
        <ul className="header-desktop-items">
          <li>
            <Link to="/" className="header-item-link">
              <p className="header-desktop-item">Home</p>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="header-item-link">
              <p className="header-desktop-item">Jobs</p>
            </Link>
          </li>
        </ul>
        <button
          type="submit"
          className="desktop-logout-button"
          onClick={logoutApp}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
