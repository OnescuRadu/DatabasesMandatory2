Note that this folder is also a git repository. Use the commit history to check out the MySQL version (for Mandatory 2), found at commit e756ab96cf97c055e23ee6ca5b0692b61d1d66ce

# Installation

NOTE: For the final project, we're using MongoDB, and as such the database connection string from 1. should be a mongo connection string pointing to where you're running it. (in our case we only used Atlas during development)

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
