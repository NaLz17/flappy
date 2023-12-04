create TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(70) NOT NULL,
    score INTEGER,
    skin integer DEFAULT 1,
    sound boolean DEFAULT true,
    adminlvl integer DEFAULT 0,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_adminlvl_check CHECK (adminlvl = ANY (ARRAY[0, 1, 2]))
)