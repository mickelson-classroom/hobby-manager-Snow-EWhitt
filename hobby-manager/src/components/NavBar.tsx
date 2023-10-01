const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid justify-content-start">
        <a className="navbar-brand d-none d-sm-block" href="#">
          Navbar
        </a>
        <div id="navbarNav">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item mx-2">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="create-game">
                Add Game
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
