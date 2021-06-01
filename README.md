# Bookfinder:

- Bookfinder is an inventory system for multiple bookstores containing the same copies of the same book, and notifying when one or a set of books are out of stock in a specific bookstore.

# Installation

yarn install

# Development

yarn dev

# Testing

yarn test

# migrations

yarn migrate

# rolllback

yarn unmigrate

# seed database

yarn seed

# Stack:

- Node, Jest, Postgres, and Knex.js to create migrations, db structure, and seed files. 
- React 

# API Endpoints:

- Fetch, create, update stock levels, delete book(s) from the bookstore database

# Cron job:

- Called every minute to check whether a book's inventory is depleted and updates the status to be "out of stock" for books that have a stock level of 0.

# Workflow validation:

'Creation of a book inside a bookstore, updating the book's stock level to be out of stock and validating that after running the method above, we can validate the same book has an "out of stock" status.'
