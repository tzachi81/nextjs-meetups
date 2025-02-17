import { MongoClient, ServerApiVersion } from 'mongodb';

const dbUser = process.env?.DB_USER || 'defaultUser';
const dbPassword = process.env?.DB_PASSWORD || 'defaultUser';

const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.kw5y5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const client = await MongoClient.connect(dbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    ;
