import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextTruncate } from "./TextTruncate";

describe("TextTruncate", () => {
  it("renders full text when length is less than maxLength", async () => {
    const text = "Short text";
    render(<TextTruncate maxLength={20}>{text}</TextTruncate>);

    const element = await screen.findByTitle(text);

    expect(element.textContent).toBe(text);
    expect(element.title).toBe(text);
  });

  it("truncates text when length exceeds maxLength", async () => {
    const text = "This is a very long text that needs to be truncated";
    render(<TextTruncate maxLength={20}>{text}</TextTruncate>);

    const element = await screen.findByTitle(text);

    expect(element.textContent).toBe("This is a...runcated");
    expect(element.title).toBe(text);
  });
});
