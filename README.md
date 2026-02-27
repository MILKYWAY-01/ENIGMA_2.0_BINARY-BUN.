# Cancer Sentinel

This project combines an Express backend with a Vite/React client. It uses PostgreSQL (e.g. Supabase) via Drizzle ORM and optionally integrates with OpenAI.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables**
   Copy `.env.example` to `.env` and edit the values to match your setup:
   ```bash
   cp .env.example .env
   # then edit .env with your Postgres URL and OpenAI key
   ```

   Required variables:
   - `DATABASE_URL` – PostgreSQL connection string (Supabase, local Postgres, etc.)
   - `AI_INTEGRATIONS_OPENAI_API_KEY` (or `OPENAI_API_KEY`) – your OpenAI key. Optional `AI_INTEGRATIONS_OPENAI_BASE_URL` if you use a non-default endpoint.

3. **Run the development server**
   ```bash
   # on Windows cmd.exe
   cmd /c "npx tsx server/index.ts"
   ```
   or simply:
   ```bash
   npm run dev
   ```
   (the "dev" script sets NODE_ENV=development automatically.)

   If you use PowerShell, you may need to prefix with `cmd /c` for `npx` to run.

4. **Open the app**
   Once the server logs `serving on port 5000`, visit:
   
   > http://localhost:5000

   The React frontend is served by Vite in development and proxies API requests to the Express backend.

## Notes

- `dotenv` is loaded at startup, so values from `.env` are available to both the server and Drizzle CLI.
- You can use `npm run build` to compile a production build, then `npm start` to run it.
- Migrations are managed with `drizzle-kit`; configure `DATABASE_URL` accordingly.

## Adding a Database

If you don't have Postgres yet, you can spin one up with Docker (on systems with Docker installed):

```bash
docker run --name cancer-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=cancer -p 5432:5432 -d postgres:15
```

Then set `DATABASE_URL="postgres://postgres:postgres@localhost:5432/cancer"` in your `.env`.


Happy coding!
