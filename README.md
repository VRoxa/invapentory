# Invapentory

Online stock inventory for vapes.

## Setup

1. Install dependencies

```npm install```
```npm install -g netlify-cli```

2. Link repository to Netlify project

```netlify link```

3. Serve the application

```netlify dev```

## Update production Netlify blob manually

1. Create a `netlify/functions/sync-manually.mts` file with the following.

```typescript
import { getStore } from '@netlify/blobs';
import { readFileSync } from 'fs';

const STORE_NAME = 'invapentory';
const SEED_DATA_FILE = './seed_data.json';

async function uploadJson() {
  const store = getStore({
    name: STORE_NAME,
    siteID: '<your_project_ID>',
    token: '<your_personal_access_token>'
  });

  const rawData = readFileSync(SEED_DATA_FILE, 'utf8');
  const jsonData = JSON.parse(rawData);

  await store.setJSON(STORE_NAME, jsonData);
  console.info('JSON file successfully uploaded to Netlify Blobs!');
}

uploadJson().catch(console.error);
```

2. Find the site ID (or project ID) by running the `netlify status` command.

```bash
──────────────────────┐
 Current Netlify User │
──────────────────────┘
Name:  <User Name>
Email: <User Email>
Teams: 
  - ..
────────────────────┐
 Netlify Project Info  │
────────────────────┘
Current project: <Project_Name>
Admin URL:       <Project_Admin_URL>
Project URL:     <Project_URL>
Project Id:      <Project_ID> # this one
```

3. Generate a Personal Access Token in Netlify.
Go to your Netlify account settings under *User settings > Applications > Personal access tokens* and generate a new token.

4. Replace the site ID and Personal Access Token values in the script.

5. Modify the `seed_data.json` as needed.

5. Run `npx tsx netlify/functions/sync-manually.mts`.