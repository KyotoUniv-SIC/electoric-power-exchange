/* eslint-disable require-jsdoc */
import { config } from '../config';
import * as firestore from '@google-cloud/firestore';

export async function export_() {
  const client = new firestore.v1.FirestoreAdminClient();
  const projectID = config.service_account.project_id;
  const databaseName = client.databasePath(projectID, '(default)');
  const bucket = `gs://${projectID}-firestore`;

  return await client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: bucket,
      // Leave collectionIds empty to export all collections
      // or set to a list of collection IDs to export,
      // collectionIds: ['users', 'posts']
      collectionIds: [],
    })
    .then((responses: any[]) => {
      const response = responses[0];
      console.log(`Operation Name: ${response['name']}`);
      return response;
    })
    .catch((err: Error) => {
      console.error(err);
      throw new Error('Export operation failed');
    });
}
