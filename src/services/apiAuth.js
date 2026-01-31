import {
  signup as signupAdapter,
  login as loginAdapter,
  getCurrentUser as getCurrentUserAdapter,
  logout as logoutAdapter,
  updateCurrentUser as updateCurrentUserAdapter,
} from "./data/su\u0070abaseAdapter/auth";
import { emitAuthEvent } from "./auth/authEvents";

export async function signup({ fullName, email, password }) {
  return signupAdapter({ fullName, email, password });
}

export async function login({ email, password }) {
  return loginAdapter({ email, password });
}

export async function getCurrentUser() {
  return getCurrentUserAdapter();
}

export async function logout() {
  await logoutAdapter();
  emitAuthEvent({ type: "LoggedOut" });
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  return updateCurrentUserAdapter({ password, fullName, avatar });
}
