/**
 * (c) 2024, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { ReactNode } from "react";
import { IntlProvider, MessageFormatElement } from "react-intl";
import caMessages from "./ui.ca.json";
import enMessages from "./ui.en.json";
import esesMessages from "./ui.es-es.json";
import jaMessages from "./ui.ja.json";
import koMessages from "./ui.ko.json";
import nlMessages from "./ui.nl.json";
import plMessages from "./ui.pl.json";
import ptbrMessages from "./ui.pt-br.json";
import zhtwMessages from "./ui.zh-tw.json";

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
  {
    id: "ca",
    name: "Català",
    enName: "Catalan",
    messages: caMessages,
  },
  {
    id: "es-es",
    name: "Español",
    enName: "Spanish",
    messages: esesMessages,
  },
  {
    id: "ja",
    name: "日本語",
    enName: "Japanese",
    messages: jaMessages,
  },
  {
    id: "ko",
    name: "한국어",
    enName: "Korean",
    messages: koMessages,
  },
  {
    id: "nl",
    name: "Nederlands",
    enName: "Dutch",
    messages: nlMessages,
  },
  {
    id: "pl",
    name: "Polski",
    enName: "Polish",
    messages: plMessages,
  },
  {
    id: "pt-br",
    name: "Português (Brasil)",
    enName: "Portuguese (Brazil)",
    messages: ptbrMessages,
  },
  {
    id: "zh-tw",
    name: "繁體中文",
    enName: "Chinese (Traditional)",
    messages: zhtwMessages,
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
