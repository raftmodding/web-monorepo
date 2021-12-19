import { Client } from 'minio';
import { Cfg } from './cfg';
import { createHash } from 'crypto';

/**
 * Relevant metadata for an uploaded object (file).
 */
export interface ObjectMeta {
  /**
   * A public download url for the uploaded file.
   */
  url: string;
  /**
   * MD5 hash value of the uploaded file.
   */
  md5: string;
  /**
   * SHA256 hash value of the uploaded file.
   */
  sha256: string;
}

/**
 * Used to upload and delete mod files on an external storage server.
 */
export class FileManager {
  private cfg: Cfg;
  private client: Client;

  /**
   * Instantiates the file manager.
   * @param cfg the app config.
   */
  public constructor(cfg: Cfg) {
    this.cfg = cfg;

    this.client = new Client({
      accessKey: cfg.storage.accessKey,
      secretKey: cfg.storage.secretKey,
      endPoint: cfg.storage.endPoint,
    });
  }

  /**
   * Uploads a mod version file. Do not upload multiple files with the same
   * `modSlug` + `versionSlug` + `fileName`!
   * @param modSlug the slug of the mod to upload a version file for.
   * @param versionSlug the slug of the mod version to upload a file for.
   * @param fileName the name of the mod version file to upload. May not contain any slashes!
   * @param fileContents a buffer that holds the file contents to upload.
   * @returns an object that holds the public download url and file hashes.
   */
  public async createModVersionFile(
    modSlug: string,
    versionSlug: string,
    fileName: string,
    fileContents: Buffer,
  ): Promise<ObjectMeta> {
    const filePath = `mods/${modSlug}/${versionSlug}/${fileName}`;

    return this.uploadPublic(filePath, fileContents);
  }

  /**
   * Uploads a launcher version file. Do not upload multiple files with the same
   * `versionSlug` + `fileName`!
   * @param versionSlug the slug of the launcher version to upload a file for.
   * @param fileName the name of the launcher version file to upload. May not contain any slashes!
   * @param fileContents a buffer that holds the file contents to upload.
   * @returns an object that holds the public download url for the file and
   * file hashes.
   */
  public async createLauncherVersionFile(
    versionSlug: string,
    fileName: string,
    fileContents: Buffer,
  ): Promise<ObjectMeta> {
    const filePath = `launcher/${versionSlug}/${fileName}`;

    return this.uploadPublic(filePath, fileContents);
  }

  /**
   * Uploads a file to the public bucket.
   * @param filePath the new file path within the public bucket.
   * @param fileContents a buffer that holds the file contents to upload.
   * @returns an object that holds the public download url for the file and file
   * hashes.
   */
  private async uploadPublic(
    filePath: string,
    fileContents: Buffer,
  ): Promise<ObjectMeta> {
    const bucket = this.cfg.storage.publicBucket;

    const sha256 = this.hashSha256(fileContents);

    const md5 = (
      await this.client.putObject(bucket, filePath, fileContents)
    ).toString();

    return {
      url: `https://${this.cfg.storage.endPoint}/${bucket}/${filePath}`,
      md5,
      sha256,
    };
  }

  /**
   * Creates a SHA256 hash code for a given file.
   * @param fileContents a buffer that holds the file contents to hash.
   * @returns the SHA256 hash code of the file.
   */
  private hashSha256(fileContents: Buffer): string {
    return createHash('sha256').update(fileContents).digest('hex');
  }

  /**
   * Hides all files of a mod from the public by moving them to the private
   * bucket. Existing hidden mod files for this `modSlug` might be overwritten
   * by shown files. Use `showModFiles` to show the hidden files to the public
   * again. This operation has no effect on mod files that are uploaded after
   * the method call.
   * @param modSlug the slug of the mod whose files to hide.
   */
  public async hideModFiles(modSlug: string): Promise<void> {
    const modDir = `mods/${modSlug}/`;
    await this.moveDir(
      this.cfg.storage.publicBucket,
      this.cfg.storage.privateBucket,
      modDir,
    );
  }

  /**
   * Exposes previously hidden mod files to the public again by moving them from
   * the private bucket to the public bucket.
   * @param modSlug the slug of the mod whose files to hide.
   */
  public async showModFiles(modSlug: string): Promise<void> {
    const modDir = `mods/${modSlug}/`;
    await this.moveDir(
      this.cfg.storage.privateBucket,
      this.cfg.storage.publicBucket,
      modDir,
    );
  }

  /**
   * Hides all files of a launcher version from the public by moving them to the
   * private bucket. This operation has no effect on launcher version files that
   * are uploaded after the method call.
   * @param versionSlug the slug of the launcher version whose files to hide.
   */
  public async hideLauncherVersionFiles(versionSlug: string): Promise<void> {
    const launcherVersionDir = `launcher/${versionSlug}`;
    await this.moveDir(
      this.cfg.storage.publicBucket,
      this.cfg.storage.privateBucket,
      launcherVersionDir,
    );
  }

  /**
   * Moves a directory and all (recursively) included files from one bucket to
   * another.
   * @param srcBucket the bucket to move objects from.
   * @param destBucket the bucket to move objects to.
   * @param dir the directory to move, including a trailing slash and
   * excluding the bucket name and leading slash. Example: `path/to/dir/`
   */
  private async moveDir(srcBucket: string, destBucket: string, dir: string) {
    const fileKeys = await this.listObjectsRecursively(srcBucket, dir);

    for (let fileKey of fileKeys) {
      const fileContent = await this.client.getObject(srcBucket, fileKey);
      await this.client.putObject(destBucket, fileKey, fileContent);
    }

    await this.client.removeObjects(srcBucket, fileKeys);
  }

  /**
   * Deletes all files of a given mod from the public bucket.
   * @param modSlug the slug of the mod whose file to delete.
   */
  public async deleteModFiles(modSlug: string): Promise<void> {
    const prefix = `mods/${modSlug}/`;

    const objects = await this.listObjectsRecursively(
      this.cfg.storage.publicBucket,
      prefix,
    );

    await this.client.removeObjects(this.cfg.storage.publicBucket, objects);
  }

  /**
   * Collects a list of all object names within a directory inside of a bucket.
   * This function will include objects recursively.
   * @param bucket the name of the bucket to list objects from.
   * @param dir the directory to list objects in, including a trailing slash and
   * excluding the bucket name and leading slash. Example: `path/to/dir/`
   * @returns an array of all object names (paths) within the directory. The
   * paths are absolute within the bucket, i.e. a file
   * `/bucket/path/to/file.jpg` will lead to a path `path/to/file.jpg`.
   */
  private async listObjectsRecursively(
    bucket: string,
    dir: string,
  ): Promise<string[]> {
    return await new Promise<string[]>((resolve, reject) => {
      const names: string[] = [];
      const stream = this.client.listObjectsV2(bucket, dir, true);
      stream.on('data', (item) => names.push(item.name));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(names));
    });
  }
}
