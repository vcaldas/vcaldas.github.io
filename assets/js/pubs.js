// only include ONCE in any webpages with publications
$(document).ready(function() {
  $(".publication .abstract").hide();
  $(".publication .bibtex").hide();

  $(".publication .abstractLink").click(function() {
    var myAbs = $(this).closest('.publication').find('.abstract');
    if(myAbs.is(':visible')) {
      myAbs.hide();
      $(this).html('Abstract');
    } else {
      myAbs.show();
      $(this).html('Hide Abstract');
    }
    return false; // so that page doesn't reload
  });

  $(".publication .bibtexLink").click(function() {
    var myAbs = $(this).closest('.publication').find('.bibtex');
    if(myAbs.is(':visible')) {
      myAbs.hide();
      $(this).html('BibTeX');
    } else {
      myAbs.show();
      $(this).html('Hide BibTeX');
    }
    return false; // so that page doesn't reload
  });

  // all links should have an id of the form 'link-XXX'
  // and have corresponding divs of the form 'div-XXX'
  var linkNames = $("a[id^=link-]").map(function() {return this.id;});

  // hide each 'div-XXX' and make the 'link-XXX' toggle it to show/hide
  $.each(linkNames, function(ind, val) {
    var linkName = '#' + val;
    var divName = '#div-' + val.split('-')[1];

    $(divName).hide();

    $(linkName).click(function() {
      if($(divName).is(':visible')) {
        $(linkName).html('Abstract');
        $(divName).hide();
      }
      else {
        $(linkName).html('Hide Abstract');
        $(divName).show();
      }
      return false; // so that page doesn't reload
    });
  });

  // adjust default styles
  //$("h1").css("font-family", "Verdana, Arial, Helvetica, sans-serif")
  //       .css("font-size", "14pt");

  $("h4").css("font-family", "Verdana, Arial, Helvetica, sans-serif")
         .css("font-size", "12pt")
         .css("font-weight", "normal");

  // open the abstract
  if (window.location.hash) {
    $(window.location.hash + ' .abstract').css('border', '1px solid #ee0000');
    $(window.location.hash + ' .abstractLink').click();
  }
});
