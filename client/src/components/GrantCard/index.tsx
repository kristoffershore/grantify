import React, { Dispatch, SetStateAction, useCallback, useRef } from 'react';

import { Article, CardHolder, Footer, Header } from './styles';

import CardIcon from '../CardIcon';
import api from '../../services/api';
import { generatePath, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { Grant } from '../../pages/GrantList';
import { format } from 'date-fns';

export type GrantProps = {
  grantName: string;
  openDate: Date;
  closeDate: Date;
  status: string;
  amountRequested: number;
  amountApproved: number;
  sponsorName: string;
  sponsorUrl: string;
  grants: Grant[];
  setGrants: Dispatch<SetStateAction<Grant[]>>;
};

const DrinkCard: React.FC<GrantProps> = ({
  grantName,
  openDate,
  closeDate,
  status,
  amountRequested,
  amountApproved,
  sponsorName,
  sponsorUrl,
  grants,
  setGrants,
}) => {
  const nameRef = useRef<HTMLElement>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { user } = useAuth();

  const findGrantToEdit = useCallback(() => {
    api.get('grants').then(response => {
      const findGrant: Grant = response.data.find(
        (grant: GrantProps) => grant.grantName === nameRef.current?.innerText,
      );

      if (findGrant) {
        api.get(`grants/${findGrant.id}`).then(r => {
          history.push(generatePath('/grants/:id/edit', { id: r.data.id }));
        });
      }
    });
  }, [history]);

  const onDelete = useCallback(() => {
    api.get('grants').then(async response => {
      const findGrant: Grant = response.data.find(
        (grant: GrantProps) => grant.grantName === nameRef.current?.innerText,
      );

      if (findGrant) {
        setGrants(grants.filter(grant => grant.id !== findGrant.id));
        await api.delete(`grants/${findGrant.id}`);

        addToast({
          type: 'success',
          title: 'Grant removed successfully!',
          description: 'The list has been updated.',
        });
      }
    });
  }, [addToast, grants, setGrants]);

  return (
    <Article>
      <Header isUser={!!user}>
        <div>
          <strong ref={nameRef}>{grantName}</strong>
          <span>
            {format(new Date(openDate), 'MM/dd/yyyy')} -
            {format(new Date(closeDate), 'MM/dd/yyyy')}
          </span>
          <span>
            <p>{status}</p>
          </span>
        </div>

        {user && (
          <CardHolder>
            <CardIcon label="edit" onClick={findGrantToEdit} />
            <CardIcon label="remove" onClick={onDelete} />
          </CardHolder>
        )}
      </Header>
      <p>Requested: ${amountRequested}</p>
      <p>Approved: ${amountApproved}</p>

      <Footer>
        <p>
          <strong>Sponsor: {sponsorName}</strong>
        </p>
        <button type="button">Lorem ipsum</button>
      </Footer>
    </Article>
  );
};

export default DrinkCard;
