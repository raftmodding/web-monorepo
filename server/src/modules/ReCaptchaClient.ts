import axios from 'axios';
import cfg from './cfg';

/**
 * The format of ReCaptcha API responses.
 */
interface ReCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

/**
 * API endpoint for Google ReCaptcha response token validation.
 */
const reCaptchaEndpoint = 'https://www.google.com/recaptcha/api/siteverify';

/**
 * Client for the Google ReCaptcha response token validation API.
 */
export class ReCaptchaClient {
  private readonly secretKey: string;

  /**
   * Initializes a ReCaptcha API client for a given ReCaptcha site.
   * @param secretKey the secret key of the site.
   */
  public constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  /**
   * Checks whether a ReCaptcha response token is valid.
   * @param token the response token to verify.
   * @returns `true` if the token is valid and `false` otherwise.
   */
  public async verifyResponseToken(token: string): Promise<boolean> {
    const res = await axios({
      url: reCaptchaEndpoint,
      method: 'post',
      params: {
        secret: this.secretKey,
        response: token,
      },
    });

    const resData = res.data as ReCaptchaResponse;

    return resData.success;
  }
}

/**
 * ReCaptcha client with credentials from the app config.
 */
export default new ReCaptchaClient(cfg.reCaptcha.secretKey);
