import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableConstraintToGrants1639256049277
  implements MigrationInterface
{
  name = 'AddNullableConstraintToGrants1639256049277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."grants" ALTER COLUMN "expirationDate" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."grants" ALTER COLUMN "expirationDate" SET NOT NULL`,
    );
  }
}
