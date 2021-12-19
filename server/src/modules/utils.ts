import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { v1 } from 'uuid';
import { LauncherVersion, LoaderVersion, Mod } from '../models';
import cfg from './cfg';

export function validatePassword(given: string, expected: string): boolean {
  return bcrypt.compareSync(given, expected);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateToken(data: string | null = null, length = -1) {
  if (data === null) {
    data = v1();
  }

  const token = crypto
    .createHash('sha256')
    .update(data)
    .update(crypto.randomBytes(256))
    .digest('hex');

  return length > 0 ? token.substr(0, length) : token;
}

/**
 * Builds the publicly accessible WWW URL for a mod page.
 * @param mod a mod instance to build a URL for.
 * @returns the URL.
 */
export function getModUrl(mod: Mod): string {
  return `${cfg.frontendBaseUrl}mods/${mod.id}`;
}

/**
 * Builds the publicly accessible WWW URL for a loader version page.
 * @param version a loader version instance to build a URL for.
 * @returns the URL.
 */
export function getLoaderVersionUrl(version: LoaderVersion): string {
  return `${cfg.frontendBaseUrl}loader/${version.rmlVersion}`;
}

/**
 * Builds the publicly accessible WWW URL for a launcher version page.
 * @param version a launcher version instance to build a URL for.
 * @returns the URL.
 */
export function getLauncherVersionUrl(version: LauncherVersion): string {
  return `${cfg.frontendBaseUrl}launcher/${version.version}`;
}

/**
 * Builds the publicly accessible WWW URL for a user page.
 * @param username name of the user to build a URL for.
 * @returns the URL.
 */
export function getUserUrlForUsername(username: string): string {
  return `${cfg.frontendBaseUrl}user/${encodeURIComponent(username)}`;
}

/**
 * Publicly accessible WWW URL for the mod loader download page.
 */
export const softwareDownloadUrl = `${cfg.frontendBaseUrl}download`;

/**
 * Publicly accessible WWW URL of a mod loader logo image.
 */
export const logoUrl = `${cfg.frontendBaseUrl}logo.png`;
