// noinspection JSDeprecatedSymbols

import $ from 'jquery';
import { Modal } from 'bootstrap';

export default function () {
  $.extend(Modal);

  $('.donate-button').click(function (e) {
    e.preventDefault();
    $('#donate-modal').modal('toggle');
  });
}
