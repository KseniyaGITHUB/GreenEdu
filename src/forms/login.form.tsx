"use client";

import { signInWithCredentials } from "@/actions/sign-in";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signInWithCredentials(
      formData.email,
      formData.password
    );

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    onClose();
    window.location.reload();
  };

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <p className="text-sm text-default-600 w-full mb-2">
        Демо-вход: <strong>demo@demo.ru</strong> / <strong>demo1234</strong>
      </p>
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
          if (value.length < 6) return "Пароль не менее 6 символов";
          return null;
        }}
      />

      <div className="flex w-[100%]  gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose} isDisabled={isSubmitting}>
          Отмена
        </Button>
        <Button color="success" type="submit" isLoading={isSubmitting}>
          Войти
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
