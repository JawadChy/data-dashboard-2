import './Sidebar.css'

function Sidebar() {
    return (
        <div className="Sidebar">
            <div className="Header">
                <img className="Logo" alt="cloud air logo" src="https://img.icons8.com/?size=200&id=dmyNanhX1Hbx&format=png"></img>
                <h3 className="Title">AirDash</h3>
            </div>

            <div className="Menu">
                <ul>
                    <li className="Menu-item">
                        <a className="menu-link" href="/">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div>🏡 Dashboard</div>
                        </a>
                    </li>
                    <li className="Menu-item">
                        <a className="menu-link" href="/">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div>🔎 Search</div>
                        </a>
                    </li>
                    <li className="Menu-item">
                        <a className="menu-link" href="/">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div>❓ About</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
