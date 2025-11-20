import { formatDistanceToNow } from "date-fns";

export const formatDate = (date: string) => {
  const createdAt = new Date(date);
  const friendly = formatDistanceToNow(createdAt, { addSuffix: true });

  return friendly;
};
