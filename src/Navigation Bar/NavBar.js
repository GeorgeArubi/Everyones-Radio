import './navbar.css'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import SearchIcon from '@material-ui/icons/Search'

function NavBar() {
    return (
        <div className="top">
            <div className="topLeft">
                <InstagramIcon className="topIcon"/>
                <TwitterIcon className="topIcon"/>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">HOME</li>
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem">WRITE</li>
                    <li className="topListItem">LOGOUT</li>
                </ul>
            </div>
            <div className="topRight">
                <img
                    src="https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&h=90&w=90"
                    alt="logo"
                    className="topLogo"
                />
                <SearchIcon className="topSearch Icon"/>
            </div>
        </div>
    )
}

export default NavBar