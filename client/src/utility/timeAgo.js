import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko.js';
register('ko', koLocale);

export default format;
