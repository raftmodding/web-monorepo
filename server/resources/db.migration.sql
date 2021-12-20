alter table users
    add role VARCHAR;

alter table "mod-versions"
	add "fileHashes" json;

DROP TABLE "discord-account-creations";

ALTER TABLE "loader-versions"
	DROP COLUMN "downloadUrl";

DROP TABLE "Sessions";
