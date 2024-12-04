type FormatType = 'MMMMYYYY' | 'YYYYMMDD';

type DateTimeLocalesOptions = {
    locale: Intl.LocalesArgument;
    options: Intl.DateTimeFormatOptions;
}

const dateTimesLocaleOptions: Record<FormatType, DateTimeLocalesOptions> = {
  MMMMYYYY: {
    locale: 'en-US',
    options: {
      year: 'numeric',
      month: 'long'
    }
  },
  YYYYMMDD: {
    locale: 'fr-CA',
    options: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
  },
};

export function convertDateToString(dateString: string, format: FormatType):string {
  const date = new Date(dateString);
  const { locale, options } = dateTimesLocaleOptions[format];
  if (Number.isNaN(date.getDate())) {
    return new Date().toLocaleDateString(locale, options);
  }
  return date.toLocaleDateString(locale, options);
}
