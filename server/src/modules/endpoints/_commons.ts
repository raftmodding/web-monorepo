import FileType from 'file-type';
import {
  Mod,
  modModel,
  Session,
  sessionModel,
  User,
  userModel,
} from '../../models';
import ajv from '../ajv';
import cfg, { Role } from '../cfg';
import { FileManager, ObjectMeta } from '../FileManager';

const fileManger = new FileManager(cfg);

export async function extractSession(req: any): Promise<Session | null> {
  try {
    const { authtoken } = req.headers;

    return (await sessionModel.findOne({
      where: { token: authtoken },
      include: { model: userModel, as: 'user' },
    })) as Session;
  } catch (e) {}

  return null;
}

export async function validateAuthToken(
  req: any,
  res: any,
  allowUnfinished: boolean = false,
): Promise<Session | null> {
  const { authtoken } = req.headers;

  try {
    const session = await extractSession(req);

    if (session && session.token === authtoken && session.user) {
      if (allowUnfinished || session.user.role !== Role.UNFINISHED) {
        return session;
      }
    }
  } catch (e) {}

  res.status(403).send({
    error: 'You are missing authorization!',
  });

  return null;
}

export async function validateModOwnership(
  req: any,
  res: any,
  modIdParamKey: string = 'id',
): Promise<Mod | null> {
  const foundSession = await validateAuthToken(req, res);

  if (!foundSession) return null;

  try {
    const { username: author, role } = foundSession.user!;
    const { [modIdParamKey]: id } = req.params;
    let foundMod;

    if (role === Role.ADMIN) {
      foundMod = (await modModel.findOne({ where: { id } })) as Mod;
    } else {
      foundMod = (await modModel.findOne({ where: { id, author } })) as Mod;
    }

    if (foundMod) {
      return foundMod;
    }
  } catch (e) {
    console.error('error during mod ownership validation:', e);
  }

  res.status(403).send({ error: 'You are not the owner of the mod!' });
  return null;
}

export async function validateAndWriteModFile(
  req: any,
  res: any,
): Promise<boolean> {
  const { file, id, version } = req.body;
  const buffer = Buffer.from(file.base64, 'base64');
  const fileType = await FileType.fromBuffer(buffer);

  if (fileType && cfg.validMimeTypes.includes(fileType.mime)) {
    const filename = `${id}-${version}.rmod`;
    try {
      const upload: ObjectMeta = await fileManger.createModVersionFile(
        id,
        version,
        filename,
        buffer,
      );

      req.body.downloadUrl = upload.url;
      req.body.fileHashes = { md5: upload.md5, sha256: upload.sha256 };

      return true;
    } catch (err) {
      res.status(500).send({ error: 'file upload failed! (sorry)' });
      return false;
    }
  }

  res.status(403).send({ error: 'file-type is not allowed!' });
  return false;
}

export async function validateAdminPrivileges(
  req: any,
  res: any,
): Promise<User> {
  const session = await validateAuthToken(req, res);

  if (session && session.user && session.user.isAdmin()) {
    return session.user;
  }

  return res.status(403).send({ error: 'Not enough privileges!' });
}

export async function validateSchema(
  data: any,
  schema: any,
  res: any,
): Promise<boolean> {
  const validate = ajv.compile(schema);

  if (!validate(data)) {
    res.status(403).send({ error: 'Invalid form' });
    return false;
  }

  return true;
}
