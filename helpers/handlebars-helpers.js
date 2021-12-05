import moment from 'moment';

export function select(selected, options) {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$&selected="selected"');
}
export function generateTime(date, format) {
  return moment(date).format(format);
}
export function paginate(options) {
  let output = '';
  if (options.current.hash == 1) {
    output += `<li class="page-item disabled"><a class="page-link">First</a></li>`;
  } else {
    output += `<li class="page-item"><a href="?page=1" class="page-link">First</a></li>`;
  }
}
