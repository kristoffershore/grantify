import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterGrantAttributes1645329883849 implements MigrationInterface {
    name = 'AlterGrantAttributes1645329883849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."grants" DROP COLUMN "sponsorName"`);
        await queryRunner.query(`ALTER TABLE "public"."grants" DROP COLUMN "sponsorUrl"`);
        await queryRunner.query(`ALTER TABLE "public"."grants" ADD "writerName" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."grants" ADD "applicationUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."grants" ADD "sponsoringAgency" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."grants" DROP COLUMN "sponsoringAgency"`);
        await queryRunner.query(`ALTER TABLE "public"."grants" DROP COLUMN "applicationUrl"`);
        await queryRunner.query(`ALTER TABLE "public"."grants" DROP COLUMN "writerName"`);
        await queryRunner.query(`ALTER TABLE "public"."grants" ADD "sponsorUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."grants" ADD "sponsorName" character varying`);
    }

}
