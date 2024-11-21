import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileRow } from "./FileRow";
import { EmptyState } from "./EmptyState";
import { DownloadIcon } from "@components/DownloadIcon";
import clsx from "clsx";

export interface FileData {
  name?: string;
  device?: string;
  path: string;
  status: "available" | "scheduled";
}

export const FileDownloader = ({
  files,
  onDownload,
}: {
  files: FileData[];
  onDownload: (files: FileData[]) => void;
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<boolean[]>(
    Array(files.length).fill(false)
  );
  const selectedFilesCount = useMemo(
    () => selectedFiles.filter((sf) => sf).length,
    [selectedFiles]
  );
  const selectableFilesCount = useMemo(
    () => files.filter((file) => file.status === "available").length,
    [files]
  );

  useEffect(() => {
    if (checkboxRef.current) {
      if (selectableFilesCount === 0) {
        checkboxRef.current.disabled = true;
      } else {
        checkboxRef.current.disabled = false;
      }

      if (selectedFilesCount > 0 && selectedFilesCount !== files.length) {
        // partially selected
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = true;
      } else if (selectedFilesCount === files.length) {
        // all selected
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
      } else {
        // none selected
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = false;
      }
    }
  }, [selectedFilesCount, files, selectableFilesCount]);

  const selectAllHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checkboxRef.current) {
        if (checkboxRef.current.checked) {
          // checked - need to select all that are available
          setSelectedFiles(files.map((file) => file.status === "available"));
        } else {
          const maxSelected = files.filter(
            (file) => file.status === "available"
          ).length;

          if (selectedFilesCount === maxSelected) {
            // nned to deselect all
            setSelectedFiles(Array(files.length).fill(false));
          } else {
            // need to select all that are available
            setSelectedFiles(files.map((file) => file.status === "available"));
          }
        }
      }
    },
    [selectedFiles, selectedFilesCount]
  );

  if (files.length === 0) {
    return (
      <div className="w-full border border-gray-200 rounded-lg">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 px-2 py-4">
          <input
            type="checkbox"
            ref={checkboxRef}
            title={
              selectableFilesCount === 0
                ? "No selectable files"
                : `${
                    selectableFilesCount === selectedFilesCount
                      ? "Unselect"
                      : "Select"
                  } all files to download`
            }
            onChange={selectAllHandler}
          />
          <span>
            {selectedFilesCount} / {files.length} Selected
          </span>
        </div>
        <button
          className={clsx(
            "flex flex-row items-center hover:bg-gray-200 p-2 m-2 rounded-md gap-1",
            {
              "cursor-not-allowed bg-gray-200": selectedFilesCount === 0,
            }
          )}
          aria-label="Download selected files"
          title={
            selectedFilesCount === 0
              ? "No files selected"
              : "Download selected files"
          }
          aria-disabled={selectedFilesCount === 0}
          disabled={selectedFilesCount === 0}
          onClick={() =>
            onDownload(files.filter((file, index) => selectedFiles[index]))
          }
        >
          Download Selected
          <DownloadIcon />
        </button>
      </div>
      <table className="w-full table-auto">
        <thead className="border-b border-t border-gray-200">
          <tr>
            <th className="px-2 py-2 text-left w-1"></th>
            <th className="px-2 py-2 text-left text-gray-700 font-bold">
              Name
            </th>
            <th className="px-2 py-2 text-left text-gray-700 font-bold">
              Device
            </th>
            <th className="px-2 py-2 text-left text-gray-700 font-bold">
              Path
            </th>
            <th className="px-2 py-2 text-left text-gray-700 font-bold">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {files.map((file, index) => (
            <FileRow
              key={file.path}
              {...file}
              isSelected={selectedFiles[index]}
              onSelect={(isSelected) =>
                setSelectedFiles((curr) => {
                  const newState = [...curr];
                  newState[index] = isSelected;
                  return newState;
                })
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
