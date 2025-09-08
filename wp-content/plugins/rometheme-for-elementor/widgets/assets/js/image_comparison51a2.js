jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/rkit-imagecomparison.default', function ($scope, $) {
        let h, w;

        const imgElement = $scope.find('.img-comp-img img');

        function updateImageDimensions() {
            const imgCompImgs = $scope.find('.img-comp-img img');
        
            if (imgCompImgs.length === 0) return;
        
            const naturalWidth = imgCompImgs[0].naturalWidth;
            const naturalHeight = imgCompImgs[0].naturalHeight;
        
            if (!naturalWidth || !naturalHeight) {
                console.error('Natural dimensions not available.');
                return;
            }
        
            // CARI ukuran container DI ATAS rkit-s-image
            const parentContainer = $scope.find('.rkit-s-image').parent();
        
            const containerWidth = parentContainer.width();
            const containerHeight = parentContainer.height();
        
            if (containerWidth === 0) {
                return;
            }
        
            let finalWidth = containerWidth;
            let finalHeight = containerHeight;
        
            // Kalau parent container height 0, hitung pakai aspect ratio
            if (containerHeight === 0) {
                const aspectRatio = naturalWidth / naturalHeight;

                finalHeight = finalWidth / aspectRatio;
            }
            const aspectRatios = naturalWidth / naturalHeight;
            // const heightwidth = containerWidth / containerHeight;
            w = finalWidth;
            h = finalWidth / aspectRatios;
        
            // console.log('Update dimensions:', { w, h });
        
            const conWrap = $scope.find('.con-wrap');
            const imgcomp = $scope.find('.img-comp-img');
        
            conWrap.css({ height: h + 'px', width: w + 'px' });
            imgcomp.css({ height: h + 'px', width: w + 'px' });
            imgCompImgs.css({ height: h + 'px', width: w + 'px' });
        }
        
        function initComparisons() {
            const container = $scope.find('.img-comp-container');
            const sliderMode = container.data('slider-mode');
            const showIcon = container.data('show-icon');
            const overlays = $scope.find('.img-comp-overlay');

            overlays.each(function () {
                compareImages($(this));
            });

            function compareImages($img) {
                let slider, clicked = 0;

                if (sliderMode === 'vertical') {
                    $img.css('height', (h / 2) + "px");

                    $scope.find('.img-comp-slider.vertical').remove();
                    slider = $('<div>', { class: 'img-comp-slider vertical' });

                    if (showIcon === 'yes') {
                        slider.append('<i class="eicon-caret-up"></i>');
                        slider.append('<i class="eicon-caret-down"></i>');
                    }

                    $img.before(slider);
                    slider.css({
                        top: (h / 2) - (slider.outerHeight() / 2) + "px",
                        left: (w / 2) - (slider.outerWidth() / 2) + "px"
                    });
                } else {
                    $img.css('width', (w / 2) + "px");

                    $scope.find('.img-comp-slider').remove();
                    slider = $('<div>', { class: 'img-comp-slider' });

                    if (showIcon === 'yes') {
                        slider.append('<i class="eicon-caret-left"></i>');
                        slider.append('<i class="eicon-caret-right"></i>');
                    }

                    $img.before(slider);
                    slider.css({
                        top: (h / 2) - (slider.outerHeight() / 2) + "px",
                        left: (w / 2) - (slider.outerWidth() / 2) + "px"
                    });
                }

                slider.on('mousedown touchstart', slideReady);
                $(window).on('mouseup touchend', slideFinish);

                function slideReady(e) {
                    e.preventDefault();
                    clicked = 1;
                    $(window).on('mousemove touchmove', slideMove);
                }

                function slideFinish() {
                    clicked = 0;
                    $(window).off('mousemove touchmove', slideMove);
                }

                function slideMove(e) {
                    if (clicked === 0) return false;

                    let pos = (sliderMode === 'vertical') ? getCursorPosVertical(e) : getCursorPosHorizontal(e);

                    pos = Math.max(0, Math.min(pos, (sliderMode === 'vertical' ? h : w)));

                    slide(pos);
                }

                function getCursorPosVertical(e) {
                    e = (e.changedTouches) ? e.changedTouches[0] : e;
                    const imgOffset = $img.offset();
                    return e.pageY - imgOffset.top;
                }

                function getCursorPosHorizontal(e) {
                    e = (e.changedTouches) ? e.changedTouches[0] : e;
                    const imgOffset = $img.offset();
                    return e.pageX - imgOffset.left;
                }

                function slide(pos) {
                    if (sliderMode === 'vertical') {
                        $img.css('height', pos + "px");
                        slider.css('top', pos - (slider.outerHeight() / 2) + "px");
                    } else {
                        $img.css('width', pos + "px");
                        slider.css('left', pos - (slider.outerWidth() / 2) + "px");
                    }
                }
            }
        }

        function initializeImage() {
            updateImageDimensions();
            initComparisons();
        }

        imgElement.on('load', function () {
            setTimeout(initializeImage, 100);
        });

        if (imgElement[0].complete) {
            setTimeout(initializeImage, 100);
        }

        // Ini yg baru bro
        elementorFrontend.on('resize', function () {
            // console.log('Elementor editor resized');
            setTimeout(initializeImage, 200); // kasih delay kecil biar layout fix dulu
        });

        // Plus backup pakai ResizeObserver juga (kalau user resize manual di browser)
        new ResizeObserver(() => {
            setTimeout(initializeImage, 200);
        }).observe($scope[0]);
    });
});
