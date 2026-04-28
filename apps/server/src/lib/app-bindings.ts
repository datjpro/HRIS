import type { JwtPayload } from "@hris/shared-types";

export type AppBindings = {
  Variables: {
    user: JwtPayload;
  };
};

