import { css } from 'glamor'

const container = css({
  padding: `16px 8px`,
  lineHeight: 1.45
}).toString()

const column = css({
  padding: `0 8px`
}).toString()

const labelColumn = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
}).toString()

const costsColumn = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}).toString()

const buttonColumn = costsColumn

const checkoutButton = css({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 1
}).toString()

export default {
  container,
  column,
  labelColumn,
  costsColumn,
  buttonColumn,
  checkoutButton
}
