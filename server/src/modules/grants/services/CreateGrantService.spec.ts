import AppError from '@common/errors/AppError';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import CreateGrantService from './CreateGrantService';

let fakeGrantsRepository: FakeGrantsRepository;
let createGrant: CreateGrantService;

describe('CreateGrant', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();

    createGrant = new CreateGrantService(fakeGrantsRepository);
  });

  it('should be able to create a new grant', async () => {
    const grant1 = await createGrant.execute({
      grantName: 'COVID Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Pending',
      amountRequested: 2000.0,
      amountApproved: 1000.0,
      sponsorName: 'UNF',
      sponsorUrl: 'www.unf.edu',
    });

    const grant2 = await createGrant.execute({
      grantName: 'SG Grant',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Approved',
      amountRequested: 2000.0,
      amountApproved: 1000.0,
      sponsorName: 'UNF',
      sponsorUrl: 'www.unf.edu',
    });

    expect(grant1).toHaveProperty('id');
    expect(grant2).toHaveProperty('id');
  });

  it('should not be able to create a new grant with a name that already exists', async () => {
    await createGrant.execute({
      grantName: 'COVID Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Pending',
      amountRequested: 2000.0,
      amountApproved: 1000.0,
      sponsorName: 'UNF',
      sponsorUrl: 'www.unf.edu',
    });

    await expect(
      createGrant.execute({
        grantName: 'COVID Grant Fall 2021',
        openDate: new Date('2021-10-20T03:24:00'),
        closeDate: new Date('2021-10-28T03:24:00'),
        status: 'Approved',
        amountRequested: 3000.0,
        amountApproved: 1500.0,
        sponsorName: 'USF',
        sponsorUrl: 'www.usf.edu',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
