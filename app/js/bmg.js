var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

var countryOpen;

// Topic Click
function onViewNotificationClick(topicId, id, url) {
    $.ajax({
        type: "POST",
        url: '/umbraco/surface/Topic/DeleteNotification/?topicId=' + topicId + '&id=' + id,
        error: function (request, status, err) {
            
        }
    }).done(function () {
        window.location.href = url;
    }).fail(function () {
        
    });
}

function loadView(view) {
    $.ajax({
        type: "GET",
        url: "view-" + view + ".html",
        success: function (data) {
            if (view == "globe") {
                $('#country').html('');
                $('#country').hide();
                $('#content').html('');
                $('#content').html(data);
                $('#content').show();
            }
            $('#content').html(data);
        },
        error: function (request, status, err) {
           
        }
    });
}

function loadViewOnController(controller, view) {
    $.ajax({
        type: "GET",
        url: "/" + controller + "/" + view,
        success: function (data) {
            $('#content').html(data);
        },
        error: function (request, status, err) {
           
        }
    });
}

function loadViewOnControllerWithParam(controller, view, parameterName, parameterValue) {
    $.ajax({
        type: "GET",
        url: "/" + controller + "/" + view + "/?" + parameterName + "=" + parameterValue,
        success: function (data) {
            $('#content').html(data);
        },
        error: function (request, status, err) {
          
        }
    });
}

function loadHome() {
    $.ajax({
        type: "GET",
        url: '/',
        success: function (data) {
            $('#content').html(data);
        },
        error: function (request, status, err) {
            
        }
    });
}

function loadPopup(view) {
    $.ajax({
        type: "POST",
        url: "/" + view + "/",
        success: function (data) {
            $('#popups').html('');
            $('#popups').html(data);
            $('#popups').fadeIn('slow');
            $('#aboutPopup').fadeIn('slow');
            $(window).scrollTop(0);
        },
        error: function (request, status, err) {
           
        }
    });
}

function loadNewsFlash(id) {
    $.ajax({
        type: "POST",
        url: "/Country/GetNewsFlash/?newsFlashId=" + id,
        success: function(data) {
            $.ajax({
                method: "POST",
                url: "/Umbraco/Surface/Member/ReloadNavAfterLogin"
            }).success(function(navbar) {
                $('.navbar').html(navbar);
                $('#popups').html('');
                $('#popups').html(data);
                $('#popups').fadeIn('slow');
                $('#newsPopup').fadeIn('slow');
            });
        },
        error: function(request, status, err) {
           
        }
    });
}

function loadCountry(name) {
    console.log("loadCountry");
    countryOpen = true;
    var escapedName = name.replace(' & ', '-').replace(/ /g, '-');
    $.ajax({
        type: "GET",
        url: '/countries/' + escapedName,
        success: function (data) {
            $('#content').html('');
            $('#content').hide();
            $('#country').html('');
            $('#country').html(data);
            if (!_fallbackLoaded) {
                animationClick($('#country'), 'slideInUp');
            }
            $('#country').show();

            setTimeout(function() {
                $('body').css('overflow-y', 'auto');
                $('#countryInput').attr('disabled', false);

                $('#countryInput').selectpicker('refresh');
                console.log("enabled scroll");
            }, 1000);

            
        },
        error: function (request, status, err) {
           
        }
    });
}

function animationClick(element, animation) {

    console.log('animationClick');
    element.addClass('animated ' + animation);
    //wait for animation to finish before removing classes
    window.setTimeout(function () {
        element.removeClass('animated ' + animation);
        $('#countryInput').attr('disabled', false);
        console.log('select enabled');
        $('#countryInput').selectpicker('refresh');
    }, 2000);
}

function mapCountries(countryJson) {
    var countries = new Array();

    $.each(countryJson, function () {
        countries[this.countryCode.toLowerCase()] = this.name;
    }, function () {
        return countries;
    });
    return countries;
}

function countrySelected(countryName, countryCode) {
    var h = $(window).height();
    checkLoginState([countryName], loadCountry);
        $('#globe3d').animate({
            position: "absolute",
            top: "-" + (h / 2 - 161) + "px"
        }, 1000, function () {
            animationClick($('.countryMarker'), 'bounceInDown');
            $('.countryMarker').show();
            setTimeout(function () {
                $('.globeLink').fadeIn();
            }, 1000);
        });
}

var _interactionIsEnabled;
var _isDragging = false;

function enableInteraction() {
    console.log('enabled');
    _interactionIsEnabled = true;
}

function disableInteraction() {
    console.log('disabled');
    if (_isDragging) {
        _isDragging = false;
    }

    _interactionIsEnabled = false;
}

function checkLoginState(param, callback) {
    $.ajax({
        type: "GET",
        url: '/Umbraco/Surface/Member/IsLoggedIn',
        success: function (data) {
            console.log(data);
            if (data === "True") {
                callback.apply(this, param);
            } else {
                location.href = "/";
            }
        },
        error: function (request, status, err) {
        }
    });
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

function setCountry(countryCode) {
    console.log("Set country " + countryCode);
    if (!_fallbackLoaded || !_fallbackLoading) {
        selectedCountryCode = countryCode;
        setCallbackForFocusAfterClickingOnFlag(testCountryClicked);
        focusOnCountryByCountryCode(countryCode);
    } else {
        $('#globeLink').fadeIn();
        $('#selectCountryBox').fadeIn();
        $('.fallback-container .box-wrapper-fallback').fadeOut();
        $('#country').addClass('fallback');


        $('#countryInput').addClass('country-selectInput');
        $('#countryInput option[value="default"]').prop('disabled', true);
        $('#countryInput[name=countryInput]').val(countryCode.toUpperCase());
        $('#countryInput').selectpicker('refresh');

        checkLoginState([countryMapping[countryCode.toLowerCase()]], loadCountry);
    }
}