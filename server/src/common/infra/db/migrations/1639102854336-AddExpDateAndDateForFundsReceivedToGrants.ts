import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpDateAndDateForFundsReceivedToGrants1639102854336
  implements MigrationInterface
{
  name = 'AddExpDateAndDateForFundsReceivedToGrants1639102854336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."grants" ADD "dateWhenFundsWereReceived" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grants" ADD "expirationDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grants" ALTER COLUMN "amountApproved" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."grants" ALTER COLUMN "amountApproved" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grants" DROP COLUMN "expirationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grants" DROP COLUMN "dateWhenFundsWereReceived"`,
    );
  }
}
