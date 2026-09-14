import { z } from 'zod';

// Схема валидации для формы фильтров
export const filtersSchema = z.object({
  currency: z.string().optional(),
  country: z.string().optional(),
  period: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .optional(),
});

export type FiltersData = z.infer<typeof filtersSchema>;
