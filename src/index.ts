import { experimentSettingsJson } from "./experimentSettings.ts";
import { jsPsychExperiment } from "./jsPsychExperiment.ts";
import { $ExperimentResults, $Settings } from "./schemas.ts";

import type { Language } from "/runtime/v1/@opendatacapture/runtime-core";

import "/runtime/v1/jspsych@8.x/css/jspsych.css";

import { defineInstrument } from "/runtime/v1/@opendatacapture/runtime-core";
import { z } from "/runtime/v1/zod@3.23.x";

export default defineInstrument({
  kind: "INTERACTIVE",
  // if multilingual experimentSettingsJson needs a language field
  language: experimentSettingsJson.language as Language,
  internal: {
    edition: 1,
    name: "<PLACEHOLDER>",
  },
  tags: ["interactive", "jsPysch", "PLACEHOLDER"],
  content: {
    async render(done) {
      const settingsParseResult = $Settings.safeParse(experimentSettingsJson);

      // parse settings
      if (!settingsParseResult.success) {
        throw new Error("validation error, check experiment settings", {
          cause: settingsParseResult.error,
        });
      }

      await jsPsychExperiment(done);
    },
  },
  details: {
    description: "A jsPysch experiment developed by the DNP",
    estimatedDuration: 1,
    instructions: ["<PLACEHOLDER>"],
    // make sure license is correct
    license: "Apache-2.0",
    title: "<PLACEHOLDER>",
  },
  measures: {},
  validationSchema: z.object({
    version: z.string(),
    timestamp: z.string(),
    experimentResults: z.array($ExperimentResults),
  }),
});
