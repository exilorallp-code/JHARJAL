/*
# Create waitlist_signups table

1. New Tables
- `waitlist_signups`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) - the visitor's email address
  - `created_at` (timestamptz, defaults to now)

2. Security
- Enable RLS on `waitlist_signups`.
- Grant INSERT only to `anon` and `authenticated`, so visitors can join the list but cannot read other emails.
- INSERT policy allows anon and authenticated writes. No SELECT, UPDATE, or DELETE is granted, so the list stays private.

3. Notes
- The unique constraint on email prevents duplicate signups.
- Email format is validated in the app before submitting.
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON waitlist_signups TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_waitlist_signups" ON waitlist_signups;
CREATE POLICY "anon_insert_waitlist_signups" ON waitlist_signups FOR INSERT
TO anon, authenticated
WITH CHECK (true);
