import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;

const base = 72;

const imageContainer = css({
  background: colors.placeholder,
  height: base,
  width: base,
  color: '#dbdbdb',
  alignItems: 'center',
  justifyContent: 'center',
}).toString();

const image = css({
  width: base,
  height: base,
}).toString();

export default {
  imageContainer,
  image,
};
