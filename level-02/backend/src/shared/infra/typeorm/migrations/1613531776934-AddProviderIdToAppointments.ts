import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProviderIdToAppointments1613531776934 implements MigrationInterface {
    name = 'AddProviderIdToAppointments1613531776934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "provider_id" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "appointments"."provider_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`);
        await queryRunner.query(`COMMENT ON COLUMN "appointments"."provider_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "provider_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
