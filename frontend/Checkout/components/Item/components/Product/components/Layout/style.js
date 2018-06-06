import { css } from 'glamor';

const item = css({
  padding: 16,
}).toString();

const leftColumn = css({
  width: 72,
}).toString();

const image = css({
  background: '#f2f2f2',
  marginBottom: 8 * 1.25,
  height: 72,
  width: 72,
}).toString();

const content = css({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 16,
}).toString();

const info = css({
  fontSize: '0.875rem',
  marginTop: 16 * 0.875,
  marginBottom: 8 * 0.25,
  flexGrow: 1,
  alignItems: 'flex-end',
  justifyContent: 'space-between',
}).toString();

const disclaimerSpacer = css({
  width: 10,
}).toString();

export default {
  item,
  leftColumn,
  image,
  content,
  info,
  disclaimerSpacer,
};
