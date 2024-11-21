export const TextTruncate = ({
  children,
  maxLength = 20,
}: {
  children: string;
  maxLength?: number;
}) => {
  return <div title={children}>{truncateText(children, maxLength)}</div>;
};

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;

  const ellipsisLength = 3;
  const start = Math.ceil((maxLength - ellipsisLength) / 2);
  const end = text.length - Math.floor((maxLength - ellipsisLength) / 2);
  return text.substring(0, start) + "..." + text.substring(end);
}
