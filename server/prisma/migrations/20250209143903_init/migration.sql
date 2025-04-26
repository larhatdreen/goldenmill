-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL DEFAULT '{"ru": "", "en": "", "de": ""}',
    "subtitle" JSONB DEFAULT NULL,
    "description" JSONB NOT NULL DEFAULT '{"ru": "", "en": "", "de": ""}',
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "application" TEXT,
    "granulation" TEXT,
    "type" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "activeImageUrl" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- Create admin user
INSERT INTO "User" ("id", "username", "password", "email", "role", "lastLogin")
VALUES (
    gen_random_uuid(),
    'admin',
    'admin',
    'admin@example.com',
    'administrator',
    CURRENT_TIMESTAMP
);
