import { INotyfOptions } from 'notyf/notyf.options';
import { Notyf, NotyfNotification } from 'notyf';

const defaultConfig: Partial<INotyfOptions> = {
  position: { x: 'right', y: 'bottom' },
  dismissible: true,
  duration: 3000,
};

export class Toaster extends Notyf {
  constructor(private readonly config: Partial<INotyfOptions> = defaultConfig) {
    super(config);
  }

  public fError(message: string, ...replaces: string[]): NotyfNotification {
    return this.formatMessage('error', message, ...replaces);
  }

  public fSuccess(message: string, ...replaces: string[]): NotyfNotification {
    return this.formatMessage('success', message, ...replaces);
  }

  private formatMessage(
    methodName: string,
    message: string,
    ...replaces: string[]
  ): NotyfNotification {
    let msg = message;

    if (replaces.length > 0) {
      replaces.forEach((replace, i) => {
        msg = msg.replace(`%${i}`, replace);
      });
    }

    return this[methodName](msg);
  }
}

const toaster = new Toaster();

export default toaster;
