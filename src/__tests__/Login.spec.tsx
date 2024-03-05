import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import '@testing-library/jest-dom';

import { persistor, store } from "@/store/index.ts";
import LoginDialog from "@/components/login-dialog";
import { DialogProps } from "@/@types/models/DialogProps";

const loginProps: DialogProps = {
    open: true,
    setOpen: vi.fn(),
};

describe("App", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LoginDialog {...loginProps} />
        </PersistGate>
      </Provider>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('allows a user to log in with correct credentials', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <LoginDialog open={true} setOpen={() => {}} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'admin@admin.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'admin' } });

    fireEvent.click(screen.getByRole('button', { name: /Enter/i }));

    await vi.waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'auth/setUser', // Este tipo de ação depende da sua implementação específica
          payload: expect.objectContaining({
            username: 'Admin',
            email: 'admin@admin.com',
          }),
        }),
      );
    });

    dispatchSpy.mockClear();
  });
});
