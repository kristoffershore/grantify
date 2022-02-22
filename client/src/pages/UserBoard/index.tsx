import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container } from './styles';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

const UserBoard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex">
      <SideBar signOut={signOut} />
      <div className="content-container">
        <div className="content-list">
          <h1 className="content-title">Users</h1>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(
        response.data.filter((user: User) => user.email !== 'seed@dev.com'),
      );
    });
  }, []);

  return (
    <Container>
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
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(user.createdAt).getUTCMonth() + 1}/
                        {new Date(user.createdAt).getUTCDate()}/
                        {new Date(user.createdAt).getUTCFullYear()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                        to={`/users/${user.id}`}
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
    </Container>
  );
};

export default UserBoard;
