INSERT INTO 'User' (login, password)
VALUES
  ('userone', 'passwordone'),
  ('usertwo', 'passwordtwo'),
  ('userthree', 'passwordthree'),
  ('userfour', 'passwordfour'),
  ('userfive', 'passwordfive')

INSERT INTO 'Chatroom' (name, owner)
VALUES
  ('general', (SELECT id FROM User WHERE login = 'userone')),
  ('random', (SELECT id FROM User WHERE login = 'userone')),
  ('resources', (SELECT id FROM User WHERE login = 'userone')),
  ('music', (SELECT id FROM User WHERE login = 'userone')),
  ('art', (SELECT id FROM User WHERE login = 'userone'));

INSERT INTO 'Messages' (author, chatroom, text, datetime)
VALUES
  ((SELECT id FROM User WHERE login = 'userone'), 1, 'This is general channel. Feel free to talk!', (SELECT NOW()::timestamp)),
  ((SELECT id FROM User WHERE login = 'userone'), 2, 'This is random channel. Feel free to talk!', (SELECT NOW()::timestamp)),
  ((SELECT id FROM User WHERE login = 'userone'), 3, 'This is resources channel. Feel free to talk!', (SELECT NOW()::timestamp)),
  ((SELECT id FROM User WHERE login = 'userone'), 4, 'This is music channel. Feel free to talk!', (SELECT NOW()::timestamp)),
  ((SELECT id FROM User WHERE login = 'userone'), 5, 'This is art channel. Feel free to talk!', (SELECT NOW()::timestamp));
