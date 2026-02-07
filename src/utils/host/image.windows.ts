import iconv from "iconv-lite";
import { spawn } from "child_process";

/** 執行 PowerShell 指令並回傳 stdout（字串），假設 windows 系統是繁體中文環境 (使用 big5 編碼輸出) */
function runPowerShell(command: string, stdinData?: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const inputEncodingSetup = `[Console]::InputEncoding = [System.Text.Encoding]::UTF8; `;
    const args = ["-NoProfile", "-NonInteractive", "-Command", `${inputEncodingSetup}${command}`];
    const ps = spawn("powershell.exe", args, { windowsHide: true });

    let stdout: Buffer[] = [];
    let stderr: Buffer[] = [];

    ps.stdout.on("data", (chunk) => stdout.push(chunk));
    ps.stderr.on("data", (data) => stderr.push(data));

    ps.on("close", (code) => {
      const stdoutStr = iconv.decode(Buffer.concat(stdout), "big5");
      const stderrStr = iconv.decode(Buffer.concat(stderr), "big5");

      if (code === 0) resolve(stdoutStr);
      else reject(new Error(`PowerShell exited with code ${code}. Stderr: ${stderrStr.trim()}`));
    });

    ps.on("error", (err) => {
      reject(err);
    });

    if (stdinData) {
      ps.stdin.end(stdinData, "utf-8");
    }
  });
}

const copyImagePowerShellScript = `
Add-Type -AssemblyName System.Convert
Add-Type -AssemblyName System.IO.MemoryStream
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$base64 = [Console]::In.ReadToEnd()
$bytes = [System.Convert]::FromBase64String($base64)
$ms = New-Object System.IO.MemoryStream($bytes, 0, $bytes.Length)
$img = [System.Drawing.Image]::FromStream($ms)
[System.Windows.Forms.Clipboard]::SetImage($img)
$img.Dispose()
$ms.Dispose()
`;

/**
 * 將圖片 Base64 字串複製到系統剪貼簿
 * @param base64 純 Base64 字串 (不含 data:image/... 前綴)
 */
export async function copyImageBinaryToSystem(base64: string): Promise<void> {
  await runPowerShell(copyImagePowerShellScript, base64);
}
