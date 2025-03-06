/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Container from "@/components/container";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

type FormData = {
  name: string;
  email: string;
  message: string;
  botcheck: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    mode: "onTouched"
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<string | boolean>(false);
  
  // Substitua pela sua chave de acesso do Web3Forms
  const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Prédios de Salvador",
      subject: "Nova Mensagem de Contato do Site Prédios de Salvador"
    },
    onSuccess: (msg: string, _data: any) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg: string, _data: any) => {
      setIsSuccess(false);
      setMessage(msg);
    }
  });

  return (
    <Container>
    
      <div className="grid my-10 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">
            Fale com Prédios de Salvador
          </h2>
          <p className="max-w-sm mt-5">
            Tem algo a dizer? Estamos aqui para ajudar. Preencha o
            formulário, envie um e-mail.
          </p>

         
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="my-10">
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}></input>

            <div className="mb-5">
              <input
                type="text"
                placeholder="Nome Completo"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-[#9CC0E9] dark:text-white rounded-md outline-[#9CC0E9]  dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                  errors.name
                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                }`}
                {...register("name", {
                  required: "Nome completo é obrigatório",
                  maxLength: 80
                })}
              />
              {errors.name && (
                <div className="mt-1 text-red-600">
                  <small>{errors.name.message}</small>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">
                Endereço de Email
              </label>
              <input
                id="email_address"
                type="email"
                placeholder="Endereço de Email"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-[#9CC0E9] dark:text-white rounded-md outline-[#9CC0E9] dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                  errors.email
                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                }`}
                {...register("email", {
                  required: "Digite seu email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Por favor, digite um email válido"
                  }
                })}
              />
              {errors.email && (
                <div className="mt-1 text-red-600">
                  <small>{errors.email.message}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                placeholder="Sua Mensagem"
                className={`w-full px-4 py-3 border-2 placeholder:text-[#9CC0E9] dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900 rounded-md outline-[#9CC0E9] h-36 focus:ring-4 ${
                  errors.message
                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                }`}
                {...register("message", {
                  required: "Digite sua mensagem"
                })}
              />
              {errors.message && (
                <div className="mt-1 text-red-600">
                  <small>{errors.message.message}</small>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 font-semibold text-white transition-colors bg-[#9CC0E9] rounded-md hover:bg-[#3181de] focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black">
              {isSubmitting ? (
                <svg
                  className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Enviar Mensagem"
              )}
            </button>
          </form>

          {isSuccess && (
            <div className="mt-3 text-sm text-center text-green-500">
              {message || "Sucesso. Mensagem enviada com sucesso!"}
            </div>
          )}
          {!isSuccess && message && (
            <div className="mt-3 text-sm text-center text-red-500">
              {message || "Algo deu errado. Por favor, tente novamente mais tarde."}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}