# Firebase to Supabase Migration Plan

## Status: COMPLETED ✅

## Steps Completed:
- [x] 1. Update package.json - Add @supabase/supabase-js dependency
- [x] 2. Create supabase-applet-config.json - Store Supabase configuration
- [x] 3. Create src/supabase.ts - Supabase client with Firestore-compatible API
- [x] 4. Update src/contexts/AuthContext.tsx for Supabase auth
- [x] 5. Update src/App.tsx for Supabase database operations

## Supabase Configuration Required:
Edit `supabase-applet-config.json` and add your credentials:
```json
{
  "supabaseUrl": "YOUR_SUPABASE_URL",
  "supabaseAnonKey": "YOUR_SUPABASE_ANON_KEY"
}
```

## Next Steps:
1. Fill in your Supabase credentials in `supabase-applet-config.json`
2. Run `npm install` to ensure dependencies are installed
3. Create the required tables in Supabase:
   - `chats` table with columns: id, userId, title, engine, folder, messages, thumbnail, updatedAt, createdAt
   - `users` table with columns: uid, email, displayName, photoURL, createdAt, role
4. Enable Row Level Security (RLS) policies on these tables

## Files Modified:
- `package.json` - Replaced firebase with @supabase/supabase-js
- `supabase-applet-config.json` - New Supabase config file
- `src/supabase.ts` - New Supabase client (replaces firebase.ts)
- `src/contexts/AuthContext.tsx` - Updated for Supabase auth
- `src/App.tsx` - Updated for Supabase database operations

