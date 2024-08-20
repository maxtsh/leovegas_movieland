const timeout = 15000;
const baseURL = import.meta.env.LV_BASE_URL;
const accessToken = import.meta.env.LV_ACCESS_TOKEN;

export const requestHanlder = async <TData>(
  url: string,
  options?: RequestInit,
) => {
  try {
    const result = await fetch(`${baseURL}/${url}`, {
      ...options,
      signal: AbortSignal.timeout(timeout),
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (result.ok) {
      const data = (await result.json()) as TData;

      return data;
    }

    return await Promise.reject({
      status: result.status,
      message: result.statusText || "Failed to fetch",
    });
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "status" in err &&
      err.status &&
      typeof err.status === "number" &&
      "message" in err &&
      err.message &&
      typeof err.message === "string"
    ) {
      return Promise.reject({
        status: err.status,
        message: err.message,
      });
    }

    if (err instanceof Error) {
      return Promise.reject({
        status: 400,
        message: err.message,
      });
    }

    return Promise.reject({
      status: 400,
      message: "Something went wrong",
    });
  }
};

export default requestHanlder;
