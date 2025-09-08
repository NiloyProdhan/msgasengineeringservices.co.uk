jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/rkit_image_accordion.default",
      function ($scope, $) {
        const accl = $scope.find(".item-ia-click");
  
        accl.on("click", function () {
          accl
            .removeClass("active")
            .find(".text-title-ia")
            .removeClass("hs-animation-text-title-ia");
          accl
            .removeClass("active")
            .find(".text-description")
            .removeClass("hs-animation-text");
          accl
            .removeClass("active")
            .find(".rkit-image-accordion-item-button")
            .removeClass("hs-animation-button");
  
          // Set yang diklik
          $(this).addClass("active");
          $(this).find(".text-title-ia").addClass("hs-animation-text-title-ia");
          $(this).find(".text-description").addClass("hs-animation-text");
          $(this)
            .find(".rkit-image-accordion-item-button")
            .addClass("hs-animation-button");
        });
  
        const acc = $scope.find(".item-ia-hover");
        const dfa = $scope.find(".item-ia-hover.active");
  
        acc.on("mouseenter", function () {
          $(this).addClass("active");
          console.log("masuk kok");
          $scope.find(".item-ia-hover").not($(this)).removeClass("active");
          // Tambahkan animasi ke child
          $(this).find(".text-title-ia").addClass("hs-animation-text-title-ia");
          $(this).find(".text-description").addClass("hs-animation-text");
          $(this).find(".rkit-image-accordion-item-button").addClass("hs-animation-button");
  
          console.log("aaa");
        });
        acc.on("mouseleave", function () {
          $(this).removeClass("active");
          $(this).find(".text-title-ia").removeClass("hs-animation-text-title-ia");
          $(this).find(".text-description").removeClass("hs-animation-text");
          $(this).find(".rkit-image-accordion-item-button").removeClass("hs-animation-button");
  
          dfa.addClass("active");
        });
  
        // ===========
      }
    );
  });
  