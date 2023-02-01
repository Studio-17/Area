import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmActionModal from "../components/Modals/ConfirmActionModal";

test("Renders title", () => {
  render(<ConfirmActionModal open={true} title="Reaccoon" description="" onConfirm={() => null} onRefuse={() => null} confirmText="Confirm" refuseText="Refuse" />);
  const test = screen.getByText("Reaccoon");
  expect(test).not.toBeNull();
});

test("Renders description", () => {
    render(<ConfirmActionModal open={true} title="" description="Reaccoon description" onConfirm={() => null} onRefuse={() => null} confirmText="Confirm" refuseText="Refuse" />);
    const test = screen.getByText("Reaccoon description");
    expect(test).not.toBeNull();
});

test("Renders confirm text", () => {
    render(<ConfirmActionModal open={true} title="Reaccoon" description="Reaccoon description" onConfirm={() => null} onRefuse={() => null} confirmText="Confirm" refuseText="Refuse" />);
    const test = screen.getByText("Confirm");
    expect(test).not.toBeNull();
});

test("Renders refuse text", () => {
    render(<ConfirmActionModal open={true} title="Reaccoon" description="Reaccoon description" onConfirm={() => null} onRefuse={() => null} confirmText="Confirm" refuseText="Refuse" />);
    const test = screen.getByText("Refuse");
    expect(test).not.toBeNull();
});

