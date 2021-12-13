import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpensesAndAddRelationToGrants1639103163637
  implements MigrationInterface
{
  name = 'CreateExpensesAndAddRelationToGrants1639103163637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "expenses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "totalBudget" numeric NOT NULL, "balanceRemaining" numeric NOT NULL, "grantId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e5105c83348df21038d51069890" UNIQUE ("name"), CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_87cd506c4869da655ade6fe60af" FOREIGN KEY ("grantId") REFERENCES "grants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_87cd506c4869da655ade6fe60af"`,
    );
    await queryRunner.query(`DROP TABLE "expenses"`);
  }
}
