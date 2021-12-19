// noinspection ES6ConvertVarToLetConst,JSJQueryEfficiency,JSUnusedLocalSymbols

import $ from 'jquery';

export default function () {
  var dropdownOpen = false;
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('nav .dropdown').on('show.bs.dropdown', function (e) {
      dropdownOpen = true;
      $(this).find('.icon.fa-caret-down').addClass('fa-flip-vertical');
    });
    $('nav .dropdown').on('hide.bs.dropdown', function (e) {
      dropdownOpen = false;
      $(this).find('.icon.fa-caret-down').removeClass('fa-flip-vertical');
    });
    $('[data-toggle="tooltip"]').on('show.bs.tooltip', function (e) {
      if (dropdownOpen) {
        e.preventDefault();
      }
    });
  });
}
