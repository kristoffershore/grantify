import React, { useState } from 'react';
import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';
import TopNavigation from '../../components/TopNavigation';
import { useAuth } from '../../hooks/auth';

import { Container, Content, Section } from './styles';

// type Grant = {
//   id: number;
//   grantName: string;
//   openDate: string;
//   closeDate: string;
//   dateWhenMoneyWasReceived?: string;
//   status: string;
//   amountRequested: number;
//   amountApproved: number;
//   sponsorName: string;
//   sponsorUrl?: string;
//   expenses?: [
//     {
//       fiscoCode: number;
//       expenseName: string;
//       totalBudget: number;
//       yearExpenses?: [
//         {
//           yearNumber: number;
//           totalExpenses: number;
//         },
//       ];
//       balanceRemaining: number;
//     },
//   ];
// };

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
      <TopNavigation />
      <div className="content-list">
        <h1 className="content-title">{title}</h1>
        <GrantTable />
      </div>
    </div>
  );
};

export const grants = [
  {
    id: 1,
    grantName: 'COVID Grant Fall 2021',
    openDate: '2021-10-19T00:00:00.000Z',
    closeDate: '2021-12-25T00:00:00.000Z',
    dateWhenMoneyWasReceived: '2021-12-01T00:00:00.000Z',
    status: 'Pending',
    amountRequested: 2000.0,
    amountApproved: 1000.0,
    sponsorName: 'UNF',
    sponsorUrl: 'www.unf.edu',
    expenses: [
      {
        fiscoCode: 1,
        expenseName: 'Salaries',
        totalBudget: 500.0,
        balanceRemaining: 115.0,
        yearExpenses: [
          {
            yearNumber: 1,
            totalExpenses: 300.0,
          },
          {
            yearNumber: 2,
            totalExpenses: 85.0,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    grantName: 'Performance Grant',
    openDate: '2021-11-01T00:00:00.000Z',
    closeDate: '2021-12-31T00:00:00.000Z',
    dateWhenMoneyWasReceived: '2021-12-01T00:00:00.000Z',
    status: 'Approved',
    amountRequested: 5000.0,
    amountApproved: 2500.0,
    sponsorName: 'Pacesetter',
    sponsorUrl: 'www.pacesetter.com',
    expenses: [
      {
        fiscoCode: 1,
        expenseName: 'Salaries',
        totalBudget: 500.0,
        balanceRemaining: 115.0,
        yearExpenses: [
          {
            yearNumber: 1,
            totalExpenses: 300.0,
          },
          {
            yearNumber: 2,
            totalExpenses: 85.0,
          },
        ],
      },
    ],
  },
];

const GrantTable: React.FC = () => {
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
                    Amount <span className="text-gray-800">approved</span> /{' '}
                    <span className="text-gray-800">requested</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grants.map(grant => (
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
                        {new Date(grant.openDate).getUTCMonth()}/
                        {new Date(grant.openDate).getUTCDate()}/
                        {new Date(grant.openDate).getUTCFullYear()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(grant.closeDate).getUTCMonth()}/
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        ${grant.amountApproved} / ${grant.amountRequested}
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        PENDING / ${grant.amountRequested}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to="/grants/:id"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
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
