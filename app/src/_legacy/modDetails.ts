// noinspection JSDeprecatedSymbols,JSJQueryEfficiency,JSUnresolvedVariable,JSUnusedLocalSymbols,ES6ConvertVarToLetConst,TypeScriptUnresolvedVariable

import $ from 'jquery';

export default function () {
  $('.install-button').click(function (e) {
    $('#install-modal').modal('show');
  });
  $('#support-discord-link').click(function (e) {
    $('#install-modal').modal('hide');
  });

  $('.download-link').click(function (e) {
    e.preventDefault();
    $('#download-warning-modal').modal('toggle');
  });
  $('#download-warning-download-button').click(function (e) {
    $('#download-warning-modal').modal('hide');
    $('#download-thanks-modal').modal('show');
  });

  $('.support-button').click(function (e) {
    e.preventDefault();
    $('#support-modal').modal('show');
  });
  $('#support-discord-link').click(function (e) {
    $('#support-modal').modal('hide');
  });
}
