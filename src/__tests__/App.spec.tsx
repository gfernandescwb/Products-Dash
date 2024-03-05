import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import '@testing-library/jest-dom';

import { persistor, store } from "@/store/index.ts";
import HomePage from "@/pages/HomePage";

describe("App", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HomePage />
        </PersistGate>
      </Provider>
    );
    expect(screen.getByText(/Be welcome/i)).toBeInTheDocument();
  });
});
