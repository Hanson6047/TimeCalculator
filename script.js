function calculateTimeDifference() {
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;

    if (!startTime || !endTime) {
        document.getElementById("result").innerText = "請輸入完整的時間！";
        return;
    }

    let start = new Date("1970-01-01T" + startTime + ":00");
    let end = new Date("1970-01-01T" + endTime + ":00");

    if (end < start) {
        end.setDate(end.getDate() + 1); // 處理跨天
    }

    let diffMs = end - start;
    let hours = Math.floor(diffMs / (1000 * 60 * 60));
    let minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    document.getElementById("result").innerText = `時間間隔：${hours} 小時 ${minutes} 分鐘 ${seconds} 秒`;
}
