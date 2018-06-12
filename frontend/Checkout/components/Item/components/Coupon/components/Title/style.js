import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const title = css({
  fontWeight: 500,
  minHeight: variables.gap.xbig,
}).toString();

export default {
  title,
};
