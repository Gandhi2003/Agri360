import {
  Role,
  type AuthUser,
  type ForgotPasswordPayload,
  type LoginPayload,
  type LoginResponse,
  type ResetPasswordPayload,
} from '@common/types';

/**
 * Dev-only mock auth. Active when `VITE_ENABLE_MOCK_API=true`, so the app is
 * fully usable without a backend. Any credentials succeed and you sign in as a
 * SuperAdmin (wildcard permissions → every nav item is visible).
 */

const base64url = (obj: unknown): string =>
  btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/** Build a structurally-valid (unsigned) JWT with a real `exp` so it survives reloads. */
const createMockJwt = (sub: string, ttlSeconds = 60 * 60 * 24): string => {
  const header = base64url({ alg: 'HS256', typ: 'JWT' });
  const payload = base64url({ sub, exp: Math.floor(Date.now() / 1000) + ttlSeconds });
  return `${header}.${payload}.mock-signature`;
};

const now = () => new Date().toISOString();

const mockUser = (email: string): AuthUser => ({
  id: 'usr_demo_0001',
  email,
  firstName: 'Demo',
  lastName: 'Admin',
  roles: [Role.SuperAdmin],
  permissions: [],
  isActive: true,
  createdAt: now(),
  updatedAt: now(),
});

const delay = <T>(value: T, ms = 400): Promise<T> =>
  new Promise((resolve) => window.setTimeout(() => resolve(value), ms));

export const mockAuthApi = {
  login: (payload: LoginPayload): Promise<LoginResponse> =>
    delay({
      user: mockUser(payload.email || 'demo@agri360.com'),
      tokens: {
        accessToken: createMockJwt('usr_demo_0001'),
        refreshToken: createMockJwt('usr_demo_0001', 60 * 60 * 24 * 30),
        expiresIn: 60 * 60 * 24,
      },
    }),

  logout: (): Promise<void> => delay(undefined, 100),

  me: (): Promise<AuthUser> => delay(mockUser('demo@agri360.com')),

  forgotPassword: (_payload: ForgotPasswordPayload): Promise<{ message: string }> =>
    delay({ message: 'Reset link sent (mock).' }),

  resetPassword: (_payload: ResetPasswordPayload): Promise<{ message: string }> =>
    delay({ message: 'Password reset (mock).' }),
};
