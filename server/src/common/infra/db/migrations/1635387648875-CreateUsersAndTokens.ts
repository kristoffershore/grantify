import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndTokens1635387648875 implements MigrationInterface {
  name = 'CreateUsersAndTokens1635387648875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "grants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grantName" character varying NOT NULL, "openDate" TIMESTAMP WITH TIME ZONE NOT NULL, "closeDate" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL, "amountRequested" numeric NOT NULL, "amountApproved" numeric NOT NULL, "sponsorName" character varying, "sponsorUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f184c97e91f7f521ed40740bb41" UNIQUE ("grantName"), CONSTRAINT "PK_a25f5f89eff8b3277f7969b7094" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_tokens"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "grants"`);
  }
}
