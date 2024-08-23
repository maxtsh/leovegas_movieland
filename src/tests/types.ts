import type { Path, HttpMethods, HttpResponseResolver } from "msw";

export type Handler = {
  path: Path;
  baseURL?: string;
  method?: Lowercase<HttpMethods>;
  resolver: HttpResponseResolver;
};

export type Options = Partial<{
  baseURL: string;
}>;
