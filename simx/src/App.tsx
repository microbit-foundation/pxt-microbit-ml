/**
 * (c) 2024, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import TranslationProvider from "./messages/TranslationProvider";
import Simulator from "./Simulator";

const App = () => (
  <TranslationProvider>
    <Simulator />
  </TranslationProvider>
);

export default App;
