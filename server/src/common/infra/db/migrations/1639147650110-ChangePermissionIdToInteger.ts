import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePermissionIdToInteger1639147650110 implements MigrationInterface {
    name = 'ChangePermissionIdToInteger1639147650110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."permission_types" DROP CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4"`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types" ADD CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."permission_types" DROP CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4"`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types" ADD CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4" PRIMARY KEY ("id")`);
    }

}
