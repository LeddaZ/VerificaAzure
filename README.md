# Azure Image Recognition

Takes a list of languages and image URLs and returns tags and description for each image in the specified languages, adding them to a MongoDB database.

## How to run this

Make sure you have [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed. You'll also need the Translator and Computer Vision services on your [Azure](https://portal.azure.com) account.

This has been tested on Node 20 LTS.

```
git clone https://github.com/LeddaZ/VerificaAzure
cd VerificaAzure
# Rename .env.example to .env and fill in the MongoDB
# connection string, port, and Azure keys and endpoints
# for the Translator and Computer Vision services;
# If you're deploying the app in production, set
# NODE_ENV=production to disable Mongoose debugging
npm i
npm run dev
```
