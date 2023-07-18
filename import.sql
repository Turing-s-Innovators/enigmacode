-- run psql as user 'postgres': psql -U postgres
-- to run file in psql: \i import.sql

drop table if exists reviews cascade;

create table reviews (
  id serial primary key,
  product_id int,
  rating int,
  date text,
  summary text,
  body text,
  recommend boolean,
  reported boolean default false,
  reviewer_name text,
  reviewer_email text,
  response text default 'null',
  helpfulness int
);

drop table if exists characteristics cascade;

create table characteristics (
  id serial primary key,
  product_id int,
  name text
);

drop table if exists characteristics_reviews cascade;

create table characteristics_reviews (
  id serial primary key,
  characteristic_id int,
  review_id int,
  value int
);

drop table if exists reviews_photos cascade;

create table reviews_photos (
  id serial primary key,
  review_id int,
  url text
);

\copy reviews from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/reviews.csv' delimiter ',' header csv;
\copy characteristics from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/characteristics.csv' delimiter ',' header csv;
\copy characteristics_reviews from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/characteristic_reviews.csv' delimiter ',' header csv;
\copy reviews_photos from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/reviews_photos.csv' delimiter ',' header csv;

-- -- https://stackoverflow.com/questions/244243/how-to-reset-postgres-primary-key-sequence-when-it-falls-out-of-sync
-- -- https://kevdees.com/how-to-reset-the-primary-key-sequence-id-in-postgresql/
SELECT setval(pg_get_serial_sequence('reviews', 'id'), COALESCE((SELECT MAX(id) + 1 FROM reviews), 1), false);
SELECT setval(pg_get_serial_sequence('characteristics', 'id'), COALESCE((SELECT MAX(id) + 1 FROM characteristics), 1), false);
SELECT setval(pg_get_serial_sequence('characteristics_reviews', 'id'), COALESCE((SELECT MAX(id) + 1 FROM characteristics_reviews), 1), false);
SELECT setval(pg_get_serial_sequence('reviews_photos', 'id'), COALESCE((SELECT MAX(id) + 1 FROM reviews_photos), 1), false);

-- CREATE INDEX review_product_id_index ON reviews (product_id, rating, recommend);
-- CREATE INDEX characteristics_product_id_index ON characteristics (product_id, name);
-- CREATE INDEX characteristics_characteristics_id_index ON characteristics_reviews (characteristic_id, value);
-- CREATE INDEX reviews_photos_review_id ON reviews_photos (review_id);