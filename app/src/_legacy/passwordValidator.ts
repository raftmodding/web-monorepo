// noinspection ES6ConvertVarToLetConst
import $ from 'jquery';

export default function () {
  $('#password').on('input', function (e) {
    var password = $(e.target).val();
    var result;
    if (!password || typeof password !== 'string') {
      result = 'Please enter a password!';
    } else if (password.length < 8) {
      result = 'Your password must be at least eight characters long!';
    } else if (!/\d/.test(password)) {
      result = 'Your password must contain at least one number!';
    } else if (!/[a-z]/.test(password)) {
      result = 'Your password must contain at least one lower-case letter!';
    } else if (!/[A-Z]/.test(password)) {
      result = 'Your password must contain at least one upper-case letter!';
    }
    if (result) {
      $('#password').addClass('is-invalid');
      $('#password-feedback').text(result);
    } else {
      $('#password').removeClass('is-invalid');
      $('#password-feedback').text(result);
    }
  });
}
