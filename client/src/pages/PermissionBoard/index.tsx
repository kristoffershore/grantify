import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { v4 } from 'uuid';
import Button from '../../components/Button';
import SideBar from '../../components/SideBar';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

type Permission = {
  id: number;
  displayName: string;
};

type UserPermissionAssn = {
  id: string;
  userId: string;
  permissionTypeId: number;
};

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
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentPermissions, setCurrentPermissions] = useState<
    UserPermissionAssn[]
  >([]);

  const { id } = useParams<{ id: string }>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //COMECAR AQUI
      const switchClicked = permissions.find(
        p => p.displayName === e.currentTarget.name,
      );

      if (switchClicked) {
        const permissionToAlter = currentPermissions.find(
          cp => switchClicked.id === cp.permissionTypeId,
        );

        if (permissionToAlter) {
          setCurrentPermissions(
            currentPermissions.filter(cp => cp.id !== permissionToAlter.id),
          );
          console.log(currentPermissions);
        } else {
          const association: UserPermissionAssn = {
            id: v4(),
            userId: id,
            permissionTypeId: switchClicked.id,
          };

          setCurrentPermissions([...currentPermissions, association]);
          console.log(currentPermissions);
        }
      }
    },
    [permissions, currentPermissions, id],
  );

  const handleSubmit = useCallback(async () => {
    try {
      //se tiver alguma association no db, deletar

      // currentPermissions.forEach(cp => {
      //   console.log(cp.id);
      //   api.delete(`users/${id}/user-permissions/${cp.id}`);
      // });

      // currentPermissions.forEach(cp => {
      //   permissions.forEach(p => {
      //     if (p.id === cp.permissionTypeId) {
      //       api.post(`users/${id}/user-permissions`, {
      //         displayName: p.displayName,
      //       });
      //     }
      //   });
      // });
      //postar associations novas
      addToast({
        type: 'success',
        title: 'Changes saved successfully!',
        description: 'Permissions have been updated.',
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Unable to update permissions',
        description: err,
      });
    }
  }, [addToast]);

  useEffect(() => {
    api.get('permissions').then(response => setPermissions(response.data));

    if (id) {
      api
        .get(`users/${id}/user-permissions`)
        .then(response => setCurrentPermissions(response.data));
    }
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50">
                <div>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name / Id
                  </div>
                </div>
              </div>
              <div className="bg-white divide-y divide-gray-200">
                <Form ref={formRef} onSubmit={handleSubmit}>
                  {permissions.map(permission => (
                    <div
                      key={permission.id}
                      className="flex flex-row items-center"
                    >
                      <div className="px-6 py-4 whitespace-nowrap">
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
                      </div>
                      <div className="px-6 py-4 whitespace-nowrap">
                        <ToggleSwitch
                          name={permission.displayName}
                          permissionId={permission.id}
                          currentPermissions={currentPermissions}
                          onChange={e => handleToggle(e)}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="px-6 py-4 mb-2">
                    <Button type="submit">Save changes</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleSwitch: React.FC<{
  name: string;
  permissionId: number;
  currentPermissions: UserPermissionAssn[];
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}> = ({ name, permissionId, currentPermissions, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor={name} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id={name}
            name={name}
            type="checkbox"
            className="sr-only"
            checked={
              !!currentPermissions.find(
                cp => cp.permissionTypeId === permissionId,
              )
            }
            onChange={onChange}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
      </label>
    </div>
  );
};

export default PermissionBoard;
