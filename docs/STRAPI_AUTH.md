# Strapi API authentication (Next.js)

The frontend uses a **Strapi API token** to authenticate requests. All fetches (`fetchAPI`, `fetchSingleType`, `fetchCollection`) and submissions (`submitToStrapi`, `uploadMedia`) send `Authorization: Bearer <token>` when `STRAPI_API_TOKEN` is set.

## 1. Create an API token in Strapi

1. Log in to **Strapi Admin**: http://localhost:1338/admin  
2. Go to **Settings** → **API Tokens** → **Create new API Token**.  
3. Set:
   - **Name**: e.g. `Next.js frontend`
   - **Token type**: **Full access** (or **Custom** with `find` / `findOne` for read, plus `create` for contact form, CV, etc.)
   - **Token duration**: Unlimited (or as needed).  
4. Click **Save**. **Copy the token** (it’s shown only once).

## 2. Add the token to Next.js

In the **frontend** `.env`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1338
STRAPI_API_TOKEN=<paste-your-token-here>
```

Restart the Next.js dev server so it picks up the new env.

## 3. Strapi permissions (if using Public role)

- If you **don’t** use an API token, the app calls Strapi as **Public**.  
  Enable **find** / **findOne** (and **create** where needed) for the **Public** role in **Settings** → **Users & Permissions** → **Roles** → **Public**.

- If you **do** use an API token, the token’s permissions apply.  
  Ensure the token type (e.g. Full access or your Custom role) allows **find** / **findOne** (and **create** for forms, etc.) on the content types you use.

## 4. Verify

- Open the site and check that pages load (home, about, etc.).  
- If you see **403** on `/api/*`, the token is missing, wrong, or has insufficient permissions.

## 5. Security

- **Never** commit `STRAPI_API_TOKEN` (or any real token) to git.  
- Keep `.env` in `.gitignore`.  
- Use different tokens and envs for dev/staging/production.
