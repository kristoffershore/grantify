import {
  BsPlus,
  BsGearFill,
  BsPower,
  BsClipboardData,
  BsPeopleFill,
} from 'react-icons/bs';
import { FaCalendar, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar: React.FC<{ signOut(): void }> = ({ signOut }) => {
  return (
    <div
      className="top-0 left-0 h-screen flex flex-col w-16
                  bg-white dark:bg-gray-900 shadow-lg"
    >
      <div className="flex-auto">
        <Link to="/home">
          <SideBarIcon icon={<FaFire size="28" />} />
        </Link>
        <Divider />
      </div>
      <div className="flex-auto">
        <SideBarIcon icon={<BsPlus size="32" />} text="Add a new grant" />
        <Link to="/grants/:id">
          <SideBarIcon icon={<BsClipboardData size="20" />} text="Grants" />
        </Link>
        <SideBarIcon icon={<FaCalendar size="20" />} text="Calendar" />
        <SideBarIcon icon={<BsPeopleFill size="20" />} text="Grantors" />
        <Link to="/permissions">
          <SideBarIcon icon={<BsGearFill size="20" />} text="Permissions" />
        </Link>
        <Divider />
      </div>
      <button type="submit" onClick={signOut}>
        <SideBarIcon icon={<BsPower size="22" />} text="Log out" />
      </button>
    </div>
  );
};

const SideBarIcon: React.FC<{ icon: JSX.Element; text?: string }> = ({
  icon,
  text,
}) => (
  <div className="sidebar-icon group">
    {icon}
    {text && (
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    )}
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
