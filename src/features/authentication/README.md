# Authentication

JWT-based authentication for Agri360 CRM.

## Capabilities

- **Login** (`POST /auth/login`) → persists `{ user, tokens }` into the auth store.
- **Logout** (`POST /auth/logout`) → clears session + tokens.
- **Forgot password** (`POST /auth/forgot-password`).
- **Reset password** (`POST /auth/reset-password`).
- **Silent refresh** — handled transparently by the axios response interceptor
  (`@common/api/interceptor.ts`) using `@common/api/refreshToken.ts`.

## Structure

```
authentication/
├── api/        # authApi — login/logout/me/forgot/reset
├── hooks/      # useLogin, useLogout, useForgotPassword, useResetPassword
├── pages/      # LoginPage, ForgotPasswordPage, ResetPasswordPage (public)
├── schemas/    # Zod: loginSchema, forgotPasswordSchema, resetPasswordSchema
├── types/      # re-exports auth contracts from @common/types
├── constants/  # endpoints + query keys
└── routes.ts   # empty (auth routes are public, wired in the central router)
```

## Token lifecycle

| Concern       | Owner                                 |
| ------------- | ------------------------------------- |
| Storage       | `@common/api/token.ts` (`tokenStore`) |
| Attach header | request interceptor                   |
| 401 → refresh | response interceptor + `refreshToken` |
| Session state | `@app/store/auth.store.ts`            |
| RBAC          | `@common/permissions`                 |

```

```
