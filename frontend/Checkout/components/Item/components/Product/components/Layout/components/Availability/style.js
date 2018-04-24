import { css } from 'glamor'

const colors = {
  error: '#ff0000',
  success: '#35cc29',
  warning: '#ff9300'
}

const availability = css({
  textAlign: 'right'
}).toString()

const ok = css({
  color: colors.success
}).toString()

const warning = css({
  color: colors.warning
}).toString()

const alert = css({
  color: colors.error
}).toString()

export default {
  availability,
  ok,
  warning,
  alert
}
