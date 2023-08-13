interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /**
   * Built-in environment variable.
   * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
   */
  readonly NG_APP_API_URL: string;
  readonly NG_APP_BASE_URL: string;
  readonly GOOGLE_TAG_MANAGER_ID: string;
}
