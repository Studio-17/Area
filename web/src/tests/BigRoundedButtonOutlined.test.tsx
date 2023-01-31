import React from "react";
import { render, screen } from "@testing-library/react";
import BigRoundedButtonOutlined from "../components/Buttons/BigRoundedButtonOutlined";

test("renders learn react link", () => {
  render(<BigRoundedButtonOutlined label="Reaccoon" color="primary" onClick={() => null} />);
  const test = screen.getByText("Reaccoon");
  expect(test).not.toBeNull();
});
