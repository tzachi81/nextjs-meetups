import { MongoClient, ServerApiVersion } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const dbUser = process.env?.DB_USER || 'defaultUser';
const dbPassword = process.env?.DB_PASSWORD || 'defaultUser';

const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.kw5y5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const handler = async (request: NextApiRequest, response: NextApiResponse) => {

  if (request.method === 'POST') {
    const data = request.body; // new meetup details sent from add new meetup form

    const client = await MongoClient.connect(dbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });

    const db = client.db('meetups');

    const meetupsCollection = db.collection('meetups');

    await meetupsCollection.insertOne({ data })
      .then(result => {
        response.status(201).json({ message: 'Meetup was created in the Data-Base', details: data });
      })
      .catch((error: Error) => {
        console.error(error.message);
        response.status(500).json({ message: `Failed to create meetup ${data.title}` })
      }
      );

    client.close();

  }
}

export default handler;