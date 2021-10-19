import AppError from '@common/errors/AppError';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import ShowGrantService from './ShowGrantService';

let fakeGrantsRepository: FakeGrantsRepository;
let showGrant: ShowGrantService;

describe('ShowGrant', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();

    showGrant = new ShowGrantService(fakeGrantsRepository);
  });

  it('should be able to show a grant based on ID', async () => {
    const g = await fakeGrantsRepository.create({
      grantName: 'COVID Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Pending',
      amountRequested: 2000.0,
      amountApproved: 1000.0,
      sponsorName: 'UNF',
      sponsorUrl: 'www.unf.edu',
    });

    await fakeGrantsRepository.create({
      grantName: 'SG Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Approved',
      amountRequested: 3000.99,
      amountApproved: 1500.34,
      sponsorName: 'USF',
      sponsorUrl: 'www.unf.edu',
    });

    const grant = await showGrant.execute({ grantName: g.grantName });

    expect(grant?.grantName).toEqual(g.grantName);
  });

  it('should not show a grant whose name does not exist', async () => {
    await fakeGrantsRepository.create({
      grantName: 'SG Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Approved',
      amountRequested: 3000.99,
      amountApproved: 1500.34,
      sponsorName: 'USF',
      sponsorUrl: 'www.unf.edu',
    });

    await expect(
      showGrant.execute({ grantName: 'la1234' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
