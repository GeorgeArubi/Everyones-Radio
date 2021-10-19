import './navbar.css'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter';

function NavBar() {
    return (
        <div className="top">
            <div className="topLeft">
                <InstagramIcon />
                <TwitterIcon />
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
                    src="https://github.com/GeorgeArubi/Everyones-Radio/blob/master/media_assets/Logo%202.PNG"
                    alt="logo"
                />
            </div>
        </div>
    )
}

export default NavBar