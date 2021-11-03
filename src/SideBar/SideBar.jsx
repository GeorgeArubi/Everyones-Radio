import './sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img 
                    className="sidebarImage"
                    src="https://i.pinimg.com/564x/c7/60/74/c76074651fc8831810961cdda3896c5f.jpg" 
                    alt="about"
                />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, expedita.
                    Ut praesentium, aliquam exercitationem nam consectetur asperiores nisi. 
                </p>
            </div> 
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Playlists</li>
                    <li className="sidebarListItem">Artist Spotlight</li>
                    <li className="sidebarListItem">Events</li>                        
                    <li className="sidebarListItem">Radio Show</li>
                    <li className="sidebarListItem">Music</li>
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-instagram"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-itunes-note"></i>
                    <i className="sidebarIcon fa-brands fa-spotify"></i>
                </div> 
            </div>
        </div>
    )
}

export default Sidebar
