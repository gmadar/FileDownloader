import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { FileDownloader, type FileData } from "./FileDownloader";

describe("FileDownloader", () => {
  const mockOnDownload = vi.fn();

  beforeEach(() => {
    mockOnDownload.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  const sampleFiles: FileData[] = [
    {
      name: "file1.txt",
      device: "Device 1",
      path: "/path/to/file1.txt",
      status: "available",
    },
    {
      name: "file2.txt",
      device: "Device 2",
      path: "/path/to/file2.txt",
      status: "scheduled",
    },
    {
      name: "file3.txt",
      device: "Device 1",
      path: "/path/to/file3.txt",
      status: "available",
    },
  ];

  it("renders empty state when no files are provided", () => {
    render(<FileDownloader files={[]} onDownload={mockOnDownload} />);
    expect(screen.getByText(/No files/i).textContent).toBe("No files found");
  });

  it("renders file list with correct number of rows", () => {
    render(<FileDownloader files={sampleFiles} onDownload={mockOnDownload} />);
    const rows = screen.getAllByRole("row");
    // +1 for header row
    expect(rows).toHaveLength(sampleFiles.length + 1);
  });

  it("displays correct selection count when none are selected", () => {
    render(<FileDownloader files={sampleFiles} onDownload={mockOnDownload} />);

    const selectionCountElement = screen.getByText("None Selected");
    expect(selectionCountElement).toBeTruthy();
    const downloadButton = screen.getByRole("button", {
      name: /download selected/i,
    }) as HTMLButtonElement;
    expect(downloadButton.disabled).toBeTruthy();
    expect(downloadButton.title).toBe("No files selected");
  });

  it("enables download button when files are selected", () => {
    render(<FileDownloader files={sampleFiles} onDownload={mockOnDownload} />);

    // Select first file
    const allCheckboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    fireEvent.click(allCheckboxes[1]); // First checkbox after "select all"

    const downloadButton = screen.getByRole("button", {
      name: /download selected/i,
    }) as HTMLButtonElement;
    expect(downloadButton.disabled).toBeFalsy();

    const selectionCountElement = screen.getByText("Selected 1");
    expect(selectionCountElement).toBeTruthy();

    // status of first checkbox should be indeterminate
    expect(allCheckboxes[0].indeterminate).toBeTruthy();
  });

  it("handles select all checkbox correctly", () => {
    render(<FileDownloader files={sampleFiles} onDownload={mockOnDownload} />);

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(selectAllCheckbox);

    // Should select only available files (2 files in our sample)
    expect(screen.getByText("Selected 2")).toBeTruthy();
  });

  it("triggers onDownload with correct files when download button is clicked", () => {
    render(<FileDownloader files={sampleFiles} onDownload={mockOnDownload} />);

    // Select first available file
    const firstFileCheckbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(firstFileCheckbox);

    const downloadButton = screen.getByRole("button", {
      name: /download selected/i,
    });
    fireEvent.click(downloadButton);

    expect(mockOnDownload).toHaveBeenCalledWith([sampleFiles[0]]);
  });

  it("shows correct checkbox state for scheduled files", () => {
    render(<FileDownloader files={sampleFiles} onDownload={mockOnDownload} />);

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    // The scheduled file's checkbox (second file) should be disabled
    expect(checkboxes[2].disabled).toBeTruthy();
  });

  it("handles select all toggle correctly", () => {
    render(<FileDownloader files={sampleFiles} onDownload={mockOnDownload} />);

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];

    // First click should select all available files
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByText("Selected 2")).toBeTruthy();

    // Second click should deselect all files
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByText("None Selected")).toBeTruthy();
  });
});
