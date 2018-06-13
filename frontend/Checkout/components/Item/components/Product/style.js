import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const base = 72;

const item = css({
  padding: variables.gap.big,
  marginBottom: variables.gap.xsmall,
  background: colors.light,
}).toString();

const leftColumn = css({
  width: base,
  minHeight: base,
}).toString();

const content = css({
  paddingLeft: variables.gap.big,
}).toString();

const info = css({
  fontSize: '14px',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
}).toString();

const price = css({
  textAlign: 'right',
}).toString();

export default {
  item,
  leftColumn,
  content,
  info,
  price,
};
