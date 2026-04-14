const fs = require('fs');

const contactUrl = process.env.CONTACT_URL;
const proposalUrl = process.env.PROPOSAL_URL;

const content = `export const environment = {
  production: true,
  contactUrl: '${contactUrl}',
  proposalUrl: '${proposalUrl}',
};\n`;

fs.mkdirSync('src/environments', { recursive: true });
fs.writeFileSync('src/environments/environment.ts', content);