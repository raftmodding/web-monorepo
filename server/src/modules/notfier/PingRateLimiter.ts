/**
 * This class helps keeping track of the role ping frequency and can tell you
 * whether or not it's a good idea to ping a certain role again.
 */
export class PingRateLimiter {
  private readonly cooldown: number;
  private lastPingMap: Map<string, Date>;

  /**
   * Initializes a ping rate limiter.
   * @param cooldown the minimum time distance between role pings
   * in milliseconds.
   */
  public constructor(cooldown: number) {
    this.cooldown = cooldown;
    this.lastPingMap = new Map<string, Date>();
  }

  /**
   * Checks whether you can ping the given role, considering the ping cooldown.
   * @param id the id of the role to ping.
   */
  public canPing(id: string) {
    const lastPing = this.lastPingMap.get(id);
    if (lastPing === undefined) {
      return true;
    } else if (new Date().getTime() - lastPing.getTime() < this.cooldown) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * To be called after pinging a role. This will reset the ping cooldown.
   * @param id the role that was pinged.
   */
  public ping(id: string) {
    this.lastPingMap.set(id, new Date());
  }
}
