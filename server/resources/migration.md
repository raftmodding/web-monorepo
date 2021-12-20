# Migration

This guide covers all required steps to migrate all data from the
[old website](https://github.com/raftmodding/website) to the backend of this
one.

In the following, these placeholders shall be replaced:

- `OLD_DB` and `NEW_DB` with the respective postgres connection strings
- `ALIAS` with the configured MinIO client alias for the file server
- `MINIO_HOST` with the hostname / domain of the MinIO server
- `PUBLIC_PATH` with a path to the `public/` folder of the old website

1.  Migrate all SQL data:
    ```bash
    # export from the old database
    pg_dump OLD_DB > db_export.sql
    # import into the new
    psql -f db_export.sql NEW_DB
    ```
2.  Run the database migration SQL script:
    ```bash
    psql -f db.migration.sql NEW_DB
    ```
3.  Set up the MinIO server as described in `minio.sh`.
4.  Migrate files:
    ```bash
    mc cp -r PUBLIC_PATH ALIAS/raftmodding-public
    ```
5.  Update download URLs:

    ```sql
    update "mod-versions"
        set "downloadUrl" = 'https://MINIO_HOST/raftmodding-public' || "downloadUrl"
        where "downloadUrl" like '/%';

    update "loader-versions"
        set "downloadUrl" = 'https://MINIO_HOST/raftmodding-public' || "downloadUrl"
        where "downloadUrl" like '/%';

    update "launcher-versions"
        set "downloadUrl" = 'https://MINIO_HOST/raftmodding-public' || "downloadUrl"
        where "downloadUrl" like '/%';
    ```
