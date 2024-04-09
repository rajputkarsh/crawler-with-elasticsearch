-- CreateTable
CREATE TABLE `Clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `registrationDate` VARCHAR(191) NOT NULL,
    `companyCategory` VARCHAR(191) NOT NULL,
    `companySubCategory` VARCHAR(191) NOT NULL,
    `companyClass` VARCHAR(191) NOT NULL,
    `cin` VARCHAR(191) NOT NULL,
    `pin` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `address` TEXT NOT NULL,
    `roc` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Clients_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
