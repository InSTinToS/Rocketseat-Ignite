import React from "react";
import { render } from "@testing-library/react-native";
import Profile from "../../screens/Profile";

describe("Profile", () => {
  it("should show correctly name placeholder", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it("should checks if user data has been loaded", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");

    expect(inputName.props.value).toEqual("Miguel");
  });

  it("should checks if title is correctly", () => {
    const { getByTestId } = render(<Profile />);

    const title = getByTestId("text-title");

    expect(title.props.children).toContain("Profile");
  });
});
