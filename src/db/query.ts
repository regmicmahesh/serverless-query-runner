import { Client, QueryResult } from "pg";
import { getEnv } from "../utils";

export const runQuery = async (query: string): Promise<QueryResult> => {
  const connStr = getEnv("PSQL_CONNSTR");
  try {
    const client = new Client(connStr);
    await client.connect();
    const res = await client.query({
      text: query,
      rowMode: "array",
    });
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
