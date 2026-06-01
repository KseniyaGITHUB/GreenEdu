"use client";

import { registerUser } from "@/actions/register";
import { signInWithCredentials } from "@/actions/sign-in";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await registerUser(formData);

    if (result && "error" in result) {
      setError(result.error ?? "Ошибка регистрации");
      setIsSubmitting(false);
      return;
    }

    const signInResult = await signInWithCredentials(
      formData.email,
      formData.password
    );

    setIsSubmitting(false);

    if (!signInResult.success) {
      setError(
        "Регистрация прошла, но автоматический вход не удался. Войдите вручную через «Логин»."
      );
      return;
    }

    onClose();
    window.location.reload();
  };

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      {error && (
        <p className="text-danger text-sm w-full mb-2" role="alert">
          {error}
        </p>
      )}
      <Input
        aria-label="Email"
        isRequired
        name="email"
        placeholder="Введите email"
        type="email"
        value={formData.email}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none "
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return "Почта обязательна";
          if (!validateEmail(value)) return "Некорректный email";
          return null;
        }}
      />
      <Input
        isRequired
        name="password"
        placeholder="Введите пароль"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none "
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return "Пароль обязателен";
          if (value.length < 6) return "Пароль должен быть не менее 6 символов";
          return null;
        }}
      />
      <Input
        isRequired
        name="confirmPassword"
        placeholder="Подтвердите пароль"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none "
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return "Пароль для подтверждения обязателен";
          if (value !== formData.password) return "Пароли не совпадают";
          return null;
        }}
      />

      <div className="flex w-[100%]  gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose} isDisabled={isSubmitting}>
          Отмена
        </Button>
        <Button color="primary" type="submit" isLoading={isSubmitting}>
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
