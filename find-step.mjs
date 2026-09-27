import fs from 'node:fs';
import readline from 'node:readline';

async function run() {
  const fileStream = fs.createReadStream('C:/Users/viman/.gemini/antigravity/brain/ae73e42e-440a-4e5d-b213-e3fb72ee678e/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.step_index === 16918 || (obj.step_index >= 16988 && obj.step_index <= 17050)) {
        if (obj.type === 'PLANNER_RESPONSE' && obj.content) {
          console.log(`=== STEP ${obj.step_index} (${obj.type}) ===`);
          console.log(obj.content);
          console.log('\n----------------------------------------\n');
        }
      }
    } catch (e) {}
  }
}

run();
