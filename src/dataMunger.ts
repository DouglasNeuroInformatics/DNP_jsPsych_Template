/* eslint-disable perfectionist/sort-objects */
import DOMPurify from "dompurify";
import { DataCollection } from "jspsych";
export type ParticipantResponse = {
  notes: string;
  result: string;
};

export type Trial = {
  trialType: string;
};

export type LoggingTrial = {
  correctResponse: string;
  difficultyLevel: string;
  language: string;
  response: ParticipantResponse;
  rt: number;
  stimulus: string;
} & Trial;

type ExperimentResults = {
  responseNotes: string;
  responseResult: string;
} & Omit<LoggingTrial, "response" | "trialType">;

function dataMunger(data: DataCollection) {
  const trials = data
    .filter({ trial_type: "survey-html-form" })
    .values() as LoggingTrial[];
  const experimentResults: ExperimentResults[] = [];
  for (let trial of trials) {
    experimentResults.push({
      stimulus: trial.stimulus,
      correctResponse: trial.correctResponse,
      difficultyLevel: trial.difficultyLevel,
      language: trial.language,
      rt: trial.rt,
      responseResult: trial.response.result,
      responseNotes: DOMPurify.sanitize(trial.response.notes),
    });
  }
  return experimentResults;
}

function arrayToCSV(array: ExperimentResults[]) {
  const header = Object.keys(array[0]!).join(",");
  const trials = array
    .map((trial) => Object.values(trial).join(","))
    .join("\n");
  return `${header}\n${trials}`;
}

function downloadCSV(dataForCSV: string, filename: string) {
  const blob = new Blob([dataForCSV], { type: "text/csv;charset=utf8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function getLocalTime() {
  const localTime = new Date();

  const year = localTime.getFullYear();
  // months start at 0 so add 1
  const month = String(localTime.getMonth() + 1).padStart(2, "0");
  const day = String(localTime.getDate()).padStart(2, "0");
  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");
  const seconds = String(localTime.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}
export function transformAndDownload(data: DataCollection) {
  const mungedData = dataMunger(data);
  const dataForCSV = arrayToCSV(mungedData);
  const currentDate = getLocalTime();
  downloadCSV(dataForCSV, `${currentDate}.csv`);
}
