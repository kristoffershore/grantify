import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import SideBar from '../../components/SideBar';
import { useParams } from 'react-router';
import api from '../../services/api';
import { Grant } from '../../types/Grant';

const GrantView: React.FC = () => {
  const [grant, setGrant] = useState<Grant>();
  const { id } = useParams<{ id: string }>();
  const { signOut } = useAuth();

  useEffect(() => {
    api.get(`grants/${id}`).then(response => setGrant(response.data));
  }, [id]);

  return (
    <>
      {grant && (
        <div className="flex">
          <SideBar signOut={signOut} />
          <div className="content-container">
            <div className="content-list">
              <h1 className="content-title">{grant.grantName}</h1>

              <section className="grid grid-cols-3 gap-5">
                <DataBox
                  title={'Amount Requested'}
                  data={grant.amountRequested.toString()}
                />
                {grant.amountApproved && (
                  <DataBox
                    title={'Amount Approved'}
                    data={grant.amountApproved.toString()}
                  />
                )}
                {grant.amountApproved && grant.expenses && (
                  <DataBox
                    title={'Remaining Balance'}
                    data={grant.amountApproved.toString()}
                  />
                )}
                <DataBox title={'Open Date'} data={grant.openDate} />
                <DataBox title={'Close Date'} data={grant.closeDate} />
                {grant.expirationDate && (
                  <DataBox
                    title={'Expiration Date'}
                    data={grant.expirationDate}
                  />
                )}
                {grant.dateWhenFundsWereReceived && (
                  <DataBox
                    title={'Date When Funds Were Received'}
                    data={grant.dateWhenFundsWereReceived}
                  />
                )}
                {grant.sponsorName && (
                  <DataBox
                    title={'Grantor'}
                    data={grant.sponsorName}
                    link={grant.sponsorUrl}
                  />
                )}
                <DataBox title={'Status'} data={grant.status} />
              </section>
            </div>
          </div>
        </div>
      )}
    </>
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
        {!!Date.parse(data) && isNaN(Number(data)) && (
          <h3>
            {new Date(data).getUTCMonth() + 1}/{new Date(data).getUTCDate()}/
            {new Date(data).getUTCFullYear()}
          </h3>
        )}

        <span className="text-lg antialiased font-bold">
          {!isNaN(Number(data)) && <h3>${data}</h3>}
        </span>

        {title === 'Grantor' && !link && <h3>{data}</h3>}

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
        {title === 'Status' && data === 'Pending' && (
          <h3 className="px-2 inline-flex text-md leading-5 font-semibold rounded-full bg-gray-300 text-gray-800">
            {data}
          </h3>
        )}
      </div>

      {/* {!isNaN(Number(data)) && (
        <div className="data-box-graph">
          <img
            src={Math.floor(Math.random() * 2 + 1) % 2 === 0 ? dummy1 : dummy2}
            alt="Graph"
          />
        </div>
      )} */}
    </div>
  );
};

export default GrantView;
