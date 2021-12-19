import { ModCategories } from '../../cfg';
import router from '../router';

router.get('/mods/categories', async (req: any, res: any) => {
  res.status(200).send(ModCategories);
});
