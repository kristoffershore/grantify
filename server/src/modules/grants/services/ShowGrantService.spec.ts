import AppError from '../../../common/errors/AppError';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import ShowGrantService from './ShowGrantService';

let fakeGrantsRepository: FakeGrantsRepository;
let showGrant: ShowGrantService;

describe('ShowGrant', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();

    showGrant = new ShowGrantService(fakeGrantsRepository);
  });

  it('should be able to show a grant based on its id', async () => {
    const g = await fakeGrantsRepository.create({
      grantName: 'COVID Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Pending',
      amountRequested: 2000.0,
      amountApproved: 1000.0,
      sponsorName: 'UNF',
      sponsorUrl: 'www.unf.edu',
      dateWhenFundsWereReceived: new Date('2021-10-21T03:24:00'),
      expirationDate: new Date('2021-12-30T03:24:00'),
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
      dateWhenFundsWereReceived: new Date('2021-10-21T03:24:00'),
      expirationDate: new Date('2021-12-30T03:24:00'),
    });

    const grant = await showGrant.execute({ grantId: g.id });

    expect(grant?.id).toEqual(g.id);
  });

  it('should not show a grant whose id does not exist', async () => {
    await fakeGrantsRepository.create({
      grantName: 'SG Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Approved',
      amountRequested: 3000.99,
      amountApproved: 1500.34,
      sponsorName: 'USF',
      sponsorUrl: 'www.unf.edu',
      dateWhenFundsWereReceived: new Date('2021-10-21T03:24:00'),
      expirationDate: new Date('2021-12-30T03:24:00'),
    });

    await expect(
      showGrant.execute({ grantId: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
