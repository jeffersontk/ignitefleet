import { createRealmContext } from "@realm/react";
import { Historic } from "./schema/Historic";

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Historic],
  });
