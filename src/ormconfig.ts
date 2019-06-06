require('dotenv').config();

module.exports = [
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'uowac_dev',
    entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
    synchronize: true,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: 'src/migrations',
    },
  },
  {
    name: 'production',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
    synchronize: false,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: 'src/migrations',
    },
  },
  {
    name: 'staging',
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'uowac_stage',
    entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
    synchronize: false,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: 'src/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'uowac_test',
    entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
    synchronize: true,
    dropSchema: true,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: 'src/migrations',
    },
  },
];
