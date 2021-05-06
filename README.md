# Installation

After cloning/unzipping the project, do the following:
 1. Create an `.env` file with the following:
    DATABASE_URL=mysql://username:password@host:3306/database
    NUM_SALT_ROUNDS=10
 2. Run `yarn install`
 3. Install Prisma CLI globally or run the next command with `npx`
 4. Run `prisma migrate dev`
 5. Populate the db with some data:
    - `yarn run populate` - creates categories, manufacturers, properties, some managers, one or two sellers for each manager
    - `yarn run create:user <email> <pass> Admin` - create yourself at least one admin user to be able to explore the API. you'll also need a regular user (skip the `Admin` or replace with `User`) to put orders
    - `yarn run create:products [number]` - create some fake products in the db
    - `yarn run create:sellerProds [number]` - add some products to seller's stocks (aka SellerProducts)