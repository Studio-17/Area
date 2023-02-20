import React from "react";
import { render, screen } from "@testing-library/react";
import ActionsCards from "../components/Cards/ActionsCards";

test("Renders action content", () => {
  render(
    <ActionsCards
      onClick={() => undefined}
      disabled={false}
      actionContent="Action content"
    />
  );
  const test = screen.getByText("Action content");
  expect(test).not.toBeNull();
});

test("Renders reaction content", () => {
  render(
    <ActionsCards
      onClick={() => undefined}
      disabled={false}
      reactionContent="Reaction content"
    />
  );
  const test = screen.getByText("Reaction content");
  expect(test).not.toBeNull();
});
