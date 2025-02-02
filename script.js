document.getElementById("timeFormatSwitch").addEventListener("change", function() {
    let is12Hour = this.checked;
    document.getElementById("timeFormatLabel").innerText = is12Hour ? "12 小時制" : "24 小時制";

    let maxHour = is12Hour ? 12 : 23;

    document.getElementById("startHour").max = maxHour;
    document.getElementById("endHour").max = maxHour;
});

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

    if (endTotalMinutes < startTotalMinutes) {
        endTotalMinutes += 24 * 60; // 跨天處理
    }

    let diffMinutes = endTotalMinutes - startTotalMinutes;
    let hours = Math.floor(diffMinutes / 60);
    let minutes = diffMinutes % 60;

    document.getElementById("result").innerText = `時間間隔：${hours} 小時 ${minutes} 分鐘`;
}
