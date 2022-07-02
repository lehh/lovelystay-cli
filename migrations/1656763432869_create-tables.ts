/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('users', {
    id: 'id',
    login: { type: 'varchar(100)', notNull: true },
    name: { type: 'varchar(1000)' },
    location: { type: 'varchar(500)' },
    url: { type: 'varchar(200)', notNull: true },
    created_at: { type: 'timestamp', notNull: true },
  });

  pgm.createIndex('users', 'location');

  pgm.createTable(
    'users_languages',
    {
      id: {
        type: 'serial',
      },
      user_id: {
        type: 'integer',
        notNull: true,
        references: '"users"',
        onDelete: 'CASCADE',
      },
      language: { type: 'varchar(100)' },
    },
    {
      constraints: {
        primaryKey: ['user_id', 'language'],
      },
    }
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex('users', 'location');
  pgm.dropTable('users_languages');
  pgm.dropTable('users');
}
