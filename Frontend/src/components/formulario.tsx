import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formularioSchema } from "../schema/input";
import { useEffect, useState } from "react";
import InputCustom from "./inputs";
import { useFormularioStore } from "../store/formulario";
import { useAlertStore } from "../store/alert";

function Formulario() {
  //Extraigo el tipo de datos del esquema
  type LetrasFormData = z.infer<typeof formularioSchema>;

  const { new_account } = useFormularioStore();
  const { setMessage } = useAlertStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<LetrasFormData>({
    resolver: zodResolver(formularioSchema),
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [view, setView] = useState<boolean>(false);

  const imageFile = watch("image"); // escucha cambios en el input de imagen

  useEffect(() => {
    const validateAndPreview = async () => {
      if (imageFile?.length) {
        // dispara la validación solo para el campo "image"
        const isValid = await trigger("image");

        if (isValid) {
          const file = imageFile[0];
          setPreview(URL.createObjectURL(file));
          setView(true);
        } else {
          setPreview(null);
          setView(false);
        }
      }
    };

    validateAndPreview();
  }, [imageFile, trigger]);

  useEffect(() => {
    let errorMessage = "";

    if (errors.image) errorMessage += `${errors.image.message}\n`;
    if (errors.name) errorMessage += `${errors.name.message}\n`;
    if (errors.password) errorMessage += `${errors.password.message}\n`;
    if (errors.phone) errorMessage += `${errors.phone.message}\n`;

    if (errorMessage !== "") {
      setMessage(errorMessage);
    }
  }, [errors, setMessage]);

  useEffect(() => {
    setValue("new_account", new_account); // true o false
  }, [new_account, setValue]);

  const onSubmit = async (data: LetrasFormData) => {
    if (new_account) {
      useFormularioStore.setState({
        name: data.name,
        phone: data.phone,
        password: data.password,
        image: data.image?.[0] ?? null,
      });
    } else {
      useFormularioStore.setState({
        name: "",
        phone: data.phone,
        password: data.password,
        image: null,
      });
    }
  };

  return (
    <div className="p-12 md:p-16 bg-form flex flex-col justify-center">
      {new_account ? (
        <>
          <div
            className="flex justify-center mb-8 cursor-pointer"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <div className="relative w-40 h-40 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
              {view && preview ? (
                <img
                  alt="Preview"
                  className="absolute w-full h-full object-cover"
                  src={preview}
                />
              ) : (
                <svg
                  className="absolute w-full h-full text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
          </div>

          <InputCustom
            placeholder="Ingrese la imagen"
            type="file"
            register={register("image")}
            id="fileInput"
            activo={false}
          />
        </>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {new_account ? (
          <div>
            <InputCustom
              placeholder="Nombre completo"
              type="text"
              register={register("name")}
            />
          </div>
        ) : null}

        <div>
          <InputCustom
            placeholder="Número de teléfono"
            type="tel"
            register={register("phone")}
          />
        </div>
        <div>
          <InputCustom
            placeholder="Contraseña"
            type="text"
            register={register("password")}
          />
        </div>

        <input type="hidden" {...register("new_account")} />

        <div className="pt-6">
          <button
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus-ring dark:focus:ring-offset-background-dark uppercase tracking-wider transition-colors duration-300 cursor-pointer"
            type="submit"
          >
            {new_account ? "Crear Cuenta" : "Iniciar Sesión"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default Formulario;
