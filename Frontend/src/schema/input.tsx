import { z } from "zod";

export const formularioSchema = z
  .object({
    new_account: z.boolean(),
    name: z.string().optional(),
    phone: z
      .string()
      .min(10, "El número de teléfono debe tener al menos 10 dígitos")
      .max(10, "El número de teléfono debe tener como máximo 10 dígitos")
      .regex(/^[0-9]+$/, "Solo se permiten números"),
    password: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .regex(
        /^[A-Za-z0-9]+$/,
        "Solo se permiten letras y números, sin espacios ni caracteres especiales"
      ),
    image: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.new_account) {
      // Validar nombre
      if (!data.name || data.name.length < 3) {
        ctx.addIssue({
          path: ["name"],
          message: "El nombre debe tener al menos 3 caracteres",
          code: "custom",
        });
      } else if (!/^[A-Za-z ]+$/.test(data.name)) {
        ctx.addIssue({
          path: ["name"],
          message: "Solo se permiten letras",
          code: "custom",
        });
      }

      // Validar imagen solo si hay archivo
      if (!data.image?.[0]) {
        ctx.addIssue({
          path: ["image"],
          message: "Debes subir una imagen",
          code: "custom",
        });
      } else {
        const file = data.image[0];
        if (!(file instanceof File) || !file.type.startsWith("image/")) {
          ctx.addIssue({
            path: ["image"],
            message: "Solo se permiten imágenes",
            code: "custom",
          });
        }
        if (file.size > 10 * 1024 * 1024) {
          ctx.addIssue({
            path: ["image"],
            message: "La imagen debe pesar máximo 10 MB",
            code: "custom",
          });
        }
      }
    }
  });
