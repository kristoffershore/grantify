import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNameAndAddedFirstAndLastNames1639104284091
  implements MigrationInterface
{
  name = 'RemoveNameAndAddedFirstAndLastNames1639104284091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "firstName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "lastName" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "lastName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "firstName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "name" character varying NOT NULL`,
    );
  }
}
