CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     username TEXT UNIQUE NOT NULL,
                                     password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
                                         "sid" varchar NOT NULL COLLATE "default",
                                         "sess" json NOT NULL,
                                         "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
CREATE INDEX "IDX_session_expire" ON "session" ("expire");
