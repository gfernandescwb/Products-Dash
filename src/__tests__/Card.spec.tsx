import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import '@testing-library/jest-dom';

import { persistor, store } from "@/store/index.ts";
import Card from "@/components/card";

const cardProps = {
    id: '1',
    thumb: 'string',
    title: 'Title',
    price: 20,
    alt: 'Alt image',
}

describe("App", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Card {...cardProps}  />
        </PersistGate>
      </Provider>
    );
    expect(screen.getByText(/Title/i)).toBeInTheDocument();
  });
});
