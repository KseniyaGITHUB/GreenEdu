"use client";

import CustomModal from "@/components/common/modal";
import LoginForm from "@/forms/login.form";
import RegistrationForm from "@/forms/registration.form";
import { Tabs, Tab } from "@heroui/react";
import { useEffect, useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login" }: IProps) => {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);

  useEffect(() => {
    if (isOpen) setTab(defaultTab);
  }, [isOpen, defaultTab]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Аккаунт" size="sm">
      <Tabs
        selectedKey={tab}
        onSelectionChange={(key) => setTab(key as "login" | "register")}
        variant="underlined"
        color="success"
        classNames={{
          tabList: "w-full",
          tab: "flex-1",
          panel: "pt-4"
        }}
      >
        <Tab key="login" title="Вход">
          <LoginForm onClose={onClose} />
        </Tab>
        <Tab key="register" title="Регистрация">
          <RegistrationForm onClose={onClose} />
        </Tab>
      </Tabs>
    </CustomModal>
  );
};

export default AuthModal;
