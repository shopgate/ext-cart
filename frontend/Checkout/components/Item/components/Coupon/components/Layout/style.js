import { css } from 'glamor'

const item = css({
  fontSize: '0.875rem',
  padding: '4px 16px'
}).toString()

const icon = css({
  fontSize: '3rem',
  flexShrink: 0,
  margin: '5px 12px 0 12px'
}).toString()

const content = css({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 16,
  paddingTop: 8,
  paddingBottom: 8
}).toString()

const contentLast = css({
  alignItems: 'flex-end'
}).toString()

export default {
  item,
  icon,
  content,
  contentLast
}
