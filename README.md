
# Todo_App

## Übersicht

Dies ist eine Todo-Anwendung, die mit Node.js, Express.js und Vanilla JavaScript entwickelt wurde. Es verfügt über eine intuitive Benutzeroberfläche und grundlegende Funktionen zum Hinzufügen und Bearbeiten von Aufgaben. Das Projekt verwendet das MVC (Model-View-Controller) Muster, um eine klare Trennung zwischen Datenmodell, Benutzeroberfläche und Anwendungslogik zu gewährleisten.

## Funktionen

*   **Aufgabenverwaltung**: Aufgaben hinzufügen, bearbeiten, löschen.
    
*   **Persistente Speicherung**: Aufgaben werden in einer MongoDB-Datenbank gespeichert.
    
*   **Benutzerauthentifizierung**: Sicheres Einloggen und Registrieren (noch zu implementieren).

## Verwendete Technologie

*   **Frontend**: HTML, CSS, JS

*   **Backend**: Node.js, Express
    
*   **Datenbank**: MongoDB
    
*   **Abhängigkeiten**:
    
    *   Express: ^4.17.1
        
    *   Mongoose: ^5.9.7


## Projektstruktur

```
Todo_App/
├── .babelrc                # Babel Konfiguration
├── .eslintrc.json          # ESLint Konfiguration
├── .gitignore              # Git Ignore-Datei
├── .prettierignore         # Prettier Ignore-Datei
├── .prettierrc.json        # Prettier Konfiguration
├── .stylelintrc.json       # Stylelint Konfiguration
├── index.js                # Einstiegspunkt für den Backend-Server
├── jest.config.js          # Jest Konfiguration
├── package-lock.json       # Lock-Datei für npm-Abhängigkeiten
├── package.json            # Projektabhängigkeiten und Skripte
├── project_structure.txt   # Beschreibung der Projektstruktur
├── README.md               # Projektdokumentation
└── source/                 * Enthält den gesamten Quellcode der Anwendung.
    ├── controllers/        # Enthält die Routen-Handler für Aufgaben
    │   └── todoController.js
    ├── models/             # Enthält das Task-Modell für MongoDB
    │   └── todoModel.js    
    ├── public/             # Enthält statische Assets
    │   ├── index.html      # Haupt-HTML-Datei
    │   ├── scripts/        # Enthält JavaScript-Dateien
    │   │   ├── index.js    # Einstiegspunkt für das Frontend
    │   │   ├── controllers/           # Enthält die Frontend-Controller
    │   │   │   └── TodoController.js  
    │   │   ├── models/                # Enthält die Frontend-Modelle
    │   │   │   └── TodoModel.js       
    │   │   ├── services/              # Enthält Dienste zur Kommunikation mit dem Backend
    │   │   │   └── todoService.js     
    │   │   └── views/                 # Enthält die Views für das Frontend
    │   │       ├── TodoDetailView.js  
    │   │       └── TodoView.js        
    │   └── styles/                    # Enthält CSS-Dateien
    │       └── index.css              
    ├── routes/             # Enthält die Routen für die Anwendung  
    │   └── todoRoutes.js   
    └── tests/              # Enthält Testdateien
        └── todo.test.js    
```
## Installationsanleitung

1. Repository klonen:
    ```bash
    git clone https://github.com/mustafa0cihan/Todo_App.git
    ```

2. Abhängigkeiten installieren:
    ```bash
    cd Todo_App
    npm install
    ```

3. Entwicklungsserver starten:
    ```bash
    npm run dev
    ```

## Skripte

- `start`: Startet den Produktionsserver
- `dev`: Startet den Entwicklungsserver mit Nodemon
- `test`: Führt die Tests mit Jest aus
- `stylelint`: Prüft CSS-Dateien mit Stylelint
- `eslint`: Prüft JavaScript-Dateien mit ESLint
- `all`: Führt Stylelint, ESLint aus und zeigt eine Abschlussnachricht

## Nutzung

1.  Starten Sie MongoDB.
2.  Starten Sie den Backend-Server:
    ```bash
    npm run dev
    ```
3.  Öffnen Sie Ihren Browser und navigieren Sie zu http://localhost:3000, um die Anwendung zu verwenden.

## Tests

Die Tests werden mit Jest durchgeführt. Um die Tests auszuführen, verwenden Sie:

```bash
npm run test
```

Die Testdateien befinden sich im Verzeichnis `source/tests/`.

## Projektstruktur im Detail

- **`.babelrc`**: Babel Konfigurationsdatei für die Transpilierung von ES6+ Code.
- **`.eslintrc.json`**: Konfigurationsdatei für ESLint zur Sicherstellung der Codequalität.
- **`.gitignore`**: Dateien und Verzeichnisse, die von Git ignoriert werden sollen.
- **`.prettierignore`**: Dateien und Verzeichnisse, die von Prettier ignoriert werden sollen.
- **`.prettierrc.json`**: Konfigurationsdatei für Prettier zur Formatierung des Codes.
- **`.stylelintrc.json`**: Konfigurationsdatei für Stylelint zur Sicherstellung der CSS-Qualität.
- **`index.js`**: Einstiegspunkt für den Backend-Server.
- **`jest.config.js`**: Konfigurationsdatei für Jest.
- **`package-lock.json`**: Lock-Datei für npm-Abhängigkeiten.
- **`package.json`**: Enthält Projektabhängigkeiten und Skripte.
- **`project_structure.txt`**: Beschreibung der Projektstruktur.
- **`README.md`**: Projektdokumentation.
- **`source/`**: Enthält den gesamten Quellcode der Anwendung.
    - **`controllers/`**: Enthält die Routen-Handler für Aufgaben (Controller).
    - **`models/`**: Enthält das Task-Modell für MongoDB (Model).
    - **`public/`**: Enthält statische Assets.
        - **`index.html`**: Haupt-HTML-Datei.
        - **`scripts/`**: Enthält JavaScript-Dateien.
            - **`index.js`**: Einstiegspunkt für das Frontend.
            - **`controllers/`**: Enthält die Frontend-Controller.
            - **`models/`**: Enthält die Frontend-Modelle.
            - **`services/`**: Enthält Dienste zur Kommunikation mit dem Backend.
            - **`views/`**: Enthält die Views für das Frontend.
        - **`styles/`**: Enthält CSS-Dateien.
    - **`routes/`**: Enthält die Routen für die Anwendung.
    - **`tests/`**: Enthält Testdateien.

## Kontakt

- **Name**: Mustafa Cihan
- **GitHub**: [mustafa0cihan](https://github.com/mustafa0cihan)

Viel Spaß beim Entwickeln!
