import { FaSearch, FaRegBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopNavigation: React.FC = () => {
  return (
    <div className="top-navigation">
      {/* <div className="flex flex-row"> */}
      <BellIcon />
      <UserCircle />
      {/* </div> */}
    </div>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="text-secondary my-auto" />
  </div>
);

const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon" />;
const UserCircle = () => (
  <Link to="/profile">
    {/* <FaUserCircle size="24" className="top-navigation-icon" /> */}
    Profile
  </Link>
);

export default TopNavigation;
