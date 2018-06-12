import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

export const container = css({
  padding: `${variables.gap.small}px ${variables.gap.big}px`,
  margin: `${variables.gap.xsmall}px 0 ${variables.gap.xsmall}px`,
  background: colors.light,
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'lowercase',
}).toString();
