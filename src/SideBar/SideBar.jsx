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
        </div>
    )
}

export default Sidebar
