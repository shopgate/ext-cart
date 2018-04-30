import { css } from 'glamor'

const colors = {
  error: '#ff0000',
  success: '#35cc29',
  warning: '#ff9300'
}

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
  ok,
  warning,
  alert
}
