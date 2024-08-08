import { z } from "zod";

const schema = z.object({
  title: z.string().min(3),
  //   user: z.string().min(1).max(100),
});

export default schema;
