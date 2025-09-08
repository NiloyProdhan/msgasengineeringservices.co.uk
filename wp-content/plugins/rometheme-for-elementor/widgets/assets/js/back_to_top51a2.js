jQuery(window).on("elementor/frontend/init", function () {
  elementorFrontend.hooks.addAction(
    "frontend/element_ready/rkit-back-to-top.default",
    function ($scope, $) {
      const container = $scope.find(".rkit-back-to-top-container");
      let $settings = container.data("settings");

      const button = $scope.find(".rkit-back-to-top-button");
      let foreground = $settings.foreground;
      let background = $settings.background;

      if ($settings.style == "progress") {
        const canvas = $scope.find(".scroll-progress")[0];
        const ctx = canvas.getContext("2d");
        const radius = 100; // Radius tetap

        function drawCircle(progress) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
          ctx.strokeStyle = background;
          ctx.lineWidth = 10;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            radius,
            -Math.PI / 2,
            progress * 2 * Math.PI - Math.PI / 2
          );
          ctx.strokeStyle = foreground;
          ctx.lineWidth = 10;
          ctx.stroke();
        }

        function updateCircle() {
          const scrollTop = $(window).scrollTop();
          const docHeight = $(document).height() - $(window).height();
          const scrollPercent = scrollTop / docHeight;
          drawCircle(scrollPercent);
        }

        $(window).on("scroll", updateCircle);
        drawCircle(0);
      }

      button.on("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      $(window).on("scroll", function (e) {
        button.removeClass("show");
      });

      $(window).on("scrollend", function () {
        if ($(this).scrollTop() > 100) {
          button.addClass("show");
        }
      });
    }
  );
});
