import { TextTruncate } from "@components/TextTruncate";
import { FileData } from "./FileDownloader";
import clsx from "clsx";

export interface FileRowProps extends FileData {
  isSelected: boolean;
  onSelect: (isSelected: boolean) => void;
}

export const FileRow = ({
  name = "",
  device = "",
  path = "",
  status,
  isSelected = false,
  onSelect,
}: FileRowProps) => {

  return (
    <tr
      className={clsx({
        "bg-gray-100": isSelected,
        "hover:bg-gray-200": !isSelected,
      })}
    >
      <td className="px-2 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          className={clsx({
            "cursor-not-allowed": status !== "available",
          })}
          title={
            status !== "available"
              ? "Can't select unavailable files"
              : "Select file to download"
          }
          disabled={status !== "available"}
          onChange={(e) => {
            onSelect(e.target.checked);
          }}
        />
      </td>
      <td className="px-2 py-2">
        <TextTruncate maxLength={20}>{name}</TextTruncate>
      </td>
      <td className="px-2 py-2">
        <TextTruncate>{device}</TextTruncate>
      </td>
      <td className="px-2 py-2 mr-[14px]">
        <TextTruncate maxLength={30}>{path}</TextTruncate>
      </td>
      <td className="px-2 py-2">
        <div className="relative">
          {status === "available" && (
            <span className="my-2 absolute left-[-14px] inline-block h-2 w-2 rounded-full bg-green-500"></span>
          )}
          {status}
        </div>
      </td>
    </tr>
  );
};
