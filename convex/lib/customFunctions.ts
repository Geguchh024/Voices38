import {
  customQuery,
  customMutation,
} from "convex-helpers/server/customFunctions";
import { query, mutation } from "../_generated/server";
import { requireAdmin } from "./auth";

export const adminQuery = customQuery(query, {
  args: {},
  input: async (ctx) => {
    const user = await requireAdmin(ctx);
    return { ctx: { ...ctx, user }, args: {} };
  },
});

export const adminMutation = customMutation(mutation, {
  args: {},
  input: async (ctx) => {
    const user = await requireAdmin(ctx);
    return { ctx: { ...ctx, user }, args: {} };
  },
});
