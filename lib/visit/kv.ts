type KvArg = string | number;

interface KvCommandResponse<T = unknown> {
  result?: T;
  error?: string;
}

interface KvCommandOptions {
  silent?: boolean;
}

const KV_URL = process.env.KV_REST_API_URL?.trim();
const KV_TOKEN = process.env.KV_REST_API_TOKEN?.trim();

function kvConfigured(): boolean {
  return Boolean(KV_URL && KV_TOKEN);
}

function kvEndpoint(): string | undefined {
  if (!KV_URL) {
    return undefined;
  }
  return KV_URL.endsWith("/") ? KV_URL : `${KV_URL}/`;
}

export function isKvConfigured(): boolean {
  return kvConfigured();
}

export async function runKvCommand<T>(
  command: KvArg[],
  options: KvCommandOptions = {},
): Promise<T | undefined> {
  if (!kvConfigured()) {
    if (!options.silent) {
      console.warn("[visit-notify] KV is not configured (KV_REST_API_URL / KV_REST_API_TOKEN)");
    }
    return undefined;
  }

  const endpoint = kvEndpoint();
  if (!endpoint) {
    if (!options.silent) {
      console.warn("[visit-notify] KV endpoint is unavailable");
    }
    return undefined;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });

    if (!response.ok) {
      if (!options.silent) {
        console.warn("[visit-notify] KV command failed", {
          status: response.status,
          command: command[0],
        });
      }
      return undefined;
    }

    const payload = (await response.json()) as KvCommandResponse<T>;
    if (payload.error) {
      if (!options.silent) {
        console.warn("[visit-notify] KV command returned error", {
          command: command[0],
          error: payload.error,
        });
      }
      return undefined;
    }

    return payload.result;
  } catch (error) {
    if (!options.silent) {
      const message = error instanceof Error ? error.message : "unknown error";
      console.warn("[visit-notify] KV request failed", {
        command: command[0],
        message,
      });
    }
    return undefined;
  }
}

export async function getKvString(key: string): Promise<string | undefined> {
  const result = await runKvCommand<string | null>(["GET", key], { silent: true });
  return typeof result === "string" ? result : undefined;
}

export async function setKvString(key: string, value: string, ttlSeconds: number): Promise<boolean> {
  const ttl = Math.max(60, Math.floor(ttlSeconds));
  const result = await runKvCommand<string>(["SET", key, value, "EX", ttl]);
  return result === "OK";
}

export async function getKvJson<T>(key: string): Promise<T | undefined> {
  const raw = await getKvString(key);
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    console.warn("[visit-notify] KV JSON parse failed", { key });
    return undefined;
  }
}

export async function setKvJson(key: string, value: unknown, ttlSeconds: number): Promise<boolean> {
  return setKvString(key, JSON.stringify(value), ttlSeconds);
}

export async function deleteKvKey(key: string): Promise<boolean> {
  const result = await runKvCommand<number>(["DEL", key], { silent: true });
  return typeof result === "number" && result > 0;
}

export async function kvKeyExists(key: string): Promise<boolean> {
  const result = await runKvCommand<number>(["EXISTS", key], { silent: true });
  return result === 1;
}

export async function zaddKv(key: string, score: number, member: string): Promise<boolean> {
  const safeScore = Number.isFinite(score) ? Math.trunc(score) : Date.now();
  const result = await runKvCommand<number>(["ZADD", key, safeScore, member]);
  return typeof result === "number";
}

export async function zremKv(key: string, member: string): Promise<boolean> {
  const result = await runKvCommand<number>(["ZREM", key, member], { silent: true });
  return typeof result === "number" && result >= 0;
}

export async function zrangeByScoreKv(
  key: string,
  minScoreInclusive: number,
  maxScoreInclusive: number,
  limit: number,
): Promise<string[]> {
  const safeLimit = Math.max(1, Math.min(500, Math.trunc(limit)));
  const result = await runKvCommand<string[]>(
    ["ZRANGEBYSCORE", key, minScoreInclusive, maxScoreInclusive, "LIMIT", 0, safeLimit],
    { silent: true },
  );

  if (!Array.isArray(result)) {
    return [];
  }

  return result.filter((item): item is string => typeof item === "string");
}
