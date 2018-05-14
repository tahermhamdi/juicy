DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    url VARCHAR(300) NOT NULL,
    description TEXT,
    hashtags TEXT,
    keywords TEXT,
    articles TEXT,
    videourl VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO criteria (relevancelevel,articlesnumber) VALUES (80,3);
INSERT INTO images (title,url,description,tags,keywords,articles) VALUES ('Basquiat Skull 1','https://s3.amazonaws.com/spicedling/taher/7IUaWlStxqyn8jEl15oo495DyWJGmxB3.jpg','Skull by Basquiat','#basquiat #skull #expressionism','art painting abstract','article about basqquiat');
INSERT INTO images (title,url,description,tags,keywords,articles) VALUES ('Basquiat Skull 2','https://s3.amazonaws.com/spicedling/taher/7IUaWlStxqyn8jEl15oo495DyWJGmxB3.jpg','Skull by Basquiat','#basquiat #skull #expressionism','art painting abstract','article about basqquiat');
INSERT INTO images (title,url,description,tags,keywords,articles) VALUES ('Basquiat Skull 3','https://s3.amazonaws.com/spicedling/taher/7IUaWlStxqyn8jEl15oo495DyWJGmxB3.jpg','Skull by Basquiat','#basquiat #skull #expressionism','art painting abstract','article about basqquiat');
INSERT INTO images (title,url,description,tags,keywords,articles) VALUES ('Basquiat Skull 4','https://s3.amazonaws.com/spicedling/taher/7IUaWlStxqyn8jEl15oo495DyWJGmxB3.jpg','Skull by Basquiat','#basquiat #skull #expressionism','art painting abstract','article about basqquiat');
