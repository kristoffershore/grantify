import AppError from '@common/errors/AppError';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import CreateGrantService from './CreateGrantService';
import ListGrantService from './ListGrantsService';

let fakeGrantsRepository: FakeGrantsRepository;
let listGrant: ListGrantService;

describe('ListGrants', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();

    listGrant = new ListGrantService(fakeGrantsRepository);
  });

  it('should be able to list all grants with the same sponsor name', async () => {
    await fakeGrantsRepository.create({
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

    const grants = await listGrant.findBySponsorName({ sponsorName: 'UNF' });

    expect(grants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sponsorName: expect.stringMatching('UNF'),
        }),
      ]),
    );
    expect(grants).toHaveLength(1);
  });

  it('should be able to list all grants', async () => {
    await fakeGrantsRepository.create({
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

    const grants = await listGrant.findAll();

    expect(grants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          grantName: expect.stringMatching('SG Grant Fall 2021'),
        }),
      ]),
    );
    expect(grants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          grantName: expect.stringMatching('COVID Grant Fall 2021'),
        }),
      ]),
    );
    expect(grants).toHaveLength(2);
  });
});
