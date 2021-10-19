import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGrant1634589419302 implements MigrationInterface {
    name = 'CreateGrant1634589419302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grantName" character varying NOT NULL, "openDate" TIMESTAMP WITH TIME ZONE NOT NULL, "closeDate" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL, "amountRequested" numeric NOT NULL, "amountApproved" numeric NOT NULL, "sponsorName" character varying, "sponsorUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f184c97e91f7f521ed40740bb41" UNIQUE ("grantName"), CONSTRAINT "PK_a25f5f89eff8b3277f7969b7094" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "grants"`);
    }

}
