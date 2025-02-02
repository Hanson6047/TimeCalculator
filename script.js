document.getElementById("timeFormatSwitch").addEventListener("change", function() {
    let is12Hour = this.checked;
    document.getElementById("timeFormatLabel").innerText = is12Hour ? "12 小時制" : "24 小時制";

    let maxHour = is12Hour ? 12 : 23;

    document.getElementById("startHour").max = maxHour;
    document.getElementById("endHour").max = maxHour;
});

// 取得所有輸入框
const inputs = [
    document.getElementById("startHour"),
    document.getElementById("startMinute"),
    document.getElementById("endHour"),
    document.getElementById("endMinute")
];

// 監聽每個輸入框的 keydown 事件
inputs.forEach((input, index) => {
    input.addEventListener("keydown", function(event) {
        // 如果按下 Enter，跳到下一個輸入框
        if (event.key === "Enter") {
            event.preventDefault(); // 防止預設的 Enter 行為
            moveToNextInput(index);
        }
    });

    // 監聽 input 事件（當使用者輸入時）
    input.addEventListener("input", function(event) {
        let value = input.value;

        // 如果使用者用滑鼠點選輸入，標記 isManualInput 為 true
        if (event.inputType === "insertFromPaste" || event.inputType === "insertText") {
            input.dataset.isManualInput = "true";
        }

        // 如果輸入 2 位數且是鍵盤輸入，則自動跳到下一格
        if (value.length === 2 && input.dataset.isManualInput === "true") {
            moveToNextInput(index);
        }
    });

    ///////////////////////////////////////////////////////////////////////////////
    // 當使用者點擊輸入框時，標記為手動輸入 //需要檢查功能是否正常
    input.addEventListener("focus", function() {
        input.dataset.isManualInput = "false";
    });
    ///////////////////////////////////////////////////////////////////////////////
});

// 跳到下一個輸入框的函式
function moveToNextInput(currentIndex) {
    if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
    }
}

// 計算時間差
function calculateTimeDifference() {
    let is12Hour = document.getElementById("timeFormatSwitch").checked;

    let startHour = parseInt(document.getElementById("startHour").value);
    let startMinute = parseInt(document.getElementById("startMinute").value);
    let endHour = parseInt(document.getElementById("endHour").value);
    let endMinute = parseInt(document.getElementById("endMinute").value);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
        document.getElementById("result").innerText = "請輸入完整的時間！";
        return;
    }

    // 12 小時制檢查
    if (is12Hour) {
        if (startHour > 12 || endHour > 12) {
            document.getElementById("result").innerText = "12 小時制的時數應為 1-12！";
            return;
        }
    } else {
        if (startHour > 23 || endHour > 23) {
            document.getElementById("result").innerText = "24 小時制的時數應為 0-23！";
            return;
        }
    }

    let startTotalMinutes = (is12Hour && startHour === 12 ? 0 : startHour) * 60 + startMinute;
    let endTotalMinutes = (is12Hour && endHour === 12 ? 0 : endHour) * 60 + endMinute;

    // 處理跨天情況
    if (endTotalMinutes < startTotalMinutes) {
        endTotalMinutes += 24 * 60;
    }

    let diffMinutes = endTotalMinutes - startTotalMinutes;
    let hours = Math.floor(diffMinutes / 60);
    let minutes = diffMinutes % 60;

    document.getElementById("result").innerText = `時間間隔：${hours} 小時 ${minutes} 分鐘`;
}
