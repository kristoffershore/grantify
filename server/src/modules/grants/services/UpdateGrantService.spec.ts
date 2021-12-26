import AppError from '../../../common/errors/AppError';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import UpdateGrantService from './UpdateGrantService';

let fakeGrantsRepository: FakeGrantsRepository;
let updateGrant: UpdateGrantService;

describe('UpdateGrant', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();

    updateGrant = new UpdateGrantService(fakeGrantsRepository);
  });

  it('should be able to update a grant', async () => {
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
      expirationDate: new Date('2021-12-31T03:24:00'),
    });

    const updatedGrant = await updateGrant.execute({
      id: g.id,
      grantName: 'SG Grant',
      openDate: new Date('2021-11-18T05:00:00'),
      closeDate: new Date('2021-11-25T05:00:00'),
      status: 'Approved',
      amountRequested: 3140,
      amountApproved: 1900,
      sponsorName: 'USF',
      sponsorUrl: 'www.usf.edu',
      dateWhenFundsWereReceived: new Date('2021-10-21T03:24:00'),
      expirationDate: new Date('2021-12-31T03:24:00'),
    });

    expect(updatedGrant?.grantName).toBe('SG Grant');
    expect(updatedGrant?.status).toBe('Approved');
  });

  it('should throw exception if id provided does not exist', async () => {
    await fakeGrantsRepository.create({
      grantName: 'COVID Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Pending',
      amountRequested: 2000.0,
      amountApproved: 1000.0,
      sponsorName: 'UNF',
      sponsorUrl: 'www.unf.edu',
      dateWhenFundsWereReceived: new Date('2021-10-21T03:24:00'),
      expirationDate: new Date('2021-12-31T03:24:00'),
    });

    await expect(
      updateGrant.execute({
        id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
