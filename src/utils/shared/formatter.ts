/**
 * 將 Date 物件格式化為 "DD MMM YYYY HH:MM" 的固定長度字串。(例如: 18 Nov 2025 22:49)
 */
function formatDateTime(dateObj: Date): string {
  const day = dateObj.getDate().toString().padStart(2, "0"); // 日 (DD, 兩位數)
  const year = dateObj.getFullYear(); // 年 (YYYY, 四位數)

  const hour = dateObj.getHours().toString().padStart(2, "0"); // 時 (HH, 兩位數)
  const minute = dateObj.getMinutes().toString().padStart(2, "0"); // 分 (MM, 兩位數)

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[dateObj.getMonth()]; // (MMM)

  const formattedString = `${day} ${month} ${year} ${hour}:${minute}`;
  return formattedString;
}

/**
 * 格式化檔案大小為易讀字串
 */
function formatFileSize(size: number): string {
  const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
  let unitIndex = 0;
  let value = size;

  // 數值大於 999.995 時， toFixed(2) 會進位成 1000.00，導致長度不符預期，因此改用此方式處理
  while (value >= 999.9 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  const formattedValue = value.toFixed(2).padStart(6, " ");
  const formattedUnit = units[unitIndex].padEnd(3, " ");

  return `${formattedValue} ${formattedUnit}`;
}

export { formatDateTime, formatFileSize };
