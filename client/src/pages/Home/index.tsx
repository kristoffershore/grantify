import React, {
  Fragment,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import { useAuth } from '../../hooks/auth';

import { BsTrash } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import { Grant } from '../../types/Grant';
import { useToast } from '../../hooks/toast';
import UserPermissionAssociation from '../../types/UserPermissionAssociation';
import Permission from '../../types/Permission';

// interface ConfirmDeletionProps {
//   id: string;
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   grants: Grant[];
//   setGrants: Dispatch<SetStateAction<Grant[]>>;
// }

const Home: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex">
      <SideBar signOut={signOut} />
      <ContentContainer title="Grants" />
    </div>
  );
};

const ContentContainer: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="content-container">
      <div className="content-list">
        <h1 className="content-title">{title}</h1>
        <GrantTable />
      </div>
    </div>
  );
};

function SortButton({
  onClick,
}: {
  sortKey: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick} className="text-xs px-2">
      ▼
    </button>
  );
}

const GrantTable: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [userPermissionAssociations, setUserPermissionAssociations] = useState<
    UserPermissionAssociation[]
  >([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [sortKey, setSortKey] = useState('');
  const { addToast } = useToast();
  const { user } = useAuth();

  function dateSort() {
    grants.sort((a, b) => (a.closeDate > b.closeDate ? 1 : -1));
    setSortKey('sorted');
  }

  const canAccess = useCallback(
    (permissionDisplayName: string): boolean => {
      const permissionMatches = permissions.filter(p =>
        userPermissionAssociations
          .map(upa => upa.permissionTypeId)
          .includes(p.id),
      );

      const displayNamePermissionMatches = permissionMatches.map(
        pm => pm.displayName,
      );

      return displayNamePermissionMatches.includes(permissionDisplayName);
    },
    [permissions, userPermissionAssociations],
  );

  const deleteGrant = useCallback(
    (id: string) => {
      api.get<Grant>(`grants/${id}`).then(async response => {
        setGrants(grants.filter(grant => grant.id !== response.data.id));
        await api.delete(`grants/${response.data.id}`);

        addToast({
          type: 'success',
          title: 'Grant removed!',
          description: 'The changes have been saved successfully.',
        });
      });
    },
    [addToast, grants],
  );

  useEffect(() => {
    api.get<Grant[]>('grants').then(response => setGrants(response.data));
    api
      .get<UserPermissionAssociation[]>(`users/${user.id}/user-permissions`)
      .then(response => setUserPermissionAssociations(response.data));
    api
      .get<Permission[]>('permissions')
      .then(response => setPermissions(response.data));
  }, [user.id]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
            <Search
              icon={FaSearch}
              placeholder="Search for a grant by name..."
              onChange={event => {
                setSearchKey(event.target.value);
              }}
            />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name / Grantor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Open Date / Close Date
                    <SortButton
                      onClick={() => dateSort()}
                      {...{
                        sortKey,
                      }}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount requested /approved
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">X</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grants
                  .filter(val => {
                    if (searchKey === '') {
                      return val;
                    } else if (
                      val.grantName
                        .toLowerCase()
                        .includes(searchKey.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map(grant => (
                    <Fragment key={grant.id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {grant.grantName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {grant.writerName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(grant.openDate).getUTCMonth() + 1}/
                            {new Date(grant.openDate).getUTCDate()}/
                            {new Date(grant.openDate).getUTCFullYear()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(grant.closeDate).getUTCMonth() + 1}/
                            {new Date(grant.closeDate).getUTCDate()}/
                            {new Date(grant.closeDate).getUTCFullYear()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {grant.status === 'Approved' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {grant.status}
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-300 text-gray-800">
                              {grant.status}
                            </span>
                          )}
                        </td>
                        {grant.amountApproved ? (
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${grant.amountRequested} / ${grant.amountApproved}
                          </td>
                        ) : (
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${grant.amountRequested}
                          </td>
                        )}
                        {canAccess('viewGrant') && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/grants/view/${grant.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </Link>
                          </td>
                        )}
                        {canAccess('editGrant') && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/grants/edit/${grant.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                          </td>
                        )}
                        {canAccess('deleteGrant') && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div>
                              <button
                                type="button"
                                onClick={() => {
                                  // eslint-disable-next-line no-restricted-globals
                                  const option = confirm(
                                    `Are you sure you want to delete the grant ${grant.grantName}? This action cannot be reversed`,
                                  );
                                  option && deleteGrant(grant.id);
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <BsTrash />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                      {/* {open && (
                        <ConfirmDeletionPopup
                          id={grant.id}
                          open={open}
                          setOpen={setOpen}
                          grants={grants}
                          setGrants={setGrants}
                        />
                      )} */}
                    </Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// const ConfirmDeletionPopup: React.FC<ConfirmDeletionProps> = ({
//   id,
//   open,
//   setOpen,
//   grants,
//   setGrants,
// }) => {
//   const cancelButtonRef = useRef(null);
//   const { addToast } = useToast();

//   const deleteGrant = useCallback(
//     (id: string) => {
//       api.get('grants').then(async response => {
//         const findGrant: Grant = response.data.find((g: Grant) => g.id === id);

//         if (findGrant) {
//           console.log(findGrant);
//           setGrants(grants.filter(grant => grant.id !== findGrant.id));
//           await api.delete(`grants/${findGrant.id}`);

//           addToast({
//             type: 'success',
//             title: 'Grant removed!',
//             description: 'The changes have been saved successfully.',
//           });
//         }
//       });
//     },
//     [addToast, grants, setGrants],
//   );

//   return (

//   );
// };

export default Home;
