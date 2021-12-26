import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAttachments1640474334168 implements MigrationInterface {
  name = 'CreateAttachments1640474334168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link" character varying NOT NULL, "grantId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" ADD CONSTRAINT "FK_b493d0d1a4fa357e3a778a26d0b" FOREIGN KEY ("grantId") REFERENCES "grants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attachments" DROP CONSTRAINT "FK_b493d0d1a4fa357e3a778a26d0b"`,
    );
    await queryRunner.query(`DROP TABLE "attachments"`);
  }
}
