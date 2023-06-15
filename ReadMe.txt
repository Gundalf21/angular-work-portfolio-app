Aplicația este construită folosind Angular, ExpressJS, NodeJS si MySQL prin intermediul Sequelize(SQLLite).
Am folosit Express și Node pentru a crea un mic API ce este folosit de aplicația de Angular.

Baza de date se numeste "works" iar tabelul: "work" și conține următoarele rânduri:
-id(PK-int)
-workName(VARCHAR) - câmpul reprezintă numele dat de utilizator unei lucrări ce va a fi adăugată de către acesta in portofoliu.
-clientName(VARCHAR) - acesta este numele clientului pentru care a fost realizată lucrarea.
-description(TEXT) - descrierea lucrării sub format text
-image(TEXT) - imaginea încărcată de utilizator pentru prezentarea lucrării. Aceasta este converită in base64 și stocată sub formă de text.

user-ul și parola pentru autentificarea în mysql sunt ambele: "root".