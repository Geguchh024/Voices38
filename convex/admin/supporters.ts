import { v } from "convex/values";
import { adminMutation, adminQuery } from "../lib/customFunctions";

export const list = adminQuery({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("supporters"),
      name: v.string(),
      sortOrder: v.number(),
    })
  ),
  handler: async (ctx) => {
    const supporters = await ctx.db.query("supporters").collect();
    return supporters.map((s) => ({
      _id: s._id,
      name: s.name,
      sortOrder: s.sortOrder,
    }));
  },
});

export const create = adminMutation({
  args: { name: v.string() },
  returns: v.id("supporters"),
  handler: async (ctx, args) => {
    const all = await ctx.db.query("supporters").collect();
    const sortOrder = all.length;
    return await ctx.db.insert("supporters", { name: args.name, sortOrder });
  },
});

export const update = adminMutation({
  args: {
    id: v.id("supporters"),
    name: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const supporter = await ctx.db.get(args.id);
    if (!supporter) throw new Error("Supporter not found");
    await ctx.db.patch(args.id, { name: args.name });
    return null;
  },
});

export const remove = adminMutation({
  args: { id: v.id("supporters") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
