import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { ThemeProvider } from "styled-components/native";
import Register from ".";
import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe("Register", () => {
  it("should be open category modal", () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const modal = getByTestId("modal-category");
    const button = getByTestId("button-category");

    fireEvent.press(button);

    expect(modal.props.visible).toBeTruthy();
  });
});
