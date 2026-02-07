# Backend Setup Instructions

1.  **Google Sheet Setup**:
    -   Create a new Google Sheet.
    -   Rename the default sheet to `題目` (Questions).
        -   Headers: `ID`, `Question`, `OptionA`, `OptionB`, `OptionC`, `OptionD`, `Answer`
    -   Create a new sheet named `回答` (Answers).
        -   Headers: `ID`, `闖關次數`, `總分`, `最高分`, `第一次通關分數`, `花了幾次通關`, `最近遊玩時間`

2.  **Google Apps Script Setup**:
    -   Open the Google Sheet.
    -   Go to **Extensions** > **Apps Script**.
    -   Copy the content of `backend_script/Code.gs` from this project and paste it into the script editor.
    -   Save the project.

3.  **Deployment**:
    -   Click **Deploy** > **New deployment**.
    -   Select type: **Web app**.
    -   Description: "Pixel Quiz API".
    -   Execute as: **Me** (your Google account).
    -   Who has access: **Anyone** (allows the game to fetch data without login).
    -   Click **Deploy**.
    -   Copy the **Web App URL**.

4.  **Frontend Config**:
    -   Create a `.env` file in the `pixel_quiz_game` directory.
    -   Add `VITE_GOOGLE_SCRIPT_URL=YOUR_WEB_APP_URL`.
    -   Add `VITE_PASS_THRESHOLD=3` (or your desired number).
    -   Add `VITE_QUESTION_COUNT=5` (Number of questions per round).
