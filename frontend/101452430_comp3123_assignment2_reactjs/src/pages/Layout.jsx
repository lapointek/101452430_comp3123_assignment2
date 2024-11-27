import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    <body>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/employeecomponents">Employee Components</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </body>
  );
};

export default Layout;
