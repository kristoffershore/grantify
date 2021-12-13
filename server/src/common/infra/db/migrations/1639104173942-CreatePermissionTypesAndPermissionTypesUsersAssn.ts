import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePermissionTypesAndPermissionTypesUsersAssn1639104173942
  implements MigrationInterface
{
  name = 'CreatePermissionTypesAndPermissionTypesUsersAssn1639104173942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_293d80758aca54060aa603f5f5c" UNIQUE ("displayName"), CONSTRAINT "PK_215b1e2fd4bb5499896fe8edaf4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission_types_users_assn" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "permissionTypeId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ccd5d966349fabe00eac5e2a0a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "permission_types_users_assn"`);
    await queryRunner.query(`DROP TABLE "permission_types"`);
  }
}
