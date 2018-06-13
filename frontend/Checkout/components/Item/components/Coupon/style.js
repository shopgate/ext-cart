import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const couponGrid = css({
  padding: variables.gap.big,
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  background: colors.light,
}).toString();

const leftColumn = css({
  width: 72,
  minHeight: 48,
}).toString();

const iconContainer = css({
  fontSize: 48,
  alignItems: 'center',
  justifyContent: 'center',
}).toString();

const content = css({
  paddingLeft: variables.gap.big,
}).toString();

export default {
  couponGrid,
  leftColumn,
  content,
  iconContainer,
};
