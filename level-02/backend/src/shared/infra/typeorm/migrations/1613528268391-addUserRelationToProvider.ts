import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserRelationToProvider1613528268391 implements MigrationInterface {
    name = 'addUserRelationToProvider1613528268391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "appointment_provider"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."avatar" IS NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "date" TIME WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."avatar" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "appointment_provider" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
