import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../index.css";

import { FileData, FileDownloader } from "./FileDownloader";

const defaultFiles: FileData[] = [
  { name: "file1", device: "device1", path: "path1", status: "available" },
  { name: "file2", device: "device2", path: "path2", status: "scheduled" },
];

const allFilesAvailable: FileData[] = [
  { name: "file1", device: "device1", path: "path1", status: "available" },
  { name: "file2", device: "device2", path: "path2", status: "available" },
];

const allFilesScheduled: FileData[] = [
  { name: "file1", device: "device1", path: "path1", status: "scheduled" },
  { name: "file2", device: "device2", path: "path2", status: "scheduled" },
];

const longFileNames: FileData[] = [
  {
    name: "some-extra-extra-large-very-super-long-file-name.txt",
    device: "device1",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\some-extra-extra-large-very-super-long-file-name.txt",
    status: "available",
  },
  {
    name: "some-other-long-file-name.txt",
    device: "device2",
    path: "\\Device\\HarddiskVolume3\\Windows\\Program Files\\Some long app name\\some-other-long-file-name.txt",
    status: "scheduled",
  },
];

const meta = {
  title: "FileDownloader",
  component: FileDownloader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    files: defaultFiles,
    onDownload: fn(),
  },
} satisfies Meta<typeof FileDownloader>;

export default meta;
type Story = StoryObj<typeof meta>;

const StoryContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-[700px]">{children}</div>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <StoryContainer>
      <FileDownloader {...args} />
    </StoryContainer>
  ),
  args: {
    files: defaultFiles,
  },
};

export const LongFileNames: Story = {
  render: (args) => (
    <StoryContainer>
      <FileDownloader {...args} />
    </StoryContainer>
  ),
  args: {
    files: longFileNames,
  },
};

export const NoFiles: Story = {
  render: (args) => (
    <StoryContainer>
      <FileDownloader {...args} />
    </StoryContainer>
  ),
  args: {
    files: [],
  },
};

export const AllFilesAvailable: Story = {
  render: (args) => (
    <StoryContainer>
      <FileDownloader {...args} />
    </StoryContainer>
  ),
  args: {
    files: allFilesAvailable,
  },
};

export const AllFilesScheduled: Story = {
  render: (args) => (
    <StoryContainer>
      <FileDownloader {...args} />
    </StoryContainer>
  ),
  args: {
    files: allFilesScheduled,
  },
};
