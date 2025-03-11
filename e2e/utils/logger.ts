import * as fs from "fs";
import * as path from "path";

// Shared state for test file name
let currentTestFileName: string = "default";
let logFileName: string | null = null;

// Define the logs directory at the project root
// const logDir = path.resolve(__dirname, "../../logs");
//
// // Create the logs directory if it doesn't exist
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

const logDir = path.resolve(__dirname, "../../logs");

console.log("Resolved log directory path:", logDir); // Debugging step

try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Ensure parent directories exist
    console.log("✅ Log directory created:", logDir);
  } else {
    console.log("ℹ️ Log directory already exists:", logDir);
  }
} catch (error) {
  console.error("❌ Error creating log directory:", error);
}

// Function to generate a timestamp
const getTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

// Set the initial log file name
const initializeLogFile = () => {
  if (currentTestFileName === "default") {
    return;
  }
  const timestamp = getTimestamp();
  const baseName = path.basename(
    currentTestFileName,
    path.extname(currentTestFileName),
  );
  logFileName = path.join(logDir, `${baseName}_${timestamp}.log`);
};

// Function to write a message to the log file
const writeLogSync = (message: string) => {
  try {
    if (!logFileName) initializeLogFile(); // Initialize if not yet done
    if (logFileName) fs.appendFileSync(logFileName, message + "\n");
  } catch (err) {
    console.error("Failed to write log to file:", err);
  }
};

// Override console.log to also write to the log file and console terminal
const originalConsoleLog = console.log;
console.log = (...args: any[]) => {
  const message = args
    .map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
    .join(" ");
  originalConsoleLog.apply(console, args); // Print to console
  writeLogSync(message); // Write to log file
};

// Function to set the current test file name
export const setTestFileName = (fileName: string) => {
  currentTestFileName = fileName;
  logFileName = null; // Reset log file name to ensure initialization with new test file name
};

// Function to log step with a timestamp
export const logStep = async <T>(
  stepName: string,
  stepFunction: () => Promise<T>,
): Promise<T> => {
  const timestamp = new Date().toISOString();
  try {
    const result = await stepFunction();
    console.log(`STEP: ${stepName} succeeded at ${timestamp}`);
    return result;
  } catch (error) {
    console.log(`STEP: ${stepName} failed at ${timestamp}`);
    throw error;
  }
};

// Function to log test start
export const logTestStart = async (testName: string) => {
  const testStartTime = new Date();
  console.log(
    `\nTest: ${testName} started at ${testStartTime.toISOString()}\n`,
  );
};

// Function to log test end
export const logTestEnd = async (testName: string) => {
  const testEndTime = new Date();
  console.log(`Test: ${testName} ended at ${testEndTime.toISOString()}`);
};

// Function to generate HTML report from log file
const generateHtmlReport = (logFileName: string) => {
  if (!logFileName) {
    console.error("Log file name is not set.");
    return;
  }

  const logData = fs.readFileSync(logFileName, "utf-8");
  const logEntries = logData.split("\n").filter((entry) => entry.trim() !== "");

  const stepSucceededCount = logEntries.filter((entry) =>
    entry.includes("succeeded"),
  ).length;
  const stepFailedCount = logEntries.filter((entry) =>
    entry.includes("failed"),
  ).length;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${currentTestFileName} Report</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f0f2f5;
                margin: 0;
                padding: 0;
            }
            .report-container {
                border: 2px solid #ddd;
                padding: 20px;
                margin: 20px auto;
                max-width: 900px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            .chart-container {
                width: 40%; /* Reduced width for smaller chart */
                margin: 0 auto 20px;
                padding: 10px;
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .log-container {
                margin-top: 20px;
            }
            .log-entry {
                margin-bottom: 10px;
                padding: 15px;
                border-radius: 6px;
                background-color: #fafafa;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s;
            }
            .log-entry:hover {
                background-color: #f0f0f0;
            }
            .step {
                font-weight: bold;
                color: #333;
            }
            .time {
                font-size: 0.85em;
                color: #888;
                float: right;
            }
            .log-entry.start {
                border-left: 5px solid #d4edda;
            }
            .log-entry.end {
                border-left: 5px solid #f8d7da;
            }
            .log-entry.pass {
                border-left: 5px solid #d1ecf1;
            }
            .log-entry.fail {
                border-left: 5px solid #f5c6cb;
            }
        </style>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body>
        <div class="report-container">
            <h1>${currentTestFileName} Report</h1>
            <div class="chart-container">
                <canvas id="stepChart"></canvas>
            </div>
            <div class="log-container">
                ${logEntries
                  .map((entry) => {
                    const entryClass = entry.includes("started")
                      ? "start"
                      : entry.includes("ended")
                        ? "end"
                        : entry.includes("succeeded")
                          ? "pass"
                          : entry.includes("failed")
                            ? "fail"
                            : "";
                    return `
                    <div class="log-entry ${entryClass}">
                        <div class="step">${entry}</div>
                        <div class="time">${new Date().toLocaleTimeString()}</div>
                    </div>`;
                  })
                  .join("")}
            </div>
        </div>
        <script>
            const ctx = document.getElementById('stepChart').getContext('2d');
            const stepChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Succeeded', 'Failed'],
                    datasets: [{
                        label: 'Step Status',
                        data: [${stepSucceededCount}, ${stepFailedCount}],
                        backgroundColor: ['#28a745', '#dc3545'], // Green for pass, Red for fail
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Test Steps Status'
                        }
                    }
                },
            });
        </script>
    </body>
    </html>
    `;

  const htmlReportFile = logFileName.replace(".log", ".html");
  fs.writeFileSync(htmlReportFile, htmlContent);
  console.log(`HTML report generated: ${htmlReportFile}`);
};

// Function to finalize the log file
export const finalizeLogFile = () => {
  if (logFileName) {
    logTestEnd(currentTestFileName);
    generateHtmlReport(logFileName); // Pass logFileName as argument
  }
};
