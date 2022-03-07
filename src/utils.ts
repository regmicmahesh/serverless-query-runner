export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value) {
    return value;
  }
  if (defaultValue) {
    return defaultValue;
  }
  throw new Error(`Environment variable ${key} is not set`);
};

export class Message {
  constructor(
    public messageType: "success" | "danger",
    public message: string
  ) {}
}
