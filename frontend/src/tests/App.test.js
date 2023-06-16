import { render, screen } from "@testing-library/react";

import { App } from "../components/App";

describe("App", () => {
  it("landing page should have create account button", () => {
    render(<App />);

    const createAccountButton = screen.getByTestId("create-account-button");

    expect(createAccountButton.innerHTML).toBe("Create your Account");
  });
});
