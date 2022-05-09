import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1652050962833 implements MigrationInterface {
    name = 'initial1652050962833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `FK_b647c1bd599f48a6d87947da1ea` ON `customers`");
        await queryRunner.query("DROP INDEX `FK_669be2d4db3d4341bad19768e85` ON `orders`");
        await queryRunner.query("DROP INDEX `FK_fcaff738bc99c1ba91891fd73d4` ON `orders`");
        await queryRunner.query("ALTER TABLE `customers` CHANGE `cust_city` `cust_city` varchar(35) NULL");
        await queryRunner.query("ALTER TABLE `customers` CHANGE `grade` `grade` int(11) NULL");
        await queryRunner.query("ALTER TABLE `customers` CHANGE `agent_code` `agent_code` char(6) NULL");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `agent_name` `agent_name` char(40) NULL");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `working_area` `working_area` char(35) NULL");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `commission` `commission` decimal(10,2) NULL");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `phone_no` `phone_no` char(15) NULL");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `country` `country` varchar(25) NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `cust_code` `cust_code` char(6) NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `agent_code` `agent_code` char(6) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `first_name` `first_name` char(40) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `last_name` `last_name` char(40) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `email` `email` char(40) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`)");
        await queryRunner.query("ALTER TABLE `users` CHANGE `deleted_at` `deleted_at` timestamp(6) NULL");
        await queryRunner.query("ALTER TABLE `customers` ADD CONSTRAINT `FK_b647c1bd599f48a6d87947da1ea` FOREIGN KEY (`agent_code`) REFERENCES `agents`(`agent_code`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_669be2d4db3d4341bad19768e85` FOREIGN KEY (`cust_code`) REFERENCES `customers`(`cust_code`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_fcaff738bc99c1ba91891fd73d4` FOREIGN KEY (`agent_code`) REFERENCES `agents`(`agent_code`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_fcaff738bc99c1ba91891fd73d4`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_669be2d4db3d4341bad19768e85`");
        await queryRunner.query("ALTER TABLE `customers` DROP FOREIGN KEY `FK_b647c1bd599f48a6d87947da1ea`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `deleted_at` `deleted_at` timestamp(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_97672ac88f789774dd47f7c8be`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `email` `email` char(40) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `last_name` `last_name` char(40) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `first_name` `first_name` char(40) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `agent_code` `agent_code` char(6) NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `cust_code` `cust_code` char(6) NOT NULL");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `country` `country` varchar(25) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `phone_no` `phone_no` char(15) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `commission` `commission` decimal(10,2) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `working_area` `working_area` char(35) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `agents` CHANGE `agent_name` `agent_name` char(40) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `customers` CHANGE `agent_code` `agent_code` char(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `customers` CHANGE `grade` `grade` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `customers` CHANGE `cust_city` `cust_city` varchar(35) NULL DEFAULT 'NULL'");
        await queryRunner.query("CREATE INDEX `FK_fcaff738bc99c1ba91891fd73d4` ON `orders` (`agent_code`)");
        await queryRunner.query("CREATE INDEX `FK_669be2d4db3d4341bad19768e85` ON `orders` (`cust_code`)");
        await queryRunner.query("CREATE INDEX `FK_b647c1bd599f48a6d87947da1ea` ON `customers` (`agent_code`)");
    }

}
