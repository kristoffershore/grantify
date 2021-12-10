import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useAuth } from '../../hooks/auth';

type Person = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

const people: Person[] = [
  {
    id: '1',
    name: 'Bruce Wayne',
    email: 'bwayne@wayneenterprises.com',
    createdAt: '2021-12-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Wally West',
    email: 'wwest@starlabs.com',
    createdAt: '2020-06-21T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Clark Kent',
    email: 'ckent@dailyplanet.com',
    createdAt: '2019-03-15T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Lex Luthor',
    email: 'lluthor@lexcorp.com',
    createdAt: '2018-09-07T00:00:00.000Z',
  },
];

const UserTable: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex">
      <SideBar signOut={signOut} />
      <div className="content-container">
        {/* <TopNavigation /> */}
        <div className="content-list">
          <h1 className="content-title">Users</h1>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

const UsersTable: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name / Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Account creation date
                  </th>
                  <th scope="col" className="relative px-12 py-3">
                    <span className="sr-only">Edit permissions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {people.map(person => (
                  <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(person.createdAt).getUTCMonth()}/
                        {new Date(person.createdAt).getUTCDate()}/
                        {new Date(person.createdAt).getUTCFullYear()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                        to="/users/:id/edit"
                      >
                        Edit permissions
                      </Link>
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

export default UserTable;
