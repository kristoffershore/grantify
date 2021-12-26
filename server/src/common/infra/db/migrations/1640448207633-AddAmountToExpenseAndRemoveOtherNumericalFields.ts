import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAmountToExpenseAndRemoveOtherNumericalFields1640448207633
  implements MigrationInterface
{
  name = 'AddAmountToExpenseAndRemoveOtherNumericalFields1640448207633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" DROP COLUMN "balanceRemaining"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" DROP COLUMN "totalBudget"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" ADD "amount" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" DROP CONSTRAINT "UQ_e5105c83348df21038d51069890"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" ADD CONSTRAINT "UQ_e5105c83348df21038d51069890" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" DROP COLUMN "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" ADD "totalBudget" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expenses" ADD "balanceRemaining" numeric NOT NULL`,
    );
  }
}
