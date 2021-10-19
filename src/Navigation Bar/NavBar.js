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
                    src="https://raw.githubusercontent.com/GeorgeArubi/Everyones-Radio/aedec327cd94f18239885999531cac8f49bc735d/src/Images/artworks-r1B3QdPYeHm8qkJJ-BzzhGw-t500x500.jpg?token=AJVK7FYT3H6PX542MTB5YHDBN3WEW"
                    alt="logo"
                    className="topLogo"
                />
                <SearchIcon className="topSearch Icon"/>
            </div>
        </div>
    )
}

export default NavBar