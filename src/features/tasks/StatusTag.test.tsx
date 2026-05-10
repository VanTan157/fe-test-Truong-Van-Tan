import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import StatusTag from "../../components/common/StatusTag";

describe("StatusTag", () => {
  it("renders status text", () => {
    render(<StatusTag status="done" />);

    expect(screen.getByText("done")).toBeInTheDocument();
  });
});
