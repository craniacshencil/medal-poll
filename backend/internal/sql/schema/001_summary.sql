-- +goose Up
CREATE TABLE summary (
  username TEXT PRIMARY KEY,
  password TEXT UNIQUE NOT NULL,
  responded BOOLEAN DEFAULT false,
  gold TEXT DEFAULT NULL,
  silver TEXT DEFAULT NULL,
  bronze TEXT DEFAULT NULL
);

-- +goose Down 
DROP TABLE summary;
