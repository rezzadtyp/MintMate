import { format } from "date-fns";

export const formatDate = (isoDate: string) => {
  return format(new Date(isoDate), "MMMM do, yyyy h:mm:ss a OOOO");
};
