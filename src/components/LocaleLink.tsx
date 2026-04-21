import { Link, type LinkProps } from "react-router-dom";

import { withLocaleInTo } from "@/i18n/routing";
import { useI18n } from "@/i18n/LocaleContext";

const LocaleLink = ({ to, ...props }: LinkProps) => {
  const { locale } = useI18n();

  return <Link to={withLocaleInTo(to, locale)} {...props} />;
};

export default LocaleLink;
