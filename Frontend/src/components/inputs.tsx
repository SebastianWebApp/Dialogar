import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  placeholder: string;
  type: string;
  register: UseFormRegisterReturn;
  id?: string;
  activo?: boolean;
};

function InputCustom(props: Props) {
  const { placeholder, type, register, id, activo = true } = props;

  return (
    <input
      className={`form-input-custom block w-full px-3 py-3 bg-transparent dark:bg-gray-900 border border-divider-light dark:border-divider-dark text-text-light dark:text-text-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary sm:text-base rounded-lg shadow-sm ${
        !activo ? "hidden" : null
      }`}
      placeholder={placeholder}
      type={type}
      {...register}
      id={id}
      autoComplete="off"
    />
  );
}

export default InputCustom;
