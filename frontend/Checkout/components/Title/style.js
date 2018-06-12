import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

export const title = css({
  background: colors.light,
  padding: `${variables.gap.bigger}px ${variables.gap.big}px ${variables.gap.small}px`,
  textTransform: 'uppercase',
  fontWeight: 500,
}).toString();
