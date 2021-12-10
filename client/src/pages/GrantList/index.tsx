import React, { useCallback, FormEvent, useState, useEffect } from 'react';
import { FaSearch, FaRegBell, FaUserCircle } from 'react-icons/fa';

import PageHeader from '../../components/PageHeader';
import ListSelect from '../../components/ListSelect';
import { Container, Form } from './styles';
import api from '../../services/api';
import Placeholder from '../../components/Placeholder';
import ListInput from '../../components/ListInput';
import GrantCard from '../../components/GrantCard';
import Input from '../../components/Input';

export type Grant = {
  id: string;
  grantName: string;
  openDate: Date;
  closeDate: Date;
  status: string;
  amountRequested: number;
  amountApproved: number;
  sponsorName: string;
  sponsorUrl: string;
};


const GrantList: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [sponsorName, setSponsorName] = useState('');
  const [grantName, setGrantName] = useState('');

  const searchGrantName = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const response = await api.get('grants', {
        params: {
          grantName,
        },
      });

      setGrants(
        response.data.filter(
          (grant: Grant) => grant.grantName === grantName,
          
        ),
      );  
    },
    [grantName], 
    
    
  );

  const searchGrantSponsor = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const response = await api.get('grants', {
        params: {
          sponsorName,
        },
      });

      setGrants(
        response.data.filter(
          (grant: Grant) => grant.sponsorName === sponsorName,
          
        ),
      );
    },
     
    [sponsorName]
    
  );

  useEffect(() => {
    api.get('grants').then(response => setGrants(response.data));
  }, []);

  return (
    <Container>
      <PageHeader title="Grants">
      <Form onSubmit={searchGrantName}>

        { <ListInput
            name="grantName"
            label="Grant Name"
            type="text"
            onChange={e => setGrantName(e.target.value)}
          /> }

          <ListSelect
            name="status"
            label="Status"
            options={[
              { value: 'Approved', label: 'Approved' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Refused', label: 'Refused' },
              { value: 'Invalid', label: 'Invalid' },
            ]}
            onChange={e => setSponsorName(e.target.value)}
          /> 

          <ListInput
            name="Open Date"
            label="Open Date"
            type="time"
            onChange={e => console.log(e)}
          />

          { <ListInput
            name="sponsorName"
            label="Sponsor Name"
            type="text"
            onChange={e => setSponsorName(e.target.value)}
          /> }

          <button type="submit">Search</button>
        </Form>
      </PageHeader>

      <main>
        {grants.length !== 0 ? (
          grants.map(grant => (
            <GrantCard
              key={grant.id}
              grantName={grant.grantName}
              openDate={grant.openDate}
              closeDate={grant.closeDate}
              status={grant.status}
              amountRequested={grant.amountRequested}
              amountApproved={grant.amountApproved}
              sponsorName={grant.sponsorName}
              sponsorUrl={grant.sponsorUrl}
              grants={grants}
              setGrants={setGrants}
            />
          ))
        ) : (
          <Placeholder type="list" />
        )}
      </main>
    </Container>
  );
};

export default GrantList;
