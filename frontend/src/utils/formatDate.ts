import { parseISO, format } from 'date-fns';

const formatDate = (
  stringDate: string,
  stringFormat = 'dd/MM/yyyy',
): string => {
  return format(parseISO(stringDate), stringFormat);
};

export default formatDate;
