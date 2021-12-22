//@ts-ignore
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_DISCORD_CLIENT_ID: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TITLE_DEFAULT: string;
  readonly VITE_TITLE_APPEND: string;
  readonly VITE_DISCORD_INVITE_LINK: string;
  readonly VITE_API_DOCS_URL: string;
  readonly VITE_API_DOCS_MULTIPLE_FILES_URL: string;
  readonly VITE_API_DOCS_SLUGS_URL: string;
  readonly VITE_PATREON_LINK: string;
  readonly VITE_PAYPAL_TOKEN: string;
  readonly VITE_META_BASE_URL: string;
  readonly VITE_META_BANNER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
