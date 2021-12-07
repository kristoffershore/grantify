import React from 'react';

import { useAuth } from '../../hooks/auth';
import SideBar from '../../components/SideBar';
import TopNavigation from '../../components/TopNavigation';
import { useParams } from 'react-router';
import { grants } from '../Home';
import dummy1 from '../../assets/dummy1.png';
import dummy2 from '../../assets/dummy2.png';

const GrantView: React.FC = () => {
  const { signOut } = useAuth();
  const { id } = useParams<{ id: string }>();

  const findGrant = grants.find(grant => grant.id === Number(id));

  return (
    <div className="flex">
      <SideBar signOut={signOut} />
      <div className="content-container">
        <TopNavigation />
        <div className="content-list">
          <h1 className="content-title">UNF Covid Grant</h1>

          <section className="grid grid-cols-3 gap-5">
            <DataBox title={'Amount Requested'} data="2000.00" />
            <DataBox title={'Amount Approved'} data="1000.00" />
            <DataBox title={'Remaining Balance'} data="500.00" />
            <DataBox title={'Open Date'} data="2021-10-19T00:00:00.000Z" />
            <DataBox title={'Close Date'} data="2021-12-25T00:00:00.000Z" />
            <DataBox
              title={'Expiration Date'}
              data="2022-12-31T00:00:00.000Z"
            />
            <DataBox
              title={'Date When Funds Were Received'}
              data="2021-12-01T00:00:00.000Z"
            />
            <DataBox
              title={'Grantor'}
              data="University of North Florida"
              link="www.unf.edu"
            />
            <DataBox title={'Status'} data="Approved" />
          </section>
          {/* {findGrant && (
            <h1 className="content-title">{findGrant.grantName}</h1>
          )} */}
        </div>
      </div>
    </div>
  );
};

const DataBox: React.FC<{ title: string; data: string; link?: string }> = ({
  title,
  data,
  link,
}) => {
  return (
    <div className="data-box">
      <div className="data-box-title">
        <h4>{title}</h4>
      </div>
      <div className="data-box-info">
        {/* {!isNaN(Number(data)) ? <h3>${data}</h3> : <h3>${data}</h3>} */}
        {!!Date.parse(data) && (
          <h3>
            {new Date(data).getUTCMonth()}/{new Date(data).getUTCDate()}/
            {new Date(data).getUTCFullYear()}
          </h3>
        )}

        <span className="text-lg antialiased font-bold">
          {!isNaN(Number(data)) && <h3>${data}</h3>}
        </span>

        {title === 'Grantor' && link && (
          <h3>
            <a href={link}>{data}</a>
          </h3>
        )}

        {title === 'Status' && data === 'Approved' && (
          <h3 className="px-2 inline-flex text-md leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {data}
          </h3>
        )}
      </div>

      {!isNaN(Number(data)) && (
        <div className="data-box-graph">
          <img
            src={Math.floor(Math.random() * 2 + 1) % 2 === 0 ? dummy1 : dummy2}
            alt="Graph"
          />
        </div>
      )}
    </div>
  );
};

export default GrantView;
