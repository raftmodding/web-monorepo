import dayjs from 'dayjs';
import { reactive } from 'vue';
import { Session, State, Theme } from '../@types';
import {
  LOCAL_STORAGE_SESSION,
  LOCAL_STORAGE_THEME,
  ROLE_UNFINISHED,
} from '../const';
import api from './api';

export const state: State = reactive({
  session: null,
  theme: getThemeFromLocalStorage(),
  likes: [],
  latestRaftVersion: null,
});

export function isSessionExpired(): boolean {
  const { session } = state;

  if (session?.expires) {
    const now = dayjs();
    const expires = dayjs(session.expires);

    if (expires.isAfter(now)) {
      return false;
    }
  }

  return true;
}

export async function initSession(): Promise<void> {
  const token: string = localStorage.getItem(LOCAL_STORAGE_SESSION);

  document.body.setAttribute('data-theme', state.theme);

  if (token) {
    state.session = await api.getSession(token);
    api.setAuthToken(state.session.token);

    if (state.session.user.role === ROLE_UNFINISHED) {
      state.likes = [];
    } else {
      state.likes = (await api.getModLikes()).map(({ modId }) => modId);
    }
  }
  state.latestRaftVersion = (
    await api.getRaftVersions({ sort: '-releasedAt', count: 1 })
  )[0];
}

export async function setSession(session: Session): Promise<void> {
  state.session = session;
  api.setAuthToken(state.session.token);
  localStorage.setItem(LOCAL_STORAGE_SESSION, session.token);
  state.likes = (await api.getModLikes()).map(({ modId }) => modId);
}

export async function killSession(): Promise<void> {
  const { session } = state;
  await api.deleteSession(session.token);
  state.session = null;
  state.likes = [];
  localStorage.removeItem(LOCAL_STORAGE_SESSION);
}

export function getThemeFromLocalStorage(): Theme {
  const lsTheme = localStorage.getItem(LOCAL_STORAGE_THEME);

  return lsTheme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: Theme): void {
  state.theme = theme;
  localStorage.setItem(LOCAL_STORAGE_THEME, `${state.theme}`);
  document.body.setAttribute('data-theme', state.theme);
}
