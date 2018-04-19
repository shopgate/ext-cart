import { css } from 'glamor';
import colors from './../../../../../../../../../../../../themes/theme-gmd/styles/colors';

const availability = css({
  textAlign: 'right'
}).toString();

const ok = css({
  color: colors.success,
}).toString();

const warning = css({
  color: colors.warning,
}).toString();

const alert = css({
  color: colors.error,
}).toString();

export default {
  availability,
  ok,
  warning,
  alert,
};
