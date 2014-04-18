var slideDuration = 400;

function slideTo(thisTab) {

  if ($.isEmptyObject(thisTab[0]))
    return;

  var newLeftSlider        = thisTab.position().left;
  var newContainerHeight   = $(".content", thisTab).height();
  var newContainerWidth    = thisTab.width();
  var newSeperatorHeight   = 20;
  var newPlaceholderHeight = newContainerHeight + newSeperatorHeight + $("#menu-bar").height();

  $("#menu-slider").animate({ 
    left: "-" + newLeftSlider + "px"
  }, {
    duration: slideDuration
  });

  $("#menu-container").animate({
    height: newContainerHeight + "px",
    width:  newContainerWidth  + "px"
  }, {
    duration: slideDuration
  });
  
  $("#menu-seperator").animate({ 
    height: newSeperatorHeight + "px"
  }, {
    duration: slideDuration
  });

  $("#placeholder").animate({
    height: newPlaceholderHeight + "px"
  }, {
    duration: slideDuration
  });
  
  $(".menu-tab").removeClass("active-tab");
  thisTab.addClass("active-tab");
  
};

function hideMenu() {

  $("li.flyout-open").removeClass("flyout-open");
  $("li.active").removeClass("active");

  $("#menu-container").animate({
    height: "0px"
  }, {
    duration: slideDuration
  });
  
  $("#menu-seperator").animate({ 
    height: "0px"
  }, {
    duration: slideDuration
  });
  
  $("#placeholder").animate({
    height: $("#menu-bar").height() + "px"
  }, {
    duration: slideDuration
  });
  
}

$("#menu-seperator").click(hideMenu);

function initialize() {

  $("#menu-slider").css("width", function() {
  
    var newWidth = 0;
    
    $(".menu-tab").each(function() {
      newWidth += $(this).width();
    });
  
    return newWidth + "px";
  }());

  var menuContainer   = $("#menu-container");
  var menuSeperator   = $("#menu-seperator");
  var menuPlaceholder = $("#placeholder");

  menuContainer.css("width",  $(".active-tab > .content").width() + "px");
  menuContainer.css("height", "0px");
  menuSeperator.css("height", "0px");
  menuPlaceholder.css("height", $("#menu-bar").height() + "px");

  $("li[toggles^='tab-']").each(function() {

    var thisToggler = $(this);  
    var thisTab     = $("#" + $(this).attr("toggles"));

    thisToggler.click(function() {

      var toggle = function(thisClass) {
        $("li." + thisClass).removeClass(thisClass);
        thisToggler.addClass(thisClass);
      };

      var shouldMenuBeHidden = function() {

        if ($(".active-tab").attr("id") !== thisTab.attr("id"))
          return false;
        
        if(menuContainer.height() === 0)
          return false;
          
        return true;
      
      };

      toggle("active");
      toggle("flyout-open");

      if (shouldMenuBeHidden())
        hideMenu();
      else
        slideTo(thisTab);        
    });
    
  });
  
}


