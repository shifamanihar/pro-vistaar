# ProVistaar Admin Dashboard Upgrade

## Included files
- `Admin/Admin.jsx` — replace existing `Admin.jsx`.
- `Admin/Admin.css` — replace existing `Admin.css`.
- `server/adminDataRouter.js` — copy into existing `server` folder.
- `server/supabase-schema.sql` — run in Supabase SQL Editor.

## A. Set up hosted storage
1. Create a project at https://supabase.com/.
2. Open SQL Editor > New query; paste/run `supabase-schema.sql`.
3. Copy the project URL and the server-side `service_role`/secret key from the Supabase project API settings. Keep the key private.

## B. Install backend dependency
Open terminal in the existing `server` folder:
```bash
npm install @supabase/supabase-js
```

## C. Add variables to `server/.env`
Keep all current variables. Add:
```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_SIDE_SECRET_KEY
```
Do not prefix these with `VITE_`. Never paste the service-role key into React, GitHub, or a public frontend environment variable.

## D. Connect the API router
In `server/server.js`, add alongside your imports:
```js
import adminDataRouter from "./adminDataRouter.js";
```
After the existing `app.use(express.json(...))` and CORS middleware, add:
```js
app.use("/api/admin", adminDataRouter);
```
Keep your existing `/api/admin/login` and `/api/admin/emails` endpoints. This router only adds `/api/admin/records` endpoints.

## E. Store new website enquiries automatically
In the existing `/api/contact` handler, locate:
```js
console.log("Resend accepted email:", data.id);
```
Immediately after that line, before the success response, add:
```js
try {
  const { createClient } = await import("@supabase/supabase-js");
  const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: dbError } = await db.from("admin_records").insert({
    kind: "customer",
    data: {
      name, email, phone, projectType, budget, message,
      leadStatus: "New", connected: "No", progress: "Not Started",
      nextFollowUp: "", notes: "", source: "Website contact form",
      resendEmailId: data.id
    }
  });
  if (dbError) console.error("Could not save enquiry:", dbError.message);
} catch (dbError) {
  console.error("Could not save enquiry:", dbError.message);
}
```
This keeps Resend sending working even if the database insert fails, while logging a non-secret error. Existing historical emails are not automatically imported as customer records; add old customers manually.

## F. Run it
1. Replace `Admin/Admin.jsx` and `Admin/Admin.css` in your project.
2. Copy `server/adminDataRouter.js` into the `server` folder.
3. Add the import and `app.use` line in `server/server.js`.
4. Set the Supabase values in `server/.env`.
5. Run the SQL in Supabase.
6. Restart backend from `server`:
```bash
npm start
```
7. Run frontend from project root in another terminal:
```bash
npm run dev
```
8. Open `http://localhost:5173/admin`, log in using your existing admin credentials, and Refresh.

## Important
- Resend remains the source for email delivery metadata.
- CRM, projects and finance records are stored in Supabase and can sync across devices once the deployed app uses the same database.
- Payments are manually recorded; this does not connect to bank accounts or verify transfers.
- Keep `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `JWT_SECRET` server-side only. Use HTTPS and add login rate limiting before production.
