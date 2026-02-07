// 測試用函數 (直接在編輯器執行這個)
function testGetQuestions() {
  const e = {
    parameter: {
      action: "getQuestions",
      count: 3
    }
  };
  const result = doGet(e);
  Logger.log(result.getContent());
}

function doGet(e) {
  // 如果沒有 e (在編輯器直接執行)，回傳提示
  if (!e || !e.parameter) {
    return ContentService.createTextOutput("請使用 網路應用程式網址 (Web App URL) 呼叫，或執行 testGetQuestions 測試。");
  }

  const action = e.parameter.action;
  
  if (action === "getQuestions") {
    return getQuestions(e);
  }
  
  return ContentService.createTextOutput("Invalid Action");
}

function doPost(e) {
  let params;
  try {
    params = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: "Invalid JSON body: " + err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const action = e.parameter.action || params.action;
  
  if (action === "submitScore") {
    return submitScore(params);
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: false, error: "Invalid Action POST"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function getQuestions(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("題目");
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({error: "Sheet '題目' not found"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const data = sheet.getDataRange().getValues();
  // Remove header
  data.shift();
  
  // Shuffle and pick N
  const count = parseInt(e.parameter.count) || 10;
  const shuffled = data.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  const questions = selected.map(row => ({
    id: row[0],
    question: row[1],
    options: [row[2], row[3], row[4], row[5]],
    answer: row[6]
  }));
  
  return ContentService.createTextOutput(JSON.stringify(questions))
    .setMimeType(ContentService.MimeType.JSON);
}

function submitScore(params) {
  const id = params.id;
  const score = params.score;
  const passed = params.passed;
  
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // 增加容錯，檢查 "回答" 或 "答案" 工作表
  let sheet = spreadsheet.getSheetByName("回答");
  if (!sheet) sheet = spreadsheet.getSheetByName("答案");
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: "Sheet '回答' or '答案' not found"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString() == id.toString()) {
      rowIndex = i + 1;
      break;
    }
  }
  
  const timestamp = new Date();
  
  if (rowIndex === -1) {
    // 新使用者
    sheet.appendRow([
      id, 
      1, // 闖關次數
      score, // 總分
      score, // 最高分
      passed ? score : "", // 第一次通關分數
      passed ? 1 : "", // 花了幾次通關
      timestamp
    ]);
  } else {
    // 既有使用者
    const row = data[rowIndex - 1];
    const currentAttempts = (parseInt(row[1]) || 0) + 1;
    const hasCleared = row[4] !== ""; 
    
    sheet.getRange(rowIndex, 2).setValue(currentAttempts);
    sheet.getRange(rowIndex, 7).setValue(timestamp);

    if (!hasCleared) {
      const oldHighScore = parseFloat(row[3]) || 0;
      const currentHighScore = Math.max(oldHighScore, score);
      
      sheet.getRange(rowIndex, 3).setValue(score); 
      sheet.getRange(rowIndex, 4).setValue(currentHighScore);
      
      if (passed) {
        sheet.getRange(rowIndex, 5).setValue(score);
        sheet.getRange(rowIndex, 6).setValue(currentAttempts);
      }
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
