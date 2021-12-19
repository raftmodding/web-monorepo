import { modVersionModel } from '../../../models';
import sequelize from '../../sequelize';
import router from '../router';

router.get('/mods/mostLiked', async (req: any, res: any) => {
  const result = await sequelize.query(getQuery());

  const mostLikedMods = await Promise.all(
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

  return res.status(200).send(mostLikedMods);
});

function getQuery() {
  return `
  SELECT *,
         (SELECT COUNT(*)
          FROM "ModLikes"
          WHERE "ModLikes"."modId" = "mods"."id")::int AS likes
  FROM "mods"
  ORDER BY likes DESC, "mods".title DESC
  LIMIT 3`;
}
