import { Request, Response } from 'express';
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

export async function extractSession(req: Request): Promise<Session | null> {
  try {
    const { authtoken } = req.headers;

    return await sessionModel.findOne({
      where: { token: authtoken },
      include: { model: userModel, as: 'user' },
    });
  } catch (e) {
    console.warn('failed to extract session!', req);
  }

  return null;
}

export async function validateAuthToken(
  req: Request,
  res: Response,
  allowUnfinished = false,
): Promise<Session | null> {
  const { authtoken } = req.headers;

  try {
    const session = await extractSession(req);

    if (session && session.token === authtoken && session.user) {
      if (allowUnfinished || session.user.role !== Role.UNFINISHED) {
        return session;
      }
    }
  } catch (e) {
    console.warn('could not validate auth token', req);
  }

  res.status(403).send({
    error: 'You are missing authorization!',
  });

  return null;
}

export async function validateModOwnership(
  req: Request,
  res: Response,
  modIdParamKey = 'id',
): Promise<Mod | null> {
  const foundSession = await validateAuthToken(req, res);

  if (!foundSession || !foundSession.user) return null;

  try {
    const { username: author, role } = foundSession.user;
    const { [modIdParamKey]: id } = req.params;
    let foundMod;

    if (role === Role.ADMIN) {
      foundMod = await modModel.findOne({ where: { id } });
    } else {
      foundMod = await modModel.findOne({ where: { id, author } });
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
  req: Request,
  res: Response,
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
  req: Request,
  res: Response,
): Promise<User | Response> {
  const session = await validateAuthToken(req, res);

  if (session && session.user && session.user.isAdmin()) {
    return session.user;
  }

  return res.status(403).send({ error: 'Not enough privileges!' });
}

export async function validateSchema(
  data: Request,
  schema: object,
  res: Response,
): Promise<boolean> {
  const validate = ajv.compile(schema);

  if (!validate(data)) {
    res.status(403).send({ error: 'Invalid form' });
    return false;
  }

  return true;
}
