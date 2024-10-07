/**
 * (c) 2024, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { ReactNode } from "react";
import { IntlProvider, MessageFormatElement } from "react-intl";
import enMessages from "./ui.en.json";

type Messages = Record<string, string> | Record<string, MessageFormatElement[]>;

interface Language {
  id: string;
  name: string;
  enName: string;
  messages: Messages;
}

const supportedLanguages: Language[] = [
  {
    id: "en",
    name: "English",
    enName: "English",
    messages: enMessages,
  },
];

const getLanguageFromQuery = (): string => {
  const searchParams = new URLSearchParams(window.location.search);
  const l = searchParams.get("language");
  const supportedLanguage = supportedLanguages.find((x) => x.id === l);
  return supportedLanguage?.id || supportedLanguages[0].id;
};

const defaultMessages = supportedLanguages[0].messages;

interface TranslationProviderProps {
  children: ReactNode;
}

/**
 * Provides translation support to the app via react-intl.
 */
const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const languageId = getLanguageFromQuery();
  const messages = supportedLanguages.find(
    (l) => l.id === languageId
  )?.messages;

  return (
    <IntlProvider
      locale={languageId}
      defaultLocale="en"
      messages={messages ?? defaultMessages}
    >
      {children}
    </IntlProvider>
  );
};

export default TranslationProvider;
