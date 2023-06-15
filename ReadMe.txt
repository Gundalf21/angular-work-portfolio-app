This is an app for managing/showcasing a work portfolio and uses the following technologies:
-Angular;
-ExpressJS;
-NodeJS;
-MySQL using Sequelize(SQLLite).

Express & Node were used for creating a small API to be used by the Angular app.

The database is called "works" which contains the "work" table which contains the rows:
-id(PK-int);
-workName(VARCHAR);
-clientName(VARCHAR);
-description(TEXT);
-image(TEXT) - the image representing a screenshot of the user's work. It is converted to base64 and stored in a text format.

[IMPORTANT]
"worker-portfolio-app" is the Angular app while "worker-portfolio-node-express-sequelize-mysql" is the API created for the app.
The user/password for MySQL authentication - "root".
