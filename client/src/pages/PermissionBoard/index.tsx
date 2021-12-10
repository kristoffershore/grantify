import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import Button from '../../components/Button';
import SideBar from '../../components/SideBar';
import { useAuth } from '../../hooks/auth';

type Permission = {
  id: string;
  displayName: string;
};

const permissions: Permission[] = [
  {
    id: '1',
    displayName: 'viewGrant',
  },
  {
    id: '2',
    displayName: 'editGrant',
  },
  {
    id: '3',
    displayName: 'createGrant',
  },
  {
    id: '4',
    displayName: 'deleteGrant',
  },
  {
    id: '5',
    displayName: 'editPermission',
  },
];

const PermissionBoard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex">
      <SideBar signOut={signOut} />
      <div className="content-container">
        <div className="content-list">
          <h1 className="content-title">Permissions</h1>
          <PermissionsTable />
        </div>
      </div>
    </div>
  );
};

const PermissionsTable: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

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
                    Name / Id
                  </th>

                  <th scope="col" className="relative px-12 py-3">
                    <span className="sr-only">Active?</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* <Form ref={formRef} onSubmit={() => console.log(formRef)}> */}
                {permissions.map(permission => (
                  <tr key={permission.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {permission.displayName
                              .replace(/([A-Z])/g, match => ` ${match}`)
                              .replace(/^./, match => match.toUpperCase())
                              .trim()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {permission.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ToggleSwitch name={permission.displayName} />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-4 mb-2">
                    <div className="flex items-center">
                      <div>
                        <Button
                          type="button"
                          onClick={() => console.log('clicked')}
                        >
                          Save changes
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="relative px-12 py-3">
                    <span className="sr-only">Active?</span>
                  </td>
                </tr>
                {/* </Form> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleSwitch: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor={name} className="flex items-center cursor-pointer">
        <div className="relative">
          <input id={name} name={name} type="checkbox" className="sr-only" />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
      </label>
    </div>
  );
};

export default PermissionBoard;
