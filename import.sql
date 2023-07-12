-- run psql as user 'postgres': psql -U postgres
-- to run file in psql: \i import.sql

drop table if exists reviews;

create table reviews (
  id serial primary key,
  product_id int,
  rating int,
  date text,
  summary text,
  body text,
  recommend boolean,
  reported boolean,
  reviewer_name text,
  reviewer_email text,
  response text,
  helpfulness int
);

drop table if exists characteristics;

create table characteristics (
  id serial primary key,
  product_id int,
  name text
);

drop table if exists characteristics_reviews;

create table characteristics_reviews (
  id serial primary key,
  characteristic_id int,
  review_id int,
  value int
);

drop table if exists reviews_photos;

create table reviews_photos (
  id serial primary key,
  review_id int,
  url text
);

\copy reviews from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/reviews.csv' delimiter ',' header csv;

\copy characteristics from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/characteristics.csv' delimiter ',' header csv;

\copy characteristics_reviews from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/characteristic_reviews.csv' delimiter ',' header csv;

\copy reviews_photos from '/Users/brendanlaw/hrsei/sdc/enigmacode/data/reviews_photos.csv' delimiter ',' header csv;