import axios from 'axios';

/**
 * Format for [Discord Embed](https://discord.com/developers/docs/resources/channel#embed-object-embed-structure) objects.
 */
export interface Embed {
  title?: string;
  description?: string;
  url?: string;
  /**
   * ISO8601 timestamp
   */
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

/**
 * Format for [Discord Embed Image](https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure) objects.
 */
export interface EmbedImage {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

/**
 * Format for [Discord Embed Video](https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure) objects.
 */
export type EmbedVideo = EmbedImage;

/**
 * Format for [Discord Embed Thumbnail](https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure) objects.
 */
export type EmbedThumbnail = EmbedImage;

/**
 * Format for [Discord Embed Provider](https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure) objects.
 */
export interface EmbedProvider {
  name?: string;
  url?: string;
}

/**
 * Format for [Discord Embed Author](https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure) objects.
 */
export interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/**
 * Format for [Discord Embed Footer](https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure) objects.
 */
export interface EmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/**
 * Format for [Discord Embed Field](https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure) objects.
 */
export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

/**
 * Enum for [Discord Embed Allowed Mention Types](https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types).
 */
type MentionType = 'roles' | 'users' | 'everyone';

/**
 * Format for [Discord Embed Allowed Mentions](https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure) objects.
 */
interface AllowedMentions {
  parse?: MentionType[];
  /**
   * ID list of roles that should be allowed to mention.
   */
  roles?: string[];
  /**
   * ID list of users that should be allowed to mention.
   */
  users?: string[];
  replied_user?: boolean;
}

/**
 * Format for [Discord Webhook Posts](https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params) objects.
 */
export interface WebhookMessage {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  file?: unknown;
  embeds?: Embed[];
  payload_json?: string;
  allowed_mentions: AllowedMentions;
}

/**
 * Client for [Discord webhooks](https://discord.com/developers/docs/resources/webhook).
 */
export class DiscordWebhookClient {
  private readonly url: string;

  /**
   * Creates a client for a specific Discord webhook.
   * @param url the Discord webhook URL to post messages to.
   */
  public constructor(url: string) {
    this.url = url;
  }

  /**
   * Posts a message to the webhook.
   * @param message the message to be posted.
   */
  public async sendMessage(message: WebhookMessage): Promise<void> {
    await axios.post(this.url, message, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
