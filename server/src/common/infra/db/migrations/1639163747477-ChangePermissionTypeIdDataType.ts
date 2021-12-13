import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePermissionTypeIdDataType1639163747477 implements MigrationInterface {
    name = 'ChangePermissionTypeIdDataType1639163747477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."permission_types_users_assn" DROP COLUMN "permissionTypeId"`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types_users_assn" ADD "permissionTypeId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."permission_types_users_assn" DROP COLUMN "permissionTypeId"`);
        await queryRunner.query(`ALTER TABLE "public"."permission_types_users_assn" ADD "permissionTypeId" character varying NOT NULL`);
    }

}
