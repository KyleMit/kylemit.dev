/*globals window,$*/

(function () {
    "use strict";

    $(function () {
        //add java script enabled class
        $('body').addClass('jsEnabled');

        //add touch enabled class
        if ('ontouchstart' in window) {
            $('body').addClass('touchEnabled');
        }

        // activate scroll spy
        $('body').scrollspy({
            target: '#SiteNavBar'
        });

        // when menu item clicked
        $('.nav li a').click(function () {
            // close navbar if open
            //$(".navbar-toggle:not(.collapsed)").click();
            $("#NavBarLinks").removeClass("in").addClass("collapse");
        });

        // when menu item clicked
        $("a[href^='#']").click(function () {
            // scroll to position
            navigateToElement(this);
        });

        $(".MobileToggle a").click(function () {
            var viewport = ($(this).attr('id') === "MobileSite") ?
                            'width=device-width, initial-scale=1.0' :
                            'width=1000';
            $("meta[name=viewport]").attr('content', viewport);
            $(".MobileToggle").toggle();
            return false;
        });

        $("#ViewResume").click(function() {
            //showPdfDialog();
        });
    });
    
    function showPdfDialog() {
        var src = "http://docs.google.com/gview?embedded=true&url=";
        var pdf = "http://kylemitofsky.com/Content/KyleMitofskyResume.pdf";
        $('<div/>')
            .html('<embed class="fullFrame" src="' +
                       pdf + '"></embed>')
            .dialog({
                autoOpen: true,
                modal: true,
                height: 600,
                width: function() {
                    return Math.min(600, window.innerWidth - 10);
                },
                title: "Resume"
            });
    }

    function navigateToElement(pageLink) {
        // get href attribute
        var idSelector = $(pageLink).attr('href');
        // make sure we have a valid id
        if ($(idSelector).length > 0) {
            // scroll down page
            scrollToElement(idSelector);
            // reset url hash
            setHash(idSelector);
            // return false so we don't refresh
            //return false;    
        }
    }

    function scrollToElement(idSelector) {
        $('html, body').animate({
            scrollTop: $(idSelector).offset().top
        }, 1000);
    }

    function setHash(hash) {
        window.location.hash = hash;
    }

}());