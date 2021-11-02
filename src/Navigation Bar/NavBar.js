import './NavBar.css'
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
                    src="https://www.teahub.io/photos/full/53-539118_overwatch-iphone-wallpaper-zenyatta.jpg"
                    alt="logo"
                    className="topLogo"
                />
                <SearchIcon className="topSearchIcon"/>
            </div>
        </div>
    )
}

export default NavBar