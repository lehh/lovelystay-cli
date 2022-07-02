# LovelyStay CLI

## Requirements

node >=14

npx >=8

docker and docker-compose (optional)

## Installing

Run `npm i` to install required packages.
Run `npm run build` to build the js files.

(optional) Run `docker-compose up -d` to start the postgres database.

Run `cp .env.example .env`.

Create the database on postgres and configure the connection string in the `.env` file.

Run the migrations with the command `npm run migrate up`.

## Usage

You can either install de cli globally with `npm i -g` and use the `lovelystay` command.

OR

run `npm run lovelystay` directly.

## Uninstalling

If you installed the cli globally, just run `npm remove -g lovelystay-cli`.