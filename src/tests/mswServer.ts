import { http, type HttpHandler } from "msw";
import { setupServer } from "msw/node";
import type { Handler, Options } from "./types";

const baseURL = import.meta.env.LV_BASE_URL;

class SetupMSWServer {
  defaultHandlers: HttpHandler[] = [];

  options: Options = { baseURL };

  constructor(
    handlers: Handler[] | undefined = [],
    options: Options = { baseURL },
  ) {
    this.defaultHandlers = this.getMswHandlers(handlers);
    this.options = options;
  }

  initialize(configs: Handler[] | undefined = []) {
    const server = setupServer(
      ...this.defaultHandlers,
      ...this.getMswHandlers(configs),
    );

    beforeAll(() => server.listen());

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => server.close());

    return server;
  }

  getMswHandlers(handlers: Handler[]) {
    return handlers.map((config) => {
      const url = new URL(
        `${config.baseURL || this.options.baseURL}/${config.path}`,
      );
      url.search = "";
      const cleanURL = url.toString();

      return http[config?.method || "get"](cleanURL, (info) =>
        config.resolver(info),
      );
    });
  }
}

export default SetupMSWServer;
