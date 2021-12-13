import AppError from '../../../common/errors/AppError';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import RemoveGrantService from './RemoveGrantService';

let fakeGrantsRepository: FakeGrantsRepository;
let removeGrant: RemoveGrantService;

describe('RemoveGrant', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();

    removeGrant = new RemoveGrantService(fakeGrantsRepository);
  });

  it('should throw exception if ID provided does not exist', async () => {
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
      expirationDate: new Date('2021-12-30T03:24:00'),
    });

    await expect(
      removeGrant.execute({
        id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should remove a grant whose ID is valid', async () => {
    const grant = await fakeGrantsRepository.create({
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

    await removeGrant.execute({ id: grant.id });

    expect(fakeGrantsRepository.findById(grant.id)).toMatchObject({});
  });
});
