import { NavigationGuardNext, RouteLocation } from 'vue-router';
import { ROLE_ADMIN } from '../const';
import { isSessionExpired, state } from '../modules/stateManager';
import toaster from '../modules/toaster';

export function handleMissingSession(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext,
): void {
  toaster.error('Please login to proceed');

  const { name, query, params } = to || {};
  let redirect = name;
  let queryStr = JSON.stringify(query || null);
  let paramsStr = JSON.stringify(params || null);

  if (!redirect || redirect === 'login') {
    redirect = 'home';
  }

  return next({
    name: 'signIn',
    query: { redirect, paramsStr: paramsStr, queryStr: queryStr },
  } as any);
}

export function handleExistingSession(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext,
): void {
  toaster.success('You are already logged in');

  return next({ name: 'home' });
}

export function handleAdminOnly(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext,
): void {
  if (isSessionExpired() || state.session.user.role !== ROLE_ADMIN) {
    toaster.error(`You are missing privileges to view this page!`);
    return next(from);
  } else {
    return next();
  }
}

export function handleUnfinishedUser(
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext,
): void {
  if (to.name !== 'finishAccount') {
    return next({ name: 'finishAccount' });
  }

  return next();
}
