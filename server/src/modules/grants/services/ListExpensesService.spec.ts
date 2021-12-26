import AppError from '../../../common/errors/AppError';
import FakeExpensesRepository from '../infra/db/repositories/fakes/FakeExpensesRepository';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import ListExpensesService from './ListExpensesService';

let fakeGrantsRepository: FakeGrantsRepository;
let fakeExpensesRepository: FakeExpensesRepository;
let listExpenses: ListExpensesService;

describe('ListExpenses', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();
    fakeExpensesRepository = new FakeExpensesRepository();

    listExpenses = new ListExpensesService(
      fakeGrantsRepository,
      fakeExpensesRepository,
    );
  });

  it('should be able to list all expenses given a grant id', async () => {
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

    await fakeExpensesRepository.create({
      name: 'Salaries',
      amount: 400.59,
      grantId: grant.id,
    });

    const expenses = await listExpenses.findAllByGrantId(grant.id);

    expect(expenses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringMatching('Salaries'),
        }),
      ]),
    );
    expect(expenses).toHaveLength(1);
  });

  it('should not be able to list expenses for a non-existing grant id', async () => {
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

    await fakeExpensesRepository.create({
      name: 'Salaries',
      amount: 400.59,
      grantId: grant.id,
    });

    await expect(
      listExpenses.findAllByGrantId('12345678'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
