use employees; 

INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Legal'),
    ('Finance');


INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1),
    ('Sales Person', 50000, 1),
    ('IT Manager', 100000, 2),
    ('Engineer', 60000, 2),
    ('Lead Attourney', 200000, 3),
    ('Attourney', 150000, 3),
    ('Lead Accountant', 200000, 4),
    ('Accountant', 90000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Leslie', 'Knope', 1, null),
  ('Donna', 'Meagle', 2,  1),
  ('Ann', 'Perkins', 2,  1),
  ('Tammy', 'Two', 3, null),
  ('Tom', 'Haverford', 4, 3),
  ('Mona-Lisa', 'Saperstein', 4, 3),
  ('Jerry Terry', 'Larry Gary Gergitch', 5, null),
  ('Jean-Ralphio', 'Saperstein', 6, 5),
  ('Bobby', 'Newport', 6, 5),
  ('Benjamin', 'Wyatt', 7, null),
  ('Andy', 'Dwyer', 8, 7),
  ('Perd', 'Hapley', 8, 7);
