import { Link, useLocation } from "react-router-dom";

//  This component is a simple navigation bar that displays two links: Home and Candidates List.
const Nav = () => {
  const currentPage = useLocation().pathname;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Candidates List", path: "/SavedCandidates" },
  ];
  return (
    <div>
      <ul className="nav">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link
              to={item.path}
              className={
                currentPage === item.path ? "nav-link active" : "nav-link"
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;