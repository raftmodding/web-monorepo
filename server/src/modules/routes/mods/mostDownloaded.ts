import {
  modVersionModel,
  RaftVersion,
  raftVersionModel,
} from '../../../models';
import sequelize from '../../sequelize';
import router from '../router';

router.get('/mods/mostDownloaded', async (req: any, res: any) => {
  const latestRaftVersion: RaftVersion = (
    await raftVersionModel.findAll({
      order: [['releasedAt', 'DESC']],
      limit: 1,
    })
  )[0] as RaftVersion;
  const result = await sequelize.query(getQuery());
  const mostDownloadedMods = await Promise.all(
    result[0].map(async (mod: any) => {
      return {
        ...mod,
        versions: await modVersionModel.findAll({
          where: { modId: mod.id },
          order: [['createdAt', 'desc']],
          limit: 1,
        }),
      };
    }),
  );

  return res.status(200).send(mostDownloadedMods);
});

function getQuery() {
  return `
  SELECT *,
      (
          CASE
              WHEN (
                  SELECT SUM("downloadCount")
                  from "mod-versions"
                  WHERE "mod-versions"."modId" = "mods"."id"
                      AND "mod-versions"."downloadCount" IS NOT NULL
              ) IS NOT NULL THEN (
                  SELECT SUM("downloadCount")
                  from "mod-versions"
                  WHERE "mod-versions"."modId" = "mods"."id"
                      AND "mod-versions"."downloadCount" IS NOT NULL
              )
              ELSE 0
          END
      ) AS "totalDownloads"
  FROM "mods"
  GROUP BY id
  ORDER BY "totalDownloads" DESC
  LIMIT 3;`;
}
