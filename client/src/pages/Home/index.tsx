import React, { useCallback, useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import { useAuth } from '../../hooks/auth';

import { BsTrash } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import { Grant } from '../../types/Grant';
import { useToast } from '../../hooks/toast';

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

// export const grants = [
//   {
//     id: 1,
//     grantName: 'COVID Grant Fall 2021',
//     openDate: '2021-10-19T00:00:00.000Z',
//     closeDate: '2021-12-25T00:00:00.000Z',
//     dateWhenMoneyWasReceived: '2021-12-01T00:00:00.000Z',
//     status: 'Pending',
//     amountRequested: 2000.0,
//     amountApproved: 1000.0,
//     sponsorName: 'UNF',
//     sponsorUrl: 'www.unf.edu',
//     expenses: [
//       {
//         fiscoCode: 1,
//         expenseName: 'Salaries',
//         totalBudget: 500.0,
//         balanceRemaining: 115.0,
//       },
//     ],
//   },
//   {
//     id: 2,
//     grantName: 'Performance Grant',
//     openDate: '2021-11-01T00:00:00.000Z',
//     closeDate: '2021-12-31T00:00:00.000Z',
//     dateWhenMoneyWasReceived: '2021-12-01T00:00:00.000Z',
//     status: 'Approved',
//     amountRequested: 5000.0,
//     amountApproved: 2500.0,
//     sponsorName: 'Pacesetter',
//     sponsorUrl: 'www.pacesetter.com',
//     expenses: [
//       {
//         fiscoCode: 1,
//         expenseName: 'Salaries',
//         totalBudget: 500.0,
//         balanceRemaining: 115.0,
//       },
//     ],
//   },
// ];

const GrantTable: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const { addToast } = useToast();
  const token = localStorage.getItem('@Grantify:token');

  const deleteGrant = useCallback(
    (id: string) => {
      api.get('grants').then(async response => {
        const findGrant: Grant = response.data.find((g: Grant) => g.id === id);

        if (findGrant) {
          console.log(findGrant);
          setGrants(grants.filter(grant => grant.id !== findGrant.id));
          await api.delete(`grants/${findGrant.id}`);

          addToast({
            type: 'success',
            title: 'Grant removed!',
            description: 'The changes have been saved successfully.',
          });
        }
      });
    },
    [addToast, grants],
  );

  useEffect(() => {
    if (token) {
      api
        .get('grants', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => setGrants(response.data));
    }
  }, [token]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Amount <span className="text-gray-800">requested</span> /{' '}
                    <span className="text-gray-800">approved</span>
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
                    <tr key={grant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {grant.grantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {grant.sponsorName}
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/grants/view/${grant.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/grants/edit/${grant.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => deleteGrant(grant.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
