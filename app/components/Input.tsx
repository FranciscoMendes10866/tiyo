import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  const { error, getInputProps } = useField(name);
  return (
    <div className="space-y-2">
      <label htmlFor={name}>{label}</label>

      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...getInputProps({ id: name })}
        {...rest}
      />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
}
