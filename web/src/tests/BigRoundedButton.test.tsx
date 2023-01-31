import React from "react";
import { render, screen } from "@testing-library/react";
import BigRoundedButton from "../components/Buttons/BigRoundedButton";

test("renders learn react link", () => {
  render(<BigRoundedButton label="Reaccoon" color="primary" onClick={() => null} />);
  const test = screen.getByText("Reaccoon");
  expect(test).not.toBeNull();
});
