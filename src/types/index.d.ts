export interface Lanyard {
  data: Data;
  success: boolean;
}
export interface Data {
  kv: TimestampsOrKv;
  spotify?: null;
  discord_user: DiscordUser;
  activities?: ActivitiesEntity[] | null;
  discord_status: string;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
}
export interface TimestampsOrKv {}
export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot: boolean;
  clan?: null;
  global_name: string;
  avatar_decoration_data?: null;
  display_name: string;
  public_flags: number;
}
export interface ActivitiesEntity {
  id: string;
  name: string;
  type: number;
  state: string;
  details: string;
  timestamps: Timestamps;
  application_id: string;
  assets: Assets;
  created_at: number;
}
export interface Timestamps {
  start?: number | null;
}
export interface Assets {
  large_image: string;
  large_text: string;
  small_image?: string | null;
  small_text?: string | null;
}
