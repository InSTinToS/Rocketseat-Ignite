import { render } from "@testing-library/react-native";
import Input from ".";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input", () => {
  it("should have a border when active", () => {
    const { getByTestId } = render(
      <Input testID="input-email" active={true} />,
      {
        wrapper: Providers,
      }
    );

    const input = getByTestId("input-email");
    const inputStyle = input.props.style[0];

    expect(inputStyle.borderColor).toEqual("#e83f5b");
  });
});
