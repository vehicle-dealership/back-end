import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1688498078518 implements MigrationInterface {
    name = 'CreateTables1688498078518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zipCode" character varying(8) NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, "street" character varying NOT NULL, "number" integer, "complement" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "content" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "userId" integer, "advertId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(60) NOT NULL, "phone" character varying NOT NULL, "cpf" character varying(14) NOT NULL, "birthdate" date NOT NULL, "description" character varying, "password" character varying(120) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "seller" boolean NOT NULL DEFAULT false, "color" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "reset_token" character varying, "addressId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "image_link_one" text, "image_link_two" text, "image_link_three" text, "image_link_four" text, "image_link_five" text, "image_link_six" text, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adverts" ("id" SERIAL NOT NULL, "brand" character varying(40) NOT NULL, "model" character varying(40) NOT NULL, "year" integer NOT NULL, "fuel" character varying(10) NOT NULL, "mileage" integer NOT NULL, "color" character varying(20) NOT NULL, "fipe_price" numeric(12,2) NOT NULL DEFAULT '0', "price" numeric(12,2) NOT NULL DEFAULT '0', "description" text NOT NULL, "cover_image" text NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT 'true', "userId" integer, "imagesId" integer, CONSTRAINT "REL_1d01a85e6b6f93d54d1ed7af58" UNIQUE ("imagesId"), CONSTRAINT "PK_36876931b51109a932d0bf3b40a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c870c44a72a624e88130b663fc2" FOREIGN KEY ("advertId") REFERENCES "adverts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_1d01a85e6b6f93d54d1ed7af58e" FOREIGN KEY ("imagesId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_1d01a85e6b6f93d54d1ed7af58e"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c870c44a72a624e88130b663fc2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "adverts"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
