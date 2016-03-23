function initInIdleMode(n) {
    _idleMode = !0;
    n == undefined && (n = null);
    _callbackGlobeLoaded = n;
    init()
}
function initWithCountryData(n) {
    _callbackGlobeLoaded = callback;
    init(n)
}
function startIdleToActiveTransition(n) {
    _idleMode = !1;
    startTransitionFromIdleToActive(n)
}
function zoomInPressed() {
    _interactionIsEnabled && !_idleMode && zoomIn()
}
function zoomOutPressed() {
    _interactionIsEnabled && !_idleMode && zoomOut()
}
function focusOnCountryByCountryCode(n, t) {
    _interactionIsEnabled && !_idleMode && focusOnCountry(n, t, !0)
}
function releaseFocus(n) {
    ($("#countryInput").removeClass("country-selectInput"), $(".countryMarker").removeClass("animated bounceInDown"), $(".countryMarker").hide(), _idleMode) || animateAwayFromGlobe(n)
}
function setCallbackForFocusAfterClickingOnFlag(n) {
    _focusByFlagCallback = n
}
function setFlagLabelDocElement(n, t, i, r) {
    var u = document.getElementById("countryMouseOver");
    u.style.display = "block";
    u.innerHTML = t;
    u.style.left = i + 20 + "px";
    u.style.top = r + "px"
}
function hideFlagLabelDocElement() {
    var n = document.getElementById("countryMouseOver");
    n.innerHTML = "";
    n.style.display = "none";
    n.style.left = "-100px";
    n.style.top = "-100px"
}
var dummyCountries = [{"name":"Australia","countryCode":"AU","countryId":2,"countryFlag":"country_AU.png","isActive":"TRUE"},
        {"name":"Netherlands","countryCode":"NL","countryId":1,"countryFlag":"country_NL.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step1","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step2","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step3","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step4","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step5","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step6","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step7","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step8","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step9","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step10","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step11","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step12","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step13","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step14","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step15","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step16","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step17","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step18","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"},
        {"name":"On the way to Australia","countryCode":"Step19","countryId":3,"countryFlag":"country_step.png","isActive":"TRUE"}];

function startAnimate() {
   setActive(2);
   setTimeout(function() {switchToActive(3);}, 500);
}

function switchToActive(i) {
    _countryInfo[i - 1].countryFlag = 'country_step.png';
    setActive(i);
    if (i < dummyCountries.length - 1) {
        setTimeout(function () {
            switchToActive(i + 1);
        }, 500);
    } else {
        setTimeout(function() {
            _countryInfo[dummyCountries.length - 1].countryFlag = 'country_step.png';
            removeCountryFlags();
            displayCountryFlags();
        }, 500);
    }
}

function setActive(i) {
    _countryInfo[i].countryFlag = 'country_step_active.png';
    removeCountryFlags();
    displayCountryFlags();
}

function initWithLocalData() {
    var t = getDummyCountryJSON(), n = function (n, t) {
        console.log(" -->", (new Date).toISOString(), "succes:", "resolution:", t)
    };
    _callbackGlobeLoaded = n;
    console.log('to !0 (2)');
    _idleMode = !0;
    init()
}
function init(n) {
    var i, r, u, t;
    _renderer = Detector.webgl ? new THREE.WebGLRenderer({alpha: !0, antialias: !1, precision: "highp"}) : null;
    _renderer ? (_minRoX = -.38 * Math.PI, _maxRoX = .38 * Math.PI, _globeRotationVelY = -.0015, _ZoomInLimitZ = 8.5, _ZoomOutLimitZ = 15, _currentZoomPercentage = 0, i = .824, r = -.14, _idleMode || (_countryInfo = JSON.parse(n)), _container = document.getElementById("globe3d"), _camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2e3), _camera.position.z = z = calcZoomZ(_currentZoomPercentage), _scene = new THREE.Scene, _3dGroupCamera = new THREE.Object3D, _3dGroupCamera.name = "CameraContainer", _3dGroupCamera.add(_camera), _scene.add(_3dGroupCamera), _camera.rotation.x = i, _camera.rotation.y = r, _3dGroupGlobe = new THREE.Object3D, _3dGroupGlobe.name = "GlobeContainer", _scene.add(_3dGroupGlobe), _3dGroupRot = new THREE.Object3D, _3dGroupRot.name = "GlobeRotation", _3dGroupGlobe.add(_3dGroupRot), _3dGroupRot.rotation.x = i, _3dGroupRot.rotation.y = r, _3dGroupCountries = new THREE.Object3D, _3dGroupCountries.name = "Countries", _3dGroupRot.add(_3dGroupCountries), u = new THREE.AmbientLight(13421772), _scene.add(u), t = new THREE.DirectionalLight(16772829), t.position.set(5, 20, 20).normalize(), t.intensity = 1.3, _scene.add(t), _lastMouseOverPos = {
        x: -1,
        y: -1
    }, _debug3dIsEnabled && initDebugMode(), _lowResLoadingManager = new THREE.LoadingManager, _lowResLoadingManager.onProgress = function (n, t, i) {
        console.log("loading low res: item " + n + ", loaded " + t + ", total " + i)
    }, _lowResLoadingManager.onLoad = function () {
        console.log("Low res textures loaded.");
        _lowResGlobeHasLoaded = !0;
        displayGlobeAfterLoading(!1);
        _readyToLoadHighResTextures = !0
    }, _lowResLoadingManager.onError = function () {
        console.log("ERROR: Failed to load low res globe textures.");
        _callbackGlobeLoaded(!1)
    }, _loadingManager = new THREE.LoadingManager, _loadingManager.onProgress = function (n, t, i) {
        console.log("loading: item " + n + ", loaded " + t + ", total " + i)
    }, _loadingManager.onLoad = function () {
        console.log("loading manager: loaded hi res textures.");
        displayGlobeAfterLoading(!0)
    }, _loadingManager.onError = function () {
        console.log("ERROR: Failed to load high resolution globe.");
        _callbackGlobeLoaded != null && _callbackGlobeLoaded(!1)
    }, loadColladaModels(_3dGroupRot, _lowResLoadingManager), loadObjModels(_3dGroupRot, _lowResLoadingManager), _renderer.setPixelRatio(window.devicePixelRatio), _renderer.setSize(window.innerWidth, window.innerHeight), _container.appendChild(_renderer.domElement), gl = _renderer.getContext(), _glCapability = glCapability(gl), _maxAnisotropy = _renderer.getMaxAnisotropy(), _maxAnisotropy = Math.min(8, _maxAnisotropy), _raycaster = new THREE.Raycaster, window.addEventListener("resize", onWindowResize, !1), document.addEventListener("mousemove", onDocumentMouseMove, !1), document.addEventListener("mousedown", onDocumentMouseDown, !1), document.addEventListener("mouseup", onDocumentMouseUp, !1), animate()) : (_fallbackLoading = !0, $.ajax({
        type: "POST",
        url: "/umbraco/surface/GlobeData/LoadFallback",
        success: function (n) {
            _fallbackLoaded = !0;
            $("#content-frame .canvas-loader").hide();
            $("#canvas-container").html(n)
        }
    }))
}
function displayGlobeAfterLoading(n) {
    if (n) {
        _globeHasLoaded = !0;
        var t = -1;
        _globeModel.traverse(function (n) {
            n instanceof THREE.Mesh && (t++, t == 4 ? n.material.map = _globeTexture1 : (t == 2 || t == 3) && (n.material.map = _globeTexture2))
        });
        _3dGroupRot.add(_globeModel);
        _3dGroupGlobe.getObjectByName("glow") != undefined && (_3dGroupGlobe.getObjectByName("glow").visible = !0);
        _callbackGlobeLoaded != null && _callbackGlobeLoaded(!0, "high resolution")
    } else _3dGroupRot.add(_globeModel), processCountries(_dummyCountryModel), _dummyCountryModel.scale.x = _dummyCountryModel.scale.y = _dummyCountryModel.scale.z = .1, _dummyCountryModel.updateMatrix(), _3dGroupRot.add(_dummyCountryModel), setTimeout(displayCountryFlags, 100), scaleFlagSpritesTowardsHorizon(), adjustFlagsToZoomFactor(), enableInteraction(), _callbackGlobeLoaded != null && _callbackGlobeLoaded(!0, "low resolution")
}
function onWindowResize() {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
    _renderer.setSize(window.innerWidth, window.innerHeight)
}
function onDocumentMouseMove(n) {
    if (_interactionIsEnabled && !_idleMode && !_mouseEventsDisabled && (_mouseX = n.clientX, _mouseY = n.clientY, _globeModel != undefined)) {
        var t = {x: 0, y: 0};
        t.x = _mouseX / window.innerWidth * 2 - 1;
        t.y = -(_mouseY / window.innerHeight) * 2 + 1;
        _raycaster.setFromCamera(t, _camera);
        intersects = _raycaster.intersectObjects([_globeModel], !0);
        intersects.length > 0 ? _mouseIsOverGlobe = !0 : (_mouseIsOverGlobe = !1, hideFlagLabelDocElement())
    }
}
function onDocumentMouseDown(n) {
    if (_interactionIsEnabled && !_idleMode && !_mouseEventsDisabled) {
        _averageDragDeltaAngle = [];
        for (var t = 0; t < 4; t++)_averageDragDeltaAngle.push({x: 0, y: 0});
        processDocumentMouseDownEvent(n)
    }
}
function onDocumentMouseUp(n) {
    !_interactionIsEnabled || _idleMode || _mouseEventsDisabled || (processDocumentMouseUpEvent(n), _isDragging && easeOutDragMotion(), _isDragging = !1)
}
function initDebugMode() {
    _stats = new Stats;
    _stats.domElement.style.position = "absolute";
    _stats.domElement.style.left = "20px";
    _stats.domElement.style.top = "20px";
    document.body.appendChild(_stats.domElement)
}
function animate() {
    var t, i, n;
    _readyToLoadHighResTextures && (_readyToLoadHighResTextures = !1, loadGlobeTextures(_loadingManager), addHaloGlowSprite());
    requestAnimationFrame(animate);
    TWEEN.update();
    _isDragging ? (t = _lastDragMousePos.x - _mouseX, i = _lastDragMousePos.y - _mouseY, dragGlobe(t, i), _lastDragMousePos = {
        x: _mouseX,
        y: _mouseY
    }) : (!_interactionIsEnabled || _mouseIsOverGlobe || _currentZoomPercentage == 1 || (n = _3dGroupRot.rotation.y - _globeRotationVelY, n = n % (2 * Math.PI), _3dGroupRot.rotation.y = n, scaleFlagSpritesTowardsHorizon()), _mouseIsOverGlobe && CheckMouseOverFlag());
    _debug3dIsEnabled && _stats.update();
    render()
}
function render() {
    _focusLock || (_camera.lookAt(_scene.position), _renderer.render(_scene, _camera), _scene.updateMatrixWorld())
}
function loadColladaModels(n, t) {
    var i = new THREE.ColladaLoader;
    i.options.convertUpAxis = !0;
    t.itemStart(_countriesModelFileName);
    i.load(_countriesModelFileName, function (n) {
        dae = n.scene;
        _dummyCountryModel = dae;
        console.log("Countries model loaded.");
        t.itemEnd(_countriesModelFileName)
    })
}
function loadObjModels(n, t) {
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
    var i = new THREE.OBJMTLLoader(t);
    i.load(_globeModelFileName, _globeModelMaterialFileName, function (n) {
        _globeModel = n;
        console.log("Globe model is loaded.")
    })
}
function loadGlobeTextures(n) {
    var u = !1, t, i;
    if (_globeTexture1 = new THREE.Texture, _globeTexture2 = new THREE.Texture, _glCapability.MAX_TEXTURE_SIZE >= 4096)u = !0, t = "./earthmap_half_4k_1_hi_res.jpg", i = "./earthmap_half_4k_2_hi_res.jpg"; else if (_glCapability.MAX_TEXTURE_SIZE >= 2048)t = "./earthmap_half_2k_1_hi_res.jpg", i = "./earthmap_half_2k_2_hi_res.jpg"; else {
        console.log("This device does not support 2048 px textures.", _glCapability.MAX_TEXTURE_SIZE);
        return
    }
    var f = function (i) {
        i.anisotropy = _maxAnisotropy;
        _globeTexture1 = i;
        console.log("_loaded: ", t);
        n.itemEnd(t)
    }, e = function (r) {
        r.anisotropy = _maxAnisotropy;
        _globeTexture2 = r;
        console.log("_loaded: ", t);
        n.itemEnd(i)
    }, r = function (o) {
        u && (t = "./earthmap_half_2k_1_hi_res.jpg", i = "./earthmap_half_2k_2_hi_res.jpg", THREE.ImageUtils.loadTexture(t, THREE.UVMapping.new, f, r), n.itemStart(t), THREE.ImageUtils.loadTexture(i, THREE.UVMapping.new, e, r), n.itemStart(i));
        console.log(o)
    };
    THREE.ImageUtils.loadTexture(t, THREE.UVMapping.new, f, r);
    n.itemStart(t);
    THREE.ImageUtils.loadTexture(i, THREE.UVMapping.new, e, r);
    n.itemStart(i);
    console.log("textures started loading.", _glCapability.MAX_TEXTURE_SIZE)
}
function startTransitionFromIdleToActive(n) {
    _countryInfo = JSON.parse(n);
    removeCountryFlags();
    displayCountryFlags();
    enableInteraction();
}
function disableMouseEvents() {
    _mouseEventsDisabled || (_mouseEventsDisabled = !0)
}
function enableMouseEvents() {
    _mouseEventsDisabled && (_mouseEventsDisabled = !1)
}
function displayCountryFlags() {
    for (var n = 0; n < _countryInfo.length; n++)_countryInfo[n].isActive == "TRUE" && addCountryFlagSprite(_countryInfo[n])
}
function removeCountryFlags() {
    if (_3dGroupCountries)for (var n = _3dGroupCountries.children.length - 1; n >= 0; n--)_3dGroupCountries.remove(_3dGroupCountries.children[n]);
    _countrySprites = []
}
function processCountries(n) {
    var t = n.getObjectByName("bigbox"), r, i, u;
    if (t != undefined && (t.visible = !1), t = n.getObjectByName("Center_Object"), t != undefined && (t.visible = !1), t = n.getObjectByName("countries_container"), t != undefined)for (r = 0; r < t.children.length; r++)i = t.children[r], i.name.indexOf("country_") == 0 && (u = i.name.substring(8).toLowerCase(), _countryObj3dLookup[u] = {
        obj3d: i,
        name: ""
    }, i.visible = !1)
}
function addCountryFlagSprite(n) {
    var t = n.countryCode.toLowerCase(), u = n.countryFlag, i = _countryObj3dLookup[t], r;
    if (i == undefined) {
        console.log("Failed to add flag sprite for country", t);
        return
    }
    i.name = n.name;
    r = function (n) {
        var s = new THREE.SpriteMaterial({
            map: n,
            color: 16777215,
            fog: !1,
            opacity: 1
        }), i = new THREE.Sprite(s), e, o, r, f, u;
        i.name = "flag_" + t;
        e = _countryObj3dLookup[t];
        e == undefined ? _debug3dIsEnabled && console.log("Failed to add sprite for country " + t) : (o = e.obj3d, r = new THREE.Object3D, r.name = "FlagGroup_" + t, f = new THREE.Object3D, f.name = "ZoomScale", f.add(i), r.add(f), u = new THREE.Vector3, u.setFromMatrixPosition(o.matrixWorld), _3dGroupCountries.worldToLocal(u), i.scale.x = i.scale.y = i.scale.z = .01, r.position.x = .94 * u.x, r.position.y = .94 * u.y, r.position.z = .94 * u.z, _3dGroupCountries.add(r), _countrySprites.push(i), animatePopUpCountrySprite(i))
    };
    THREE.ImageUtils.loadTexture(u, {}, r)
}
function animatePopUpCountrySprite(n) {
    var t = function () {
        n.scale.x = n.scale.y = this.scale;
        n.updateMatrix()
    };
    current = {scale: 0};
    dest = {scale: .2};
    popUpTween = new TWEEN.Tween(current).to(dest, 1200).delay(Math.random() * 600).easing(TWEEN.Easing.Elastic.Out).onUpdate(t);
    popUpTween.start()
}
function animateFadeFlags(n) {
    n ? (_3dGroupCountries.visible = !0, current = {opacity: 0}, dest = {opacity: 1}, scaleFlagSpritesTowardsHorizon()) : (current = {opacity: 1}, dest = {opacity: 0});
    var t = function () {
        for (var n = 0; n < _countrySprites.length; n++)_countrySprites[n].material.opacity = this.opacity
    };
    fadeTween = new TWEEN.Tween(current).to(dest, 300).easing(TWEEN.Easing.Sinusoidal.Out).onUpdate(t);
    fadeTween.start()
}
function hideCountrySprites() {
    _countrySpritesAreHidden || (_countrySpritesAreHidden = !0, animateFadeFlags(!1))
}
function unhideCountrySprites() {
    _countrySpritesAreHidden && (_countrySpritesAreHidden = !1, animateFadeFlags(!0))
}
function scaleFlagSpritesTowardsHorizon() {
    for (var n, i, r = new THREE.Vector3, t = 0; t < _countrySprites.length; t++)n = _countrySprites[t], r.setFromMatrixPosition(n.matrixWorld), i = Math.max(.4, .3 * (r.z - 1)), n.parent.parent.scale.x = n.parent.parent.scale.y = i
}
function addHaloGlowSprite() {
    var n = function (n) {
        _haloTexture = n;
        _haloTextureHasLoaded = !0;
        _lowResGlobeHasLoaded && !_haloHasFadedIn && fadeInHalo()
    };
    THREE.ImageUtils.loadTexture("./glow1.png", THREE.UVMapping.new, n)
}
function fadeInHalo() {
    var t, n, i;
    _haloHasFadedIn = !0;
    t = new THREE.SpriteMaterial({
        map: _haloTexture,
        color: 16777215,
        fog: !1,
        blending: THREE.AdditiveBlending,
        opacity: 0
    });
    n = new THREE.Sprite(t);
    n.scale.x = n.scale.y = n.scale.z = 21;
    n.name = "glow";
    _3dGroupGlobe.add(n);
    i = function () {
        n.material.opacity = this.opacity
    };
    current = {opacity: 0, scale: 5};
    dest = {opacity: 1, scale: 21};
    fadeInGlowTween = new TWEEN.Tween(current).to(dest, 6500).easing(TWEEN.Easing.Sinusoidal.Out).onUpdate(i).delay(1800);
    fadeInGlowTween.start()
}
function focusOnCountry(n, t, i, r) {
    var e = $("#countryInput"), u, o, f;
    (e.addClass("country-selectInput"), $('#countryInput option[value="default"]').prop("disabled", !0), $("#countryInput[name=countryInput]").val(n.toUpperCase()), e.selectpicker("refresh"), console.log("Focus on country " + n), _focusIsCalledByOtherGui = r, selectedCountryCode = n, r || (_focusByFlagCallback != undefined || _focusByFlagCallback != null) && _focusByFlagCallback(!1), hideFlagLabelDocElement(), typeof n == "string") && (n = n.toLowerCase(), u = _countryObj3dLookup[n], u == undefined ? _debug3dIsEnabled && console.warn("Failed to focus on country " + n) : (console.log("animateToDestination"), disableInteraction(), o = u.obj3d, f = new THREE.Vector3, f.setFromMatrixPosition(o.matrixWorld), deltaAngleInfo = calcDeltaAngleToTargetPos(f), console.log(-deltaAngleInfo.angleX + " - " + -deltaAngleInfo.angleY + " - " + i), animateToDestination(-deltaAngleInfo.angleX, -deltaAngleInfo.angleY, i), hideCountrySprites()))
}
function calcDeltaAngleToTargetPos(n) {
    var u = n.clone(), t, e, i, r, f;
    return _3dGroupRot.worldToLocal(u), t = new THREE.Vector3, t.x = u.x, t.y = 0, t.z = u.z, e = new THREE.Vector3(0, 0, 1), i = e.angleTo(t), t.x < 0 && (i = -1 * i), r = u.clone(), r.applyAxisAngle(new THREE.Vector3(0, 1, 0), -i), r.x = 0, f = e.angleTo(r), r.y > 0 && (f = -1 * f), {
        angleX: f,
        angleY: i
    }
}
function animateToDestination(n, t, i) {
    var e, o, r;
    _tweenEaseMouseDrag != null && (_tweenEaseMouseDrag.stop(), _tweenEaseMouseDrag = null);
    e = function () {
        if (_3dGroupRot.rotation.x = this.x, _3dGroupRot.rotation.y = this.y, _camera.fov = _cameraFovIn + (1 - this.percent) * (_cameraFovOut - _cameraFovIn), _camera.updateProjectionMatrix(), s) {
            var n = 1 - (.3 + .15 * f) * Math.sin(r.percent * Math.PI);
            setZoom(n)
        } else setZoom(r.percent)
    };
    o = function () {
        _focusLock = !0;
        _tweenRotateGlobeToDest = null;
        i != null && i != undefined && (_focusIsCalledByOtherGui ? (i != undefined || i != null) && i() : (_focusByFlagCallback != undefined || _focusByFlagCallback != null) && _focusByFlagCallback(!0))
    };
    _tweenRotateGlobeToDest != null && (_tweenRotateGlobeToDest.stop(), _tweenRotateGlobeToDest = null);
    r = {x: _3dGroupRot.rotation.x, y: _3dGroupRot.rotation.y, percent: 0};
    t - r.y > Math.PI && (r.y = r.y + 2 * Math.PI);
    r.y - t > Math.PI && (r.y = r.y - 2 * Math.PI);
    var h = {x: n, y: t, percent: 1}, c = new THREE.Vector3(n - r.x, t - r.y, 0), f = c.length(), u = 1200, s = !1;
    _currentZoomPercentage == 1 ? (s = !0, u = u + 400 * f) : u = u + 300 * f;
    _tweenRotateGlobeToDest = new TWEEN.Tween(r).to(h, u).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(e).onComplete(o);
    _tweenRotateGlobeToDest.start()
}
function animateAwayFromGlobe(n) {
    var r = function () {
        _camera.fov = _cameraFovIn + (1 - this.percent) * (_cameraFovOut - _cameraFovIn);
        _camera.updateProjectionMatrix();
        setZoom(this.percent)
    }, u = function () {
        _tweenReleaseFocus = null;
        enableInteraction();
        n != null && n != undefined && n()
    }, t, i;
    _tweenReleaseFocus != null && (_tweenReleaseFocus.stop(), _tweenReleaseFocus = null);
    t = {percent: 1};
    i = {percent: 0};
    _tweenReleaseFocus = new TWEEN.Tween(t).to(i, 1200).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(r).onComplete(u);
    _tweenReleaseFocus.start();
    setTimeout(function () {
        unhideCountrySprites()
    }, 500);
    _focusLock = !1
}
function processDocumentMouseDownEvent(n) {
    var t, i, r;
    _interactionIsEnabled && !_mouseEventsDisabled && (t = {
        x: 0,
        y: 0
    }, t.x = n.clientX / window.innerWidth * 2 - 1, t.y = -(n.clientY / window.innerHeight) * 2 + 1, _lastMouseDownPos = {
        x: n.clientX,
        y: n.clientY
    }, i = !1, _raycaster.setFromCamera(t, _camera), r = _raycaster.intersectObjects(_scene.children, !0), i || _mouseIsOverGlobe && (_tweenRotateGlobeToDest != null || _isDragging || (_isDragging = !0, _lastDragMousePos = {
        x: n.clientX,
        y: n.clientY
    })))
}
function testCountryClicked(n, t) {
    t != undefined && (selectedCountryCode = t);
    n || countrySelected(countryMapping[selectedCountryCode.toLowerCase()])
}
function processDocumentMouseUpEvent(n) {
    _interactionIsEnabled && !_mouseEventsDisabled
}
function proceedDocumentMouseUpEvent(n) {
    var r = {x: 0, y: 0}, f, e, i, t, u, o;
    if (r.x = n.clientX / window.innerWidth * 2 - 1, r.y = -(n.clientY / window.innerHeight) * 2 + 1, f = _lastMouseDownPos.x - n.clientX, e = _lastMouseDownPos.y - n.clientY, !(Math.abs(f) + Math.abs(e) > 3))for (_raycaster.setFromCamera(r, _camera), i = _raycaster.intersectObjects(_scene.children, !0), t = 0; t < i.length; t++)if (i[t].object.name.indexOf("flag_") == 0 && (u = new THREE.Vector3, u.setFromMatrixPosition(i[t].object.matrixWorld), u.z > 0)) {
        o = i[t].object.name.substring(5).toLowerCase();
        setCallbackForFocusAfterClickingOnFlag(testCountryClicked);
        focusOnCountry(o, null, !1);
        break
    }
}
function dragGlobe(n, t) {
    var i;
    if (_interactionIsEnabled && !_mouseEventsDisabled) {
        _tweenEaseMouseDrag != null && (_tweenEaseMouseDrag.stop(), _tweenEaseMouseDrag = null);
        var r = .0015 + (1 - _currentZoomPercentage) * .0015, u = r * n, f = r * t;
        n != 0 && (i = _3dGroupRot.rotation.y - u, i = i % (2 * Math.PI), _3dGroupRot.rotation.y = i);
        t != 0 && (_3dGroupRot.rotation.x = _3dGroupRot.rotation.x - f, _3dGroupRot.rotation.x < _minRoX && (_3dGroupRot.rotation.x = _minRoX), _3dGroupRot.rotation.x > _maxRoX && (_3dGroupRot.rotation.x = _maxRoX));
        (n != 0 || t != 0) && scaleFlagSpritesTowardsHorizon();
        _averageDragDeltaAngle.push({x: f, y: u});
        _averageDragDeltaAngle.splice(0, 1)
    }
}
function CheckMouseOverFlag() {
    var u, t, f, i, r, e, n, o;
    if (_interactionIsEnabled && !_mouseEventsDisabled) {
        for (u = !1, t = {
            x: 0,
            y: 0
        }, t.x = _mouseX / window.innerWidth * 2 - 1, t.y = -(_mouseY / window.innerHeight) * 2 + 1, mouseHasMoved = _mouseX != _lastMouseOverPos.x || _mouseY != _lastMouseOverPos.y ? !0 : !1, _raycaster.setFromCamera(t, _camera), f = _raycaster.intersectObjects(_scene.children, !0), i = 0; i < f.length; i++)if (r = f[i].object, r.name.indexOf("flag_") == 0 && (e = new THREE.Vector3, e.setFromMatrixPosition(r.matrixWorld), e.z > 0)) {
            n = r.name.substring(5).toLowerCase();
            (n != _mouseOverFlag || mouseHasMoved) && (_mouseOverFlag = n, o = _countryObj3dLookup[n].name, setFlagLabelDocElement(n, o, _mouseX, _mouseY), _lastMouseOverPos = {
                x: _mouseX,
                y: _mouseY
            });
            u = !0;
            break
        }
        u || _mouseOverFlag != null && (_mouseOverFlag = null, hideFlagLabelDocElement())
    }
}
function calcZoomZ(n) {
    return _ZoomInLimitZ + (1 - n) * (_ZoomOutLimitZ - _ZoomInLimitZ)
}
function calcActualCurrentZoomZ() {
    return 1 - (_camera.position.z - _ZoomInLimitZ) / (_ZoomOutLimitZ - _ZoomInLimitZ)
}
function zoomIn() {
    _currentZoomPercentage == 0 && animateZoom(!0)
}
function zoomOut() {
    _currentZoomPercentage == 1 && animateZoom(!1)
}
function animateZoom(n) {
    var r = function () {
        setZoom(this.percent)
    }, u = function () {
        _tweenZoom = null;
        n ? setZoom(1) : setZoom(0)
    }, t, i;
    _tweenZoom != null && (_tweenZoom.stop(), _tweenZoom = null);
    t = {percent: 0};
    i = {percent: 1};
    n ? (t = {percent: 0}, i = {percent: 1}) : (t = {percent: 1}, i = {percent: 0});
    _tweenZoom = new TWEEN.Tween(t).to(i, 600).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(r).onComplete(u);
    _tweenZoom.start()
}
function setZoom(n) {
    n = Math.max(0, n);
    n = Math.min(1, n);
    z = calcZoomZ(n);
    _camera.position.z = z;
    _currentZoomPercentage = n;
    adjustFlagsToZoomFactor()
}
function adjustFlagsToZoomFactor() {
    for (var n, i, t = 0; t < _countrySprites.length; t++)n = _countrySprites[t], i = 1 - _currentZoomPercentage * .28, n.parent.scale.x = n.parent.scale.y = i
}
function easeOutDragMotion() {
    for (var r, u, f, e, n = 0, t = 0, i = 0; i < _averageDragDeltaAngle.length; i++)n = n + _averageDragDeltaAngle[i].x, t = t + _averageDragDeltaAngle[i].y;
    n = n / _averageDragDeltaAngle.length;
    t = t / _averageDragDeltaAngle.length;
    Math.abs(n + t) > .01 && (r = function () {
        _3dGroupRot.rotation.x = _3dGroupRot.rotation.x + this.x;
        _3dGroupRot.rotation.y = _3dGroupRot.rotation.y + this.y;
        _3dGroupRot.rotation.x < _minRoX && (_3dGroupRot.rotation.x = _minRoX);
        _3dGroupRot.rotation.x > _maxRoX && (_3dGroupRot.rotation.x = _maxRoX);
        scaleFlagSpritesTowardsHorizon()
    }, u = function () {
        _tweenEaseMouseDrag = null
    }, _tweenEaseMouseDrag != null && (_tweenEaseMouseDrag.stop(), _tweenEaseMouseDrag = null), f = {
        x: -n,
        y: -t
    }, e = {
        x: 0,
        y: 0
    }, _tweenEaseMouseDrag = new TWEEN.Tween(f).to(e, 300).easing(TWEEN.Easing.Sinusoidal.Out).onUpdate(r).onComplete(u), _tweenEaseMouseDrag.start())
}
function makeTextSprite(n, t) {
    var r, e, u;
    t === undefined && (t = {});
    var h = t.hasOwnProperty("fontface") ? t.fontface : "Arial", f = t.hasOwnProperty("fontsize") ? t.fontsize : 18, y = t.hasOwnProperty("backgroundColor") ? t.backgroundColor : {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    }, o = document.createElement("canvas"), i = o.getContext("2d");
    i.font = " " + f + "px " + h;
    var c = i.measureText(n), l = c.width, s = 50, a = l, v = f * 1.4;
    return drawRect(i, 0, 0, s + a, v), i.fillStyle = "rgba(255, 255, 255, 1.0)", i.fillText(n, s, f), r = new THREE.Texture(o), r.needsUpdate = !0, e = new THREE.SpriteMaterial({
        map: r,
        color: 16777215
    }), u = new THREE.Sprite(e), i = null, u.scale.set(1, 1, 1), u
}
function drawRoundRect(n, t, i, r, u, f) {
    n.beginPath();
    n.moveTo(t + f, i);
    n.lineTo(t + r - f, i);
    n.quadraticCurveTo(t + r, i, t + r, i + f);
    n.lineTo(t + r, i + u - f);
    n.quadraticCurveTo(t + r, i + u, t + r - f, i + u);
    n.lineTo(t + f, i + u);
    n.quadraticCurveTo(t, i + u, t, i + u - f);
    n.lineTo(t, i + f);
    n.quadraticCurveTo(t, i, t + f, i);
    n.closePath();
    n.fill();
    n.stroke()
}
function drawRect(n, t, i, r, u) {
    var f = n.createLinearGradient(0, 0, r, 0);
    f.addColorStop(0, "rgb(43, 62, 112)");
    f.addColorStop(1, "rgb(143, 22, 101)");
    n.fillStyle = f;
    n.fillRect(0, 0, r, u)
}
function toString(n) {
    return "[ " + n.x + ", " + n.y + ", " + n.z + " ]"
}
function glCapability(n) {
    console.assert(n instanceof WebGLRenderingContext, "No WebGL context is available.");
    var t = {}, i = function (i) {
        i.forEach(function (i) {
            t[i] = n.getParameter(n[i])
        })
    };
    return i(["VERSION", "SHADING_LANGUAGE_VERSION", "VENDOR", "RENDERER"]), i(["RED_BITS", "GREEN_BITS", "BLUE_BITS", "ALPHA_BITS", "DEPTH_BITS", "STENCIL_BITS"]), i(["MAX_RENDERBUFFER_SIZE", "MAX_COMBINED_TEXTURE_IMAGE_UNITS", "MAX_CUBE_MAP_TEXTURE_SIZE", "MAX_FRAGMENT_UNIFORM_VECTORS", "MAX_TEXTURE_IMAGE_UNITS", "MAX_TEXTURE_SIZE", "MAX_VERTEX_ATTRIBS", "MAX_VERTEX_ATTRIBS", "MAX_VERTEX_TEXTURE_IMAGE_UNITS", "MAX_VERTEX_UNIFORM_VECTORS"]), i(["ALIASED_LINE_WIDTH_RANGE", "ALIASED_POINT_SIZE_RANGE", "MAX_VIEWPORT_DIMS"]), t.SUPPORTED_EXTENSIONS = n.getSupportedExtensions(), _debug3dIsEnabled && (console.log("GL Capability"), console.dir(t)), t
}
var Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: function () {
        try {
            var n = document.createElement("canvas");
            return !!(window.WebGLRenderingContext && (n.getContext("webgl") || n.getContext("experimental-webgl")))
        } catch (t) {
            return !1
        }
    }(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function () {
        var n = document.createElement("div");
        return n.id = "webgl-error-message", n.style.fontFamily = "monospace", n.style.fontSize = "13px", n.style.fontWeight = "normal", n.style.textAlign = "center", n.style.background = "#fff", n.style.color = "#000", n.style.padding = "1.5em", n.style.width = "400px", n.style.margin = "5em auto 0", this.webgl || (n.innerHTML = window.WebGLRenderingContext ? 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL<\/a>.<br />\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here<\/a>.' : 'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL<\/a>.<br/>\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here<\/a>.'), n
    },
    addGetWebGLMessage: function (n) {
        var i, r, t;
        n = n || {};
        i = n.parent !== undefined ? n.parent : document.body;
        r = n.id !== undefined ? n.id : "oldie";
        t = Detector.getWebGLErrorMessage();
        t.id = r;
        i.appendChild(t)
    }
}, THREE, Stats, TWEEN;
typeof module == "object" && (module.exports = Detector);
var _debug3dIsEnabled = !1, _globeHasLoaded, _lowResGlobeHasLoaded, _haloTextureHasLoaded, _haloHasFadedIn = !1, _globeTexture1, _globeTexture2, _globeBump1, _globeBump2, _globeLowResTexture1, _globeLowResTexture2, _haloTexture, _interactionIsEnabled, _countrySpritesAreHidden = !1, _focusLock = !1, _camera, _scene, _maxAnisotropy, _renderer, _glCapability, _cameraFovIn = 25, _cameraFovOut = 45, _container, _stats, _loadingManager, _globeModel, _dummyCountryModel, _3dGroupCamera, _3dGroupGlobe, _3dGroupRot, _3dGroupCountries, _countryInfo = {}, _countryObj3dLookup = {}, _countrySprites = [], _tweenRotateGlobeToDest, _tweenReleaseFocus, _tweenZoom, _tweenEaseMouseDrag = null, _mouseX, _mouseY, _lastMouseDownPos, _lastMouseOverPos, _averageDragDeltaAngle, _mouseOverFlag = null, _mouseIsOverGlobe = !1, _raycaster, _isDragging = !1, _minRoX, _maxRotX, _globeRotationVelY, _ZoomInLimitZ, _ZoomOutLimitZ, _currentZoomPercentage, _idleMode = !1, _focusIsCalledByOtherGui = !1, _focusByFlagCallback = null, _callbackGlobeLoaded = null, _readyToLoadHighResTextures = !1, _globeModelFileName = "./earthtestOBJ-4-tris.obj", _globeModelMaterialFileName = "./earthtestOBJ-4-tris.mtl", _countriesModelFileName = "./country_test_grouppedcountries7.DAE", _mouseEventsDisabled = !1, _fallbackLoading = !1, _fallbackLoaded = !1, _releaseSuccess = !1, selectedCountryCode;
_debug3dIsEnabled && initWithLocalData();
selectedCountryCode = "";
THREE = {REVISION: "71"};
"object" == typeof module && (module.exports = THREE);
void 0 === Math.sign && (Math.sign = function (n) {
    return 0 > n ? -1 : 0 < n ? 1 : +n
});
THREE.log = function () {
    console.log.apply(console, arguments)
};
THREE.warn = function () {
    console.warn.apply(console, arguments)
};
THREE.error = function () {
    console.error.apply(console, arguments)
};
THREE.MOUSE = {LEFT: 0, MIDDLE: 1, RIGHT: 2};
THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;
THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;
THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.MinEquation = 103;
THREE.MaxEquation = 104;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;
THREE.UVMapping = 300;
THREE.CubeReflectionMapping = 301;
THREE.CubeRefractionMapping = 302;
THREE.EquirectangularReflectionMapping = 303;
THREE.EquirectangularRefractionMapping = 304;
THREE.SphericalReflectionMapping = 305;
THREE.RepeatWrapping = 1e3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.HalfFloatType = 1025;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGBEFormat = THREE.RGBAFormat;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;
THREE.Projector = function () {
    THREE.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");
    this.projectVector = function (n, t) {
        THREE.warn("THREE.Projector: .projectVector() is now vector.project().");
        n.project(t)
    };
    this.unprojectVector = function (n, t) {
        THREE.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
        n.unproject(t)
    };
    this.pickingRay = function () {
        THREE.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
    }
};
THREE.CanvasRenderer = function () {
    THREE.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
    this.domElement = document.createElement("canvas");
    this.clear = function () {
    };
    this.render = function () {
    };
    this.setClearColor = function () {
    };
    this.setSize = function () {
    }
};
THREE.Color = function (n) {
    return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(n)
};
THREE.Color.prototype = {
    constructor: THREE.Color, r: 1, g: 1, b: 1, set: function (n) {
        return n instanceof THREE.Color ? this.copy(n) : "number" == typeof n ? this.setHex(n) : "string" == typeof n && this.setStyle(n), this
    }, setHex: function (n) {
        return n = Math.floor(n), this.r = (n >> 16 & 255) / 255, this.g = (n >> 8 & 255) / 255, this.b = (n & 255) / 255, this
    }, setRGB: function (n, t, i) {
        return this.r = n, this.g = t, this.b = i, this
    }, setHSL: function (n, t, i) {
        if (0 === t)this.r = this.g = this.b = i; else {
            var r = function (n, t, i) {
                return 0 > i && (i += 1), 1 < i && (i -= 1), i < 1 / 6 ? n + 6 * (t - n) * i : .5 > i ? t : i < 2 / 3 ? n + 6 * (t - n) * (2 / 3 - i) : n
            };
            t = .5 >= i ? i * (1 + t) : i + t - i * t;
            i = 2 * i - t;
            this.r = r(i, t, n + 1 / 3);
            this.g = r(i, t, n);
            this.b = r(i, t, n - 1 / 3)
        }
        return this
    }, setStyle: function (n) {
        return /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(n) ? (n = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(n), this.r = Math.min(255, parseInt(n[1], 10)) / 255, this.g = Math.min(255, parseInt(n[2], 10)) / 255, this.b = Math.min(255, parseInt(n[3], 10)) / 255, this) : /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(n) ? (n = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(n), this.r = Math.min(100, parseInt(n[1], 10)) / 100, this.g = Math.min(100, parseInt(n[2], 10)) / 100, this.b = Math.min(100, parseInt(n[3], 10)) / 100, this) : /^\#([0-9a-f]{6})$/i.test(n) ? (n = /^\#([0-9a-f]{6})$/i.exec(n), this.setHex(parseInt(n[1], 16)), this) : /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(n) ? (n = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(n), this.setHex(parseInt(n[1] + n[1] + n[2] + n[2] + n[3] + n[3], 16)), this) : /^(\w+)$/i.test(n) ? (this.setHex(THREE.ColorKeywords[n]), this) : void 0
    }, copy: function (n) {
        return this.r = n.r, this.g = n.g, this.b = n.b, this
    }, copyGammaToLinear: function (n, t) {
        return void 0 === t && (t = 2), this.r = Math.pow(n.r, t), this.g = Math.pow(n.g, t), this.b = Math.pow(n.b, t), this
    }, copyLinearToGamma: function (n, t) {
        void 0 === t && (t = 2);
        var i = 0 < t ? 1 / t : 1;
        return this.r = Math.pow(n.r, i), this.g = Math.pow(n.g, i), this.b = Math.pow(n.b, i), this
    }, convertGammaToLinear: function () {
        var n = this.r, t = this.g, i = this.b;
        return this.r = n * n, this.g = t * t, this.b = i * i, this
    }, convertLinearToGamma: function () {
        return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
    }, getHex: function () {
        return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    }, getHexString: function () {
        return ("000000" + this.getHex().toString(16)).slice(-6)
    }, getHSL: function (n) {
        var e, t;
        n = n || {h: 0, s: 0, l: 0};
        var o = this.r, i = this.g, r = this.b, u = Math.max(o, i, r), t = Math.min(o, i, r), f, s = (t + u) / 2;
        if (t === u)t = f = 0; else {
            e = u - t;
            t = .5 >= s ? e / (u + t) : e / (2 - u - t);
            switch (u) {
                case o:
                    f = (i - r) / e + (i < r ? 6 : 0);
                    break;
                case i:
                    f = (r - o) / e + 2;
                    break;
                case r:
                    f = (o - i) / e + 4
            }
            f /= 6
        }
        return n.h = f, n.s = t, n.l = s, n
    }, getStyle: function () {
        return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
    }, offsetHSL: function (n, t, i) {
        var r = this.getHSL();
        return r.h += n, r.s += t, r.l += i, this.setHSL(r.h, r.s, r.l), this
    }, add: function (n) {
        return this.r += n.r, this.g += n.g, this.b += n.b, this
    }, addColors: function (n, t) {
        return this.r = n.r + t.r, this.g = n.g + t.g, this.b = n.b + t.b, this
    }, addScalar: function (n) {
        return this.r += n, this.g += n, this.b += n, this
    }, multiply: function (n) {
        return this.r *= n.r, this.g *= n.g, this.b *= n.b, this
    }, multiplyScalar: function (n) {
        return this.r *= n, this.g *= n, this.b *= n, this
    }, lerp: function (n, t) {
        return this.r += (n.r - this.r) * t, this.g += (n.g - this.g) * t, this.b += (n.b - this.b) * t, this
    }, equals: function (n) {
        return n.r === this.r && n.g === this.g && n.b === this.b
    }, fromArray: function (n) {
        return this.r = n[0], this.g = n[1], this.b = n[2], this
    }, toArray: function (n, t) {
        return void 0 === n && (n = []), void 0 === t && (t = 0), n[t] = this.r, n[t + 1] = this.g, n[t + 2] = this.b, n
    }, clone: function () {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
};
THREE.ColorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
THREE.Quaternion = function (n, t, i, r) {
    this._x = n || 0;
    this._y = t || 0;
    this._z = i || 0;
    this._w = void 0 !== r ? r : 1
};
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion, _x: 0, _y: 0, _z: 0, _w: 0, get x() {
        return this._x
    }, set x(n) {
        this._x = n;
        this.onChangeCallback()
    }, get y() {
        return this._y
    }, set y(n) {
        this._y = n;
        this.onChangeCallback()
    }, get z() {
        return this._z
    }, set z(n) {
        this._z = n;
        this.onChangeCallback()
    }, get w() {
        return this._w
    }, set w(n) {
        this._w = n;
        this.onChangeCallback()
    }, set: function (n, t, i, r) {
        return this._x = n, this._y = t, this._z = i, this._w = r, this.onChangeCallback(), this
    }, copy: function (n) {
        return this._x = n.x, this._y = n.y, this._z = n.z, this._w = n.w, this.onChangeCallback(), this
    }, setFromEuler: function (n, t) {
        if (!1 == n instanceof THREE.Euler)throw Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var i = Math.cos(n._x / 2), r = Math.cos(n._y / 2), u = Math.cos(n._z / 2), f = Math.sin(n._x / 2), e = Math.sin(n._y / 2), o = Math.sin(n._z / 2);
        return "XYZ" === n.order ? (this._x = f * r * u + i * e * o, this._y = i * e * u - f * r * o, this._z = i * r * o + f * e * u, this._w = i * r * u - f * e * o) : "YXZ" === n.order ? (this._x = f * r * u + i * e * o, this._y = i * e * u - f * r * o, this._z = i * r * o - f * e * u, this._w = i * r * u + f * e * o) : "ZXY" === n.order ? (this._x = f * r * u - i * e * o, this._y = i * e * u + f * r * o, this._z = i * r * o + f * e * u, this._w = i * r * u - f * e * o) : "ZYX" === n.order ? (this._x = f * r * u - i * e * o, this._y = i * e * u + f * r * o, this._z = i * r * o - f * e * u, this._w = i * r * u + f * e * o) : "YZX" === n.order ? (this._x = f * r * u + i * e * o, this._y = i * e * u + f * r * o, this._z = i * r * o - f * e * u, this._w = i * r * u - f * e * o) : "XZY" === n.order && (this._x = f * r * u - i * e * o, this._y = i * e * u - f * r * o, this._z = i * r * o + f * e * u, this._w = i * r * u + f * e * o), !1 !== t && this.onChangeCallback(), this
    }, setFromAxisAngle: function (n, t) {
        var r = t / 2, i = Math.sin(r);
        return this._x = n.x * i, this._y = n.y * i, this._z = n.z * i, this._w = Math.cos(r), this.onChangeCallback(), this
    }, setFromRotationMatrix: function (n) {
        var i = n.elements, t = i[0];
        n = i[4];
        var u = i[8], f = i[1], r = i[5], e = i[9], o = i[2], s = i[6], i = i[10], h = t + r + i;
        return 0 < h ? (t = .5 / Math.sqrt(h + 1), this._w = .25 / t, this._x = (s - e) * t, this._y = (u - o) * t, this._z = (f - n) * t) : t > r && t > i ? (t = 2 * Math.sqrt(1 + t - r - i), this._w = (s - e) / t, this._x = .25 * t, this._y = (n + f) / t, this._z = (u + o) / t) : r > i ? (t = 2 * Math.sqrt(1 + r - t - i), this._w = (u - o) / t, this._x = (n + f) / t, this._y = .25 * t, this._z = (e + s) / t) : (t = 2 * Math.sqrt(1 + i - t - r), this._w = (f - n) / t, this._x = (u + o) / t, this._y = (e + s) / t, this._z = .25 * t), this.onChangeCallback(), this
    }, setFromUnitVectors: function () {
        var n, t;
        return function (i, r) {
            return void 0 === n && (n = new THREE.Vector3), t = i.dot(r) + 1, 1e-6 > t ? (t = 0, Math.abs(i.x) > Math.abs(i.z) ? n.set(-i.y, i.x, 0) : n.set(0, -i.z, i.y)) : n.crossVectors(i, r), this._x = n.x, this._y = n.y, this._z = n.z, this._w = t, this.normalize(), this
        }
    }(), inverse: function () {
        return this.conjugate().normalize(), this
    }, conjugate: function () {
        return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
    }, dot: function (n) {
        return this._x * n._x + this._y * n._y + this._z * n._z + this._w * n._w
    }, lengthSq: function () {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    }, length: function () {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    }, normalize: function () {
        var n = this.length();
        return 0 === n ? (this._z = this._y = this._x = 0, this._w = 1) : (n = 1 / n, this._x *= n, this._y *= n, this._z *= n, this._w *= n), this.onChangeCallback(), this
    }, multiply: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(n, t)) : this.multiplyQuaternions(this, n)
    }, multiplyQuaternions: function (n, t) {
        var i = n._x, r = n._y, u = n._z, f = n._w, e = t._x, o = t._y, s = t._z, h = t._w;
        return this._x = i * h + f * e + r * s - u * o, this._y = r * h + f * o + u * e - i * s, this._z = u * h + f * s + i * o - r * e, this._w = f * h - i * e - r * o - u * s, this.onChangeCallback(), this
    }, multiplyVector3: function (n) {
        return THREE.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), n.applyQuaternion(this)
    }, slerp: function (n, t) {
        var r, s;
        if (0 === t)return this;
        if (1 === t)return this.copy(n);
        var u = this._x, f = this._y, e = this._z, o = this._w, i = o * n._w + u * n._x + f * n._y + e * n._z;
        return (0 > i ? (this._w = -n._w, this._x = -n._x, this._y = -n._y, this._z = -n._z, i = -i) : this.copy(n), 1 <= i) ? (this._w = o, this._x = u, this._y = f, this._z = e, this) : (r = Math.acos(i), s = Math.sqrt(1 - i * i), .001 > Math.abs(s)) ? (this._w = .5 * (o + this._w), this._x = .5 * (u + this._x), this._y = .5 * (f + this._y), this._z = .5 * (e + this._z), this) : (i = Math.sin((1 - t) * r) / s, r = Math.sin(t * r) / s, this._w = o * i + this._w * r, this._x = u * i + this._x * r, this._y = f * i + this._y * r, this._z = e * i + this._z * r, this.onChangeCallback(), this)
    }, equals: function (n) {
        return n._x === this._x && n._y === this._y && n._z === this._z && n._w === this._w
    }, fromArray: function (n, t) {
        return void 0 === t && (t = 0), this._x = n[t], this._y = n[t + 1], this._z = n[t + 2], this._w = n[t + 3], this.onChangeCallback(), this
    }, toArray: function (n, t) {
        return void 0 === n && (n = []), void 0 === t && (t = 0), n[t] = this._x, n[t + 1] = this._y, n[t + 2] = this._z, n[t + 3] = this._w, n
    }, onChange: function (n) {
        return this.onChangeCallback = n, this
    }, onChangeCallback: function () {
    }, clone: function () {
        return new THREE.Quaternion(this._x, this._y, this._z, this._w)
    }
};
THREE.Quaternion.slerp = function (n, t, i, r) {
    return i.copy(n).slerp(t, r)
};
THREE.Vector2 = function (n, t) {
    this.x = n || 0;
    this.y = t || 0
};
THREE.Vector2.prototype = {
    constructor: THREE.Vector2, set: function (n, t) {
        return this.x = n, this.y = t, this
    }, setX: function (n) {
        return this.x = n, this
    }, setY: function (n) {
        return this.y = n, this
    }, setComponent: function (n, t) {
        switch (n) {
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
                break;
            default:
                throw Error("index is out of range: " + n);
        }
    }, getComponent: function (n) {
        switch (n) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw Error("index is out of range: " + n);
        }
    }, copy: function (n) {
        return this.x = n.x, this.y = n.y, this
    }, add: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(n, t)) : (this.x += n.x, this.y += n.y, this)
    }, addScalar: function (n) {
        return this.x += n, this.y += n, this
    }, addVectors: function (n, t) {
        return this.x = n.x + t.x, this.y = n.y + t.y, this
    }, sub: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(n, t)) : (this.x -= n.x, this.y -= n.y, this)
    }, subScalar: function (n) {
        return this.x -= n, this.y -= n, this
    }, subVectors: function (n, t) {
        return this.x = n.x - t.x, this.y = n.y - t.y, this
    }, multiply: function (n) {
        return this.x *= n.x, this.y *= n.y, this
    }, multiplyScalar: function (n) {
        return this.x *= n, this.y *= n, this
    }, divide: function (n) {
        return this.x /= n.x, this.y /= n.y, this
    }, divideScalar: function (n) {
        return 0 !== n ? (n = 1 / n, this.x *= n, this.y *= n) : this.y = this.x = 0, this
    }, min: function (n) {
        return this.x > n.x && (this.x = n.x), this.y > n.y && (this.y = n.y), this
    }, max: function (n) {
        return this.x < n.x && (this.x = n.x), this.y < n.y && (this.y = n.y), this
    }, clamp: function (n, t) {
        return this.x < n.x ? this.x = n.x : this.x > t.x && (this.x = t.x), this.y < n.y ? this.y = n.y : this.y > t.y && (this.y = t.y), this
    }, clampScalar: function () {
        var n, t;
        return function (i, r) {
            return void 0 === n && (n = new THREE.Vector2, t = new THREE.Vector2), n.set(i, i), t.set(r, r), this.clamp(n, t)
        }
    }(), floor: function () {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
    }, ceil: function () {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
    }, round: function () {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    }, roundToZero: function () {
        return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this
    }, negate: function () {
        return this.x = -this.x, this.y = -this.y, this
    }, dot: function (n) {
        return this.x * n.x + this.y * n.y
    }, lengthSq: function () {
        return this.x * this.x + this.y * this.y
    }, length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }, normalize: function () {
        return this.divideScalar(this.length())
    }, distanceTo: function (n) {
        return Math.sqrt(this.distanceToSquared(n))
    }, distanceToSquared: function (n) {
        var t = this.x - n.x;
        return n = this.y - n.y, t * t + n * n
    }, setLength: function (n) {
        var t = this.length();
        return 0 !== t && n !== t && this.multiplyScalar(n / t), this
    }, lerp: function (n, t) {
        return this.x += (n.x - this.x) * t, this.y += (n.y - this.y) * t, this
    }, lerpVectors: function (n, t, i) {
        return this.subVectors(t, n).multiplyScalar(i).add(n), this
    }, equals: function (n) {
        return n.x === this.x && n.y === this.y
    }, fromArray: function (n, t) {
        return void 0 === t && (t = 0), this.x = n[t], this.y = n[t + 1], this
    }, toArray: function (n, t) {
        return void 0 === n && (n = []), void 0 === t && (t = 0), n[t] = this.x, n[t + 1] = this.y, n
    }, fromAttribute: function (n, t, i) {
        return void 0 === i && (i = 0), t = t * n.itemSize + i, this.x = n.array[t], this.y = n.array[t + 1], this
    }, clone: function () {
        return new THREE.Vector2(this.x, this.y)
    }
};
THREE.Vector3 = function (n, t, i) {
    this.x = n || 0;
    this.y = t || 0;
    this.z = i || 0
};
THREE.Vector3.prototype = {
    constructor: THREE.Vector3, set: function (n, t, i) {
        return this.x = n, this.y = t, this.z = i, this
    }, setX: function (n) {
        return this.x = n, this
    }, setY: function (n) {
        return this.y = n, this
    }, setZ: function (n) {
        return this.z = n, this
    }, setComponent: function (n, t) {
        switch (n) {
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
                break;
            case 2:
                this.z = t;
                break;
            default:
                throw Error("index is out of range: " + n);
        }
    }, getComponent: function (n) {
        switch (n) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw Error("index is out of range: " + n);
        }
    }, copy: function (n) {
        return this.x = n.x, this.y = n.y, this.z = n.z, this
    }, add: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(n, t)) : (this.x += n.x, this.y += n.y, this.z += n.z, this)
    }, addScalar: function (n) {
        return this.x += n, this.y += n, this.z += n, this
    }, addVectors: function (n, t) {
        return this.x = n.x + t.x, this.y = n.y + t.y, this.z = n.z + t.z, this
    }, sub: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(n, t)) : (this.x -= n.x, this.y -= n.y, this.z -= n.z, this)
    }, subScalar: function (n) {
        return this.x -= n, this.y -= n, this.z -= n, this
    }, subVectors: function (n, t) {
        return this.x = n.x - t.x, this.y = n.y - t.y, this.z = n.z - t.z, this
    }, multiply: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(n, t)) : (this.x *= n.x, this.y *= n.y, this.z *= n.z, this)
    }, multiplyScalar: function (n) {
        return this.x *= n, this.y *= n, this.z *= n, this
    }, multiplyVectors: function (n, t) {
        return this.x = n.x * t.x, this.y = n.y * t.y, this.z = n.z * t.z, this
    }, applyEuler: function () {
        var n;
        return function (t) {
            return !1 == t instanceof THREE.Euler && THREE.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."), void 0 === n && (n = new THREE.Quaternion), this.applyQuaternion(n.setFromEuler(t)), this
        }
    }(), applyAxisAngle: function () {
        var n;
        return function (t, i) {
            return void 0 === n && (n = new THREE.Quaternion), this.applyQuaternion(n.setFromAxisAngle(t, i)), this
        }
    }(), applyMatrix3: function (n) {
        var t = this.x, i = this.y, r = this.z;
        return n = n.elements, this.x = n[0] * t + n[3] * i + n[6] * r, this.y = n[1] * t + n[4] * i + n[7] * r, this.z = n[2] * t + n[5] * i + n[8] * r, this
    }, applyMatrix4: function (n) {
        var t = this.x, i = this.y, r = this.z;
        return n = n.elements, this.x = n[0] * t + n[4] * i + n[8] * r + n[12], this.y = n[1] * t + n[5] * i + n[9] * r + n[13], this.z = n[2] * t + n[6] * i + n[10] * r + n[14], this
    }, applyProjection: function (n) {
        var t = this.x, i = this.y, r = this.z, u;
        return n = n.elements, u = 1 / (n[3] * t + n[7] * i + n[11] * r + n[15]), this.x = (n[0] * t + n[4] * i + n[8] * r + n[12]) * u, this.y = (n[1] * t + n[5] * i + n[9] * r + n[13]) * u, this.z = (n[2] * t + n[6] * i + n[10] * r + n[14]) * u, this
    }, applyQuaternion: function (n) {
        var t = this.x, f = this.y, e = this.z, i = n.x, r = n.y, u = n.z;
        n = n.w;
        var o = n * t + r * e - u * f, s = n * f + u * t - i * e, h = n * e + i * f - r * t, t = -i * t - r * f - u * e;
        return this.x = o * n + t * -i + s * -u - h * -r, this.y = s * n + t * -r + h * -i - o * -u, this.z = h * n + t * -u + o * -r - s * -i, this
    }, project: function () {
        var n;
        return function (t) {
            return void 0 === n && (n = new THREE.Matrix4), n.multiplyMatrices(t.projectionMatrix, n.getInverse(t.matrixWorld)), this.applyProjection(n)
        }
    }(), unproject: function () {
        var n;
        return function (t) {
            return void 0 === n && (n = new THREE.Matrix4), n.multiplyMatrices(t.matrixWorld, n.getInverse(t.projectionMatrix)), this.applyProjection(n)
        }
    }(), transformDirection: function (n) {
        var t = this.x, i = this.y, r = this.z;
        return n = n.elements, this.x = n[0] * t + n[4] * i + n[8] * r, this.y = n[1] * t + n[5] * i + n[9] * r, this.z = n[2] * t + n[6] * i + n[10] * r, this.normalize(), this
    }, divide: function (n) {
        return this.x /= n.x, this.y /= n.y, this.z /= n.z, this
    }, divideScalar: function (n) {
        return 0 !== n ? (n = 1 / n, this.x *= n, this.y *= n, this.z *= n) : this.z = this.y = this.x = 0, this
    }, min: function (n) {
        return this.x > n.x && (this.x = n.x), this.y > n.y && (this.y = n.y), this.z > n.z && (this.z = n.z), this
    }, max: function (n) {
        return this.x < n.x && (this.x = n.x), this.y < n.y && (this.y = n.y), this.z < n.z && (this.z = n.z), this
    }, clamp: function (n, t) {
        return this.x < n.x ? this.x = n.x : this.x > t.x && (this.x = t.x), this.y < n.y ? this.y = n.y : this.y > t.y && (this.y = t.y), this.z < n.z ? this.z = n.z : this.z > t.z && (this.z = t.z), this
    }, clampScalar: function () {
        var n, t;
        return function (i, r) {
            return void 0 === n && (n = new THREE.Vector3, t = new THREE.Vector3), n.set(i, i, i), t.set(r, r, r), this.clamp(n, t)
        }
    }(), floor: function () {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
    }, ceil: function () {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
    }, round: function () {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
    }, roundToZero: function () {
        return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this
    }, negate: function () {
        return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
    }, dot: function (n) {
        return this.x * n.x + this.y * n.y + this.z * n.z
    }, lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }, length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }, lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    }, normalize: function () {
        return this.divideScalar(this.length())
    }, setLength: function (n) {
        var t = this.length();
        return 0 !== t && n !== t && this.multiplyScalar(n / t), this
    }, lerp: function (n, t) {
        return this.x += (n.x - this.x) * t, this.y += (n.y - this.y) * t, this.z += (n.z - this.z) * t, this
    }, lerpVectors: function (n, t, i) {
        return this.subVectors(t, n).multiplyScalar(i).add(n), this
    }, cross: function (n, t) {
        if (void 0 !== t)return THREE.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(n, t);
        var i = this.x, r = this.y, u = this.z;
        return this.x = r * n.z - u * n.y, this.y = u * n.x - i * n.z, this.z = i * n.y - r * n.x, this
    }, crossVectors: function (n, t) {
        var i = n.x, r = n.y, u = n.z, f = t.x, e = t.y, o = t.z;
        return this.x = r * o - u * e, this.y = u * f - i * o, this.z = i * e - r * f, this
    }, projectOnVector: function () {
        var n, t;
        return function (i) {
            return void 0 === n && (n = new THREE.Vector3), n.copy(i).normalize(), t = this.dot(n), this.copy(n).multiplyScalar(t)
        }
    }(), projectOnPlane: function () {
        var n;
        return function (t) {
            return void 0 === n && (n = new THREE.Vector3), n.copy(this).projectOnVector(t), this.sub(n)
        }
    }(), reflect: function () {
        var n;
        return function (t) {
            return void 0 === n && (n = new THREE.Vector3), this.sub(n.copy(t).multiplyScalar(2 * this.dot(t)))
        }
    }(), angleTo: function (n) {
        return n = this.dot(n) / (this.length() * n.length()), Math.acos(THREE.Math.clamp(n, -1, 1))
    }, distanceTo: function (n) {
        return Math.sqrt(this.distanceToSquared(n))
    }, distanceToSquared: function (n) {
        var t = this.x - n.x, i = this.y - n.y;
        return n = this.z - n.z, t * t + i * i + n * n
    }, setEulerFromRotationMatrix: function () {
        THREE.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
    }, setEulerFromQuaternion: function () {
        THREE.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
    }, getPositionFromMatrix: function (n) {
        return THREE.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(n)
    }, getScaleFromMatrix: function (n) {
        return THREE.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(n)
    }, getColumnFromMatrix: function (n, t) {
        return THREE.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(n, t)
    }, setFromMatrixPosition: function (n) {
        return this.x = n.elements[12], this.y = n.elements[13], this.z = n.elements[14], this
    }, setFromMatrixScale: function (n) {
        var t = this.set(n.elements[0], n.elements[1], n.elements[2]).length(), i = this.set(n.elements[4], n.elements[5], n.elements[6]).length();
        return n = this.set(n.elements[8], n.elements[9], n.elements[10]).length(), this.x = t, this.y = i, this.z = n, this
    }, setFromMatrixColumn: function (n, t) {
        var i = 4 * n, r = t.elements;
        return this.x = r[i], this.y = r[i + 1], this.z = r[i + 2], this
    }, equals: function (n) {
        return n.x === this.x && n.y === this.y && n.z === this.z
    }, fromArray: function (n, t) {
        return void 0 === t && (t = 0), this.x = n[t], this.y = n[t + 1], this.z = n[t + 2], this
    }, toArray: function (n, t) {
        return void 0 === n && (n = []), void 0 === t && (t = 0), n[t] = this.x, n[t + 1] = this.y, n[t + 2] = this.z, n
    }, fromAttribute: function (n, t, i) {
        return void 0 === i && (i = 0), t = t * n.itemSize + i, this.x = n.array[t], this.y = n.array[t + 1], this.z = n.array[t + 2], this
    }, clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
};
THREE.Vector4 = function (n, t, i, r) {
    this.x = n || 0;
    this.y = t || 0;
    this.z = i || 0;
    this.w = void 0 !== r ? r : 1
};
THREE.Vector4.prototype = {
    constructor: THREE.Vector4, set: function (n, t, i, r) {
        return this.x = n, this.y = t, this.z = i, this.w = r, this
    }, setX: function (n) {
        return this.x = n, this
    }, setY: function (n) {
        return this.y = n, this
    }, setZ: function (n) {
        return this.z = n, this
    }, setW: function (n) {
        return this.w = n, this
    }, setComponent: function (n, t) {
        switch (n) {
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
                break;
            case 2:
                this.z = t;
                break;
            case 3:
                this.w = t;
                break;
            default:
                throw Error("index is out of range: " + n);
        }
    }, getComponent: function (n) {
        switch (n) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw Error("index is out of range: " + n);
        }
    }, copy: function (n) {
        return this.x = n.x, this.y = n.y, this.z = n.z, this.w = void 0 !== n.w ? n.w : 1, this
    }, add: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(n, t)) : (this.x += n.x, this.y += n.y, this.z += n.z, this.w += n.w, this)
    }, addScalar: function (n) {
        return this.x += n, this.y += n, this.z += n, this.w += n, this
    }, addVectors: function (n, t) {
        return this.x = n.x + t.x, this.y = n.y + t.y, this.z = n.z + t.z, this.w = n.w + t.w, this
    }, sub: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(n, t)) : (this.x -= n.x, this.y -= n.y, this.z -= n.z, this.w -= n.w, this)
    }, subScalar: function (n) {
        return this.x -= n, this.y -= n, this.z -= n, this.w -= n, this
    }, subVectors: function (n, t) {
        return this.x = n.x - t.x, this.y = n.y - t.y, this.z = n.z - t.z, this.w = n.w - t.w, this
    }, multiplyScalar: function (n) {
        return this.x *= n, this.y *= n, this.z *= n, this.w *= n, this
    }, applyMatrix4: function (n) {
        var t = this.x, i = this.y, r = this.z, u = this.w;
        return n = n.elements, this.x = n[0] * t + n[4] * i + n[8] * r + n[12] * u, this.y = n[1] * t + n[5] * i + n[9] * r + n[13] * u, this.z = n[2] * t + n[6] * i + n[10] * r + n[14] * u, this.w = n[3] * t + n[7] * i + n[11] * r + n[15] * u, this
    }, divideScalar: function (n) {
        return 0 !== n ? (n = 1 / n, this.x *= n, this.y *= n, this.z *= n, this.w *= n) : (this.z = this.y = this.x = 0, this.w = 1), this
    }, setAxisAngleFromQuaternion: function (n) {
        this.w = 2 * Math.acos(n.w);
        var t = Math.sqrt(1 - n.w * n.w);
        return .0001 > t ? (this.x = 1, this.z = this.y = 0) : (this.x = n.x / t, this.y = n.y / t, this.z = n.z / t), this
    }, setAxisAngleFromRotationMatrix: function (n) {
        var i, r, t, u, o;
        n = n.elements;
        u = n[0];
        t = n[4];
        var f = n[8], h = n[1], s = n[5], e = n[9];
        return (r = n[2], i = n[6], o = n[10], .01 > Math.abs(t - h) && .01 > Math.abs(f - r) && .01 > Math.abs(e - i)) ? .1 > Math.abs(t + h) && .1 > Math.abs(f + r) && .1 > Math.abs(e + i) && .1 > Math.abs(u + s + o - 3) ? (this.set(1, 0, 0, 0), this) : (n = Math.PI, u = (u + 1) / 2, s = (s + 1) / 2, o = (o + 1) / 2, t = (t + h) / 4, f = (f + r) / 4, e = (e + i) / 4, u > s && u > o ? .01 > u ? (i = 0, t = r = .707106781) : (i = Math.sqrt(u), r = t / i, t = f / i) : s > o ? .01 > s ? (i = .707106781, r = 0, t = .707106781) : (r = Math.sqrt(s), i = t / r, t = e / r) : .01 > o ? (r = i = .707106781, t = 0) : (t = Math.sqrt(o), i = f / t, r = e / t), this.set(i, r, t, n), this) : (n = Math.sqrt((i - e) * (i - e) + (f - r) * (f - r) + (h - t) * (h - t)), .001 > Math.abs(n) && (n = 1), this.x = (i - e) / n, this.y = (f - r) / n, this.z = (h - t) / n, this.w = Math.acos((u + s + o - 1) / 2), this)
    }, min: function (n) {
        return this.x > n.x && (this.x = n.x), this.y > n.y && (this.y = n.y), this.z > n.z && (this.z = n.z), this.w > n.w && (this.w = n.w), this
    }, max: function (n) {
        return this.x < n.x && (this.x = n.x), this.y < n.y && (this.y = n.y), this.z < n.z && (this.z = n.z), this.w < n.w && (this.w = n.w), this
    }, clamp: function (n, t) {
        return this.x < n.x ? this.x = n.x : this.x > t.x && (this.x = t.x), this.y < n.y ? this.y = n.y : this.y > t.y && (this.y = t.y), this.z < n.z ? this.z = n.z : this.z > t.z && (this.z = t.z), this.w < n.w ? this.w = n.w : this.w > t.w && (this.w = t.w), this
    }, clampScalar: function () {
        var n, t;
        return function (i, r) {
            return void 0 === n && (n = new THREE.Vector4, t = new THREE.Vector4), n.set(i, i, i, i), t.set(r, r, r, r), this.clamp(n, t)
        }
    }(), floor: function () {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
    }, ceil: function () {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
    }, round: function () {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
    }, roundToZero: function () {
        return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w), this
    }, negate: function () {
        return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
    }, dot: function (n) {
        return this.x * n.x + this.y * n.y + this.z * n.z + this.w * n.w
    }, lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    }, length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }, lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    }, normalize: function () {
        return this.divideScalar(this.length())
    }, setLength: function (n) {
        var t = this.length();
        return 0 !== t && n !== t && this.multiplyScalar(n / t), this
    }, lerp: function (n, t) {
        return this.x += (n.x - this.x) * t, this.y += (n.y - this.y) * t, this.z += (n.z - this.z) * t, this.w += (n.w - this.w) * t, this
    }, lerpVectors: function (n, t, i) {
        return this.subVectors(t, n).multiplyScalar(i).add(n), this
    }, equals: function (n) {
        return n.x === this.x && n.y === this.y && n.z === this.z && n.w === this.w
    }, fromArray: function (n, t) {
        return void 0 === t && (t = 0), this.x = n[t], this.y = n[t + 1], this.z = n[t + 2], this.w = n[t + 3], this
    }, toArray: function (n, t) {
        return void 0 === n && (n = []), void 0 === t && (t = 0), n[t] = this.x, n[t + 1] = this.y, n[t + 2] = this.z, n[t + 3] = this.w, n
    }, fromAttribute: function (n, t, i) {
        return void 0 === i && (i = 0), t = t * n.itemSize + i, this.x = n.array[t], this.y = n.array[t + 1], this.z = n.array[t + 2], this.w = n.array[t + 3], this
    }, clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
};
THREE.Euler = function (n, t, i, r) {
    this._x = n || 0;
    this._y = t || 0;
    this._z = i || 0;
    this._order = r || THREE.Euler.DefaultOrder
};
THREE.Euler.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" ");
THREE.Euler.DefaultOrder = "XYZ";
THREE.Euler.prototype = {
    constructor: THREE.Euler, _x: 0, _y: 0, _z: 0, _order: THREE.Euler.DefaultOrder, get x() {
        return this._x
    }, set x(n) {
        this._x = n;
        this.onChangeCallback()
    }, get y() {
        return this._y
    }, set y(n) {
        this._y = n;
        this.onChangeCallback()
    }, get z() {
        return this._z
    }, set z(n) {
        this._z = n;
        this.onChangeCallback()
    }, get order() {
        return this._order
    }, set order(n) {
        this._order = n;
        this.onChangeCallback()
    }, set: function (n, t, i, r) {
        return this._x = n, this._y = t, this._z = i, this._order = r || this._order, this.onChangeCallback(), this
    }, copy: function (n) {
        return this._x = n._x, this._y = n._y, this._z = n._z, this._order = n._order, this.onChangeCallback(), this
    }, setFromRotationMatrix: function (n, t, i) {
        var u = THREE.Math.clamp, r = n.elements;
        n = r[0];
        var e = r[4], o = r[8], s = r[1], f = r[5], h = r[9], c = r[2], l = r[6], r = r[10];
        return t = t || this._order, "XYZ" === t ? (this._y = Math.asin(u(o, -1, 1)), .99999 > Math.abs(o) ? (this._x = Math.atan2(-h, r), this._z = Math.atan2(-e, n)) : (this._x = Math.atan2(l, f), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-u(h, -1, 1)), .99999 > Math.abs(h) ? (this._y = Math.atan2(o, r), this._z = Math.atan2(s, f)) : (this._y = Math.atan2(-c, n), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(u(l, -1, 1)), .99999 > Math.abs(l) ? (this._y = Math.atan2(-c, r), this._z = Math.atan2(-e, f)) : (this._y = 0, this._z = Math.atan2(s, n))) : "ZYX" === t ? (this._y = Math.asin(-u(c, -1, 1)), .99999 > Math.abs(c) ? (this._x = Math.atan2(l, r), this._z = Math.atan2(s, n)) : (this._x = 0, this._z = Math.atan2(-e, f))) : "YZX" === t ? (this._z = Math.asin(u(s, -1, 1)), .99999 > Math.abs(s) ? (this._x = Math.atan2(-h, f), this._y = Math.atan2(-c, n)) : (this._x = 0, this._y = Math.atan2(o, r))) : "XZY" === t ? (this._z = Math.asin(-u(e, -1, 1)), .99999 > Math.abs(e) ? (this._x = Math.atan2(l, f), this._y = Math.atan2(o, n)) : (this._x = Math.atan2(-h, r), this._y = 0)) : THREE.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, !1 !== i && this.onChangeCallback(), this
    }, setFromQuaternion: function () {
        var n;
        return function (t, i, r) {
            return void 0 === n && (n = new THREE.Matrix4), n.makeRotationFromQuaternion(t), this.setFromRotationMatrix(n, i, r), this
        }
    }(), setFromVector3: function (n, t) {
        return this.set(n.x, n.y, n.z, t || this._order)
    }, reorder: function () {
        var n = new THREE.Quaternion;
        return function (t) {
            n.setFromEuler(this);
            this.setFromQuaternion(n, t)
        }
    }(), equals: function (n) {
        return n._x === this._x && n._y === this._y && n._z === this._z && n._order === this._order
    }, fromArray: function (n) {
        return this._x = n[0], this._y = n[1], this._z = n[2], void 0 !== n[3] && (this._order = n[3]), this.onChangeCallback(), this
    }, toArray: function (n, t) {
        return void 0 === n && (n = []), void 0 === t && (t = 0), n[t] = this._x, n[t + 1] = this._y, n[t + 2] = this._z, n[t + 3] = this._order, n
    }, toVector3: function (n) {
        return n ? n.set(this._x, this._y, this._z) : new THREE.Vector3(this._x, this._y, this._z)
    }, onChange: function (n) {
        return this.onChangeCallback = n, this
    }, onChangeCallback: function () {
    }, clone: function () {
        return new THREE.Euler(this._x, this._y, this._z, this._order)
    }
};
THREE.Line3 = function (n, t) {
    this.start = void 0 !== n ? n : new THREE.Vector3;
    this.end = void 0 !== t ? t : new THREE.Vector3
};
THREE.Line3.prototype = {
    constructor: THREE.Line3, set: function (n, t) {
        return this.start.copy(n), this.end.copy(t), this
    }, copy: function (n) {
        return this.start.copy(n.start), this.end.copy(n.end), this
    }, center: function (n) {
        return (n || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(.5)
    }, delta: function (n) {
        return (n || new THREE.Vector3).subVectors(this.end, this.start)
    }, distanceSq: function () {
        return this.start.distanceToSquared(this.end)
    }, distance: function () {
        return this.start.distanceTo(this.end)
    }, at: function (n, t) {
        var i = t || new THREE.Vector3;
        return this.delta(i).multiplyScalar(n).add(this.start)
    }, closestPointToPointParameter: function () {
        var t = new THREE.Vector3, n = new THREE.Vector3;
        return function (i, r) {
            t.subVectors(i, this.start);
            n.subVectors(this.end, this.start);
            var u = n.dot(n), u = n.dot(t) / u;
            return r && (u = THREE.Math.clamp(u, 0, 1)), u
        }
    }(), closestPointToPoint: function (n, t, i) {
        return n = this.closestPointToPointParameter(n, t), i = i || new THREE.Vector3, this.delta(i).multiplyScalar(n).add(this.start)
    }, applyMatrix4: function (n) {
        return this.start.applyMatrix4(n), this.end.applyMatrix4(n), this
    }, equals: function (n) {
        return n.start.equals(this.start) && n.end.equals(this.end)
    }, clone: function () {
        return (new THREE.Line3).copy(this)
    }
};
THREE.Box2 = function (n, t) {
    this.min = void 0 !== n ? n : new THREE.Vector2(Infinity, Infinity);
    this.max = void 0 !== t ? t : new THREE.Vector2(-Infinity, -Infinity)
};
THREE.Box2.prototype = {
    constructor: THREE.Box2, set: function (n, t) {
        return this.min.copy(n), this.max.copy(t), this
    }, setFromPoints: function (n) {
        this.makeEmpty();
        for (var t = 0, i = n.length; t < i; t++)this.expandByPoint(n[t]);
        return this
    }, setFromCenterAndSize: function () {
        var n = new THREE.Vector2;
        return function (t, i) {
            var r = n.copy(i).multiplyScalar(.5);
            return this.min.copy(t).sub(r), this.max.copy(t).add(r), this
        }
    }(), copy: function (n) {
        return this.min.copy(n.min), this.max.copy(n.max), this
    }, makeEmpty: function () {
        return this.min.x = this.min.y = Infinity, this.max.x = this.max.y = -Infinity, this
    }, empty: function () {
        return this.max.x < this.min.x || this.max.y < this.min.y
    }, center: function (n) {
        return (n || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(.5)
    }, size: function (n) {
        return (n || new THREE.Vector2).subVectors(this.max, this.min)
    }, expandByPoint: function (n) {
        return this.min.min(n), this.max.max(n), this
    }, expandByVector: function (n) {
        return this.min.sub(n), this.max.add(n), this
    }, expandByScalar: function (n) {
        return this.min.addScalar(-n), this.max.addScalar(n), this
    }, containsPoint: function (n) {
        return n.x < this.min.x || n.x > this.max.x || n.y < this.min.y || n.y > this.max.y ? !1 : !0
    }, containsBox: function (n) {
        return this.min.x <= n.min.x && n.max.x <= this.max.x && this.min.y <= n.min.y && n.max.y <= this.max.y ? !0 : !1
    }, getParameter: function (n, t) {
        return (t || new THREE.Vector2).set((n.x - this.min.x) / (this.max.x - this.min.x), (n.y - this.min.y) / (this.max.y - this.min.y))
    }, isIntersectionBox: function (n) {
        return n.max.x < this.min.x || n.min.x > this.max.x || n.max.y < this.min.y || n.min.y > this.max.y ? !1 : !0
    }, clampPoint: function (n, t) {
        return (t || new THREE.Vector2).copy(n).clamp(this.min, this.max)
    }, distanceToPoint: function () {
        var n = new THREE.Vector2;
        return function (t) {
            return n.copy(t).clamp(this.min, this.max).sub(t).length()
        }
    }(), intersect: function (n) {
        return this.min.max(n.min), this.max.min(n.max), this
    }, union: function (n) {
        return this.min.min(n.min), this.max.max(n.max), this
    }, translate: function (n) {
        return this.min.add(n), this.max.add(n), this
    }, equals: function (n) {
        return n.min.equals(this.min) && n.max.equals(this.max)
    }, clone: function () {
        return (new THREE.Box2).copy(this)
    }
};
THREE.Box3 = function (n, t) {
    this.min = void 0 !== n ? n : new THREE.Vector3(Infinity, Infinity, Infinity);
    this.max = void 0 !== t ? t : new THREE.Vector3(-Infinity, -Infinity, -Infinity)
};
THREE.Box3.prototype = {
    constructor: THREE.Box3, set: function (n, t) {
        return this.min.copy(n), this.max.copy(t), this
    }, setFromPoints: function (n) {
        this.makeEmpty();
        for (var t = 0, i = n.length; t < i; t++)this.expandByPoint(n[t]);
        return this
    }, setFromCenterAndSize: function () {
        var n = new THREE.Vector3;
        return function (t, i) {
            var r = n.copy(i).multiplyScalar(.5);
            return this.min.copy(t).sub(r), this.max.copy(t).add(r), this
        }
    }(), setFromObject: function () {
        var n = new THREE.Vector3;
        return function (t) {
            var i = this;
            return t.updateMatrixWorld(!0), this.makeEmpty(), t.traverse(function (t) {
                var r = t.geometry;
                if (void 0 !== r)if (r instanceof THREE.Geometry)for (var u = r.vertices, r = 0, f = u.length; r < f; r++)n.copy(u[r]), n.applyMatrix4(t.matrixWorld), i.expandByPoint(n); else if (r instanceof THREE.BufferGeometry && void 0 !== r.attributes.position)for (u = r.attributes.position.array, r = 0, f = u.length; r < f; r += 3)n.set(u[r], u[r + 1], u[r + 2]), n.applyMatrix4(t.matrixWorld), i.expandByPoint(n)
            }), this
        }
    }(), copy: function (n) {
        return this.min.copy(n.min), this.max.copy(n.max), this
    }, makeEmpty: function () {
        return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this
    }, empty: function () {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    }, center: function (n) {
        return (n || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(.5)
    }, size: function (n) {
        return (n || new THREE.Vector3).subVectors(this.max, this.min)
    }, expandByPoint: function (n) {
        return this.min.min(n), this.max.max(n), this
    }, expandByVector: function (n) {
        return this.min.sub(n), this.max.add(n), this
    }, expandByScalar: function (n) {
        return this.min.addScalar(-n), this.max.addScalar(n), this
    }, containsPoint: function (n) {
        return n.x < this.min.x || n.x > this.max.x || n.y < this.min.y || n.y > this.max.y || n.z < this.min.z || n.z > this.max.z ? !1 : !0
    }, containsBox: function (n) {
        return this.min.x <= n.min.x && n.max.x <= this.max.x && this.min.y <= n.min.y && n.max.y <= this.max.y && this.min.z <= n.min.z && n.max.z <= this.max.z ? !0 : !1
    }, getParameter: function (n, t) {
        return (t || new THREE.Vector3).set((n.x - this.min.x) / (this.max.x - this.min.x), (n.y - this.min.y) / (this.max.y - this.min.y), (n.z - this.min.z) / (this.max.z - this.min.z))
    }, isIntersectionBox: function (n) {
        return n.max.x < this.min.x || n.min.x > this.max.x || n.max.y < this.min.y || n.min.y > this.max.y || n.max.z < this.min.z || n.min.z > this.max.z ? !1 : !0
    }, clampPoint: function (n, t) {
        return (t || new THREE.Vector3).copy(n).clamp(this.min, this.max)
    }, distanceToPoint: function () {
        var n = new THREE.Vector3;
        return function (t) {
            return n.copy(t).clamp(this.min, this.max).sub(t).length()
        }
    }(), getBoundingSphere: function () {
        var n = new THREE.Vector3;
        return function (t) {
            return t = t || new THREE.Sphere, t.center = this.center(), t.radius = .5 * this.size(n).length(), t
        }
    }(), intersect: function (n) {
        return this.min.max(n.min), this.max.min(n.max), this
    }, union: function (n) {
        return this.min.min(n.min), this.max.max(n.max), this
    }, applyMatrix4: function () {
        var n = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
        return function (t) {
            return n[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), n[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), n[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), n[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), n[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), n[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), n[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), n[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.makeEmpty(), this.setFromPoints(n), this
        }
    }(), translate: function (n) {
        return this.min.add(n), this.max.add(n), this
    }, equals: function (n) {
        return n.min.equals(this.min) && n.max.equals(this.max)
    }, clone: function () {
        return (new THREE.Box3).copy(this)
    }
};
THREE.Matrix3 = function () {
    this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    0 < arguments.length && THREE.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
};
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3, set: function (n, t, i, r, u, f, e, o, s) {
        var h = this.elements;
        return h[0] = n, h[3] = t, h[6] = i, h[1] = r, h[4] = u, h[7] = f, h[2] = e, h[5] = o, h[8] = s, this
    }, identity: function () {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
    }, copy: function (n) {
        return n = n.elements, this.set(n[0], n[3], n[6], n[1], n[4], n[7], n[2], n[5], n[8]), this
    }, multiplyVector3: function (n) {
        return THREE.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), n.applyMatrix3(this)
    }, multiplyVector3Array: function (n) {
        return THREE.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(n)
    }, applyToVector3Array: function () {
        var n = new THREE.Vector3;
        return function (t, i, r) {
            void 0 === i && (i = 0);
            void 0 === r && (r = t.length);
            for (var u = 0; u < r; u += 3, i += 3)n.x = t[i], n.y = t[i + 1], n.z = t[i + 2], n.applyMatrix3(this), t[i] = n.x, t[i + 1] = n.y, t[i + 2] = n.z;
            return t
        }
    }(), multiplyScalar: function (n) {
        var t = this.elements;
        return t[0] *= n, t[3] *= n, t[6] *= n, t[1] *= n, t[4] *= n, t[7] *= n, t[2] *= n, t[5] *= n, t[8] *= n, this
    }, determinant: function () {
        var n = this.elements, t = n[0], i = n[1], r = n[2], u = n[3], f = n[4], e = n[5], o = n[6], s = n[7], n = n[8];
        return t * f * n - t * e * s - i * u * n + i * e * o + r * u * s - r * f * o
    }, getInverse: function (n, t) {
        var i = n.elements, r = this.elements;
        if (r[0] = i[10] * i[5] - i[6] * i[9], r[1] = -i[10] * i[1] + i[2] * i[9], r[2] = i[6] * i[1] - i[2] * i[5], r[3] = -i[10] * i[4] + i[6] * i[8], r[4] = i[10] * i[0] - i[2] * i[8], r[5] = -i[6] * i[0] + i[2] * i[4], r[6] = i[9] * i[4] - i[5] * i[8], r[7] = -i[9] * i[0] + i[1] * i[8], r[8] = i[5] * i[0] - i[1] * i[4], i = i[0] * r[0] + i[1] * r[3] + i[2] * r[6], 0 === i) {
            if (t)throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
            return THREE.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
        }
        return this.multiplyScalar(1 / i), this
    }, transpose: function () {
        var t, n = this.elements;
        return t = n[1], n[1] = n[3], n[3] = t, t = n[2], n[2] = n[6], n[6] = t, t = n[5], n[5] = n[7], n[7] = t, this
    }, flattenToArrayOffset: function (n, t) {
        var i = this.elements;
        return n[t] = i[0], n[t + 1] = i[1], n[t + 2] = i[2], n[t + 3] = i[3], n[t + 4] = i[4], n[t + 5] = i[5], n[t + 6] = i[6], n[t + 7] = i[7], n[t + 8] = i[8], n
    }, getNormalMatrix: function (n) {
        return this.getInverse(n).transpose(), this
    }, transposeIntoArray: function (n) {
        var t = this.elements;
        return n[0] = t[0], n[1] = t[3], n[2] = t[6], n[3] = t[1], n[4] = t[4], n[5] = t[7], n[6] = t[2], n[7] = t[5], n[8] = t[8], this
    }, fromArray: function (n) {
        return this.elements.set(n), this
    }, toArray: function () {
        var n = this.elements;
        return [n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8]]
    }, clone: function () {
        return (new THREE.Matrix3).fromArray(this.elements)
    }
};
THREE.Matrix4 = function () {
    this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    0 < arguments.length && THREE.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
};
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4, set: function (n, t, i, r, u, f, e, o, s, h, c, l, a, v, y, p) {
        var w = this.elements;
        return w[0] = n, w[4] = t, w[8] = i, w[12] = r, w[1] = u, w[5] = f, w[9] = e, w[13] = o, w[2] = s, w[6] = h, w[10] = c, w[14] = l, w[3] = a, w[7] = v, w[11] = y, w[15] = p, this
    }, identity: function () {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }, copy: function (n) {
        return this.elements.set(n.elements), this
    }, extractPosition: function (n) {
        return THREE.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(n)
    }, copyPosition: function (n) {
        var t = this.elements;
        return n = n.elements, t[12] = n[12], t[13] = n[13], t[14] = n[14], this
    }, extractBasis: function (n, t, i) {
        var r = this.elements;
        return n.set(r[0], r[1], r[2]), t.set(r[4], r[5], r[6]), i.set(r[8], r[9], r[10]), this
    }, makeBasis: function (n, t, i) {
        return this.set(n.x, t.x, i.x, 0, n.y, t.y, i.y, 0, n.z, t.z, i.z, 0, 0, 0, 0, 1), this
    }, extractRotation: function () {
        var n = new THREE.Vector3;
        return function (t) {
            var i = this.elements;
            t = t.elements;
            var r = 1 / n.set(t[0], t[1], t[2]).length(), u = 1 / n.set(t[4], t[5], t[6]).length(), f = 1 / n.set(t[8], t[9], t[10]).length();
            return i[0] = t[0] * r, i[1] = t[1] * r, i[2] = t[2] * r, i[4] = t[4] * u, i[5] = t[5] * u, i[6] = t[6] * u, i[8] = t[8] * f, i[9] = t[9] * f, i[10] = t[10] * f, this
        }
    }(), makeRotationFromEuler: function (n) {
        !1 == n instanceof THREE.Euler && THREE.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var t = this.elements, i = n.x, r = n.y, u = n.z, f = Math.cos(i), i = Math.sin(i), e = Math.cos(r), r = Math.sin(r), o = Math.cos(u), u = Math.sin(u);
        if ("XYZ" === n.order) {
            n = f * o;
            var s = f * u, h = i * o, c = i * u;
            t[0] = e * o;
            t[4] = -e * u;
            t[8] = r;
            t[1] = s + h * r;
            t[5] = n - c * r;
            t[9] = -i * e;
            t[2] = c - n * r;
            t[6] = h + s * r;
            t[10] = f * e
        } else"YXZ" === n.order ? (n = e * o, s = e * u, h = r * o, c = r * u, t[0] = n + c * i, t[4] = h * i - s, t[8] = f * r, t[1] = f * u, t[5] = f * o, t[9] = -i, t[2] = s * i - h, t[6] = c + n * i, t[10] = f * e) : "ZXY" === n.order ? (n = e * o, s = e * u, h = r * o, c = r * u, t[0] = n - c * i, t[4] = -f * u, t[8] = h + s * i, t[1] = s + h * i, t[5] = f * o, t[9] = c - n * i, t[2] = -f * r, t[6] = i, t[10] = f * e) : "ZYX" === n.order ? (n = f * o, s = f * u, h = i * o, c = i * u, t[0] = e * o, t[4] = h * r - s, t[8] = n * r + c, t[1] = e * u, t[5] = c * r + n, t[9] = s * r - h, t[2] = -r, t[6] = i * e, t[10] = f * e) : "YZX" === n.order ? (n = f * e, s = f * r, h = i * e, c = i * r, t[0] = e * o, t[4] = c - n * u, t[8] = h * u + s, t[1] = u, t[5] = f * o, t[9] = -i * o, t[2] = -r * o, t[6] = s * u + h, t[10] = n - c * u) : "XZY" === n.order && (n = f * e, s = f * r, h = i * e, c = i * r, t[0] = e * o, t[4] = -u, t[8] = r * o, t[1] = n * u + c, t[5] = f * o, t[9] = s * u - h, t[2] = h * u - s, t[6] = i * o, t[10] = c * u + n);
        return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
    }, setRotationFromQuaternion: function (n) {
        return THREE.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(n)
    }, makeRotationFromQuaternion: function (n) {
        var t = this.elements, i = n.x, r = n.y, u = n.z, f = n.w, o = i + i, e = r + r, s = u + u;
        n = i * o;
        var h = i * e, i = i * s, c = r * e, r = r * s, u = u * s, o = f * o, e = f * e, f = f * s;
        return t[0] = 1 - (c + u), t[4] = h - f, t[8] = i + e, t[1] = h + f, t[5] = 1 - (n + u), t[9] = r - o, t[2] = i - e, t[6] = r + o, t[10] = 1 - (n + c), t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
    }, lookAt: function () {
        var t = new THREE.Vector3, i = new THREE.Vector3, n = new THREE.Vector3;
        return function (r, u, f) {
            var e = this.elements;
            return n.subVectors(r, u).normalize(), 0 === n.length() && (n.z = 1), t.crossVectors(f, n).normalize(), 0 === t.length() && (n.x += .0001, t.crossVectors(f, n).normalize()), i.crossVectors(n, t), e[0] = t.x, e[4] = i.x, e[8] = n.x, e[1] = t.y, e[5] = i.y, e[9] = n.y, e[2] = t.z, e[6] = i.z, e[10] = n.z, this
        }
    }(), multiply: function (n, t) {
        return void 0 !== t ? (THREE.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(n, t)) : this.multiplyMatrices(this, n)
    }, multiplyMatrices: function (n, t) {
        var i = n.elements, r = t.elements, u = this.elements, f = i[0], e = i[4], o = i[8], s = i[12], h = i[1], c = i[5], l = i[9], a = i[13], v = i[2], y = i[6], p = i[10], w = i[14], b = i[3], k = i[7], d = i[11], i = i[15], g = r[0], nt = r[4], tt = r[8], it = r[12], rt = r[1], ut = r[5], ft = r[9], et = r[13], ot = r[2], st = r[6], ht = r[10], ct = r[14], lt = r[3], at = r[7], vt = r[11], r = r[15];
        return u[0] = f * g + e * rt + o * ot + s * lt, u[4] = f * nt + e * ut + o * st + s * at, u[8] = f * tt + e * ft + o * ht + s * vt, u[12] = f * it + e * et + o * ct + s * r, u[1] = h * g + c * rt + l * ot + a * lt, u[5] = h * nt + c * ut + l * st + a * at, u[9] = h * tt + c * ft + l * ht + a * vt, u[13] = h * it + c * et + l * ct + a * r, u[2] = v * g + y * rt + p * ot + w * lt, u[6] = v * nt + y * ut + p * st + w * at, u[10] = v * tt + y * ft + p * ht + w * vt, u[14] = v * it + y * et + p * ct + w * r, u[3] = b * g + k * rt + d * ot + i * lt, u[7] = b * nt + k * ut + d * st + i * at, u[11] = b * tt + k * ft + d * ht + i * vt, u[15] = b * it + k * et + d * ct + i * r, this
    }, multiplyToArray: function (n, t, i) {
        var r = this.elements;
        return this.multiplyMatrices(n, t), i[0] = r[0], i[1] = r[1], i[2] = r[2], i[3] = r[3], i[4] = r[4], i[5] = r[5], i[6] = r[6], i[7] = r[7], i[8] = r[8], i[9] = r[9], i[10] = r[10], i[11] = r[11], i[12] = r[12], i[13] = r[13], i[14] = r[14], i[15] = r[15], this
    }, multiplyScalar: function (n) {
        var t = this.elements;
        return t[0] *= n, t[4] *= n, t[8] *= n, t[12] *= n, t[1] *= n, t[5] *= n, t[9] *= n, t[13] *= n, t[2] *= n, t[6] *= n, t[10] *= n, t[14] *= n, t[3] *= n, t[7] *= n, t[11] *= n, t[15] *= n, this
    }, multiplyVector3: function (n) {
        return THREE.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), n.applyProjection(this)
    }, multiplyVector4: function (n) {
        return THREE.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), n.applyMatrix4(this)
    }, multiplyVector3Array: function (n) {
        return THREE.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(n)
    }, applyToVector3Array: function () {
        var n = new THREE.Vector3;
        return function (t, i, r) {
            void 0 === i && (i = 0);
            void 0 === r && (r = t.length);
            for (var u = 0; u < r; u += 3, i += 3)n.x = t[i], n.y = t[i + 1], n.z = t[i + 2], n.applyMatrix4(this), t[i] = n.x, t[i + 1] = n.y, t[i + 2] = n.z;
            return t
        }
    }(), rotateAxis: function (n) {
        THREE.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
        n.transformDirection(this)
    }, crossVector: function (n) {
        return THREE.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), n.applyMatrix4(this)
    }, determinant: function () {
        var n = this.elements, t = n[0], i = n[4], r = n[8], u = n[12], f = n[1], e = n[5], o = n[9], s = n[13], h = n[2], c = n[6], l = n[10], a = n[14];
        return n[3] * (+u * o * c - r * s * c - u * e * l + i * s * l + r * e * a - i * o * a) + n[7] * (+t * o * a - t * s * l + u * f * l - r * f * a + r * s * h - u * o * h) + n[11] * (+t * s * c - t * e * a - u * f * c + i * f * a + u * e * h - i * s * h) + n[15] * (-r * e * h - t * o * c + t * e * l + r * f * c - i * f * l + i * o * h)
    }, transpose: function () {
        var n = this.elements, t;
        return t = n[1], n[1] = n[4], n[4] = t, t = n[2], n[2] = n[8], n[8] = t, t = n[6], n[6] = n[9], n[9] = t, t = n[3], n[3] = n[12], n[12] = t, t = n[7], n[7] = n[13], n[13] = t, t = n[11], n[11] = n[14], n[14] = t, this
    }, flattenToArrayOffset: function (n, t) {
        var i = this.elements;
        return n[t] = i[0], n[t + 1] = i[1], n[t + 2] = i[2], n[t + 3] = i[3], n[t + 4] = i[4], n[t + 5] = i[5], n[t + 6] = i[6], n[t + 7] = i[7], n[t + 8] = i[8], n[t + 9] = i[9], n[t + 10] = i[10], n[t + 11] = i[11], n[t + 12] = i[12], n[t + 13] = i[13], n[t + 14] = i[14], n[t + 15] = i[15], n
    }, getPosition: function () {
        var n = new THREE.Vector3;
        return function () {
            THREE.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
            var t = this.elements;
            return n.set(t[12], t[13], t[14])
        }
    }(), setPosition: function (n) {
        var t = this.elements;
        return t[12] = n.x, t[13] = n.y, t[14] = n.z, this
    }, getInverse: function (n, t) {
        var r = this.elements, i = n.elements, u = i[0], s = i[4], h = i[8], c = i[12], f = i[1], l = i[5], a = i[9], v = i[13], e = i[2], y = i[6], p = i[10], w = i[14], o = i[3], b = i[7], k = i[11], i = i[15];
        if (r[0] = a * w * b - v * p * b + v * y * k - l * w * k - a * y * i + l * p * i, r[4] = c * p * b - h * w * b - c * y * k + s * w * k + h * y * i - s * p * i, r[8] = h * v * b - c * a * b + c * l * k - s * v * k - h * l * i + s * a * i, r[12] = c * a * y - h * v * y - c * l * p + s * v * p + h * l * w - s * a * w, r[1] = v * p * o - a * w * o - v * e * k + f * w * k + a * e * i - f * p * i, r[5] = h * w * o - c * p * o + c * e * k - u * w * k - h * e * i + u * p * i, r[9] = c * a * o - h * v * o - c * f * k + u * v * k + h * f * i - u * a * i, r[13] = h * v * e - c * a * e + c * f * p - u * v * p - h * f * w + u * a * w, r[2] = l * w * o - v * y * o + v * e * b - f * w * b - l * e * i + f * y * i, r[6] = c * y * o - s * w * o - c * e * b + u * w * b + s * e * i - u * y * i, r[10] = s * v * o - c * l * o + c * f * b - u * v * b - s * f * i + u * l * i, r[14] = c * l * e - s * v * e - c * f * y + u * v * y + s * f * w - u * l * w, r[3] = a * y * o - l * p * o - a * e * b + f * p * b + l * e * k - f * y * k, r[7] = s * p * o - h * y * o + h * e * b - u * p * b - s * e * k + u * y * k, r[11] = h * l * o - s * a * o - h * f * b + u * a * b + s * f * k - u * l * k, r[15] = s * a * e - h * l * e + h * f * y - u * a * y - s * f * p + u * l * p, r = u * r[0] + f * r[4] + e * r[8] + o * r[12], 0 == r) {
            if (t)throw Error("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");
            return THREE.warn("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
        }
        return this.multiplyScalar(1 / r), this
    }, translate: function () {
        THREE.error("THREE.Matrix4: .translate() has been removed.")
    }, rotateX: function () {
        THREE.error("THREE.Matrix4: .rotateX() has been removed.")
    }, rotateY: function () {
        THREE.error("THREE.Matrix4: .rotateY() has been removed.")
    }, rotateZ: function () {
        THREE.error("THREE.Matrix4: .rotateZ() has been removed.")
    }, rotateByAxis: function () {
        THREE.error("THREE.Matrix4: .rotateByAxis() has been removed.")
    }, scale: function (n) {
        var t = this.elements, i = n.x, r = n.y;
        return n = n.z, t[0] *= i, t[4] *= r, t[8] *= n, t[1] *= i, t[5] *= r, t[9] *= n, t[2] *= i, t[6] *= r, t[10] *= n, t[3] *= i, t[7] *= r, t[11] *= n, this
    }, getMaxScaleOnAxis: function () {
        var n = this.elements;
        return Math.sqrt(Math.max(n[0] * n[0] + n[1] * n[1] + n[2] * n[2], Math.max(n[4] * n[4] + n[5] * n[5] + n[6] * n[6], n[8] * n[8] + n[9] * n[9] + n[10] * n[10])))
    }, makeTranslation: function (n, t, i) {
        return this.set(1, 0, 0, n, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this
    }, makeRotationX: function (n) {
        var t = Math.cos(n);
        return n = Math.sin(n), this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this
    }, makeRotationY: function (n) {
        var t = Math.cos(n);
        return n = Math.sin(n), this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this
    }, makeRotationZ: function (n) {
        var t = Math.cos(n);
        return n = Math.sin(n), this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }, makeRotationAxis: function (n, t) {
        var e = Math.cos(t), r = Math.sin(t), s = 1 - e, o = n.x, u = n.y, i = n.z, f = s * o, h = s * u;
        return this.set(f * o + e, f * u - r * i, f * i + r * u, 0, f * u + r * i, h * u + e, h * i - r * o, 0, f * i - r * u, h * i + r * o, s * i * i + e, 0, 0, 0, 0, 1), this
    }, makeScale: function (n, t, i) {
        return this.set(n, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
    }, compose: function (n, t, i) {
        return this.makeRotationFromQuaternion(t), this.scale(i), this.setPosition(n), this
    }, decompose: function () {
        var t = new THREE.Vector3, n = new THREE.Matrix4;
        return function (i, r, u) {
            var f = this.elements, e = t.set(f[0], f[1], f[2]).length(), s = t.set(f[4], f[5], f[6]).length(), h = t.set(f[8], f[9], f[10]).length(), o;
            return 0 > this.determinant() && (e = -e), i.x = f[12], i.y = f[13], i.z = f[14], n.elements.set(this.elements), i = 1 / e, f = 1 / s, o = 1 / h, n.elements[0] *= i, n.elements[1] *= i, n.elements[2] *= i, n.elements[4] *= f, n.elements[5] *= f, n.elements[6] *= f, n.elements[8] *= o, n.elements[9] *= o, n.elements[10] *= o, r.setFromRotationMatrix(n), u.x = e, u.y = s, u.z = h, this
        }
    }(), makeFrustum: function (n, t, i, r, u, f) {
        var e = this.elements;
        return e[0] = 2 * u / (t - n), e[4] = 0, e[8] = (t + n) / (t - n), e[12] = 0, e[1] = 0, e[5] = 2 * u / (r - i), e[9] = (r + i) / (r - i), e[13] = 0, e[2] = 0, e[6] = 0, e[10] = -(f + u) / (f - u), e[14] = -2 * f * u / (f - u), e[3] = 0, e[7] = 0, e[11] = -1, e[15] = 0, this
    }, makePerspective: function (n, t, i, r) {
        n = i * Math.tan(THREE.Math.degToRad(.5 * n));
        var u = -n;
        return this.makeFrustum(u * t, n * t, u, n, i, r)
    }, makeOrthographic: function (n, t, i, r, u, f) {
        var e = this.elements, o = t - n, s = i - r, h = f - u;
        return e[0] = 2 / o, e[4] = 0, e[8] = 0, e[12] = -((t + n) / o), e[1] = 0, e[5] = 2 / s, e[9] = 0, e[13] = -((i + r) / s), e[2] = 0, e[6] = 0, e[10] = -2 / h, e[14] = -((f + u) / h), e[3] = 0, e[7] = 0, e[11] = 0, e[15] = 1, this
    }, fromArray: function (n) {
        return this.elements.set(n), this
    }, toArray: function () {
        var n = this.elements;
        return [n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11], n[12], n[13], n[14], n[15]]
    }, clone: function () {
        return (new THREE.Matrix4).fromArray(this.elements)
    }
};
THREE.Ray = function (n, t) {
    this.origin = void 0 !== n ? n : new THREE.Vector3;
    this.direction = void 0 !== t ? t : new THREE.Vector3
};
THREE.Ray.prototype = {
    constructor: THREE.Ray, set: function (n, t) {
        return this.origin.copy(n), this.direction.copy(t), this
    }, copy: function (n) {
        return this.origin.copy(n.origin), this.direction.copy(n.direction), this
    }, at: function (n, t) {
        return (t || new THREE.Vector3).copy(this.direction).multiplyScalar(n).add(this.origin)
    }, recast: function () {
        var n = new THREE.Vector3;
        return function (t) {
            return this.origin.copy(this.at(t, n)), this
        }
    }(), closestPointToPoint: function (n, t) {
        var i = t || new THREE.Vector3, r;
        return i.subVectors(n, this.origin), r = i.dot(this.direction), 0 > r ? i.copy(this.origin) : i.copy(this.direction).multiplyScalar(r).add(this.origin)
    }, distanceToPoint: function () {
        var n = new THREE.Vector3;
        return function (t) {
            var i = n.subVectors(t, this.origin).dot(this.direction);
            return 0 > i ? this.origin.distanceTo(t) : (n.copy(this.direction).multiplyScalar(i).add(this.origin), n.distanceTo(t))
        }
    }(), distanceSqToSegment: function () {
        var i = new THREE.Vector3, n = new THREE.Vector3, t = new THREE.Vector3;
        return function (r, u, f, e) {
            i.copy(r).add(u).multiplyScalar(.5);
            n.copy(u).sub(r).normalize();
            t.copy(this.origin).sub(i);
            var s = .5 * r.distanceTo(u), o = -this.direction.dot(n), c = t.dot(this.direction), h = -t.dot(n), l = t.lengthSq(), v = Math.abs(1 - o * o), a;
            return 0 < v ? (r = o * h - c, u = o * c - h, a = s * v, 0 <= r ? u >= -a ? u <= a ? (s = 1 / v, r *= s, u *= s, o = r * (r + o * u + 2 * c) + u * (o * r + u + 2 * h) + l) : (u = s, r = Math.max(0, -(o * u + c)), o = -r * r + u * (u + 2 * h) + l) : (u = -s, r = Math.max(0, -(o * u + c)), o = -r * r + u * (u + 2 * h) + l) : u <= -a ? (r = Math.max(0, -(-o * s + c)), u = 0 < r ? -s : Math.min(Math.max(-s, -h), s), o = -r * r + u * (u + 2 * h) + l) : u <= a ? (r = 0, u = Math.min(Math.max(-s, -h), s), o = u * (u + 2 * h) + l) : (r = Math.max(0, -(o * s + c)), u = 0 < r ? s : Math.min(Math.max(-s, -h), s), o = -r * r + u * (u + 2 * h) + l)) : (u = 0 < o ? -s : s, r = Math.max(0, -(o * u + c)), o = -r * r + u * (u + 2 * h) + l), f && f.copy(this.direction).multiplyScalar(r).add(this.origin), e && e.copy(n).multiplyScalar(u).add(i), o
        }
    }(), isIntersectionSphere: function (n) {
        return this.distanceToPoint(n.center) <= n.radius
    }, intersectSphere: function () {
        var n = new THREE.Vector3;
        return function (t, i) {
            n.subVectors(t.center, this.origin);
            var r = n.dot(this.direction), u = n.dot(n) - r * r, f = t.radius * t.radius;
            return u > f ? null : (f = Math.sqrt(f - u), u = r - f, r += f, 0 > u && 0 > r ? null : 0 > u ? this.at(r, i) : this.at(u, i))
        }
    }(), isIntersectionPlane: function (n) {
        var t = n.distanceToPoint(this.origin);
        return 0 === t || 0 > n.normal.dot(this.direction) * t ? !0 : !1
    }, distanceToPlane: function (n) {
        var t = n.normal.dot(this.direction);
        return 0 == t ? 0 == n.distanceToPoint(this.origin) ? 0 : null : (n = -(this.origin.dot(n.normal) + n.constant) / t, 0 <= n ? n : null)
    }, intersectPlane: function (n, t) {
        var i = this.distanceToPlane(n);
        return null === i ? null : this.at(i, t)
    }, isIntersectionBox: function () {
        var n = new THREE.Vector3;
        return function (t) {
            return null !== this.intersectBox(t, n)
        }
    }(), intersectBox: function (n, t) {
        var r, i, f, e, o, u;
        return (i = 1 / this.direction.x, e = 1 / this.direction.y, o = 1 / this.direction.z, u = this.origin, 0 <= i ? (r = (n.min.x - u.x) * i, i *= n.max.x - u.x) : (r = (n.max.x - u.x) * i, i *= n.min.x - u.x), 0 <= e ? (f = (n.min.y - u.y) * e, e *= n.max.y - u.y) : (f = (n.max.y - u.y) * e, e *= n.min.y - u.y), r > e || f > i) ? null : ((f > r || r !== r) && (r = f), (e < i || i !== i) && (i = e), 0 <= o ? (f = (n.min.z - u.z) * o, o *= n.max.z - u.z) : (f = (n.max.z - u.z) * o, o *= n.min.z - u.z), r > o || f > i) ? null : ((f > r || r !== r) && (r = f), (o < i || i !== i) && (i = o), 0 > i ? null : this.at(0 <= r ? r : i, t))
    }, intersectTriangle: function () {
        var n = new THREE.Vector3, i = new THREE.Vector3, t = new THREE.Vector3, r = new THREE.Vector3;
        return function (u, f, e, o, s) {
            if (i.subVectors(f, u), t.subVectors(e, u), r.crossVectors(i, t), f = this.direction.dot(r), 0 < f) {
                if (o)return null;
                o = 1
            } else if (0 > f)o = -1, f = -f; else return null;
            return (n.subVectors(this.origin, u), u = o * this.direction.dot(t.crossVectors(n, t)), 0 > u) ? null : (e = o * this.direction.dot(i.cross(n)), 0 > e || u + e > f) ? null : (u = -o * n.dot(r), 0 > u ? null : this.at(u / f, s))
        }
    }(), applyMatrix4: function (n) {
        return this.direction.add(this.origin).applyMatrix4(n), this.origin.applyMatrix4(n), this.direction.sub(this.origin), this.direction.normalize(), this
    }, equals: function (n) {
        return n.origin.equals(this.origin) && n.direction.equals(this.direction)
    }, clone: function () {
        return (new THREE.Ray).copy(this)
    }
};
THREE.Sphere = function (n, t) {
    this.center = void 0 !== n ? n : new THREE.Vector3;
    this.radius = void 0 !== t ? t : 0
};
THREE.Sphere.prototype = {
    constructor: THREE.Sphere, set: function (n, t) {
        return this.center.copy(n), this.radius = t, this
    }, setFromPoints: function () {
        var n = new THREE.Box3;
        return function (t, i) {
            var r = this.center;
            void 0 !== i ? r.copy(i) : n.setFromPoints(t).center(r);
            for (var u = 0, f = 0, e = t.length; f < e; f++)u = Math.max(u, r.distanceToSquared(t[f]));
            return this.radius = Math.sqrt(u), this
        }
    }(), copy: function (n) {
        return this.center.copy(n.center), this.radius = n.radius, this
    }, empty: function () {
        return 0 >= this.radius
    }, containsPoint: function (n) {
        return n.distanceToSquared(this.center) <= this.radius * this.radius
    }, distanceToPoint: function (n) {
        return n.distanceTo(this.center) - this.radius
    }, intersectsSphere: function (n) {
        var t = this.radius + n.radius;
        return n.center.distanceToSquared(this.center) <= t * t
    }, clampPoint: function (n, t) {
        var r = this.center.distanceToSquared(n), i = t || new THREE.Vector3;
        return i.copy(n), r > this.radius * this.radius && (i.sub(this.center).normalize(), i.multiplyScalar(this.radius).add(this.center)), i
    }, getBoundingBox: function (n) {
        return n = n || new THREE.Box3, n.set(this.center, this.center), n.expandByScalar(this.radius), n
    }, applyMatrix4: function (n) {
        return this.center.applyMatrix4(n), this.radius *= n.getMaxScaleOnAxis(), this
    }, translate: function (n) {
        return this.center.add(n), this
    }, equals: function (n) {
        return n.center.equals(this.center) && n.radius === this.radius
    }, clone: function () {
        return (new THREE.Sphere).copy(this)
    }
};
THREE.Frustum = function (n, t, i, r, u, f) {
    this.planes = [void 0 !== n ? n : new THREE.Plane, void 0 !== t ? t : new THREE.Plane, void 0 !== i ? i : new THREE.Plane, void 0 !== r ? r : new THREE.Plane, void 0 !== u ? u : new THREE.Plane, void 0 !== f ? f : new THREE.Plane]
};
THREE.Frustum.prototype = {
    constructor: THREE.Frustum, set: function (n, t, i, r, u, f) {
        var e = this.planes;
        return e[0].copy(n), e[1].copy(t), e[2].copy(i), e[3].copy(r), e[4].copy(u), e[5].copy(f), this
    }, copy: function (n) {
        for (var i = this.planes, t = 0; 6 > t; t++)i[t].copy(n.planes[t]);
        return this
    }, setFromMatrix: function (n) {
        var i = this.planes, t = n.elements;
        n = t[0];
        var e = t[1], o = t[2], r = t[3], s = t[4], h = t[5], c = t[6], u = t[7], l = t[8], a = t[9], v = t[10], f = t[11], y = t[12], p = t[13], w = t[14], t = t[15];
        return i[0].setComponents(r - n, u - s, f - l, t - y).normalize(), i[1].setComponents(r + n, u + s, f + l, t + y).normalize(), i[2].setComponents(r + e, u + h, f + a, t + p).normalize(), i[3].setComponents(r - e, u - h, f - a, t - p).normalize(), i[4].setComponents(r - o, u - c, f - v, t - w).normalize(), i[5].setComponents(r + o, u + c, f + v, t + w).normalize(), this
    }, intersectsObject: function () {
        var n = new THREE.Sphere;
        return function (t) {
            var i = t.geometry;
            return null === i.boundingSphere && i.computeBoundingSphere(), n.copy(i.boundingSphere), n.applyMatrix4(t.matrixWorld), this.intersectsSphere(n)
        }
    }(), intersectsSphere: function (n) {
        var i = this.planes, r = n.center, t;
        for (n = -n.radius, t = 0; 6 > t; t++)if (i[t].distanceToPoint(r) < n)return !1;
        return !0
    }, intersectsBox: function () {
        var n = new THREE.Vector3, t = new THREE.Vector3;
        return function (i) {
            for (var e, r, f = this.planes, u = 0; 6 > u; u++)if (r = f[u], n.x = 0 < r.normal.x ? i.min.x : i.max.x, t.x = 0 < r.normal.x ? i.max.x : i.min.x, n.y = 0 < r.normal.y ? i.min.y : i.max.y, t.y = 0 < r.normal.y ? i.max.y : i.min.y, n.z = 0 < r.normal.z ? i.min.z : i.max.z, t.z = 0 < r.normal.z ? i.max.z : i.min.z, e = r.distanceToPoint(n), r = r.distanceToPoint(t), 0 > e && 0 > r)return !1;
            return !0
        }
    }(), containsPoint: function (n) {
        for (var i = this.planes, t = 0; 6 > t; t++)if (0 > i[t].distanceToPoint(n))return !1;
        return !0
    }, clone: function () {
        return (new THREE.Frustum).copy(this)
    }
};
THREE.Plane = function (n, t) {
    this.normal = void 0 !== n ? n : new THREE.Vector3(1, 0, 0);
    this.constant = void 0 !== t ? t : 0
};
THREE.Plane.prototype = {
    constructor: THREE.Plane, set: function (n, t) {
        return this.normal.copy(n), this.constant = t, this
    }, setComponents: function (n, t, i, r) {
        return this.normal.set(n, t, i), this.constant = r, this
    }, setFromNormalAndCoplanarPoint: function (n, t) {
        return this.normal.copy(n), this.constant = -t.dot(this.normal), this
    }, setFromCoplanarPoints: function () {
        var n = new THREE.Vector3, t = new THREE.Vector3;
        return function (i, r, u) {
            return r = n.subVectors(u, r).cross(t.subVectors(i, r)).normalize(), this.setFromNormalAndCoplanarPoint(r, i), this
        }
    }(), copy: function (n) {
        return this.normal.copy(n.normal), this.constant = n.constant, this
    }, normalize: function () {
        var n = 1 / this.normal.length();
        return this.normal.multiplyScalar(n), this.constant *= n, this
    }, negate: function () {
        return this.constant *= -1, this.normal.negate(), this
    }, distanceToPoint: function (n) {
        return this.normal.dot(n) + this.constant
    }, distanceToSphere: function (n) {
        return this.distanceToPoint(n.center) - n.radius
    }, projectPoint: function (n, t) {
        return this.orthoPoint(n, t).sub(n).negate()
    }, orthoPoint: function (n, t) {
        var i = this.distanceToPoint(n);
        return (t || new THREE.Vector3).copy(this.normal).multiplyScalar(i)
    }, isIntersectionLine: function (n) {
        var t = this.distanceToPoint(n.start);
        return n = this.distanceToPoint(n.end), 0 > t && 0 < n || 0 > n && 0 < t
    }, intersectLine: function () {
        var n = new THREE.Vector3;
        return function (t, i) {
            var u = i || new THREE.Vector3, f = t.delta(n), r = this.normal.dot(f);
            if (0 == r) {
                if (0 == this.distanceToPoint(t.start))return u.copy(t.start)
            } else return r = -(t.start.dot(this.normal) + this.constant) / r, 0 > r || 1 < r ? void 0 : u.copy(f).multiplyScalar(r).add(t.start)
        }
    }(), coplanarPoint: function (n) {
        return (n || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
    }, applyMatrix4: function () {
        var n = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Matrix3;
        return function (r, u) {
            var f = u || i.getNormalMatrix(r), f = n.copy(this.normal).applyMatrix3(f), e = this.coplanarPoint(t);
            return e.applyMatrix4(r), this.setFromNormalAndCoplanarPoint(f, e), this
        }
    }(), translate: function (n) {
        return this.constant -= n.dot(this.normal), this
    }, equals: function (n) {
        return n.normal.equals(this.normal) && n.constant == this.constant
    }, clone: function () {
        return (new THREE.Plane).copy(this)
    }
};
THREE.Math = {
    generateUUID: function () {
        var r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), n = Array(36), t = 0, i;
        return function () {
            for (var u = 0; 36 > u; u++)8 == u || 13 == u || 18 == u || 23 == u ? n[u] = "-" : 14 == u ? n[u] = "4" : (2 >= t && (t = 33554432 + 16777216 * Math.random() | 0), i = t & 15, t >>= 4, n[u] = r[19 == u ? i & 3 | 8 : i]);
            return n.join("")
        }
    }(), clamp: function (n, t, i) {
        return n < t ? t : n > i ? i : n
    }, clampBottom: function (n, t) {
        return n < t ? t : n
    }, mapLinear: function (n, t, i, r, u) {
        return r + (n - t) * (u - r) / (i - t)
    }, smoothstep: function (n, t, i) {
        return n <= t ? 0 : n >= i ? 1 : (n = (n - t) / (i - t), n * n * (3 - 2 * n))
    }, smootherstep: function (n, t, i) {
        return n <= t ? 0 : n >= i ? 1 : (n = (n - t) / (i - t), n * n * n * (n * (6 * n - 15) + 10))
    }, random16: function () {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    }, randInt: function (n, t) {
        return Math.floor(this.randFloat(n, t))
    }, randFloat: function (n, t) {
        return n + Math.random() * (t - n)
    }, randFloatSpread: function (n) {
        return n * (.5 - Math.random())
    }, degToRad: function () {
        var n = Math.PI / 180;
        return function (t) {
            return t * n
        }
    }(), radToDeg: function () {
        var n = 180 / Math.PI;
        return function (t) {
            return t * n
        }
    }(), isPowerOfTwo: function (n) {
        return 0 == (n & n - 1) && 0 !== n
    }, nextPowerOfTwo: function (n) {
        return n--, n |= n >> 1, n |= n >> 2, n |= n >> 4, n |= n >> 8, n |= n >> 16, n++, n
    }
};
THREE.Spline = function (n) {
    function l(n, t, i, r, u, f, e) {
        return n = .5 * (i - n), r = .5 * (r - t), (2 * (t - i) + n + r) * e + (-3 * (t - i) - 2 * n - r) * f + n * u + t
    }

    this.points = n;
    var i = [], f = {x: 0, y: 0, z: 0}, a, t, r, u, e, o, s, h, c;
    this.initFromArray = function (n) {
        this.points = [];
        for (var t = 0; t < n.length; t++)this.points[t] = {x: n[t][0], y: n[t][1], z: n[t][2]}
    };
    this.getPoint = function (n) {
        return a = (this.points.length - 1) * n, t = Math.floor(a), r = a - t, i[0] = 0 === t ? t : t - 1, i[1] = t, i[2] = t > this.points.length - 2 ? this.points.length - 1 : t + 1, i[3] = t > this.points.length - 3 ? this.points.length - 1 : t + 2, o = this.points[i[0]], s = this.points[i[1]], h = this.points[i[2]], c = this.points[i[3]], u = r * r, e = r * u, f.x = l(o.x, s.x, h.x, c.x, r, u, e), f.y = l(o.y, s.y, h.y, c.y, r, u, e), f.z = l(o.z, s.z, h.z, c.z, r, u, e), f
    };
    this.getControlPointsArray = function () {
        for (var t, r = this.points.length, i = [], n = 0; n < r; n++)t = this.points[n], i[n] = [t.x, t.y, t.z];
        return i
    };
    this.getLength = function (n) {
        var t, u, f, o = t = t = 0, e = new THREE.Vector3, s = new THREE.Vector3, i = [], r = 0;
        for (i[0] = 0, n || (n = 100), u = this.points.length * n, e.copy(this.points[0]), n = 1; n < u; n++)t = n / u, f = this.getPoint(t), s.copy(f), r += s.distanceTo(e), e.copy(f), t *= this.points.length - 1, t = Math.floor(t), t != o && (i[t] = r, o = t);
        return i[i.length] = r, {chunks: i, total: r}
    };
    this.reparametrizeByArcLength = function (n) {
        var t, i, r, f, h, e, u = [], o = new THREE.Vector3, s = this.getLength();
        for (u.push(o.copy(this.points[0]).clone()), t = 1; t < this.points.length; t++) {
            for (i = s.chunks[t] - s.chunks[t - 1], e = Math.ceil(n * i / s.total), f = (t - 1) / (this.points.length - 1), h = t / (this.points.length - 1), i = 1; i < e - 1; i++)r = f + 1 / e * i * (h - f), r = this.getPoint(r), u.push(o.copy(r).clone());
            u.push(o.copy(this.points[t]).clone())
        }
        this.points = u
    }
};
THREE.Triangle = function (n, t, i) {
    this.a = void 0 !== n ? n : new THREE.Vector3;
    this.b = void 0 !== t ? t : new THREE.Vector3;
    this.c = void 0 !== i ? i : new THREE.Vector3
};
THREE.Triangle.normal = function () {
    var n = new THREE.Vector3;
    return function (t, i, r, u) {
        return u = u || new THREE.Vector3, u.subVectors(r, i), n.subVectors(t, i), u.cross(n), t = u.lengthSq(), 0 < t ? u.multiplyScalar(1 / Math.sqrt(t)) : u.set(0, 0, 0)
    }
}();
THREE.Triangle.barycoordFromPoint = function () {
    var n = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Vector3;
    return function (r, u, f, e, o) {
        var s, h;
        return (n.subVectors(e, u), t.subVectors(f, u), i.subVectors(r, u), r = n.dot(n), u = n.dot(t), f = n.dot(i), s = t.dot(t), e = t.dot(i), h = r * s - u * u, o = o || new THREE.Vector3, 0 == h) ? o.set(-2, -1, -1) : (h = 1 / h, s = (s * f - u * e) * h, r = (r * e - u * f) * h, o.set(1 - s - r, r, s))
    }
}();
THREE.Triangle.containsPoint = function () {
    var n = new THREE.Vector3;
    return function (t, i, r, u) {
        return t = THREE.Triangle.barycoordFromPoint(t, i, r, u, n), 0 <= t.x && 0 <= t.y && 1 >= t.x + t.y
    }
}();
THREE.Triangle.prototype = {
    constructor: THREE.Triangle, set: function (n, t, i) {
        return this.a.copy(n), this.b.copy(t), this.c.copy(i), this
    }, setFromPointsAndIndices: function (n, t, i, r) {
        return this.a.copy(n[t]), this.b.copy(n[i]), this.c.copy(n[r]), this
    }, copy: function (n) {
        return this.a.copy(n.a), this.b.copy(n.b), this.c.copy(n.c), this
    }, area: function () {
        var n = new THREE.Vector3, t = new THREE.Vector3;
        return function () {
            return n.subVectors(this.c, this.b), t.subVectors(this.a, this.b), .5 * n.cross(t).length()
        }
    }(), midpoint: function (n) {
        return (n || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    }, normal: function (n) {
        return THREE.Triangle.normal(this.a, this.b, this.c, n)
    }, plane: function (n) {
        return (n || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
    }, barycoordFromPoint: function (n, t) {
        return THREE.Triangle.barycoordFromPoint(n, this.a, this.b, this.c, t)
    }, containsPoint: function (n) {
        return THREE.Triangle.containsPoint(n, this.a, this.b, this.c)
    }, equals: function (n) {
        return n.a.equals(this.a) && n.b.equals(this.b) && n.c.equals(this.c)
    }, clone: function () {
        return (new THREE.Triangle).copy(this)
    }
};
THREE.Clock = function (n) {
    this.autoStart = void 0 !== n ? n : !0;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = !1
};
THREE.Clock.prototype = {
    constructor: THREE.Clock, start: function () {
        this.oldTime = this.startTime = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now();
        this.running = !0
    }, stop: function () {
        this.getElapsedTime();
        this.running = !1
    }, getElapsedTime: function () {
        return this.getDelta(), this.elapsedTime
    }, getDelta: function () {
        var n = 0, t;
        return this.autoStart && !this.running && this.start(), this.running && (t = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(), n = .001 * (t - this.oldTime), this.oldTime = t, this.elapsedTime += n), n
    }
};
THREE.EventDispatcher = function () {
};
THREE.EventDispatcher.prototype = {
    constructor: THREE.EventDispatcher, apply: function (n) {
        n.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
        n.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
        n.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
        n.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent
    }, addEventListener: function (n, t) {
        void 0 === this._listeners && (this._listeners = {});
        var i = this._listeners;
        void 0 === i[n] && (i[n] = []);
        -1 === i[n].indexOf(t) && i[n].push(t)
    }, hasEventListener: function (n, t) {
        if (void 0 === this._listeners)return !1;
        var i = this._listeners;
        return void 0 !== i[n] && -1 !== i[n].indexOf(t) ? !0 : !1
    }, removeEventListener: function (n, t) {
        var i, r;
        void 0 !== this._listeners && (i = this._listeners[n], void 0 !== i && (r = i.indexOf(t), -1 !== r && i.splice(r, 1)))
    }, dispatchEvent: function (n) {
        var i;
        if (void 0 !== this._listeners && (i = this._listeners[n.type], void 0 !== i)) {
            n.target = this;
            for (var r = [], u = i.length, t = 0; t < u; t++)r[t] = i[t];
            for (t = 0; t < u; t++)r[t].call(this, n)
        }
    }
}, function (n) {
    n.Raycaster = function (t, i, r, u) {
        this.ray = new n.Ray(t, i);
        this.near = r || 0;
        this.far = u || Infinity;
        this.params = {Sprite: {}, Mesh: {}, PointCloud: {threshold: 1}, LOD: {}, Line: {}}
    };
    var i = function (n, t) {
        return n.distance - t.distance
    }, t = function (n, i, r, u) {
        if (n.raycast(i, r), !0 === u) {
            n = n.children;
            u = 0;
            for (var f = n.length; u < f; u++)t(n[u], i, r, !0)
        }
    };
    n.Raycaster.prototype = {
        constructor: n.Raycaster, precision: .0001, linePrecision: 1, set: function (n, t) {
            this.ray.set(n, t)
        }, setFromCamera: function (t, i) {
            i instanceof n.PerspectiveCamera ? (this.ray.origin.copy(i.position), this.ray.direction.set(t.x, t.y, .5).unproject(i).sub(i.position).normalize()) : i instanceof n.OrthographicCamera ? (this.ray.origin.set(t.x, t.y, -1).unproject(i), this.ray.direction.set(0, 0, -1).transformDirection(i.matrixWorld)) : n.error("THREE.Raycaster: Unsupported camera type.")
        }, intersectObject: function (n, r) {
            var u = [];
            return t(n, this, u, r), u.sort(i), u
        }, intersectObjects: function (r, u) {
            var f = [], e, o;
            if (!1 == r instanceof Array)return n.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), f;
            for (e = 0, o = r.length; e < o; e++)t(r[e], this, f, u);
            return f.sort(i), f
        }
    }
}(THREE);
THREE.Object3D = function () {
    Object.defineProperty(this, "id", {value: THREE.Object3DIdCount++});
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "Object3D";
    this.parent = void 0;
    this.children = [];
    this.up = THREE.Object3D.DefaultUp.clone();
    var i = new THREE.Vector3, n = new THREE.Euler, t = new THREE.Quaternion, r = new THREE.Vector3(1, 1, 1);
    n.onChange(function () {
        t.setFromEuler(n, !1)
    });
    t.onChange(function () {
        n.setFromQuaternion(t, void 0, !1)
    });
    Object.defineProperties(this, {
        position: {enumerable: !0, value: i},
        rotation: {enumerable: !0, value: n},
        quaternion: {enumerable: !0, value: t},
        scale: {enumerable: !0, value: r}
    });
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixAutoUpdate = !0;
    this.matrixWorldNeedsUpdate = !1;
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this.renderOrder = 0;
    this.userData = {}
};
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 1, 0);
THREE.Object3D.prototype = {
    constructor: THREE.Object3D, get eulerOrder() {
        return THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order
    }, set eulerOrder(n) {
        THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order.");
        this.rotation.order = n
    }, get useQuaternion() {
        THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
    }, set useQuaternion(a) {
        THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
    }, applyMatrix: function (n) {
        this.matrix.multiplyMatrices(n, this.matrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale)
    }, setRotationFromAxisAngle: function (n, t) {
        this.quaternion.setFromAxisAngle(n, t)
    }, setRotationFromEuler: function (n) {
        this.quaternion.setFromEuler(n, !0)
    }, setRotationFromMatrix: function (n) {
        this.quaternion.setFromRotationMatrix(n)
    }, setRotationFromQuaternion: function (n) {
        this.quaternion.copy(n)
    }, rotateOnAxis: function () {
        var n = new THREE.Quaternion;
        return function (t, i) {
            return n.setFromAxisAngle(t, i), this.quaternion.multiply(n), this
        }
    }(), rotateX: function () {
        var n = new THREE.Vector3(1, 0, 0);
        return function (t) {
            return this.rotateOnAxis(n, t)
        }
    }(), rotateY: function () {
        var n = new THREE.Vector3(0, 1, 0);
        return function (t) {
            return this.rotateOnAxis(n, t)
        }
    }(), rotateZ: function () {
        var n = new THREE.Vector3(0, 0, 1);
        return function (t) {
            return this.rotateOnAxis(n, t)
        }
    }(), translateOnAxis: function () {
        var n = new THREE.Vector3;
        return function (t, i) {
            return n.copy(t).applyQuaternion(this.quaternion), this.position.add(n.multiplyScalar(i)), this
        }
    }(), translate: function (n, t) {
        return THREE.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(t, n)
    }, translateX: function () {
        var n = new THREE.Vector3(1, 0, 0);
        return function (t) {
            return this.translateOnAxis(n, t)
        }
    }(), translateY: function () {
        var n = new THREE.Vector3(0, 1, 0);
        return function (t) {
            return this.translateOnAxis(n, t)
        }
    }(), translateZ: function () {
        var n = new THREE.Vector3(0, 0, 1);
        return function (t) {
            return this.translateOnAxis(n, t)
        }
    }(), localToWorld: function (n) {
        return n.applyMatrix4(this.matrixWorld)
    }, worldToLocal: function () {
        var n = new THREE.Matrix4;
        return function (t) {
            return t.applyMatrix4(n.getInverse(this.matrixWorld))
        }
    }(), lookAt: function () {
        var n = new THREE.Matrix4;
        return function (t) {
            n.lookAt(t, this.position, this.up);
            this.quaternion.setFromRotationMatrix(n)
        }
    }(), add: function (n) {
        if (1 < arguments.length) {
            for (var t = 0; t < arguments.length; t++)this.add(arguments[t]);
            return this
        }
        return n === this ? (THREE.error("THREE.Object3D.add: object can't be added as a child of itself.", n), this) : (n instanceof THREE.Object3D ? (void 0 !== n.parent && n.parent.remove(n), n.parent = this, n.dispatchEvent({type: "added"}), this.children.push(n)) : THREE.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", n), this)
    }, remove: function (n) {
        if (1 < arguments.length)for (var t = 0; t < arguments.length; t++)this.remove(arguments[t]);
        t = this.children.indexOf(n);
        -1 !== t && (n.parent = void 0, n.dispatchEvent({type: "removed"}), this.children.splice(t, 1))
    }, getChildByName: function (n) {
        return THREE.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(n)
    }, getObjectById: function (n) {
        return this.getObjectByProperty("id", n)
    }, getObjectByName: function (n) {
        return this.getObjectByProperty("name", n)
    }, getObjectByProperty: function (n, t) {
        var i, u, r;
        if (this[n] === t)return this;
        for (i = 0, u = this.children.length; i < u; i++)if (r = this.children[i].getObjectByProperty(n, t), void 0 !== r)return r
    }, getWorldPosition: function (n) {
        return n = n || new THREE.Vector3, this.updateMatrixWorld(!0), n.setFromMatrixPosition(this.matrixWorld)
    }, getWorldQuaternion: function () {
        var n = new THREE.Vector3, t = new THREE.Vector3;
        return function (i) {
            return i = i || new THREE.Quaternion, this.updateMatrixWorld(!0), this.matrixWorld.decompose(n, i, t), i
        }
    }(), getWorldRotation: function () {
        var n = new THREE.Quaternion;
        return function (t) {
            return t = t || new THREE.Euler, this.getWorldQuaternion(n), t.setFromQuaternion(n, this.rotation.order, !1)
        }
    }(), getWorldScale: function () {
        var n = new THREE.Vector3, t = new THREE.Quaternion;
        return function (i) {
            return i = i || new THREE.Vector3, this.updateMatrixWorld(!0), this.matrixWorld.decompose(n, t, i), i
        }
    }(), getWorldDirection: function () {
        var n = new THREE.Quaternion;
        return function (t) {
            return t = t || new THREE.Vector3, this.getWorldQuaternion(n), t.set(0, 0, 1).applyQuaternion(n)
        }
    }(), raycast: function () {
    }, traverse: function (n) {
        n(this);
        for (var t = 0, i = this.children.length; t < i; t++)this.children[t].traverse(n)
    }, traverseVisible: function (n) {
        if (!1 !== this.visible) {
            n(this);
            for (var t = 0, i = this.children.length; t < i; t++)this.children[t].traverseVisible(n)
        }
    }, traverseAncestors: function (n) {
        this.parent && (n(this.parent), this.parent.traverseAncestors(n))
    }, updateMatrix: function () {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = !0
    }, updateMatrixWorld: function (n) {
        !0 === this.matrixAutoUpdate && this.updateMatrix();
        (!0 === this.matrixWorldNeedsUpdate || !0 === n) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, n = !0);
        for (var t = 0, i = this.children.length; t < i; t++)this.children[t].updateMatrixWorld(n)
    }, toJSON: function () {
        var n = {
            metadata: {
                version: 4.3,
                type: "Object",
                generator: "ObjectExporter"
            }
        }, t = {}, i = {}, r = function (t) {
            if (void 0 === n.materials && (n.materials = []), void 0 === i[t.uuid]) {
                var r = t.toJSON();
                delete r.metadata;
                i[t.uuid] = r;
                n.materials.push(r)
            }
            return t.uuid
        }, u = function (i) {
            var f = {}, e, o;
            if (f.uuid = i.uuid, f.type = i.type, "" !== i.name && (f.name = i.name), "{}" !== JSON.stringify(i.userData) && (f.userData = i.userData), !0 !== i.visible && (f.visible = i.visible), i instanceof THREE.PerspectiveCamera ? (f.fov = i.fov, f.aspect = i.aspect, f.near = i.near, f.far = i.far) : i instanceof THREE.OrthographicCamera ? (f.left = i.left, f.right = i.right, f.top = i.top, f.bottom = i.bottom, f.near = i.near, f.far = i.far) : i instanceof THREE.AmbientLight ? f.color = i.color.getHex() : i instanceof THREE.DirectionalLight ? (f.color = i.color.getHex(), f.intensity = i.intensity) : i instanceof THREE.PointLight ? (f.color = i.color.getHex(), f.intensity = i.intensity, f.distance = i.distance, f.decay = i.decay) : i instanceof THREE.SpotLight ? (f.color = i.color.getHex(), f.intensity = i.intensity, f.distance = i.distance, f.angle = i.angle, f.exponent = i.exponent, f.decay = i.decay) : i instanceof THREE.HemisphereLight ? (f.color = i.color.getHex(), f.groundColor = i.groundColor.getHex()) : i instanceof THREE.Mesh || i instanceof THREE.Line || i instanceof THREE.PointCloud ? (e = i.geometry, void 0 === n.geometries && (n.geometries = []), void 0 === t[e.uuid] && (o = e.toJSON(), delete o.metadata, t[e.uuid] = o, n.geometries.push(o)), f.geometry = e.uuid, f.material = r(i.material), i instanceof THREE.Line && (f.mode = i.mode)) : i instanceof THREE.Sprite && (f.material = r(i.material)), f.matrix = i.matrix.toArray(), 0 < i.children.length)for (f.children = [], e = 0; e < i.children.length; e++)f.children.push(u(i.children[e]));
            return f
        };
        return n.object = u(this), n
    }, clone: function (n, t) {
        if (void 0 === n && (n = new THREE.Object3D), void 0 === t && (t = !0), n.name = this.name, n.up.copy(this.up), n.position.copy(this.position), n.quaternion.copy(this.quaternion), n.scale.copy(this.scale), n.rotationAutoUpdate = this.rotationAutoUpdate, n.matrix.copy(this.matrix), n.matrixWorld.copy(this.matrixWorld), n.matrixAutoUpdate = this.matrixAutoUpdate, n.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, n.visible = this.visible, n.castShadow = this.castShadow, n.receiveShadow = this.receiveShadow, n.frustumCulled = this.frustumCulled, n.userData = JSON.parse(JSON.stringify(this.userData)), !0 === t)for (var i = 0; i < this.children.length; i++)n.add(this.children[i].clone());
        return n
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype);
THREE.Object3DIdCount = 0;
THREE.Face3 = function (n, t, i, r, u, f) {
    this.a = n;
    this.b = t;
    this.c = i;
    this.normal = r instanceof THREE.Vector3 ? r : new THREE.Vector3;
    this.vertexNormals = r instanceof Array ? r : [];
    this.color = u instanceof THREE.Color ? u : new THREE.Color;
    this.vertexColors = u instanceof Array ? u : [];
    this.vertexTangents = [];
    this.materialIndex = void 0 !== f ? f : 0
};
THREE.Face3.prototype = {
    constructor: THREE.Face3, clone: function () {
        var t = new THREE.Face3(this.a, this.b, this.c), n, i;
        for (t.normal.copy(this.normal), t.color.copy(this.color), t.materialIndex = this.materialIndex, n = 0, i = this.vertexNormals.length; n < i; n++)t.vertexNormals[n] = this.vertexNormals[n].clone();
        for (n = 0, i = this.vertexColors.length; n < i; n++)t.vertexColors[n] = this.vertexColors[n].clone();
        for (n = 0, i = this.vertexTangents.length; n < i; n++)t.vertexTangents[n] = this.vertexTangents[n].clone();
        return t
    }
};
THREE.Face4 = function (n, t, i, r, u, f, e) {
    return THREE.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new THREE.Face3(n, t, i, u, f, e)
};
THREE.BufferAttribute = function (n, t) {
    this.array = n;
    this.itemSize = t;
    this.needsUpdate = !1
};
THREE.BufferAttribute.prototype = {
    constructor: THREE.BufferAttribute, get length() {
        return this.array.length
    }, copyAt: function (n, t, i) {
        n *= this.itemSize;
        i *= t.itemSize;
        for (var r = 0, u = this.itemSize; r < u; r++)this.array[n + r] = t.array[i + r];
        return this
    }, set: function (n, t) {
        return void 0 === t && (t = 0), this.array.set(n, t), this
    }, setX: function (n, t) {
        return this.array[n * this.itemSize] = t, this
    }, setY: function (n, t) {
        return this.array[n * this.itemSize + 1] = t, this
    }, setZ: function (n, t) {
        return this.array[n * this.itemSize + 2] = t, this
    }, setXY: function (n, t, i) {
        return n *= this.itemSize, this.array[n] = t, this.array[n + 1] = i, this
    }, setXYZ: function (n, t, i, r) {
        return n *= this.itemSize, this.array[n] = t, this.array[n + 1] = i, this.array[n + 2] = r, this
    }, setXYZW: function (n, t, i, r, u) {
        return n *= this.itemSize, this.array[n] = t, this.array[n + 1] = i, this.array[n + 2] = r, this.array[n + 3] = u, this
    }, clone: function () {
        return new THREE.BufferAttribute(new this.array.constructor(this.array), this.itemSize)
    }
};
THREE.Int8Attribute = function (n, t) {
    return THREE.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Uint8Attribute = function (n, t) {
    return THREE.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Uint8ClampedAttribute = function (n, t) {
    return THREE.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Int16Attribute = function (n, t) {
    return THREE.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Uint16Attribute = function (n, t) {
    return THREE.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Int32Attribute = function (n, t) {
    return THREE.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Uint32Attribute = function (n, t) {
    return THREE.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Float32Attribute = function (n, t) {
    return THREE.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.Float64Attribute = function (n, t) {
    return THREE.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new THREE.BufferAttribute(n, t)
};
THREE.DynamicBufferAttribute = function (n, t) {
    THREE.BufferAttribute.call(this, n, t);
    this.updateRange = {offset: 0, count: -1}
};
THREE.DynamicBufferAttribute.prototype = Object.create(THREE.BufferAttribute.prototype);
THREE.DynamicBufferAttribute.prototype.constructor = THREE.DynamicBufferAttribute;
THREE.DynamicBufferAttribute.prototype.clone = function () {
    return new THREE.DynamicBufferAttribute(new this.array.constructor(this.array), this.itemSize)
};
THREE.BufferGeometry = function () {
    Object.defineProperty(this, "id", {value: THREE.GeometryIdCount++});
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "BufferGeometry";
    this.attributes = {};
    this.attributesKeys = [];
    this.offsets = this.drawcalls = [];
    this.boundingSphere = this.boundingBox = null
};
THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry, addAttribute: function (n, t, i) {
        !1 == t instanceof THREE.BufferAttribute ? (THREE.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.attributes[n] = {
            array: t,
            itemSize: i
        }) : (this.attributes[n] = t, this.attributesKeys = Object.keys(this.attributes))
    }, getAttribute: function (n) {
        return this.attributes[n]
    }, addDrawCall: function (n, t, i) {
        this.drawcalls.push({start: n, count: t, index: void 0 !== i ? i : 0})
    }, applyMatrix: function (n) {
        var t = this.attributes.position;
        void 0 !== t && (n.applyToVector3Array(t.array), t.needsUpdate = !0);
        t = this.attributes.normal;
        void 0 !== t && ((new THREE.Matrix3).getNormalMatrix(n).applyToVector3Array(t.array), t.needsUpdate = !0);
        null !== this.boundingBox && this.computeBoundingBox();
        null !== this.boundingSphere && this.computeBoundingSphere()
    }, center: function () {
        this.computeBoundingBox();
        var n = this.boundingBox.center().negate();
        return this.applyMatrix((new THREE.Matrix4).setPosition(n)), n
    }, fromGeometry: function (n, t) {
        var f, e, h;
        t = t || {vertexColors: THREE.NoColors};
        var p = n.vertices, c = n.faces, y = n.faceVertexUvs, w = t.vertexColors, b = 0 < y[0].length, k = 3 == c[0].vertexNormals.length, s = new Float32Array(9 * c.length);
        this.addAttribute("position", new THREE.BufferAttribute(s, 3));
        f = new Float32Array(9 * c.length);
        this.addAttribute("normal", new THREE.BufferAttribute(f, 3));
        w !== THREE.NoColors && (e = new Float32Array(9 * c.length), this.addAttribute("color", new THREE.BufferAttribute(e, 3)));
        !0 === b && (h = new Float32Array(6 * c.length), this.addAttribute("uv", new THREE.BufferAttribute(h, 2)));
        for (var v = 0, l = 0, i = 0; v < c.length; v++, l += 6, i += 9) {
            var r = c[v], u = p[r.a], o = p[r.b], a = p[r.c];
            s[i] = u.x;
            s[i + 1] = u.y;
            s[i + 2] = u.z;
            s[i + 3] = o.x;
            s[i + 4] = o.y;
            s[i + 5] = o.z;
            s[i + 6] = a.x;
            s[i + 7] = a.y;
            s[i + 8] = a.z;
            !0 === k ? (u = r.vertexNormals[0], o = r.vertexNormals[1], a = r.vertexNormals[2], f[i] = u.x, f[i + 1] = u.y, f[i + 2] = u.z, f[i + 3] = o.x, f[i + 4] = o.y, f[i + 5] = o.z, f[i + 6] = a.x, f[i + 7] = a.y, f[i + 8] = a.z) : (u = r.normal, f[i] = u.x, f[i + 1] = u.y, f[i + 2] = u.z, f[i + 3] = u.x, f[i + 4] = u.y, f[i + 5] = u.z, f[i + 6] = u.x, f[i + 7] = u.y, f[i + 8] = u.z);
            w === THREE.FaceColors ? (r = r.color, e[i] = r.r, e[i + 1] = r.g, e[i + 2] = r.b, e[i + 3] = r.r, e[i + 4] = r.g, e[i + 5] = r.b, e[i + 6] = r.r, e[i + 7] = r.g, e[i + 8] = r.b) : w === THREE.VertexColors && (u = r.vertexColors[0], o = r.vertexColors[1], r = r.vertexColors[2], e[i] = u.r, e[i + 1] = u.g, e[i + 2] = u.b, e[i + 3] = o.r, e[i + 4] = o.g, e[i + 5] = o.b, e[i + 6] = r.r, e[i + 7] = r.g, e[i + 8] = r.b);
            !0 === b && (r = y[0][v][0], u = y[0][v][1], o = y[0][v][2], h[l] = r.x, h[l + 1] = r.y, h[l + 2] = u.x, h[l + 3] = u.y, h[l + 4] = o.x, h[l + 5] = o.y)
        }
        return this.computeBoundingSphere(), this
    }, computeBoundingBox: function () {
        var n = new THREE.Vector3;
        return function () {
            var t, r, i, u;
            if (null === this.boundingBox && (this.boundingBox = new THREE.Box3), t = this.attributes.position.array, t)for (r = this.boundingBox, r.makeEmpty(), i = 0, u = t.length; i < u; i += 3)n.set(t[i], t[i + 1], t[i + 2]), r.expandByPoint(n);
            (void 0 === t || 0 === t.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0));
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && THREE.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
        }
    }(), computeBoundingSphere: function () {
        var t = new THREE.Box3, n = new THREE.Vector3;
        return function () {
            var r;
            if (null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere), r = this.attributes.position.array, r) {
                t.makeEmpty();
                for (var e = this.boundingSphere.center, i = 0, u = r.length; i < u; i += 3)n.set(r[i], r[i + 1], r[i + 2]), t.expandByPoint(n);
                t.center(e);
                for (var f = 0, i = 0, u = r.length; i < u; i += 3)n.set(r[i], r[i + 1], r[i + 2]), f = Math.max(f, e.distanceToSquared(n));
                this.boundingSphere.radius = Math.sqrt(f);
                isNaN(this.boundingSphere.radius) && THREE.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
            }
        }
    }(), computeFaceNormals: function () {
    }, computeVertexNormals: function () {
        var u = this.attributes, r;
        if (u.position) {
            if (r = u.position.array, void 0 === u.normal)this.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(r.length), 3)); else for (var i = u.normal.array, n = 0, f = i.length; n < f; n++)i[n] = 0;
            var i = u.normal.array, e, s, h, l = new THREE.Vector3, o = new THREE.Vector3, a = new THREE.Vector3, t = new THREE.Vector3, v = new THREE.Vector3;
            if (u.index)for (var y = u.index.array, p = 0 < this.offsets.length ? this.offsets : [{
                start: 0,
                count: y.length,
                index: 0
            }], c = 0, b = p.length; c < b; ++c) {
                f = p[c].start;
                e = p[c].count;
                for (var w = p[c].index, n = f, f = f + e; n < f; n += 3)e = 3 * (w + y[n]), s = 3 * (w + y[n + 1]), h = 3 * (w + y[n + 2]), l.fromArray(r, e), o.fromArray(r, s), a.fromArray(r, h), t.subVectors(a, o), v.subVectors(l, o), t.cross(v), i[e] += t.x, i[e + 1] += t.y, i[e + 2] += t.z, i[s] += t.x, i[s + 1] += t.y, i[s + 2] += t.z, i[h] += t.x, i[h + 1] += t.y, i[h + 2] += t.z
            } else for (n = 0, f = r.length; n < f; n += 9)l.fromArray(r, n), o.fromArray(r, n + 3), a.fromArray(r, n + 6), t.subVectors(a, o), v.subVectors(l, o), t.cross(v), i[n] = t.x, i[n + 1] = t.y, i[n + 2] = t.z, i[n + 3] = t.x, i[n + 4] = t.y, i[n + 5] = t.z, i[n + 6] = t.x, i[n + 7] = t.y, i[n + 8] = t.z;
            this.normalizeNormals();
            u.normal.needsUpdate = !0
        }
    }, computeTangents: function () {
        function ni(n, t, i) {
            o.fromArray(b, 3 * n);
            d.fromArray(b, 3 * t);
            g.fromArray(b, 3 * i);
            l.fromArray(st, 2 * n);
            ht.fromArray(st, 2 * t);
            ct.fromArray(st, 2 * i);
            lt = d.x - o.x;
            at = g.x - o.x;
            vt = d.y - o.y;
            yt = g.y - o.y;
            pt = d.z - o.z;
            wt = g.z - o.z;
            a = ht.x - l.x;
            v = ct.x - l.x;
            y = ht.y - l.y;
            p = ct.y - l.y;
            s = 1 / (a * p - v * y);
            nt.set((p * lt - y * at) * s, (p * vt - y * yt) * s, (p * pt - y * wt) * s);
            tt.set((a * at - v * lt) * s, (a * yt - v * vt) * s, (a * wt - v * pt) * s);
            h[n].add(nt);
            h[t].add(nt);
            h[i].add(nt);
            c[n].add(tt);
            c[t].add(tt);
            c[i].add(tt)
        }

        function ot(n) {
            ft.fromArray(ti, 3 * n);
            kt.copy(ft);
            et = h[n];
            w.copy(et);
            w.sub(ft.multiplyScalar(ft.dot(et))).normalize();
            bt.crossVectors(kt, et);
            gt = bt.dot(c[n]);
            dt = 0 > gt ? -1 : 1;
            k[4 * n] = w.x;
            k[4 * n + 1] = w.y;
            k[4 * n + 2] = w.z;
            k[4 * n + 3] = dt
        }

        var i, n, f, t;
        if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv)THREE.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"); else {
            var e = this.attributes.index.array, b = this.attributes.position.array, ti = this.attributes.normal.array, st = this.attributes.uv.array, t = b.length / 3;
            void 0 === this.attributes.tangent && this.addAttribute("tangent", new THREE.BufferAttribute(new Float32Array(4 * t), 4));
            for (var k = this.attributes.tangent.array, h = [], c = [], n = 0; n < t; n++)h[n] = new THREE.Vector3, c[n] = new THREE.Vector3;
            var o = new THREE.Vector3, d = new THREE.Vector3, g = new THREE.Vector3, l = new THREE.Vector2, ht = new THREE.Vector2, ct = new THREE.Vector2, lt, at, vt, yt, pt, wt, a, v, y, p, s, nt = new THREE.Vector3, tt = new THREE.Vector3, r, it, u, rt, ut;
            for (0 === this.drawcalls.length && this.addDrawCall(0, e.length, 0), i = this.drawcalls, n = 0, it = i.length; n < it; ++n)for (r = i[n].start, u = i[n].count, f = i[n].index, t = r, r += u; t < r; t += 3)u = f + e[t], rt = f + e[t + 1], ut = f + e[t + 2], ni(u, rt, ut);
            var w = new THREE.Vector3, bt = new THREE.Vector3, ft = new THREE.Vector3, kt = new THREE.Vector3, dt, et, gt, n = 0;
            for (it = i.length; n < it; ++n)for (r = i[n].start, u = i[n].count, f = i[n].index, t = r, r += u; t < r; t += 3)u = f + e[t], rt = f + e[t + 1], ut = f + e[t + 2], ot(u), ot(rt), ot(ut)
        }
    }, computeOffsets: function (n) {
        var t;
        void 0 === n && (n = 65535);
        for (var h = this.attributes.index.array, f = this.attributes.position.array, y = h.length / 3, a = new Uint16Array(h.length), v = 0, s = 0, c = [{
            start: 0,
            count: 0,
            index: 0
        }], e = c[0], p = 0, r = 0, u = new Int32Array(6), o = new Int32Array(f.length), l = new Int32Array(f.length), i = 0; i < f.length; i++)o[i] = -1, l[i] = -1;
        for (f = 0; f < y; f++) {
            for (t = r = 0; 3 > t; t++)i = h[3 * f + t], -1 == o[i] ? (u[2 * t] = i, u[2 * t + 1] = -1, r++) : o[i] < e.index ? (u[2 * t] = i, u[2 * t + 1] = -1, p++) : (u[2 * t] = i, u[2 * t + 1] = o[i]);
            if (s + r > e.index + n)for (e = {
                start: v,
                count: 0,
                index: s
            }, c.push(e), r = 0; 6 > r; r += 2)t = u[r + 1], -1 < t && t < e.index && (u[r + 1] = -1);
            for (r = 0; 6 > r; r += 2)i = u[r], t = u[r + 1], -1 === t && (t = s++), o[i] = t, l[t] = i, a[v++] = t - e.index, e.count++
        }
        return this.reorderBuffers(a, l, s), this.drawcalls = this.offsets = c
    }, merge: function (n, t) {
        var u, r;
        if (!1 == n instanceof THREE.BufferGeometry)THREE.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", n); else {
            void 0 === t && (t = 0);
            u = this.attributes;
            for (r in u)if (void 0 !== n.attributes[r])for (var o = u[r].array, i = n.attributes[r], e = i.array, f = 0, i = i.itemSize * t; f < e.length; f++, i++)o[i] = e[f];
            return this
        }
    }, normalizeNormals: function () {
        for (var t = this.attributes.normal.array, i, r, u, n = 0, f = t.length; n < f; n += 3)i = t[n], r = t[n + 1], u = t[n + 2], i = 1 / Math.sqrt(i * i + r * r + u * u), t[n] *= i, t[n + 1] *= i, t[n + 2] *= i
    }, reorderBuffers: function (n, t, i) {
        var e = {}, r, u, s;
        for (r in this.attributes)"index" != r && (e[r] = new this.attributes[r].array.constructor(this.attributes[r].itemSize * i));
        for (u = 0; u < i; u++) {
            s = t[u];
            for (r in this.attributes)if ("index" != r)for (var h = this.attributes[r].array, o = this.attributes[r].itemSize, c = e[r], f = 0; f < o; f++)c[u * o + f] = h[s * o + f]
        }
        this.attributes.index.array = n;
        for (r in this.attributes)"index" != r && (this.attributes[r].array = e[r], this.attributes[r].numItems = this.attributes[r].itemSize * i)
    }, toJSON: function () {
        var n = {
            metadata: {version: 4, type: "BufferGeometry", generator: "BufferGeometryExporter"},
            uuid: this.uuid,
            type: this.type,
            data: {attributes: {}}
        }, u = this.attributes, f = this.offsets, i = this.boundingSphere, r, t, e;
        for (r in u)t = u[r], e = Array.prototype.slice.call(t.array), n.data.attributes[r] = {
            itemSize: t.itemSize,
            type: t.array.constructor.name,
            array: e
        };
        return 0 < f.length && (n.data.offsets = JSON.parse(JSON.stringify(f))), null !== i && (n.data.boundingSphere = {
            center: i.center.toArray(),
            radius: i.radius
        }), n
    }, clone: function () {
        var i = new THREE.BufferGeometry, n, r, t;
        for (n in this.attributes)i.addAttribute(n, this.attributes[n].clone());
        for (n = 0, r = this.offsets.length; n < r; n++)t = this.offsets[n], i.offsets.push({
            start: t.start,
            index: t.index,
            count: t.count
        });
        return i
    }, dispose: function () {
        this.dispatchEvent({type: "dispose"})
    }
};
THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype);
THREE.Geometry = function () {
    Object.defineProperty(this, "id", {value: THREE.GeometryIdCount++});
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "Geometry";
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphColors = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.lineDistances = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = !1;
    this.dynamic = !0;
    this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
};
THREE.Geometry.prototype = {
    constructor: THREE.Geometry, applyMatrix: function (n) {
        for (var i, f, u = (new THREE.Matrix3).getNormalMatrix(n), t = 0, r = this.vertices.length; t < r; t++)this.vertices[t].applyMatrix4(n);
        for (t = 0, r = this.faces.length; t < r; t++)for (n = this.faces[t], n.normal.applyMatrix3(u).normalize(), i = 0, f = n.vertexNormals.length; i < f; i++)n.vertexNormals[i].applyMatrix3(u).normalize();
        null !== this.boundingBox && this.computeBoundingBox();
        null !== this.boundingSphere && this.computeBoundingSphere();
        this.normalsNeedUpdate = this.verticesNeedUpdate = !0
    }, fromBufferGeometry: function (n) {
        for (var l, f = this, t = n.attributes, r = t.position.array, u = void 0 !== t.index ? t.index.array : void 0, e = void 0 !== t.normal ? t.normal.array : void 0, o = void 0 !== t.color ? t.color.array : void 0, s = void 0 !== t.uv ? t.uv.array : void 0, h = [], c = [], i = t = 0; t < r.length; t += 3, i += 2)f.vertices.push(new THREE.Vector3(r[t], r[t + 1], r[t + 2])), void 0 !== e && h.push(new THREE.Vector3(e[t], e[t + 1], e[t + 2])), void 0 !== o && f.colors.push(new THREE.Color(o[t], o[t + 1], o[t + 2])), void 0 !== s && c.push(new THREE.Vector2(s[i], s[i + 1]));
        if (l = function (n, t, i) {
                var r = void 0 !== e ? [h[n].clone(), h[t].clone(), h[i].clone()] : [], u = void 0 !== o ? [f.colors[n].clone(), f.colors[t].clone(), f.colors[i].clone()] : [];
                f.faces.push(new THREE.Face3(n, t, i, r, u));
                void 0 !== s && f.faceVertexUvs[0].push([c[n].clone(), c[t].clone(), c[i].clone()])
            }, void 0 !== u)if (r = n.drawcalls, 0 < r.length)for (t = 0; t < r.length; t++)for (var i = r[t], a = i.start, y = i.count, v = i.index, i = a, a = a + y; i < a; i += 3)l(v + u[i], v + u[i + 1], v + u[i + 2]); else for (t = 0; t < u.length; t += 3)l(u[t], u[t + 1], u[t + 2]); else for (t = 0; t < r.length / 3; t += 3)l(t, t + 1, t + 2);
        return this.computeFaceNormals(), null !== n.boundingBox && (this.boundingBox = n.boundingBox.clone()), null !== n.boundingSphere && (this.boundingSphere = n.boundingSphere.clone()), this
    }, center: function () {
        this.computeBoundingBox();
        var n = this.boundingBox.center().negate();
        return this.applyMatrix((new THREE.Matrix4).setPosition(n)), n
    }, computeFaceNormals: function () {
        for (var n = new THREE.Vector3, r = new THREE.Vector3, i = 0, f = this.faces.length; i < f; i++) {
            var t = this.faces[i], e = this.vertices[t.a], u = this.vertices[t.b];
            n.subVectors(this.vertices[t.c], u);
            r.subVectors(e, u);
            n.cross(r);
            n.normalize();
            t.normal.copy(n)
        }
    }, computeVertexNormals: function (n) {
        var i, t, r, o, f, s, u, e;
        for (r = Array(this.vertices.length), i = 0, t = this.vertices.length; i < t; i++)r[i] = new THREE.Vector3;
        if (n)for (u = new THREE.Vector3, e = new THREE.Vector3, n = 0, i = this.faces.length; n < i; n++)t = this.faces[n], o = this.vertices[t.a], f = this.vertices[t.b], s = this.vertices[t.c], u.subVectors(s, f), e.subVectors(o, f), u.cross(e), r[t.a].add(u), r[t.b].add(u), r[t.c].add(u); else for (n = 0, i = this.faces.length; n < i; n++)t = this.faces[n], r[t.a].add(t.normal), r[t.b].add(t.normal), r[t.c].add(t.normal);
        for (i = 0, t = this.vertices.length; i < t; i++)r[i].normalize();
        for (n = 0, i = this.faces.length; n < i; n++)t = this.faces[n], t.vertexNormals[0] = r[t.a].clone(), t.vertexNormals[1] = r[t.b].clone(), t.vertexNormals[2] = r[t.c].clone()
    }, computeMorphNormals: function () {
        for (var t, o, n, f, e, s, u, i = 0, r = this.faces.length; i < r; i++)for (n = this.faces[i], n.__originalFaceNormal ? n.__originalFaceNormal.copy(n.normal) : n.__originalFaceNormal = n.normal.clone(), n.__originalVertexNormals || (n.__originalVertexNormals = []), t = 0, o = n.vertexNormals.length; t < o; t++)n.__originalVertexNormals[t] ? n.__originalVertexNormals[t].copy(n.vertexNormals[t]) : n.__originalVertexNormals[t] = n.vertexNormals[t].clone();
        for (f = new THREE.Geometry, f.faces = this.faces, t = 0, o = this.morphTargets.length; t < o; t++) {
            if (!this.morphNormals[t])for (this.morphNormals[t] = {}, this.morphNormals[t].faceNormals = [], this.morphNormals[t].vertexNormals = [], n = this.morphNormals[t].faceNormals, e = this.morphNormals[t].vertexNormals, i = 0, r = this.faces.length; i < r; i++)s = new THREE.Vector3, u = {
                a: new THREE.Vector3,
                b: new THREE.Vector3,
                c: new THREE.Vector3
            }, n.push(s), e.push(u);
            for (e = this.morphNormals[t], f.vertices = this.morphTargets[t].vertices, f.computeFaceNormals(), f.computeVertexNormals(), i = 0, r = this.faces.length; i < r; i++)n = this.faces[i], s = e.faceNormals[i], u = e.vertexNormals[i], s.copy(n.normal), u.a.copy(n.vertexNormals[0]), u.b.copy(n.vertexNormals[1]), u.c.copy(n.vertexNormals[2])
        }
        for (i = 0, r = this.faces.length; i < r; i++)n = this.faces[i], n.normal = n.__originalFaceNormal, n.vertexNormals = n.__originalVertexNormals
    }, computeTangents: function () {
        var n, a, i, r, t, c, u, l, o, f, s, e, k, d, g, y, h, p = [], w = [];
        i = new THREE.Vector3;
        var v = new THREE.Vector3, b = new THREE.Vector3, tt = new THREE.Vector3, nt = new THREE.Vector3;
        for (n = 0, a = this.vertices.length; n < a; n++)p[n] = new THREE.Vector3, w[n] = new THREE.Vector3;
        for (n = 0, a = this.faces.length; n < a; n++)t = this.faces[n], c = this.faceVertexUvs[0][n], r = t.a, h = t.b, t = t.c, u = this.vertices[r], l = this.vertices[h], o = this.vertices[t], f = c[0], s = c[1], e = c[2], c = l.x - u.x, k = o.x - u.x, d = l.y - u.y, g = o.y - u.y, l = l.z - u.z, u = o.z - u.z, o = s.x - f.x, y = e.x - f.x, s = s.y - f.y, f = e.y - f.y, e = 1 / (o * f - y * s), i.set((f * c - s * k) * e, (f * d - s * g) * e, (f * l - s * u) * e), v.set((o * k - y * c) * e, (o * g - y * d) * e, (o * u - y * l) * e), p[r].add(i), p[h].add(i), p[t].add(i), w[r].add(v), w[h].add(v), w[t].add(v);
        for (v = ["a", "b", "c", "d"], n = 0, a = this.faces.length; n < a; n++)for (t = this.faces[n], i = 0; i < Math.min(t.vertexNormals.length, 3); i++)nt.copy(t.vertexNormals[i]), r = t[v[i]], h = p[r], b.copy(h), b.sub(nt.multiplyScalar(nt.dot(h))).normalize(), tt.crossVectors(t.vertexNormals[i], h), r = tt.dot(w[r]), r = 0 > r ? -1 : 1, t.vertexTangents[i] = new THREE.Vector4(b.x, b.y, b.z, r);
        this.hasTangents = !0
    }, computeLineDistances: function () {
        for (var i = 0, t = this.vertices, n = 0, r = t.length; n < r; n++)0 < n && (i += t[n].distanceTo(t[n - 1])), this.lineDistances[n] = i
    }, computeBoundingBox: function () {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3);
        this.boundingBox.setFromPoints(this.vertices)
    }, computeBoundingSphere: function () {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
        this.boundingSphere.setFromPoints(this.vertices)
    }, merge: function (n, t, i) {
        var r, s, f;
        if (!1 == n instanceof THREE.Geometry)THREE.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", n); else {
            var e, c = this.vertices.length, o = this.vertices, u = n.vertices, y = this.faces, l = n.faces, p = this.faceVertexUvs[0];
            for (n = n.faceVertexUvs[0], void 0 === i && (i = 0), void 0 !== t && (e = (new THREE.Matrix3).getNormalMatrix(t)), r = 0, s = u.length; r < s; r++)f = u[r].clone(), void 0 !== t && f.applyMatrix4(t), o.push(f);
            for (r = 0, s = l.length; r < s; r++) {
                var u = l[r], h, a = u.vertexNormals, v = u.vertexColors, f = new THREE.Face3(u.a + c, u.b + c, u.c + c);
                for (f.normal.copy(u.normal), void 0 !== e && f.normal.applyMatrix3(e).normalize(), t = 0, o = a.length; t < o; t++)h = a[t].clone(), void 0 !== e && h.applyMatrix3(e).normalize(), f.vertexNormals.push(h);
                for (f.color.copy(u.color), t = 0, o = v.length; t < o; t++)h = v[t], f.vertexColors.push(h.clone());
                f.materialIndex = u.materialIndex + i;
                y.push(f)
            }
            for (r = 0, s = n.length; r < s; r++)if (i = n[r], e = [], void 0 !== i) {
                for (t = 0, o = i.length; t < o; t++)e.push(i[t].clone());
                p.push(e)
            }
        }
    }, mergeMesh: function (n) {
        !1 == n instanceof THREE.Mesh ? THREE.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", n) : (n.matrixAutoUpdate && n.updateMatrix(), this.merge(n.geometry, n.matrix))
    }, mergeVertices: function () {
        for (var u = {}, e = [], r = [], i, n = Math.pow(10, 4), t = 0, f = this.vertices.length; t < f; t++)i = this.vertices[t], i = Math.round(i.x * n) + "_" + Math.round(i.y * n) + "_" + Math.round(i.z * n), void 0 === u[i] ? (u[i] = t, e.push(this.vertices[t]), r[t] = e.length - 1) : r[t] = r[u[i]];
        for (u = [], t = 0, f = this.faces.length; t < f; t++)for (n = this.faces[t], n.a = r[n.a], n.b = r[n.b], n.c = r[n.c], n = [n.a, n.b, n.c], i = 0; 3 > i; i++)if (n[i] == n[(i + 1) % 3]) {
            u.push(t);
            break
        }
        for (t = u.length - 1; 0 <= t; t--)for (n = u[t], this.faces.splice(n, 1), r = 0, f = this.faceVertexUvs.length; r < f; r++)this.faceVertexUvs[r].splice(n, 1);
        return t = this.vertices.length - e.length, this.vertices = e, t
    }, toJSON: function () {
        function f(n, t, i) {
            return i ? n | 1 << t : n & ~(1 << t)
        }

        function h(n) {
            var t = n.x.toString() + n.y.toString() + n.z.toString();
            return void 0 !== l[t] ? l[t] : (l[t] = b.length / 3, b.push(n.x, n.y, n.z), l[t])
        }

        function c(n) {
            var t = n.r.toString() + n.g.toString() + n.b.toString();
            return void 0 !== v[t] ? v[t] : (v[t] = a.length, a.push(n.getHex()), v[t])
        }

        function w(n) {
            var t = n.x.toString() + n.y.toString();
            return void 0 !== p[t] ? p[t] : (p[t] = y.length / 2, y.push(n.x, n.y), p[t])
        }

        var u = {
            metadata: {version: 4, type: "BufferGeometry", generator: "BufferGeometryExporter"},
            uuid: this.uuid,
            type: this.type
        }, e, i, r;
        if ("" !== this.name && (u.name = this.name), void 0 !== this.parameters) {
            e = this.parameters;
            for (i in e)void 0 !== e[i] && (u[i] = e[i]);
            return u
        }
        for (e = [], i = 0; i < this.vertices.length; i++)r = this.vertices[i], e.push(r.x, r.y, r.z);
        var r = [], b = [], l = {}, a = [], v = {}, y = [], p = {};
        for (i = 0; i < this.faces.length; i++) {
            var n = this.faces[i], o = void 0 !== this.faceVertexUvs[0][i], s = 0 < n.normal.length(), k = 0 < n.vertexNormals.length, d = 1 !== n.color.r || 1 !== n.color.g || 1 !== n.color.b, g = 0 < n.vertexColors.length, t = 0, t = f(t, 0, 0), t = f(t, 1, !1), t = f(t, 2, !1), t = f(t, 3, o), t = f(t, 4, s), t = f(t, 5, k), t = f(t, 6, d), t = f(t, 7, g);
            r.push(t);
            r.push(n.a, n.b, n.c);
            o && (o = this.faceVertexUvs[0][i], r.push(w(o[0]), w(o[1]), w(o[2])));
            s && r.push(h(n.normal));
            k && (s = n.vertexNormals, r.push(h(s[0]), h(s[1]), h(s[2])));
            d && r.push(c(n.color));
            g && (n = n.vertexColors, r.push(c(n[0]), c(n[1]), c(n[2])))
        }
        return u.data = {}, u.data.vertices = e, u.data.normals = b, 0 < a.length && (u.data.colors = a), 0 < y.length && (u.data.uvs = [y]), u.data.faces = r, u
    }, clone: function () {
        for (var u, e, i = new THREE.Geometry, t = this.vertices, n = 0, r = t.length; n < r; n++)i.vertices.push(t[n].clone());
        for (t = this.faces, n = 0, r = t.length; n < r; n++)i.faces.push(t[n].clone());
        for (n = 0, r = this.faceVertexUvs.length; n < r; n++)for (t = this.faceVertexUvs[n], void 0 === i.faceVertexUvs[n] && (i.faceVertexUvs[n] = []), u = 0, e = t.length; u < e; u++) {
            for (var o = t[u], s = [], f = 0, h = o.length; f < h; f++)s.push(o[f].clone());
            i.faceVertexUvs[n].push(s)
        }
        return i
    }, dispose: function () {
        this.dispatchEvent({type: "dispose"})
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype);
THREE.GeometryIdCount = 0;
THREE.Camera = function () {
    THREE.Object3D.call(this);
    this.type = "Camera";
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = new THREE.Matrix4
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.getWorldDirection = function () {
    var n = new THREE.Quaternion;
    return function (t) {
        return t = t || new THREE.Vector3, this.getWorldQuaternion(n), t.set(0, 0, -1).applyQuaternion(n)
    }
}();
THREE.Camera.prototype.lookAt = function () {
    var n = new THREE.Matrix4;
    return function (t) {
        n.lookAt(this.position, t, this.up);
        this.quaternion.setFromRotationMatrix(n)
    }
}();
THREE.Camera.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.Camera), THREE.Object3D.prototype.clone.call(this, n), n.matrixWorldInverse.copy(this.matrixWorldInverse), n.projectionMatrix.copy(this.projectionMatrix), n
};
THREE.CubeCamera = function (n, t, i) {
    var r, u, f, e, o, s;
    THREE.Object3D.call(this);
    this.type = "CubeCamera";
    r = new THREE.PerspectiveCamera(90, 1, n, t);
    r.up.set(0, -1, 0);
    r.lookAt(new THREE.Vector3(1, 0, 0));
    this.add(r);
    u = new THREE.PerspectiveCamera(90, 1, n, t);
    u.up.set(0, -1, 0);
    u.lookAt(new THREE.Vector3(-1, 0, 0));
    this.add(u);
    f = new THREE.PerspectiveCamera(90, 1, n, t);
    f.up.set(0, 0, 1);
    f.lookAt(new THREE.Vector3(0, 1, 0));
    this.add(f);
    e = new THREE.PerspectiveCamera(90, 1, n, t);
    e.up.set(0, 0, -1);
    e.lookAt(new THREE.Vector3(0, -1, 0));
    this.add(e);
    o = new THREE.PerspectiveCamera(90, 1, n, t);
    o.up.set(0, -1, 0);
    o.lookAt(new THREE.Vector3(0, 0, 1));
    this.add(o);
    s = new THREE.PerspectiveCamera(90, 1, n, t);
    s.up.set(0, -1, 0);
    s.lookAt(new THREE.Vector3(0, 0, -1));
    this.add(s);
    this.renderTarget = new THREE.WebGLRenderTargetCube(i, i, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    });
    this.updateCubeMap = function (n, t) {
        var i = this.renderTarget, h = i.generateMipmaps;
        i.generateMipmaps = !1;
        i.activeCubeFace = 0;
        n.render(t, r, i);
        i.activeCubeFace = 1;
        n.render(t, u, i);
        i.activeCubeFace = 2;
        n.render(t, f, i);
        i.activeCubeFace = 3;
        n.render(t, e, i);
        i.activeCubeFace = 4;
        n.render(t, o, i);
        i.generateMipmaps = h;
        i.activeCubeFace = 5;
        n.render(t, s, i)
    }
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CubeCamera.prototype.constructor = THREE.CubeCamera;
THREE.OrthographicCamera = function (n, t, i, r, u, f) {
    THREE.Camera.call(this);
    this.type = "OrthographicCamera";
    this.zoom = 1;
    this.left = n;
    this.right = t;
    this.top = i;
    this.bottom = r;
    this.near = void 0 !== u ? u : .1;
    this.far = void 0 !== f ? f : 2e3;
    this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
    var n = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    this.projectionMatrix.makeOrthographic(i - n, i + n, r + t, r - t, this.near, this.far)
};
THREE.OrthographicCamera.prototype.clone = function () {
    var n = new THREE.OrthographicCamera;
    return THREE.Camera.prototype.clone.call(this, n), n.zoom = this.zoom, n.left = this.left, n.right = this.right, n.top = this.top, n.bottom = this.bottom, n.near = this.near, n.far = this.far, n.projectionMatrix.copy(this.projectionMatrix), n
};
THREE.PerspectiveCamera = function (n, t, i, r) {
    THREE.Camera.call(this);
    this.type = "PerspectiveCamera";
    this.zoom = 1;
    this.fov = void 0 !== n ? n : 50;
    this.aspect = void 0 !== t ? t : 1;
    this.near = void 0 !== i ? i : .1;
    this.far = void 0 !== r ? r : 2e3;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera;
THREE.PerspectiveCamera.prototype.setLens = function (n, t) {
    void 0 === t && (t = 24);
    this.fov = 2 * THREE.Math.radToDeg(Math.atan(t / (2 * n)));
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (n, t, i, r, u, f) {
    this.fullWidth = n;
    this.fullHeight = t;
    this.x = i;
    this.y = r;
    this.width = u;
    this.height = f;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
    var n = THREE.Math.radToDeg(2 * Math.atan(Math.tan(.5 * THREE.Math.degToRad(this.fov)) / this.zoom));
    if (this.fullWidth) {
        var t = this.fullWidth / this.fullHeight, n = Math.tan(THREE.Math.degToRad(.5 * n)) * this.near, i = -n, r = t * i, t = Math.abs(t * n - r), i = Math.abs(n - i);
        this.projectionMatrix.makeFrustum(r + this.x * t / this.fullWidth, r + (this.x + this.width) * t / this.fullWidth, n - (this.y + this.height) * i / this.fullHeight, n - this.y * i / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix.makePerspective(n, this.aspect, this.near, this.far)
};
THREE.PerspectiveCamera.prototype.clone = function () {
    var n = new THREE.PerspectiveCamera;
    return THREE.Camera.prototype.clone.call(this, n), n.zoom = this.zoom, n.fov = this.fov, n.aspect = this.aspect, n.near = this.near, n.far = this.far, n.projectionMatrix.copy(this.projectionMatrix), n
};
THREE.Light = function (n) {
    THREE.Object3D.call(this);
    this.type = "Light";
    this.color = new THREE.Color(n)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.Light), THREE.Object3D.prototype.clone.call(this, n), n.color.copy(this.color), n
};
THREE.AmbientLight = function (n) {
    THREE.Light.call(this, n);
    this.type = "AmbientLight"
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.AmbientLight.prototype.clone = function () {
    var n = new THREE.AmbientLight;
    return THREE.Light.prototype.clone.call(this, n), n
};
THREE.AreaLight = function (n, t) {
    THREE.Light.call(this, n);
    this.type = "AreaLight";
    this.normal = new THREE.Vector3(0, -1, 0);
    this.right = new THREE.Vector3(1, 0, 0);
    this.intensity = void 0 !== t ? t : 1;
    this.height = this.width = 1;
    this.constantAttenuation = 1.5;
    this.linearAttenuation = .5;
    this.quadraticAttenuation = .1
};
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype);
THREE.AreaLight.prototype.constructor = THREE.AreaLight;
THREE.DirectionalLight = function (n, t) {
    THREE.Light.call(this, n);
    this.type = "DirectionalLight";
    this.position.set(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== t ? t : 1;
    this.onlyShadow = this.castShadow = !1;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5e3;
    this.shadowCameraLeft = -500;
    this.shadowCameraTop = this.shadowCameraRight = 500;
    this.shadowCameraBottom = -500;
    this.shadowCameraVisible = !1;
    this.shadowBias = 0;
    this.shadowDarkness = .5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowCascade = !1;
    this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3);
    this.shadowCascadeCount = 2;
    this.shadowCascadeBias = [0, 0, 0];
    this.shadowCascadeWidth = [512, 512, 512];
    this.shadowCascadeHeight = [512, 512, 512];
    this.shadowCascadeNearZ = [-1, .99, .998];
    this.shadowCascadeFarZ = [.99, .998, 1];
    this.shadowCascadeArray = [];
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.DirectionalLight.prototype.clone = function () {
    var n = new THREE.DirectionalLight;
    return THREE.Light.prototype.clone.call(this, n), n.target = this.target.clone(), n.intensity = this.intensity, n.castShadow = this.castShadow, n.onlyShadow = this.onlyShadow, n.shadowCameraNear = this.shadowCameraNear, n.shadowCameraFar = this.shadowCameraFar, n.shadowCameraLeft = this.shadowCameraLeft, n.shadowCameraRight = this.shadowCameraRight, n.shadowCameraTop = this.shadowCameraTop, n.shadowCameraBottom = this.shadowCameraBottom, n.shadowCameraVisible = this.shadowCameraVisible, n.shadowBias = this.shadowBias, n.shadowDarkness = this.shadowDarkness, n.shadowMapWidth = this.shadowMapWidth, n.shadowMapHeight = this.shadowMapHeight, n.shadowCascade = this.shadowCascade, n.shadowCascadeOffset.copy(this.shadowCascadeOffset), n.shadowCascadeCount = this.shadowCascadeCount, n.shadowCascadeBias = this.shadowCascadeBias.slice(0), n.shadowCascadeWidth = this.shadowCascadeWidth.slice(0), n.shadowCascadeHeight = this.shadowCascadeHeight.slice(0), n.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0), n.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0), n
};
THREE.HemisphereLight = function (n, t, i) {
    THREE.Light.call(this, n);
    this.type = "HemisphereLight";
    this.position.set(0, 100, 0);
    this.groundColor = new THREE.Color(t);
    this.intensity = void 0 !== i ? i : 1
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight.prototype.constructor = THREE.HemisphereLight;
THREE.HemisphereLight.prototype.clone = function () {
    var n = new THREE.HemisphereLight;
    return THREE.Light.prototype.clone.call(this, n), n.groundColor.copy(this.groundColor), n.intensity = this.intensity, n
};
THREE.PointLight = function (n, t, i, r) {
    THREE.Light.call(this, n);
    this.type = "PointLight";
    this.intensity = void 0 !== t ? t : 1;
    this.distance = void 0 !== i ? i : 0;
    this.decay = void 0 !== r ? r : 1
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.PointLight.prototype.clone = function () {
    var n = new THREE.PointLight;
    return THREE.Light.prototype.clone.call(this, n), n.intensity = this.intensity, n.distance = this.distance, n.decay = this.decay, n
};
THREE.SpotLight = function (n, t, i, r, u, f) {
    THREE.Light.call(this, n);
    this.type = "SpotLight";
    this.position.set(0, 1, 0);
    this.target = new THREE.Object3D;
    this.intensity = void 0 !== t ? t : 1;
    this.distance = void 0 !== i ? i : 0;
    this.angle = void 0 !== r ? r : Math.PI / 3;
    this.exponent = void 0 !== u ? u : 10;
    this.decay = void 0 !== f ? f : 1;
    this.onlyShadow = this.castShadow = !1;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5e3;
    this.shadowCameraFov = 50;
    this.shadowCameraVisible = !1;
    this.shadowBias = 0;
    this.shadowDarkness = .5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
THREE.SpotLight.prototype.clone = function () {
    var n = new THREE.SpotLight;
    return THREE.Light.prototype.clone.call(this, n), n.target = this.target.clone(), n.intensity = this.intensity, n.distance = this.distance, n.angle = this.angle, n.exponent = this.exponent, n.decay = this.decay, n.castShadow = this.castShadow, n.onlyShadow = this.onlyShadow, n.shadowCameraNear = this.shadowCameraNear, n.shadowCameraFar = this.shadowCameraFar, n.shadowCameraFov = this.shadowCameraFov, n.shadowCameraVisible = this.shadowCameraVisible, n.shadowBias = this.shadowBias, n.shadowDarkness = this.shadowDarkness, n.shadowMapWidth = this.shadowMapWidth, n.shadowMapHeight = this.shadowMapHeight, n
};
THREE.Cache = {
    files: {}, add: function (n, t) {
        this.files[n] = t
    }, get: function (n) {
        return this.files[n]
    }, remove: function (n) {
        delete this.files[n]
    }, clear: function () {
        this.files = {}
    }
};
THREE.Loader = function (n) {
    this.statusDomElement = (this.showStatus = n) ? THREE.Loader.prototype.addStatusElement() : null;
    this.imageLoader = new THREE.ImageLoader;
    this.onLoadStart = function () {
    };
    this.onLoadProgress = function () {
    };
    this.onLoadComplete = function () {
    }
};
THREE.Loader.prototype = {
    constructor: THREE.Loader, crossOrigin: void 0, addStatusElement: function () {
        var n = document.createElement("div");
        return n.style.position = "absolute", n.style.right = "0px", n.style.top = "0px", n.style.fontSize = "0.8em", n.style.textAlign = "left", n.style.background = "rgba(0,0,0,0.25)", n.style.color = "#fff", n.style.width = "120px", n.style.padding = "0.5em 0.5em 0.5em 0.5em", n.style.zIndex = 1e3, n.innerHTML = "Loading ...", n
    }, updateProgress: function (n) {
        var t = "Loaded ", t = n.total ? t + ((100 * n.loaded / n.total).toFixed(0) + "%") : t + ((n.loaded / 1024).toFixed(2) + " KB");
        this.statusDomElement.innerHTML = t
    }, extractUrlBase: function (n) {
        return (n = n.split("/"), 1 === n.length) ? "./" : (n.pop(), n.join("/") + "/")
    }, initMaterials: function (n, t) {
        for (var r = [], i = 0; i < n.length; ++i)r[i] = this.createMaterial(n[i], t);
        return r
    }, needsTangents: function (n) {
        for (var t = 0, i = n.length; t < i; t++)if (n[t] instanceof THREE.ShaderMaterial)return !0;
        return !1
    }, createMaterial: function (n, t) {
        function o(n) {
            return n = Math.log(n) / Math.LN2, Math.pow(2, Math.round(n))
        }

        function r(n, i, r, u, f, e, h) {
            var a = t + r, c, l = THREE.Loader.Handlers.get(a);
            null !== l ? c = l.load(a) : (c = new THREE.Texture, l = s.imageLoader, l.crossOrigin = s.crossOrigin, l.load(a, function (n) {
                if (!1 === THREE.Math.isPowerOfTwo(n.width) || !1 === THREE.Math.isPowerOfTwo(n.height)) {
                    var i = o(n.width), r = o(n.height), t = document.createElement("canvas");
                    t.width = i;
                    t.height = r;
                    t.getContext("2d").drawImage(n, 0, 0, i, r);
                    c.image = t
                } else c.image = n;
                c.needsUpdate = !0
            }));
            c.sourceFile = r;
            u && (c.repeat.set(u[0], u[1]), 1 !== u[0] && (c.wrapS = THREE.RepeatWrapping), 1 !== u[1] && (c.wrapT = THREE.RepeatWrapping));
            f && c.offset.set(f[0], f[1]);
            e && (r = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping
            }, void 0 !== r[e[0]] && (c.wrapS = r[e[0]]), void 0 !== r[e[1]] && (c.wrapT = r[e[1]]));
            h && (c.anisotropy = h);
            n[i] = c
        }

        function f(n) {
            return (255 * n[0] << 16) + (255 * n[1] << 8) + 255 * n[2]
        }

        var s = this, u = "MeshLambertMaterial", i = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            normalMap: null,
            bumpMap: null,
            wireframe: !1
        }, e;
        return n.shading && (e = n.shading.toLowerCase(), "phong" === e ? u = "MeshPhongMaterial" : "basic" === e && (u = "MeshBasicMaterial")), void 0 !== n.blending && void 0 !== THREE[n.blending] && (i.blending = THREE[n.blending]), void 0 !== n.transparent && (i.transparent = n.transparent), void 0 !== n.opacity && 1 > n.opacity && (i.transparent = !0), void 0 !== n.depthTest && (i.depthTest = n.depthTest), void 0 !== n.depthWrite && (i.depthWrite = n.depthWrite), void 0 !== n.visible && (i.visible = n.visible), void 0 !== n.flipSided && (i.side = THREE.BackSide), void 0 !== n.doubleSided && (i.side = THREE.DoubleSide), void 0 !== n.wireframe && (i.wireframe = n.wireframe), void 0 !== n.vertexColors && ("face" === n.vertexColors ? i.vertexColors = THREE.FaceColors : n.vertexColors && (i.vertexColors = THREE.VertexColors)), n.colorDiffuse ? i.color = f(n.colorDiffuse) : n.DbgColor && (i.color = n.DbgColor), n.colorSpecular && (i.specular = f(n.colorSpecular)), n.colorEmissive && (i.emissive = f(n.colorEmissive)), void 0 !== n.transparency && (console.warn("THREE.Loader: transparency has been renamed to opacity"), n.opacity = n.transparency), void 0 !== n.opacity && (i.opacity = n.opacity), n.specularCoef && (i.shininess = n.specularCoef), n.mapDiffuse && t && r(i, "map", n.mapDiffuse, n.mapDiffuseRepeat, n.mapDiffuseOffset, n.mapDiffuseWrap, n.mapDiffuseAnisotropy), n.mapLight && t && r(i, "lightMap", n.mapLight, n.mapLightRepeat, n.mapLightOffset, n.mapLightWrap, n.mapLightAnisotropy), n.mapBump && t && r(i, "bumpMap", n.mapBump, n.mapBumpRepeat, n.mapBumpOffset, n.mapBumpWrap, n.mapBumpAnisotropy), n.mapNormal && t && r(i, "normalMap", n.mapNormal, n.mapNormalRepeat, n.mapNormalOffset, n.mapNormalWrap, n.mapNormalAnisotropy), n.mapSpecular && t && r(i, "specularMap", n.mapSpecular, n.mapSpecularRepeat, n.mapSpecularOffset, n.mapSpecularWrap, n.mapSpecularAnisotropy), n.mapAlpha && t && r(i, "alphaMap", n.mapAlpha, n.mapAlphaRepeat, n.mapAlphaOffset, n.mapAlphaWrap, n.mapAlphaAnisotropy), n.mapBumpScale && (i.bumpScale = n.mapBumpScale), n.mapNormalFactor && (i.normalScale = new THREE.Vector2(n.mapNormalFactor, n.mapNormalFactor)), u = new THREE[u](i), void 0 !== n.DbgName && (u.name = n.DbgName), u
    }
};
THREE.Loader.Handlers = {
    handlers: [], add: function (n, t) {
        this.handlers.push(n, t)
    }, get: function (n) {
        for (var r, t = 0, i = this.handlers.length; t < i; t += 2)if (r = this.handlers[t + 1], this.handlers[t].test(n))return r;
        return null
    }
};
THREE.XHRLoader = function (n) {
    this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager
};
THREE.XHRLoader.prototype = {
    constructor: THREE.XHRLoader, load: function (n, t, i, r) {
        var f = this, u = THREE.Cache.get(n);
        void 0 !== u ? t && t(u) : (u = new XMLHttpRequest, u.open("GET", n, !0), u.addEventListener("load", function () {
            THREE.Cache.add(n, this.response);
            t && t(this.response);
            f.manager.itemEnd(n)
        }, !1), void 0 !== i && u.addEventListener("progress", function (n) {
            i(n)
        }, !1), void 0 !== r && u.addEventListener("error", function (n) {
            r(n)
        }, !1), void 0 !== this.crossOrigin && (u.crossOrigin = this.crossOrigin), void 0 !== this.responseType && (u.responseType = this.responseType), u.send(null), f.manager.itemStart(n))
    }, setResponseType: function (n) {
        this.responseType = n
    }, setCrossOrigin: function (n) {
        this.crossOrigin = n
    }
};
THREE.ImageLoader = function (n) {
    this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager
};
THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader, load: function (n, t, i, r) {
        var f = this, u = THREE.Cache.get(n);
        if (void 0 !== u)t(u); else return u = document.createElement("img"), u.addEventListener("load", function () {
            THREE.Cache.add(n, this);
            t && t(this);
            f.manager.itemEnd(n)
        }, !1), void 0 !== i && u.addEventListener("progress", function (n) {
            i(n)
        }, !1), void 0 !== r && u.addEventListener("error", function (n) {
            r(n)
        }, !1), void 0 !== this.crossOrigin && (u.crossOrigin = this.crossOrigin), u.src = n, f.manager.itemStart(n), u
    }, setCrossOrigin: function (n) {
        this.crossOrigin = n
    }
};
THREE.JSONLoader = function (n) {
    THREE.Loader.call(this, n);
    this.withCredentials = !1
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader;
THREE.JSONLoader.prototype.load = function (n, t, i) {
    i = i && "string" == typeof i ? i : this.extractUrlBase(n);
    this.onLoadStart();
    this.loadAjaxJSON(this, n, t, i)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function (n, t, i, r, u) {
    var f = new XMLHttpRequest, e = 0;
    f.onreadystatechange = function () {
        if (f.readyState === f.DONE)if (200 === f.status || 0 === f.status) {
            if (f.responseText) {
                var o = JSON.parse(f.responseText), s = o.metadata;
                if (void 0 !== s) {
                    if ("object" === s.type) {
                        THREE.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.");
                        return
                    }
                    if ("scene" === s.type) {
                        THREE.error("THREE.JSONLoader: " + t + " seems to be a Scene. Use THREE.SceneLoader instead.");
                        return
                    }
                }
                o = n.parse(o, r);
                i(o.geometry, o.materials)
            } else THREE.error("THREE.JSONLoader: " + t + " seems to be unreachable or the file is empty.");
            n.onLoadComplete()
        } else THREE.error("THREE.JSONLoader: Couldn't load " + t + " (" + f.status + ")"); else f.readyState === f.LOADING ? u && (0 === e && (e = f.getResponseHeader("Content-Length")), u({
            total: e,
            loaded: f.responseText.length
        })) : f.readyState === f.HEADERS_RECEIVED && void 0 !== u && (e = f.getResponseHeader("Content-Length"))
    };
    f.open("GET", t, !0);
    f.withCredentials = this.withCredentials;
    f.send(null)
};
THREE.JSONLoader.prototype.parse = function (n, t) {
    var i = new THREE.Geometry, r = void 0 !== n.scale ? 1 / n.scale : 1;
    return (function (t) {
        var r, y, h, u, b, o, s, l, f, p, a, w, v, e = n.faces;
        o = n.vertices;
        var c = n.normals, k = n.colors, d = 0;
        if (void 0 !== n.uvs) {
            for (r = 0; r < n.uvs.length; r++)n.uvs[r].length && d++;
            for (r = 0; r < d; r++)i.faceVertexUvs[r] = []
        }
        for (u = 0, b = o.length; u < b;)r = new THREE.Vector3, r.x = o[u++] * t, r.y = o[u++] * t, r.z = o[u++] * t, i.vertices.push(r);
        for (u = 0, b = e.length; u < b;)if (t = e[u++], f = t & 1, h = t & 2, r = t & 8, s = t & 16, p = t & 32, o = t & 64, t &= 128, f) {
            if (f = new THREE.Face3, f.a = e[u], f.b = e[u + 1], f.c = e[u + 3], a = new THREE.Face3, a.a = e[u + 1], a.b = e[u + 2], a.c = e[u + 3], u += 4, h && (h = e[u++], f.materialIndex = h, a.materialIndex = h), h = i.faces.length, r)for (r = 0; r < d; r++)for (w = n.uvs[r], i.faceVertexUvs[r][h] = [], i.faceVertexUvs[r][h + 1] = [], y = 0; 4 > y; y++)l = e[u++], v = w[2 * l], l = w[2 * l + 1], v = new THREE.Vector2(v, l), 2 !== y && i.faceVertexUvs[r][h].push(v), 0 !== y && i.faceVertexUvs[r][h + 1].push(v);
            if (s && (s = 3 * e[u++], f.normal.set(c[s++], c[s++], c[s]), a.normal.copy(f.normal)), p)for (r = 0; 4 > r; r++)s = 3 * e[u++], p = new THREE.Vector3(c[s++], c[s++], c[s]), 2 !== r && f.vertexNormals.push(p), 0 !== r && a.vertexNormals.push(p);
            if (o && (o = e[u++], o = k[o], f.color.setHex(o), a.color.setHex(o)), t)for (r = 0; 4 > r; r++)o = e[u++], o = k[o], 2 !== r && f.vertexColors.push(new THREE.Color(o)), 0 !== r && a.vertexColors.push(new THREE.Color(o));
            i.faces.push(f);
            i.faces.push(a)
        } else {
            if (f = new THREE.Face3, f.a = e[u++], f.b = e[u++], f.c = e[u++], h && (h = e[u++], f.materialIndex = h), h = i.faces.length, r)for (r = 0; r < d; r++)for (w = n.uvs[r], i.faceVertexUvs[r][h] = [], y = 0; 3 > y; y++)l = e[u++], v = w[2 * l], l = w[2 * l + 1], v = new THREE.Vector2(v, l), i.faceVertexUvs[r][h].push(v);
            if (s && (s = 3 * e[u++], f.normal.set(c[s++], c[s++], c[s])), p)for (r = 0; 3 > r; r++)s = 3 * e[u++], p = new THREE.Vector3(c[s++], c[s++], c[s]), f.vertexNormals.push(p);
            if (o && (o = e[u++], f.color.setHex(k[o])), t)for (r = 0; 3 > r; r++)o = e[u++], f.vertexColors.push(new THREE.Color(k[o]));
            i.faces.push(f)
        }
    }(r), function () {
        var r = void 0 !== n.influencesPerVertex ? n.influencesPerVertex : 2, t, u;
        if (n.skinWeights)for (t = 0, u = n.skinWeights.length; t < u; t += r)i.skinWeights.push(new THREE.Vector4(n.skinWeights[t], 1 < r ? n.skinWeights[t + 1] : 0, 2 < r ? n.skinWeights[t + 2] : 0, 3 < r ? n.skinWeights[t + 3] : 0));
        if (n.skinIndices)for (t = 0, u = n.skinIndices.length; t < u; t += r)i.skinIndices.push(new THREE.Vector4(n.skinIndices[t], 1 < r ? n.skinIndices[t + 1] : 0, 2 < r ? n.skinIndices[t + 2] : 0, 3 < r ? n.skinIndices[t + 3] : 0));
        i.bones = n.bones;
        i.bones && 0 < i.bones.length && (i.skinWeights.length !== i.skinIndices.length || i.skinIndices.length !== i.vertices.length) && THREE.warn("THREE.JSONLoader: When skinning, number of vertices (" + i.vertices.length + "), skinIndices (" + i.skinIndices.length + "), and skinWeights (" + i.skinWeights.length + ") should match.");
        i.animation = n.animation;
        i.animations = n.animations
    }(), function (t) {
        var r, s, u, h, e, f, o;
        if (void 0 !== n.morphTargets)for (r = 0, s = n.morphTargets.length; r < s; r++)for (i.morphTargets[r] = {}, i.morphTargets[r].name = n.morphTargets[r].name, i.morphTargets[r].vertices = [], e = i.morphTargets[r].vertices, f = n.morphTargets[r].vertices, u = 0, h = f.length; u < h; u += 3)o = new THREE.Vector3, o.x = f[u] * t, o.y = f[u + 1] * t, o.z = f[u + 2] * t, e.push(o);
        if (void 0 !== n.morphColors)for (r = 0, s = n.morphColors.length; r < s; r++)for (i.morphColors[r] = {}, i.morphColors[r].name = n.morphColors[r].name, i.morphColors[r].colors = [], h = i.morphColors[r].colors, e = n.morphColors[r].colors, t = 0, u = e.length; t < u; t += 3)f = new THREE.Color(16755200), f.setRGB(e[t], e[t + 1], e[t + 2]), h.push(f)
    }(r), i.computeFaceNormals(), i.computeBoundingSphere(), void 0 === n.materials || 0 === n.materials.length) ? {geometry: i} : (r = this.initMaterials(n.materials, t), this.needsTangents(r) && i.computeTangents(), {
        geometry: i,
        materials: r
    })
};
THREE.LoadingManager = function (n, t, i) {
    var r = this, u = 0, f = 0;
    this.onLoad = n;
    this.onProgress = t;
    this.onError = i;
    this.itemStart = function () {
        f++
    };
    this.itemEnd = function (n) {
        if (u++, void 0 !== r.onProgress)r.onProgress(n, u, f);
        u === f && void 0 !== r.onLoad && r.onLoad()
    }
};
THREE.DefaultLoadingManager = new THREE.LoadingManager;
THREE.BufferGeometryLoader = function (n) {
    this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager
};
THREE.BufferGeometryLoader.prototype = {
    constructor: THREE.BufferGeometryLoader, load: function (n, t, i, r) {
        var u = this, f = new THREE.XHRLoader(u.manager);
        f.setCrossOrigin(this.crossOrigin);
        f.load(n, function (n) {
            t(u.parse(JSON.parse(n)))
        }, i, r)
    }, setCrossOrigin: function (n) {
        this.crossOrigin = n
    }, parse: function (n) {
        var i = new THREE.BufferGeometry, t = n.data.attributes, u, r, f;
        for (u in t)r = t[u], f = new self[r.type](r.array), i.addAttribute(u, new THREE.BufferAttribute(f, r.itemSize));
        return t = n.data.offsets, void 0 !== t && (i.offsets = JSON.parse(JSON.stringify(t))), n = n.data.boundingSphere, void 0 !== n && (t = new THREE.Vector3, void 0 !== n.center && t.fromArray(n.center), i.boundingSphere = new THREE.Sphere(t, n.radius)), i
    }
};
THREE.MaterialLoader = function (n) {
    this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager
};
THREE.MaterialLoader.prototype = {
    constructor: THREE.MaterialLoader, load: function (n, t, i, r) {
        var u = this, f = new THREE.XHRLoader(u.manager);
        f.setCrossOrigin(this.crossOrigin);
        f.load(n, function (n) {
            t(u.parse(JSON.parse(n)))
        }, i, r)
    }, setCrossOrigin: function (n) {
        this.crossOrigin = n
    }, parse: function (n) {
        var t = new THREE[n.type], i, r;
        if (void 0 !== n.color && t.color.setHex(n.color), void 0 !== n.emissive && t.emissive.setHex(n.emissive), void 0 !== n.specular && t.specular.setHex(n.specular), void 0 !== n.shininess && (t.shininess = n.shininess), void 0 !== n.uniforms && (t.uniforms = n.uniforms), void 0 !== n.vertexShader && (t.vertexShader = n.vertexShader), void 0 !== n.fragmentShader && (t.fragmentShader = n.fragmentShader), void 0 !== n.vertexColors && (t.vertexColors = n.vertexColors), void 0 !== n.shading && (t.shading = n.shading), void 0 !== n.blending && (t.blending = n.blending), void 0 !== n.side && (t.side = n.side), void 0 !== n.opacity && (t.opacity = n.opacity), void 0 !== n.transparent && (t.transparent = n.transparent), void 0 !== n.wireframe && (t.wireframe = n.wireframe), void 0 !== n.size && (t.size = n.size), void 0 !== n.sizeAttenuation && (t.sizeAttenuation = n.sizeAttenuation), void 0 !== n.materials)for (i = 0, r = n.materials.length; i < r; i++)t.materials.push(this.parse(n.materials[i]));
        return t
    }
};
THREE.ObjectLoader = function (n) {
    this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager;
    this.texturePath = ""
};
THREE.ObjectLoader.prototype = {
    constructor: THREE.ObjectLoader, load: function (n, t, i, r) {
        "" === this.texturePath && (this.texturePath = n.substring(0, n.lastIndexOf("/") + 1));
        var u = this, f = new THREE.XHRLoader(u.manager);
        f.setCrossOrigin(this.crossOrigin);
        f.load(n, function (n) {
            u.parse(JSON.parse(n), t)
        }, i, r)
    }, setTexturePath: function (n) {
        this.texturePath = n
    }, setCrossOrigin: function (n) {
        this.crossOrigin = n
    }, parse: function (n, t) {
        var u = this.parseGeometries(n.geometries), i = this.parseImages(n.images, function () {
            void 0 !== t && t(r)
        }), i = this.parseTextures(n.textures, i), i = this.parseMaterials(n.materials, i), r = this.parseObject(n.object, u, i);
        return void 0 !== n.images && 0 !== n.images.length || void 0 === t || t(r), r
    }, parseGeometries: function (n) {
        var u = {}, i, t;
        if (void 0 !== n)for (var f = new THREE.JSONLoader, e = new THREE.BufferGeometryLoader, r = 0, o = n.length; r < o; r++) {
            t = n[r];
            switch (t.type) {
                case"PlaneGeometry":
                case"PlaneBufferGeometry":
                    i = new THREE[t.type](t.width, t.height, t.widthSegments, t.heightSegments);
                    break;
                case"BoxGeometry":
                case"CubeGeometry":
                    i = new THREE.BoxGeometry(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
                    break;
                case"CircleGeometry":
                    i = new THREE.CircleGeometry(t.radius, t.segments);
                    break;
                case"CylinderGeometry":
                    i = new THREE.CylinderGeometry(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded);
                    break;
                case"SphereGeometry":
                    i = new THREE.SphereGeometry(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
                    break;
                case"IcosahedronGeometry":
                    i = new THREE.IcosahedronGeometry(t.radius, t.detail);
                    break;
                case"TorusGeometry":
                    i = new THREE.TorusGeometry(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
                    break;
                case"TorusKnotGeometry":
                    i = new THREE.TorusKnotGeometry(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.p, t.q, t.heightScale);
                    break;
                case"BufferGeometry":
                    i = e.parse(t);
                    break;
                case"Geometry":
                    i = f.parse(t.data).geometry
            }
            i.uuid = t.uuid;
            void 0 !== t.name && (i.name = t.name);
            u[t.uuid] = i
        }
        return u
    }, parseMaterials: function (n, t) {
        var e = {}, i, r;
        if (void 0 !== n)for (var u = function (n) {
            return void 0 === t[n] && THREE.warn("THREE.ObjectLoader: Undefined texture", n), t[n]
        }, o = new THREE.MaterialLoader, f = 0, s = n.length; f < s; f++)i = n[f], r = o.parse(i), r.uuid = i.uuid, void 0 !== i.name && (r.name = i.name), void 0 !== i.map && (r.map = u(i.map)), void 0 !== i.bumpMap && (r.bumpMap = u(i.bumpMap), i.bumpScale && (r.bumpScale = new THREE.Vector2(i.bumpScale, i.bumpScale))), void 0 !== i.alphaMap && (r.alphaMap = u(i.alphaMap)), void 0 !== i.envMap && (r.envMap = u(i.envMap)), void 0 !== i.normalMap && (r.normalMap = u(i.normalMap), i.normalScale && (r.normalScale = new THREE.Vector2(i.normalScale, i.normalScale))), void 0 !== i.lightMap && (r.lightMap = u(i.lightMap)), void 0 !== i.specularMap && (r.specularMap = u(i.specularMap)), e[i.uuid] = r;
        return e
    }, parseImages: function (n, t) {
        var u = this, o = {}, r, f, i, s;
        if (void 0 !== n && 0 < n.length) {
            r = new THREE.LoadingManager(t);
            f = new THREE.ImageLoader(r);
            f.setCrossOrigin(this.crossOrigin);
            for (var r = function (n) {
                return u.manager.itemStart(n), f.load(n, function () {
                    u.manager.itemEnd(n)
                })
            }, e = 0, h = n.length; e < h; e++)i = n[e], s = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(i.url) ? i.url : u.texturePath + i.url, o[i.uuid] = r(s)
        }
        return o
    }, parseTextures: function (n, t) {
        var f = {}, u, e, i, r;
        if (void 0 !== n)for (u = 0, e = n.length; u < e; u++)i = n[u], void 0 === i.image && THREE.warn('THREE.ObjectLoader: No "image" speficied for', i.uuid), void 0 === t[i.image] && THREE.warn("THREE.ObjectLoader: Undefined image", i.image), r = new THREE.Texture(t[i.image]), r.needsUpdate = !0, r.uuid = i.uuid, void 0 !== i.name && (r.name = i.name), void 0 !== i.repeat && (r.repeat = new THREE.Vector2(i.repeat[0], i.repeat[1])), void 0 !== i.minFilter && (r.minFilter = THREE[i.minFilter]), void 0 !== i.magFilter && (r.magFilter = THREE[i.magFilter]), void 0 !== i.anisotropy && (r.anisotropy = i.anisotropy), i.wrap instanceof Array && (r.wrapS = THREE[i.wrap[0]], r.wrapT = THREE[i.wrap[1]]), f[i.uuid] = r;
        return f
    }, parseObject: function () {
        var n = new THREE.Matrix4;
        return function (t, i, r) {
            var u, f, e;
            u = function (n) {
                return void 0 === i[n] && THREE.warn("THREE.ObjectLoader: Undefined geometry", n), i[n]
            };
            f = function (n) {
                return void 0 === r[n] && THREE.warn("THREE.ObjectLoader: Undefined material", n), r[n]
            };
            switch (t.type) {
                case"Scene":
                    u = new THREE.Scene;
                    break;
                case"PerspectiveCamera":
                    u = new THREE.PerspectiveCamera(t.fov, t.aspect, t.near, t.far);
                    break;
                case"OrthographicCamera":
                    u = new THREE.OrthographicCamera(t.left, t.right, t.top, t.bottom, t.near, t.far);
                    break;
                case"AmbientLight":
                    u = new THREE.AmbientLight(t.color);
                    break;
                case"DirectionalLight":
                    u = new THREE.DirectionalLight(t.color, t.intensity);
                    break;
                case"PointLight":
                    u = new THREE.PointLight(t.color, t.intensity, t.distance, t.decay);
                    break;
                case"SpotLight":
                    u = new THREE.SpotLight(t.color, t.intensity, t.distance, t.angle, t.exponent, t.decay);
                    break;
                case"HemisphereLight":
                    u = new THREE.HemisphereLight(t.color, t.groundColor, t.intensity);
                    break;
                case"Mesh":
                    u = new THREE.Mesh(u(t.geometry), f(t.material));
                    break;
                case"Line":
                    u = new THREE.Line(u(t.geometry), f(t.material), t.mode);
                    break;
                case"PointCloud":
                    u = new THREE.PointCloud(u(t.geometry), f(t.material));
                    break;
                case"Sprite":
                    u = new THREE.Sprite(f(t.material));
                    break;
                case"Group":
                    u = new THREE.Group;
                    break;
                default:
                    u = new THREE.Object3D
            }
            if (u.uuid = t.uuid, void 0 !== t.name && (u.name = t.name), void 0 !== t.matrix ? (n.fromArray(t.matrix), n.decompose(u.position, u.quaternion, u.scale)) : (void 0 !== t.position && u.position.fromArray(t.position), void 0 !== t.rotation && u.rotation.fromArray(t.rotation), void 0 !== t.scale && u.scale.fromArray(t.scale)), void 0 !== t.visible && (u.visible = t.visible), void 0 !== t.userData && (u.userData = t.userData), void 0 !== t.children)for (e in t.children)u.add(this.parseObject(t.children[e], i, r));
            return u
        }
    }()
};
THREE.TextureLoader = function (n) {
    this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager
};
THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader, load: function (n, t, i, r) {
        var u = new THREE.ImageLoader(this.manager);
        u.setCrossOrigin(this.crossOrigin);
        u.load(n, function (n) {
            n = new THREE.Texture(n);
            n.needsUpdate = !0;
            void 0 !== t && t(n)
        }, i, r)
    }, setCrossOrigin: function (n) {
        this.crossOrigin = n
    }
};
THREE.DataTextureLoader = THREE.BinaryTextureLoader = function () {
    this._parser = null
};
THREE.BinaryTextureLoader.prototype = {
    constructor: THREE.BinaryTextureLoader, load: function (n, t, i, r) {
        var e = this, u = new THREE.DataTexture, f = new THREE.XHRLoader;
        return f.setResponseType("arraybuffer"), f.load(n, function (n) {
            (n = e._parser(n)) && (void 0 !== n.image ? u.image = n.image : void 0 !== n.data && (u.image.width = n.width, u.image.height = n.height, u.image.data = n.data), u.wrapS = void 0 !== n.wrapS ? n.wrapS : THREE.ClampToEdgeWrapping, u.wrapT = void 0 !== n.wrapT ? n.wrapT : THREE.ClampToEdgeWrapping, u.magFilter = void 0 !== n.magFilter ? n.magFilter : THREE.LinearFilter, u.minFilter = void 0 !== n.minFilter ? n.minFilter : THREE.LinearMipMapLinearFilter, u.anisotropy = void 0 !== n.anisotropy ? n.anisotropy : 1, void 0 !== n.format && (u.format = n.format), void 0 !== n.type && (u.type = n.type), void 0 !== n.mipmaps && (u.mipmaps = n.mipmaps), 1 === n.mipmapCount && (u.minFilter = THREE.LinearFilter), u.needsUpdate = !0, t && t(u, n))
        }, i, r), u
    }
};
THREE.CompressedTextureLoader = function () {
    this._parser = null
};
THREE.CompressedTextureLoader.prototype = {
    constructor: THREE.CompressedTextureLoader, load: function (n, t, i) {
        var s = this, u = [], r = new THREE.CompressedTexture, f, o, e, h;
        if (r.image = u, f = new THREE.XHRLoader, f.setResponseType("arraybuffer"), n instanceof Array)for (o = 0, i = function (i) {
            f.load(n[i], function (n) {
                n = s._parser(n, !0);
                u[i] = {width: n.width, height: n.height, format: n.format, mipmaps: n.mipmaps};
                o += 1;
                6 === o && (1 == n.mipmapCount && (r.minFilter = THREE.LinearFilter), r.format = n.format, r.needsUpdate = !0, t && t(r))
            })
        }, e = 0, h = n.length; e < h; ++e)i(e); else f.load(n, function (n) {
            var e, i, f;
            if (n = s._parser(n, !0), n.isCubemap)for (e = n.mipmaps.length / n.mipmapCount, i = 0; i < e; i++)for (u[i] = {mipmaps: []}, f = 0; f < n.mipmapCount; f++)u[i].mipmaps.push(n.mipmaps[i * n.mipmapCount + f]), u[i].format = n.format, u[i].width = n.width, u[i].height = n.height; else r.image.width = n.width, r.image.height = n.height, r.mipmaps = n.mipmaps;
            1 === n.mipmapCount && (r.minFilter = THREE.LinearFilter);
            r.format = n.format;
            r.needsUpdate = !0;
            t && t(r)
        });
        return r
    }
};
THREE.Material = function () {
    Object.defineProperty(this, "id", {value: THREE.MaterialIdCount++});
    this.uuid = THREE.Math.generateUUID();
    this.name = "";
    this.type = "Material";
    this.side = THREE.FrontSide;
    this.opacity = 1;
    this.transparent = !1;
    this.blending = THREE.NormalBlending;
    this.blendSrc = THREE.SrcAlphaFactor;
    this.blendDst = THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = THREE.AddEquation;
    this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null;
    this.colorWrite = this.depthWrite = this.depthTest = !0;
    this.polygonOffset = !1;
    this.overdraw = this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
    this._needsUpdate = this.visible = !0
};
THREE.Material.prototype = {
    constructor: THREE.Material, get needsUpdate() {
        return this._needsUpdate
    }, set needsUpdate(n) {
        !0 === n && this.update();
        this._needsUpdate = n
    }, setValues: function (n) {
        var t, i, r;
        if (void 0 !== n)for (t in n)i = n[t], void 0 === i ? THREE.warn("THREE.Material: '" + t + "' parameter is undefined.") : t in this && (r = this[t], r instanceof THREE.Color ? r.set(i) : r instanceof THREE.Vector3 && i instanceof THREE.Vector3 ? r.copy(i) : this[t] = "overdraw" == t ? Number(i) : i)
    }, toJSON: function () {
        var n = {
            metadata: {version: 4.2, type: "material", generator: "MaterialExporter"},
            uuid: this.uuid,
            type: this.type
        };
        return "" !== this.name && (n.name = this.name), this instanceof THREE.MeshBasicMaterial ? (n.color = this.color.getHex(), this.vertexColors !== THREE.NoColors && (n.vertexColors = this.vertexColors), this.blending !== THREE.NormalBlending && (n.blending = this.blending), this.side !== THREE.FrontSide && (n.side = this.side)) : this instanceof THREE.MeshLambertMaterial ? (n.color = this.color.getHex(), n.emissive = this.emissive.getHex(), this.vertexColors !== THREE.NoColors && (n.vertexColors = this.vertexColors), this.shading !== THREE.SmoothShading && (n.shading = this.shading), this.blending !== THREE.NormalBlending && (n.blending = this.blending), this.side !== THREE.FrontSide && (n.side = this.side)) : this instanceof THREE.MeshPhongMaterial ? (n.color = this.color.getHex(), n.emissive = this.emissive.getHex(), n.specular = this.specular.getHex(), n.shininess = this.shininess, this.vertexColors !== THREE.NoColors && (n.vertexColors = this.vertexColors), this.shading !== THREE.SmoothShading && (n.shading = this.shading), this.blending !== THREE.NormalBlending && (n.blending = this.blending), this.side !== THREE.FrontSide && (n.side = this.side)) : this instanceof THREE.MeshNormalMaterial ? (this.blending !== THREE.NormalBlending && (n.blending = this.blending), this.side !== THREE.FrontSide && (n.side = this.side)) : this instanceof THREE.MeshDepthMaterial ? (this.blending !== THREE.NormalBlending && (n.blending = this.blending), this.side !== THREE.FrontSide && (n.side = this.side)) : this instanceof THREE.PointCloudMaterial ? (n.size = this.size, n.sizeAttenuation = this.sizeAttenuation, n.color = this.color.getHex(), this.vertexColors !== THREE.NoColors && (n.vertexColors = this.vertexColors), this.blending !== THREE.NormalBlending && (n.blending = this.blending)) : this instanceof THREE.ShaderMaterial ? (n.uniforms = this.uniforms, n.vertexShader = this.vertexShader, n.fragmentShader = this.fragmentShader) : this instanceof THREE.SpriteMaterial && (n.color = this.color.getHex()), 1 > this.opacity && (n.opacity = this.opacity), !1 !== this.transparent && (n.transparent = this.transparent), !1 !== this.wireframe && (n.wireframe = this.wireframe), n
    }, clone: function (n) {
        return void 0 === n && (n = new THREE.Material), n.name = this.name, n.side = this.side, n.opacity = this.opacity, n.transparent = this.transparent, n.blending = this.blending, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.alphaTest = this.alphaTest, n.overdraw = this.overdraw, n.visible = this.visible, n
    }, update: function () {
        this.dispatchEvent({type: "update"})
    }, dispose: function () {
        this.dispatchEvent({type: "dispose"})
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Material.prototype);
THREE.MaterialIdCount = 0;
THREE.LineBasicMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "LineBasicMaterial";
    this.color = new THREE.Color(16777215);
    this.linewidth = 1;
    this.linejoin = this.linecap = "round";
    this.vertexColors = THREE.NoColors;
    this.fog = !0;
    this.setValues(n)
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.LineBasicMaterial.prototype.clone = function () {
    var n = new THREE.LineBasicMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.color.copy(this.color), n.linewidth = this.linewidth, n.linecap = this.linecap, n.linejoin = this.linejoin, n.vertexColors = this.vertexColors, n.fog = this.fog, n
};
THREE.LineDashedMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "LineDashedMaterial";
    this.color = new THREE.Color(16777215);
    this.scale = this.linewidth = 1;
    this.dashSize = 3;
    this.gapSize = 1;
    this.vertexColors = !1;
    this.fog = !0;
    this.setValues(n)
};
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.constructor = THREE.LineDashedMaterial;
THREE.LineDashedMaterial.prototype.clone = function () {
    var n = new THREE.LineDashedMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.color.copy(this.color), n.linewidth = this.linewidth, n.scale = this.scale, n.dashSize = this.dashSize, n.gapSize = this.gapSize, n.vertexColors = this.vertexColors, n.fog = this.fog, n
};
THREE.MeshBasicMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "MeshBasicMaterial";
    this.color = new THREE.Color(16777215);
    this.envMap = this.alphaMap = this.specularMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphTargets = this.skinning = !1;
    this.setValues(n)
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshBasicMaterial.prototype.clone = function () {
    var n = new THREE.MeshBasicMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.color.copy(this.color), n.map = this.map, n.lightMap = this.lightMap, n.specularMap = this.specularMap, n.alphaMap = this.alphaMap, n.envMap = this.envMap, n.combine = this.combine, n.reflectivity = this.reflectivity, n.refractionRatio = this.refractionRatio, n.fog = this.fog, n.shading = this.shading, n.wireframe = this.wireframe, n.wireframeLinewidth = this.wireframeLinewidth, n.wireframeLinecap = this.wireframeLinecap, n.wireframeLinejoin = this.wireframeLinejoin, n.vertexColors = this.vertexColors, n.skinning = this.skinning, n.morphTargets = this.morphTargets, n
};
THREE.MeshLambertMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "MeshLambertMaterial";
    this.color = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.wrapAround = !1;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.envMap = this.alphaMap = this.specularMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(n)
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshLambertMaterial.prototype.clone = function () {
    var n = new THREE.MeshLambertMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.color.copy(this.color), n.emissive.copy(this.emissive), n.wrapAround = this.wrapAround, n.wrapRGB.copy(this.wrapRGB), n.map = this.map, n.lightMap = this.lightMap, n.specularMap = this.specularMap, n.alphaMap = this.alphaMap, n.envMap = this.envMap, n.combine = this.combine, n.reflectivity = this.reflectivity, n.refractionRatio = this.refractionRatio, n.fog = this.fog, n.shading = this.shading, n.wireframe = this.wireframe, n.wireframeLinewidth = this.wireframeLinewidth, n.wireframeLinecap = this.wireframeLinecap, n.wireframeLinejoin = this.wireframeLinejoin, n.vertexColors = this.vertexColors, n.skinning = this.skinning, n.morphTargets = this.morphTargets, n.morphNormals = this.morphNormals, n
};
THREE.MeshPhongMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "MeshPhongMaterial";
    this.color = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.specular = new THREE.Color(1118481);
    this.shininess = 30;
    this.wrapAround = this.metal = !1;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.bumpMap = this.lightMap = this.map = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new THREE.Vector2(1, 1);
    this.envMap = this.alphaMap = this.specularMap = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(n)
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshPhongMaterial.prototype.clone = function () {
    var n = new THREE.MeshPhongMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.color.copy(this.color), n.emissive.copy(this.emissive), n.specular.copy(this.specular), n.shininess = this.shininess, n.metal = this.metal, n.wrapAround = this.wrapAround, n.wrapRGB.copy(this.wrapRGB), n.map = this.map, n.lightMap = this.lightMap, n.bumpMap = this.bumpMap, n.bumpScale = this.bumpScale, n.normalMap = this.normalMap, n.normalScale.copy(this.normalScale), n.specularMap = this.specularMap, n.alphaMap = this.alphaMap, n.envMap = this.envMap, n.combine = this.combine, n.reflectivity = this.reflectivity, n.refractionRatio = this.refractionRatio, n.fog = this.fog, n.shading = this.shading, n.wireframe = this.wireframe, n.wireframeLinewidth = this.wireframeLinewidth, n.wireframeLinecap = this.wireframeLinecap, n.wireframeLinejoin = this.wireframeLinejoin, n.vertexColors = this.vertexColors, n.skinning = this.skinning, n.morphTargets = this.morphTargets, n.morphNormals = this.morphNormals, n
};
THREE.MeshDepthMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "MeshDepthMaterial";
    this.wireframe = this.morphTargets = !1;
    this.wireframeLinewidth = 1;
    this.setValues(n)
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshDepthMaterial.prototype.clone = function () {
    var n = new THREE.MeshDepthMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.wireframe = this.wireframe, n.wireframeLinewidth = this.wireframeLinewidth, n
};
THREE.MeshNormalMaterial = function (n) {
    THREE.Material.call(this, n);
    this.type = "MeshNormalMaterial";
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.morphTargets = !1;
    this.setValues(n)
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshNormalMaterial.prototype.clone = function () {
    var n = new THREE.MeshNormalMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.wireframe = this.wireframe, n.wireframeLinewidth = this.wireframeLinewidth, n
};
THREE.MeshFaceMaterial = function (n) {
    this.uuid = THREE.Math.generateUUID();
    this.type = "MeshFaceMaterial";
    this.materials = n instanceof Array ? n : []
};
THREE.MeshFaceMaterial.prototype = {
    constructor: THREE.MeshFaceMaterial, toJSON: function () {
        for (var t = {
            metadata: {version: 4.2, type: "material", generator: "MaterialExporter"},
            uuid: this.uuid,
            type: this.type,
            materials: []
        }, n = 0, i = this.materials.length; n < i; n++)t.materials.push(this.materials[n].toJSON());
        return t
    }, clone: function () {
        for (var t = new THREE.MeshFaceMaterial, n = 0; n < this.materials.length; n++)t.materials.push(this.materials[n].clone());
        return t
    }
};
THREE.PointCloudMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "PointCloudMaterial";
    this.color = new THREE.Color(16777215);
    this.map = null;
    this.size = 1;
    this.sizeAttenuation = !0;
    this.vertexColors = THREE.NoColors;
    this.fog = !0;
    this.setValues(n)
};
THREE.PointCloudMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.PointCloudMaterial.prototype.constructor = THREE.PointCloudMaterial;
THREE.PointCloudMaterial.prototype.clone = function () {
    var n = new THREE.PointCloudMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.color.copy(this.color), n.map = this.map, n.size = this.size, n.sizeAttenuation = this.sizeAttenuation, n.vertexColors = this.vertexColors, n.fog = this.fog, n
};
THREE.ParticleBasicMaterial = function (n) {
    return THREE.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."), new THREE.PointCloudMaterial(n)
};
THREE.ParticleSystemMaterial = function (n) {
    return THREE.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."), new THREE.PointCloudMaterial(n)
};
THREE.ShaderMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "ShaderMaterial";
    this.defines = {};
    this.uniforms = {};
    this.attributes = null;
    this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
    this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
    this.shading = THREE.SmoothShading;
    this.linewidth = 1;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.lights = this.fog = !1;
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.defaultAttributeValues = {color: [1, 1, 1], uv: [0, 0], uv2: [0, 0]};
    this.index0AttributeName = void 0;
    this.setValues(n)
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;
THREE.ShaderMaterial.prototype.clone = function () {
    var n = new THREE.ShaderMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.fragmentShader = this.fragmentShader, n.vertexShader = this.vertexShader, n.uniforms = THREE.UniformsUtils.clone(this.uniforms), n.attributes = this.attributes, n.defines = this.defines, n.shading = this.shading, n.wireframe = this.wireframe, n.wireframeLinewidth = this.wireframeLinewidth, n.fog = this.fog, n.lights = this.lights, n.vertexColors = this.vertexColors, n.skinning = this.skinning, n.morphTargets = this.morphTargets, n.morphNormals = this.morphNormals, n
};
THREE.RawShaderMaterial = function (n) {
    THREE.ShaderMaterial.call(this, n);
    this.type = "RawShaderMaterial"
};
THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.RawShaderMaterial.prototype.constructor = THREE.RawShaderMaterial;
THREE.RawShaderMaterial.prototype.clone = function () {
    var n = new THREE.RawShaderMaterial;
    return THREE.ShaderMaterial.prototype.clone.call(this, n), n
};
THREE.SpriteMaterial = function (n) {
    THREE.Material.call(this);
    this.type = "SpriteMaterial";
    this.color = new THREE.Color(16777215);
    this.map = null;
    this.rotation = 0;
    this.fog = !1;
    this.setValues(n)
};
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.constructor = THREE.SpriteMaterial;
THREE.SpriteMaterial.prototype.clone = function () {
    var n = new THREE.SpriteMaterial;
    return THREE.Material.prototype.clone.call(this, n), n.color.copy(this.color), n.map = this.map, n.rotation = this.rotation, n.fog = this.fog, n
};
THREE.Texture = function (n, t, i, r, u, f, e, o, s) {
    Object.defineProperty(this, "id", {value: THREE.TextureIdCount++});
    this.uuid = THREE.Math.generateUUID();
    this.sourceFile = this.name = "";
    this.image = void 0 !== n ? n : THREE.Texture.DEFAULT_IMAGE;
    this.mipmaps = [];
    this.mapping = void 0 !== t ? t : THREE.Texture.DEFAULT_MAPPING;
    this.wrapS = void 0 !== i ? i : THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== r ? r : THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== u ? u : THREE.LinearFilter;
    this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter;
    this.anisotropy = void 0 !== s ? s : 1;
    this.format = void 0 !== e ? e : THREE.RGBAFormat;
    this.type = void 0 !== o ? o : THREE.UnsignedByteType;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.generateMipmaps = !0;
    this.premultiplyAlpha = !1;
    this.flipY = !0;
    this.unpackAlignment = 4;
    this._needsUpdate = !1;
    this.onUpdate = null
};
THREE.Texture.DEFAULT_IMAGE = void 0;
THREE.Texture.DEFAULT_MAPPING = THREE.UVMapping;
THREE.Texture.prototype = {
    constructor: THREE.Texture, get needsUpdate() {
        return this._needsUpdate
    }, set needsUpdate(n) {
        !0 === n && this.update();
        this._needsUpdate = n
    }, clone: function (n) {
        return void 0 === n && (n = new THREE.Texture), n.image = this.image, n.mipmaps = this.mipmaps.slice(0), n.mapping = this.mapping, n.wrapS = this.wrapS, n.wrapT = this.wrapT, n.magFilter = this.magFilter, n.minFilter = this.minFilter, n.anisotropy = this.anisotropy, n.format = this.format, n.type = this.type, n.offset.copy(this.offset), n.repeat.copy(this.repeat), n.generateMipmaps = this.generateMipmaps, n.premultiplyAlpha = this.premultiplyAlpha, n.flipY = this.flipY, n.unpackAlignment = this.unpackAlignment, n
    }, update: function () {
        this.dispatchEvent({type: "update"})
    }, dispose: function () {
        this.dispatchEvent({type: "dispose"})
    }
};
THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype);
THREE.TextureIdCount = 0;
THREE.CubeTexture = function (n, t, i, r, u, f, e, o, s) {
    t = void 0 !== t ? t : THREE.CubeReflectionMapping;
    THREE.Texture.call(this, n, t, i, r, u, f, e, o, s);
    this.images = n
};
THREE.CubeTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CubeTexture.prototype.constructor = THREE.CubeTexture;
THREE.CubeTexture.clone = function (n) {
    return void 0 === n && (n = new THREE.CubeTexture), THREE.Texture.prototype.clone.call(this, n), n.images = this.images, n
};
THREE.CompressedTexture = function (n, t, i, r, u, f, e, o, s, h, c) {
    THREE.Texture.call(this, null, f, e, o, s, h, r, u, c);
    this.image = {width: t, height: i};
    this.mipmaps = n;
    this.generateMipmaps = this.flipY = !1
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.constructor = THREE.CompressedTexture;
THREE.CompressedTexture.prototype.clone = function () {
    var n = new THREE.CompressedTexture;
    return THREE.Texture.prototype.clone.call(this, n), n
};
THREE.DataTexture = function (n, t, i, r, u, f, e, o, s, h, c) {
    THREE.Texture.call(this, null, f, e, o, s, h, r, u, c);
    this.image = {data: n, width: t, height: i}
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.constructor = THREE.DataTexture;
THREE.DataTexture.prototype.clone = function () {
    var n = new THREE.DataTexture;
    return THREE.Texture.prototype.clone.call(this, n), n
};
THREE.VideoTexture = function (n, t, i, r, u, f, e, o, s) {
    THREE.Texture.call(this, n, t, i, r, u, f, e, o, s);
    this.generateMipmaps = !1;
    var c = this, h = function () {
        requestAnimationFrame(h);
        n.readyState === n.HAVE_ENOUGH_DATA && (c.needsUpdate = !0)
    };
    h()
};
THREE.VideoTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.VideoTexture.prototype.constructor = THREE.VideoTexture;
THREE.Group = function () {
    THREE.Object3D.call(this);
    this.type = "Group"
};
THREE.Group.prototype = Object.create(THREE.Object3D.prototype);
THREE.Group.prototype.constructor = THREE.Group;
THREE.PointCloud = function (n, t) {
    THREE.Object3D.call(this);
    this.type = "PointCloud";
    this.geometry = void 0 !== n ? n : new THREE.Geometry;
    this.material = void 0 !== t ? t : new THREE.PointCloudMaterial({color: 16777215 * Math.random()})
};
THREE.PointCloud.prototype = Object.create(THREE.Object3D.prototype);
THREE.PointCloud.prototype.constructor = THREE.PointCloud;
THREE.PointCloud.prototype.raycast = function () {
    var t = new THREE.Matrix4, n = new THREE.Ray;
    return function (i, r) {
        var a = this, u = a.geometry, c = i.params.PointCloud.threshold, s, f, o, h, y, v;
        if (t.getInverse(this.matrixWorld), n.copy(i.ray).applyMatrix4(t), null === u.boundingBox || !1 !== n.isIntersectionBox(u.boundingBox)) {
            var p = c / ((this.scale.x + this.scale.y + this.scale.z) / 3), e = new THREE.Vector3, c = function (t, u) {
                var e = n.distanceToPoint(t), f, o;
                e < p && (f = n.closestPointToPoint(t), f.applyMatrix4(a.matrixWorld), o = i.ray.origin.distanceTo(f), r.push({
                    distance: o,
                    distanceToRay: e,
                    point: f.clone(),
                    index: u,
                    face: null,
                    object: a
                }))
            };
            if (u instanceof THREE.BufferGeometry)if (f = u.attributes, s = f.position.array, void 0 !== f.index)for (f = f.index.array, o = u.offsets, 0 === o.length && (o = [{
                start: 0,
                count: f.length,
                index: 0
            }]), h = 0, y = o.length; h < y; ++h)for (var l = o[h].start, w = o[h].index, u = l, l = l + o[h].count; u < l; u++)v = w + f[u], e.fromArray(s, 3 * v), c(e, v); else for (f = s.length / 3, u = 0; u < f; u++)e.set(s[3 * u], s[3 * u + 1], s[3 * u + 2]), c(e, u); else for (e = this.geometry.vertices, u = 0; u < e.length; u++)c(e[u], u)
        }
    }
}();
THREE.PointCloud.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.PointCloud(this.geometry, this.material)), THREE.Object3D.prototype.clone.call(this, n), n
};
THREE.ParticleSystem = function (n, t) {
    return THREE.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."), new THREE.PointCloud(n, t)
};
THREE.Line = function (n, t, i) {
    THREE.Object3D.call(this);
    this.type = "Line";
    this.geometry = void 0 !== n ? n : new THREE.Geometry;
    this.material = void 0 !== t ? t : new THREE.LineBasicMaterial({color: 16777215 * Math.random()});
    this.mode = void 0 !== i ? i : THREE.LineStrip
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.constructor = THREE.Line;
THREE.Line.prototype.raycast = function () {
    var i = new THREE.Matrix4, n = new THREE.Ray, t = new THREE.Sphere;
    return function (r, u) {
        var c = r.linePrecision, c = c * c, f = this.geometry, o, h, e;
        if (null === f.boundingSphere && f.computeBoundingSphere(), t.copy(f.boundingSphere), t.applyMatrix4(this.matrixWorld), !1 !== r.ray.isIntersectionSphere(t)) {
            i.getInverse(this.matrixWorld);
            n.copy(r.ray).applyMatrix4(i);
            var s = new THREE.Vector3, l = new THREE.Vector3, a = new THREE.Vector3, v = new THREE.Vector3, p = this.mode === THREE.LineStrip ? 1 : 2;
            if (f instanceof THREE.BufferGeometry)if (o = f.attributes, void 0 !== o.index) {
                var w = o.index.array, o = o.position.array, y = f.offsets;
                for (0 === y.length && (y = [{
                    start: 0,
                    count: w.length,
                    index: 0
                }]), h = 0; h < y.length; h++)for (var b = y[h].start, d = y[h].count, k = y[h].index, f = b; f < b + d - 1; f += p)e = k + w[f + 1], s.fromArray(o, 3 * (k + w[f])), l.fromArray(o, 3 * e), e = n.distanceSqToSegment(s, l, v, a), e > c || (e = n.origin.distanceTo(v), e < r.near || e > r.far || u.push({
                    distance: e,
                    point: a.clone().applyMatrix4(this.matrixWorld),
                    index: f,
                    offsetIndex: h,
                    face: null,
                    faceIndex: null,
                    object: this
                }))
            } else for (o = o.position.array, f = 0; f < o.length / 3 - 1; f += p)s.fromArray(o, 3 * f), l.fromArray(o, 3 * f + 3), e = n.distanceSqToSegment(s, l, v, a), e > c || (e = n.origin.distanceTo(v), e < r.near || e > r.far || u.push({
                distance: e,
                point: a.clone().applyMatrix4(this.matrixWorld),
                index: f,
                face: null,
                faceIndex: null,
                object: this
            })); else if (f instanceof THREE.Geometry)for (s = f.vertices, l = s.length, f = 0; f < l - 1; f += p)e = n.distanceSqToSegment(s[f], s[f + 1], v, a), e > c || (e = n.origin.distanceTo(v), e < r.near || e > r.far || u.push({
                distance: e,
                point: a.clone().applyMatrix4(this.matrixWorld),
                index: f,
                face: null,
                faceIndex: null,
                object: this
            }))
        }
    }
}();
THREE.Line.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.Line(this.geometry, this.material, this.mode)), THREE.Object3D.prototype.clone.call(this, n), n
};
THREE.Mesh = function (n, t) {
    THREE.Object3D.call(this);
    this.type = "Mesh";
    this.geometry = void 0 !== n ? n : new THREE.Geometry;
    this.material = void 0 !== t ? t : new THREE.MeshBasicMaterial({color: 16777215 * Math.random()});
    this.updateMorphTargets()
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.updateMorphTargets = function () {
    if (void 0 !== this.geometry.morphTargets && 0 < this.geometry.morphTargets.length) {
        this.morphTargetBase = -1;
        this.morphTargetForcedOrder = [];
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (var n = 0, t = this.geometry.morphTargets.length; n < t; n++)this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[n].name] = n
    }
};
THREE.Mesh.prototype.getMorphTargetIndexByName = function (n) {
    return void 0 !== this.morphTargetDictionary[n] ? this.morphTargetDictionary[n] : (THREE.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + n + " does not exist. Returning 0."), 0)
};
THREE.Mesh.prototype.raycast = function () {
    var f = new THREE.Matrix4, r = new THREE.Ray, u = new THREE.Sphere, n = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Vector3;
    return function (e, o) {
        var s = this.geometry, w, h, v, y, it, b, rt, l, a, tt, ut, k, nt;
        if (null === s.boundingSphere && s.computeBoundingSphere(), u.copy(s.boundingSphere), u.applyMatrix4(this.matrixWorld), !1 !== e.ray.isIntersectionSphere(u) && (f.getInverse(this.matrixWorld), r.copy(e.ray).applyMatrix4(f), null === s.boundingBox || !1 !== r.isIntersectionBox(s.boundingBox)))if (s instanceof THREE.BufferGeometry) {
            if (w = this.material, void 0 !== w)if (h = s.attributes, it = e.precision, void 0 !== h.index) {
                var p = h.index.array, d = h.position.array, g = s.offsets;
                for (0 === g.length && (g = [{
                    start: 0,
                    count: p.length,
                    index: 0
                }]), b = 0, rt = g.length; b < rt; ++b)for (var h = g[b].start, c = g[b].index, s = h, tt = h + g[b].count; s < tt; s += 3)h = c + p[s], v = c + p[s + 1], y = c + p[s + 2], n.fromArray(d, 3 * h), t.fromArray(d, 3 * v), i.fromArray(d, 3 * y), l = w.side === THREE.BackSide ? r.intersectTriangle(i, t, n, !0) : r.intersectTriangle(n, t, i, w.side !== THREE.DoubleSide), null !== l && (l.applyMatrix4(this.matrixWorld), a = e.ray.origin.distanceTo(l), a < it || a < e.near || a > e.far || o.push({
                    distance: a,
                    point: l,
                    face: new THREE.Face3(h, v, y, THREE.Triangle.normal(n, t, i)),
                    faceIndex: null,
                    object: this
                }))
            } else for (d = h.position.array, p = s = 0, tt = d.length; s < tt; s += 3, p += 9)h = s, v = s + 1, y = s + 2, n.fromArray(d, p), t.fromArray(d, p + 3), i.fromArray(d, p + 6), l = w.side === THREE.BackSide ? r.intersectTriangle(i, t, n, !0) : r.intersectTriangle(n, t, i, w.side !== THREE.DoubleSide), null !== l && (l.applyMatrix4(this.matrixWorld), a = e.ray.origin.distanceTo(l), a < it || a < e.near || a > e.far || o.push({
                distance: a,
                point: l,
                face: new THREE.Face3(h, v, y, THREE.Triangle.normal(n, t, i)),
                faceIndex: null,
                object: this
            }))
        } else if (s instanceof THREE.Geometry)for (p = this.material instanceof THREE.MeshFaceMaterial, d = !0 === p ? this.material.materials : null, it = e.precision, g = s.vertices, b = 0, rt = s.faces.length; b < rt; b++)if (c = s.faces[b], w = !0 === p ? d[c.materialIndex] : this.material, void 0 !== w) {
            if (h = g[c.a], v = g[c.b], y = g[c.c], !0 === w.morphTargets) {
                for (l = s.morphTargets, a = this.morphTargetInfluences, n.set(0, 0, 0), t.set(0, 0, 0), i.set(0, 0, 0), tt = 0, ut = l.length; tt < ut; tt++)k = a[tt], 0 !== k && (nt = l[tt].vertices, n.x += (nt[c.a].x - h.x) * k, n.y += (nt[c.a].y - h.y) * k, n.z += (nt[c.a].z - h.z) * k, t.x += (nt[c.b].x - v.x) * k, t.y += (nt[c.b].y - v.y) * k, t.z += (nt[c.b].z - v.z) * k, i.x += (nt[c.c].x - y.x) * k, i.y += (nt[c.c].y - y.y) * k, i.z += (nt[c.c].z - y.z) * k);
                n.add(h);
                t.add(v);
                i.add(y);
                h = n;
                v = t;
                y = i
            }
            l = w.side === THREE.BackSide ? r.intersectTriangle(y, v, h, !0) : r.intersectTriangle(h, v, y, w.side !== THREE.DoubleSide);
            null !== l && (l.applyMatrix4(this.matrixWorld), a = e.ray.origin.distanceTo(l), a < it || a < e.near || a > e.far || o.push({
                distance: a,
                point: l,
                face: c,
                faceIndex: b,
                object: this
            }))
        }
    }
}();
THREE.Mesh.prototype.clone = function (n, t) {
    return void 0 === n && (n = new THREE.Mesh(this.geometry, this.material)), THREE.Object3D.prototype.clone.call(this, n, t), n
};
THREE.Bone = function (n) {
    THREE.Object3D.call(this);
    this.type = "Bone";
    this.skin = n
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Skeleton = function (n, t, i) {
    if (this.useVertexTexture = void 0 !== i ? i : !0, this.identityMatrix = new THREE.Matrix4, n = n || [], this.bones = n.slice(0), this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = n = 256 < this.bones.length ? 64 : 64 < this.bones.length ? 32 : 16 < this.bones.length ? 16 : 8, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter, this.boneTexture.magFilter = THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * this.bones.length), void 0 === t)this.calculateInverses(); else if (this.bones.length === t.length)this.boneInverses = t.slice(0); else for (THREE.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [], t = 0, n = this.bones.length; t < n; t++)this.boneInverses.push(new THREE.Matrix4)
};
THREE.Skeleton.prototype.calculateInverses = function () {
    var n, i, t;
    for (this.boneInverses = [], n = 0, i = this.bones.length; n < i; n++)t = new THREE.Matrix4, this.bones[n] && t.getInverse(this.bones[n].matrixWorld), this.boneInverses.push(t)
};
THREE.Skeleton.prototype.pose = function () {
    for (var n, t = 0, i = this.bones.length; t < i; t++)(n = this.bones[t]) && n.matrixWorld.getInverse(this.boneInverses[t]);
    for (t = 0, i = this.bones.length; t < i; t++)(n = this.bones[t]) && (n.parent ? (n.matrix.getInverse(n.parent.matrixWorld), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale))
};
THREE.Skeleton.prototype.update = function () {
    var n = new THREE.Matrix4;
    return function () {
        for (var t = 0, i = this.bones.length; t < i; t++)n.multiplyMatrices(this.bones[t] ? this.bones[t].matrixWorld : this.identityMatrix, this.boneInverses[t]), n.flattenToArrayOffset(this.boneMatrices, 16 * t);
        this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
    }
}();
THREE.SkinnedMesh = function (n, t, i) {
    if (THREE.Mesh.call(this, n, t), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new THREE.Matrix4, this.bindMatrixInverse = new THREE.Matrix4, n = [], this.geometry && void 0 !== this.geometry.bones) {
        for (var u, o, f, e, r = 0, s = this.geometry.bones.length; r < s; ++r)u = this.geometry.bones[r], o = u.pos, f = u.rotq, e = u.scl, t = new THREE.Bone(this), n.push(t), t.name = u.name, t.position.set(o[0], o[1], o[2]), t.quaternion.set(f[0], f[1], f[2], f[3]), void 0 !== e ? t.scale.set(e[0], e[1], e[2]) : t.scale.set(1, 1, 1);
        for (r = 0, s = this.geometry.bones.length; r < s; ++r)u = this.geometry.bones[r], -1 !== u.parent ? n[u.parent].add(n[r]) : this.add(n[r])
    }
    this.normalizeSkinWeights();
    this.updateMatrixWorld(!0);
    this.bind(new THREE.Skeleton(n, void 0, i))
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.bind = function (n, t) {
    this.skeleton = n;
    void 0 === t && (this.updateMatrixWorld(!0), t = this.matrixWorld);
    this.bindMatrix.copy(t);
    this.bindMatrixInverse.getInverse(t)
};
THREE.SkinnedMesh.prototype.pose = function () {
    this.skeleton.pose()
};
THREE.SkinnedMesh.prototype.normalizeSkinWeights = function () {
    var n, t, i;
    if (this.geometry instanceof THREE.Geometry)for (n = 0; n < this.geometry.skinIndices.length; n++)t = this.geometry.skinWeights[n], i = 1 / t.lengthManhattan(), Infinity !== i ? t.multiplyScalar(i) : t.set(1)
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function () {
    THREE.Mesh.prototype.updateMatrixWorld.call(this, !0);
    "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : THREE.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
};
THREE.SkinnedMesh.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), THREE.Mesh.prototype.clone.call(this, n), n
};
THREE.MorphAnimMesh = function (n, t) {
    THREE.Mesh.call(this, n, t);
    this.type = "MorphAnimMesh";
    this.duration = 1e3;
    this.mirroredLoop = !1;
    this.currentKeyframe = this.lastKeyframe = this.time = 0;
    this.direction = 1;
    this.directionBackwards = !1;
    this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh;
THREE.MorphAnimMesh.prototype.setFrameRange = function (n, t) {
    this.startKeyframe = n;
    this.endKeyframe = t;
    this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
    this.direction = 1;
    this.directionBackwards = !1
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
    this.direction = -1;
    this.directionBackwards = !0
};
THREE.MorphAnimMesh.prototype.parseAnimations = function () {
    var i = this.geometry, n, r;
    i.animations || (i.animations = {});
    for (var u, f = i.animations, t = 0, e = i.morphTargets.length; t < e; t++)n = i.morphTargets[t].name.match(/([a-z]+)_?(\d+)/), n && 1 < n.length && (n = n[1], f[n] || (f[n] = {
        start: Infinity,
        end: -Infinity
    }), r = f[n], t < r.start && (r.start = t), t > r.end && (r.end = t), u || (u = n));
    i.firstAnimation = u
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function (n, t, i) {
    this.geometry.animations || (this.geometry.animations = {});
    this.geometry.animations[n] = {start: t, end: i}
};
THREE.MorphAnimMesh.prototype.playAnimation = function (n, t) {
    var i = this.geometry.animations[n];
    i ? (this.setFrameRange(i.start, i.end), this.duration = (i.end - i.start) / t * 1e3, this.time = 0) : THREE.warn("THREE.MorphAnimMesh: animation[" + n + "] undefined in .playAnimation()")
};
THREE.MorphAnimMesh.prototype.updateAnimation = function (n) {
    var t = this.duration / this.length;
    this.time += this.direction * n;
    this.mirroredLoop ? (this.time > this.duration || 0 > this.time) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), 0 > this.time && (this.time = 0, this.directionBackwards = !1)) : (this.time %= this.duration, 0 > this.time && (this.time += this.duration));
    n = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / t), 0, this.length - 1);
    n !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[n] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = n);
    t = this.time % t / t;
    this.directionBackwards && (t = 1 - t);
    this.morphTargetInfluences[this.currentKeyframe] = t;
    this.morphTargetInfluences[this.lastKeyframe] = 1 - t
};
THREE.MorphAnimMesh.prototype.interpolateTargets = function (n, t, i) {
    for (var r = this.morphTargetInfluences, u = 0, f = r.length; u < f; u++)r[u] = 0;
    -1 < n && (r[n] = 1 - i);
    -1 < t && (r[t] = i)
};
THREE.MorphAnimMesh.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.MorphAnimMesh(this.geometry, this.material)), n.duration = this.duration, n.mirroredLoop = this.mirroredLoop, n.time = this.time, n.lastKeyframe = this.lastKeyframe, n.currentKeyframe = this.currentKeyframe, n.direction = this.direction, n.directionBackwards = this.directionBackwards, THREE.Mesh.prototype.clone.call(this, n), n
};
THREE.LOD = function () {
    THREE.Object3D.call(this);
    this.objects = []
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.addLevel = function (n, t) {
    void 0 === t && (t = 0);
    t = Math.abs(t);
    for (var i = 0; i < this.objects.length && !(t < this.objects[i].distance); i++);
    this.objects.splice(i, 0, {distance: t, object: n});
    this.add(n)
};
THREE.LOD.prototype.getObjectForDistance = function (n) {
    for (var t = 1, i = this.objects.length; t < i && !(n < this.objects[t].distance); t++);
    return this.objects[t - 1].object
};
THREE.LOD.prototype.raycast = function () {
    var n = new THREE.Vector3;
    return function (t, i) {
        n.setFromMatrixPosition(this.matrixWorld);
        var r = t.ray.origin.distanceTo(n);
        this.getObjectForDistance(r).raycast(t, i)
    }
}();
THREE.LOD.prototype.update = function () {
    var n = new THREE.Vector3, t = new THREE.Vector3;
    return function (i) {
        if (1 < this.objects.length) {
            n.setFromMatrixPosition(i.matrixWorld);
            t.setFromMatrixPosition(this.matrixWorld);
            i = n.distanceTo(t);
            this.objects[0].object.visible = !0;
            for (var r = 1, u = this.objects.length; r < u; r++)if (i >= this.objects[r].distance)this.objects[r - 1].object.visible = !1, this.objects[r].object.visible = !0; else break;
            for (; r < u; r++)this.objects[r].object.visible = !1
        }
    }
}();
THREE.LOD.prototype.clone = function (n) {
    var t, r, i;
    for (void 0 === n && (n = new THREE.LOD), THREE.Object3D.prototype.clone.call(this, n), t = 0, r = this.objects.length; t < r; t++)i = this.objects[t].object.clone(), i.visible = 0 === t, n.addLevel(i, this.objects[t].distance);
    return n
};
THREE.Sprite = function () {
    var t = new Uint16Array([0, 1, 2, 0, 2, 3]), i = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0]), r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), n = new THREE.BufferGeometry;
    return n.addAttribute("index", new THREE.BufferAttribute(t, 1)), n.addAttribute("position", new THREE.BufferAttribute(i, 3)), n.addAttribute("uv", new THREE.BufferAttribute(r, 2)), function (t) {
        THREE.Object3D.call(this);
        this.type = "Sprite";
        this.geometry = n;
        this.material = void 0 !== t ? t : new THREE.SpriteMaterial
    }
}();
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.raycast = function () {
    var n = new THREE.Vector3;
    return function (t, i) {
        n.setFromMatrixPosition(this.matrixWorld);
        var r = t.ray.distanceToPoint(n);
        r > this.scale.x || i.push({distance: r, point: this.position, face: null, object: this})
    }
}();
THREE.Sprite.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.Sprite(this.material)), THREE.Object3D.prototype.clone.call(this, n), n
};
THREE.Particle = THREE.Sprite;
THREE.LensFlare = function (n, t, i, r, u) {
    THREE.Object3D.call(this);
    this.lensFlares = [];
    this.positionScreen = new THREE.Vector3;
    this.customUpdateCallback = void 0;
    void 0 !== n && this.add(n, t, i, r, u)
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.add = function (n, t, i, r, u, f) {
    void 0 === t && (t = -1);
    void 0 === i && (i = 0);
    void 0 === f && (f = 1);
    void 0 === u && (u = new THREE.Color(16777215));
    void 0 === r && (r = THREE.NormalBlending);
    i = Math.min(i, Math.max(0, i));
    this.lensFlares.push({
        texture: n,
        size: t,
        distance: i,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: f,
        color: u,
        blending: r
    })
};
THREE.LensFlare.prototype.updateLensFlares = function () {
    for (var i = this.lensFlares.length, n, r = 2 * -this.positionScreen.x, u = 2 * -this.positionScreen.y, t = 0; t < i; t++)n = this.lensFlares[t], n.x = this.positionScreen.x + r * n.distance, n.y = this.positionScreen.y + u * n.distance, n.wantedRotation = n.x * Math.PI * .25, n.rotation += .25 * (n.wantedRotation - n.rotation)
};
THREE.Scene = function () {
    THREE.Object3D.call(this);
    this.type = "Scene";
    this.overrideMaterial = this.fog = null;
    this.autoUpdate = !0
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.clone = function (n) {
    return void 0 === n && (n = new THREE.Scene), THREE.Object3D.prototype.clone.call(this, n), null !== this.fog && (n.fog = this.fog.clone()), null !== this.overrideMaterial && (n.overrideMaterial = this.overrideMaterial.clone()), n.autoUpdate = this.autoUpdate, n.matrixAutoUpdate = this.matrixAutoUpdate, n
};
THREE.Fog = function (n, t, i) {
    this.name = "";
    this.color = new THREE.Color(n);
    this.near = void 0 !== t ? t : 1;
    this.far = void 0 !== i ? i : 1e3
};
THREE.Fog.prototype.clone = function () {
    return new THREE.Fog(this.color.getHex(), this.near, this.far)
};
THREE.FogExp2 = function (n, t) {
    this.name = "";
    this.color = new THREE.Color(n);
    this.density = void 0 !== t ? t : .00025
};
THREE.FogExp2.prototype.clone = function () {
    return new THREE.FogExp2(this.color.getHex(), this.density)
};
THREE.ShaderChunk = {};
THREE.ShaderChunk.common = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\nfloat square( in float a ) { return a*a; }\nvec2  square( in vec2 a )  { return vec2( a.x*a.x, a.y*a.y ); }\nvec3  square( in vec3 a )  { return vec3( a.x*a.x, a.y*a.y, a.z*a.z ); }\nvec4  square( in vec4 a )  { return vec4( a.x*a.x, a.y*a.y, a.z*a.z, a.w*a.w ); }\nfloat saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }\nvec2  saturate( in vec2 a )  { return clamp( a, 0.0, 1.0 ); }\nvec3  saturate( in vec3 a )  { return clamp( a, 0.0, 1.0 ); }\nvec4  saturate( in vec4 a )  { return clamp( a, 0.0, 1.0 ); }\nfloat average( in float a ) { return a; }\nfloat average( in vec2 a )  { return ( a.x + a.y) * 0.5; }\nfloat average( in vec3 a )  { return ( a.x + a.y + a.z) / 3.0; }\nfloat average( in vec4 a )  { return ( a.x + a.y + a.z + a.w) * 0.25; }\nfloat whiteCompliment( in float a ) { return saturate( 1.0 - a ); }\nvec2  whiteCompliment( in vec2 a )  { return saturate( vec2(1.0) - a ); }\nvec3  whiteCompliment( in vec3 a )  { return saturate( vec3(1.0) - a ); }\nvec4  whiteCompliment( in vec4 a )  { return saturate( vec4(1.0) - a ); }\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal) {\n\tfloat distance = dot( planeNormal, point-pointOnPlane );\n\treturn point - distance * planeNormal;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn pointOnLine + lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) );\n}\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n\tif ( decayExponent > 0.0 ) {\n\t  return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );\n\t}\n\treturn 1.0;\n}\n\nvec3 inputToLinear( in vec3 a ) {\n#ifdef GAMMA_INPUT\n\treturn pow( a, vec3( float( GAMMA_FACTOR ) ) );\n#else\n\treturn a;\n#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n#ifdef GAMMA_OUTPUT\n\treturn pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n#else\n\treturn a;\n#endif\n}\n";
THREE.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n";
THREE.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n\tvLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n\tfloat dotProduct = dot( transformedNormal, dirVector );\n\tvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t#endif\n\n\t#endif\n\n\t#ifdef WRAP_AROUND\n\n\t\tvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\tdirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tdirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n\t\t#endif\n\n\t#endif\n\n\tvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n\t#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\n\t\tvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\tpointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tpointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t\tvLightFront += pointLightColor[ i ] * pointLightWeighting * attenuation;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += pointLightColor[ i ] * pointLightWeightingBack * attenuation;\n\n\t\t#endif\n\n\t}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\n\t\t\tspotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n\t\t\tfloat attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n\t\t\tlVector = normalize( lVector );\n\n\t\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\t\t\tvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\t\tvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t\t\t#endif\n\n\t\t\t#endif\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\t\tspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n\t\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\t\tspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n\t\t\t\t#endif\n\n\t\t\t#endif\n\n\t\t\tvLightFront += spotLightColor[ i ] * spotLightWeighting * attenuation * spotEffect;\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tvLightBack += spotLightColor[ i ] * spotLightWeightingBack * attenuation * spotEffect;\n\n\t\t\t#endif\n\n\t\t}\n\n\t}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n\t\tvec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\t\tfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n\t\tvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n\t\t#endif\n\n\t}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n\tvLightBack += ambientLightColor;\n\n#endif\n";
THREE.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n\n#endif\n";
THREE.ShaderChunk.default_vertex = "#ifdef USE_SKINNING\n\n\tvec4 mvPosition = modelViewMatrix * skinned;\n\n#elif defined( USE_MORPHTARGETS )\n\n\tvec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#else\n\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n";
THREE.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvarying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif";
THREE.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\t#ifdef USE_MORPHNORMALS\n\n\tvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n\t#else\n\n\tvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n\t#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n\tuniform float logDepthBufFC;\n\n#endif";
THREE.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vUv2;\n\n#endif";
THREE.ShaderChunk.lights_phong_fragment = "#ifndef FLAT_SHADED\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n\t#endif\n\n#else\n\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef USE_NORMALMAP\n\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n\tfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\tvec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n\t\t#else\n\n\t\t\tfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t#endif\n\n\t\ttotalDiffuseLight += pointLightColor[ i ] * pointDiffuseWeight * attenuation;\n\n\t\t\t\t// specular\n\n\t\tvec3 pointHalfVector = normalize( lVector + viewPosition );\n\t\tfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n\t\tfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * attenuation * specularNormalization;\n\n\t}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\n\t\t\tspotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n\t\t\t// diffuse\n\n\t\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\tfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\t\tvec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n\t\t\t#else\n\n\t\t\t\tfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t\t#endif\n\n\t\t\ttotalDiffuseLight += spotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect;\n\n\t\t\t// specular\n\n\t\t\tvec3 spotHalfVector = normalize( lVector + viewPosition );\n\t\t\tfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n\t\t\tfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n\t\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n\t\t\ttotalSpecularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;\n\n\t\t}\n\n\t}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\t\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, dirVector );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n\t\t#else\n\n\t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t#endif\n\n\t\ttotalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\n\t\t// specular\n\n\t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n\t\t/*\n\t\t// fresnel term from skin shader\n\t\tconst float F0 = 0.128;\n\n\t\tfloat base = 1.0 - dot( viewPosition, dirHalfVector );\n\t\tfloat exponential = pow( base, 5.0 );\n\n\t\tfloat fresnel = exponential + F0 * ( 1.0 - exponential );\n\t\t*/\n\n\t\t/*\n\t\t// fresnel term from fresnel shader\n\t\tconst float mFresnelBias = 0.08;\n\t\tconst float mFresnelScale = 0.3;\n\t\tconst float mFresnelPower = 5.0;\n\n\t\tfloat fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n\t\t*/\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t// \t\tdirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n\t}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n\t\tvec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, lVector );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n\t\tvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n\t\ttotalDiffuseLight += hemiColor;\n\n\t\t// specular (sky light)\n\n\t\tvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n\t\tfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n\t\tfloat hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n\t\t// specular (ground light)\n\n\t\tvec3 lVectorGround = -lVector;\n\n\t\tvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n\t\tfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n\t\tfloat hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n\t\tfloat dotProductGround = dot( normal, lVectorGround );\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\tvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n\t\tvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n\t}\n\n#endif\n\n#ifdef METAL\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) * specular + totalSpecularLight + emissive;\n\n#else\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n#endif\n";
THREE.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n\n#endif";
THREE.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n\tvec3 morphedNormal = vec3( 0.0 );\n\n\tmorphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tmorphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tmorphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tmorphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n\tmorphedNormal += normal;\n\n#endif";
THREE.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n\tuniform float reflectivity;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tuniform float refractionRatio;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\n\t#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif";
THREE.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n\t// Per-Pixel Tangent Space Normal Mapping\n\t// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\n\t}\n\n#endif\n";
THREE.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n";
THREE.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vUv2;\n\tuniform sampler2D lightMap;\n\n#endif";
THREE.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n\t\tvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n\t}\n\n#endif";
THREE.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvWorldPosition = worldPosition.xyz;\n\n#endif";
THREE.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n\tvec4 texelColor = texture2D( map, vUv );\n\n\ttexelColor.xyz = inputToLinear( texelColor.xyz );\n\n\tdiffuseColor *= texelColor;\n\n#endif";
THREE.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n\tvUv2 = uv2;\n\n#endif";
THREE.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n\tdiffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n";
THREE.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif\n";
THREE.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n\tvColor.xyz = inputToLinear( color.xyz );\n\n#endif";
THREE.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n\t#ifdef USE_MORPHTARGETS\n\n\tvec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n\t#else\n\n\tvec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n\t#endif\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n\n#endif\n";
THREE.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n\tvarying vec3 vReflect;\n\n\tuniform float refractionRatio;\n\n#endif\n";
THREE.ShaderChunk.linear_to_gamma_fragment = "\n\toutgoingLight = linearToOutput( outgoingLight );\n";
THREE.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif";
THREE.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n\tuniform vec3 wrapRGB;\n\n#endif\n";
THREE.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n\n#endif\n";
THREE.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef DOUBLE_SIDED\n\t\tfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t#else\n\t\tfloat flipNormal = 1.0;\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#endif\n\n\tenvColor.xyz = inputToLinear( envColor.xyz );\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n";
THREE.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif";
THREE.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n\t#endif\n\n#endif";
THREE.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n\t#ifndef USE_MORPHNORMALS\n\n\tuniform float morphTargetInfluences[ 8 ];\n\n\t#else\n\n\tuniform float morphTargetInfluences[ 4 ];\n\n\t#endif\n\n#endif";
THREE.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif";
THREE.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n\t#else\n\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\n\t#endif\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );\n\t\tfogFactor = whiteCompliment( fogFactor );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\n\t#endif\n\t\n\toutgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif";
THREE.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n\t// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\t\t// normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n";
THREE.ShaderChunk.defaultnormal_vertex = "#ifdef USE_SKINNING\n\n\tvec3 objectNormal = skinnedNormal.xyz;\n\n#elif defined( USE_MORPHNORMALS )\n\n\tvec3 objectNormal = morphedNormal;\n\n#else\n\n\tvec3 objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n\tobjectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n";
THREE.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n\tuniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n";
THREE.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif";
THREE.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif";
THREE.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n\toutgoingLight *= diffuseColor.xyz * texture2D( lightMap, vUv2 ).xyz;\n\n#endif";
THREE.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\tuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif";
THREE.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif";
THREE.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n\tvec3 morphed = vec3( 0.0 );\n\tmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\tmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\tmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\tmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n\t#ifndef USE_MORPHNORMALS\n\n\tmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\tmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\tmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\tmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n\t#endif\n\n\tmorphed += position;\n\n#endif";
THREE.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n\tvec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t#else\n\n\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t#endif\n\n#endif\n";
THREE.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n\t#ifdef SHADOWMAP_DEBUG\n\n\t\tvec3 frustumColors[3];\n\t\tfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n\t\tfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n\t\tfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n\t#endif\n\n\t#ifdef SHADOWMAP_CASCADE\n\n\t\tint inFrustumCount = 0;\n\n\t#endif\n\n\tfloat fDepth;\n\tvec3 shadowColor = vec3( 1.0 );\n\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n\t\tvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n\t\t\t\t// if ( something && something ) breaks ATI OpenGL shader compiler\n\t\t\t\t// if ( all( something, something ) ) using this instead\n\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\n\t\t\t\t// don't shadow pixels outside of light frustum\n\t\t\t\t// use just first frustum (for cascades)\n\t\t\t\t// don't shadow pixels behind far plane of light frustum\n\n\t\t#ifdef SHADOWMAP_CASCADE\n\n\t\t\tinFrustumCount += int( inFrustum );\n\t\t\tbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n\t\t#else\n\n\t\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n\t\t#endif\n\n\t\tbool frustumTest = all( frustumTestVec );\n\n\t\tif ( frustumTest ) {\n\n\t\t\tshadowCoord.z += shadowBias[ i ];\n\n\t\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\t\t\t\t// Percentage-close filtering\n\t\t\t\t\t\t// (9 pixel kernel)\n\t\t\t\t\t\t// http://fabiensanglard.net/shadowmappingPCF/\n\n\t\t\t\tfloat shadow = 0.0;\n\n\t\t/*\n\t\t\t\t\t\t// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n\t\t\t\t\t\t// must enroll loop manually\n\n\t\t\t\tfor ( float y = -1.25; y <= 1.25; y += 1.25 )\n\t\t\t\t\tfor ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n\t\t\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n\t\t\t\t\t\t\t\t// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n\t\t\t\t\t\t\t\t//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n\t\t\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\n\t\t\t\t\t\tif ( fDepth < shadowCoord.z )\n\t\t\t\t\t\t\tshadow += 1.0;\n\n\t\t\t\t}\n\n\t\t\t\tshadow /= 9.0;\n\n\t\t*/\n\n\t\t\t\tconst float shadowDelta = 1.0 / 9.0;\n\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n\t\t\t\tfloat dx0 = -1.25 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.25 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.25 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.25 * yPixelOffset;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n\t\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\t\t\t\t// Percentage-close filtering\n\t\t\t\t\t\t// (9 pixel kernel)\n\t\t\t\t\t\t// http://fabiensanglard.net/shadowmappingPCF/\n\n\t\t\t\tfloat shadow = 0.0;\n\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n\t\t\t\tfloat dx0 = -1.0 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.0 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.0 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.0 * yPixelOffset;\n\n\t\t\t\tmat3 shadowKernel;\n\t\t\t\tmat3 depthKernel;\n\n\t\t\t\tdepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tdepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tdepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tdepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tdepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tdepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tdepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tdepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tdepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n\t\t\t\tvec3 shadowZ = vec3( shadowCoord.z );\n\t\t\t\tshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n\t\t\t\tshadowKernel[0] *= vec3(0.25);\n\n\t\t\t\tshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n\t\t\t\tshadowKernel[1] *= vec3(0.25);\n\n\t\t\t\tshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n\t\t\t\tshadowKernel[2] *= vec3(0.25);\n\n\t\t\t\tvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n\t\t\t\tshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n\t\t\t\tshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n\t\t\t\tvec4 shadowValues;\n\t\t\t\tshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n\t\t\t\tshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n\t\t\t\tshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n\t\t\t\tshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n\t\t\t\tshadow = dot( shadowValues, vec4( 1.0 ) );\n\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n\t\t\t#else\n\n\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\n\t\t\t\tif ( fDepth < shadowCoord.z )\n\n\t\t// spot with multiple shadows is darker\n\n\t\t\t\t\tshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n\t\t// spot with multiple shadows has the same color as single shadow spot\n\n\t\t// \t\t\t\t\tshadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n\t\t\t#endif\n\n\t\t}\n\n\n\t\t#ifdef SHADOWMAP_DEBUG\n\n\t\t\t#ifdef SHADOWMAP_CASCADE\n\n\t\t\t\tif ( inFrustum && inFrustumCount == 1 ) outgoingLight *= frustumColors[ i ];\n\n\t\t\t#else\n\n\t\t\t\tif ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t}\n\n\t// NOTE: I am unsure if this is correct in linear space.  -bhouston, Dec 29, 2014\n\tshadowColor = inputToLinear( shadowColor );\n\n\toutgoingLight = outgoingLight * shadowColor;\n\n#endif\n";
THREE.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n\t#ifdef USE_SKINNING\n\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\n\t#elif defined( USE_MORPHTARGETS )\n\n\t\tvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n\t#else\n\n\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n\t#endif\n\n#endif\n";
THREE.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n\tuniform sampler2D shadowMap[ MAX_SHADOWS ];\n\tuniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n\tuniform float shadowDarkness[ MAX_SHADOWS ];\n\tuniform float shadowBias[ MAX_SHADOWS ];\n\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n\tfloat unpackDepth( const in vec4 rgba_depth ) {\n\n\t\tconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\t\tfloat depth = dot( rgba_depth, bit_shift );\n\t\treturn depth;\n\n\t}\n\n#endif";
THREE.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\t#ifdef BONE_TEXTURE\n\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\n\t\t\ty = dy * ( y + 0.5 );\n\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\n\t\t\treturn bone;\n\n\t\t}\n\n\t#else\n\n\t\tuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tmat4 bone = boneGlobalMatrices[ int(i) ];\n\t\t\treturn bone;\n\n\t\t}\n\n\t#endif\n\n#endif\n";
THREE.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n\tuniform float logDepthBufFC;\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\t#extension GL_EXT_frag_depth : enable\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n#endif";
THREE.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n";
THREE.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n";
THREE.UniformsUtils = {
    merge: function (n) {
        for (var r, u, i = {}, t = 0; t < n.length; t++) {
            r = this.clone(n[t]);
            for (u in r)i[u] = r[u]
        }
        return i
    }, clone: function (n) {
        var r = {}, i, u, t;
        for (i in n) {
            r[i] = {};
            for (u in n[i])t = n[i][u], r[i][u] = t instanceof THREE.Color || t instanceof THREE.Vector2 || t instanceof THREE.Vector3 || t instanceof THREE.Vector4 || t instanceof THREE.Matrix4 || t instanceof THREE.Texture ? t.clone() : t instanceof Array ? t.slice() : t
        }
        return r
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: {type: "c", value: new THREE.Color(15658734)},
        opacity: {type: "f", value: 1},
        map: {type: "t", value: null},
        offsetRepeat: {type: "v4", value: new THREE.Vector4(0, 0, 1, 1)},
        lightMap: {type: "t", value: null},
        specularMap: {type: "t", value: null},
        alphaMap: {type: "t", value: null},
        envMap: {type: "t", value: null},
        flipEnvMap: {type: "f", value: -1},
        reflectivity: {type: "f", value: 1},
        refractionRatio: {type: "f", value: .98},
        morphTargetInfluences: {type: "f", value: 0}
    },
    bump: {bumpMap: {type: "t", value: null}, bumpScale: {type: "f", value: 1}},
    normalmap: {normalMap: {type: "t", value: null}, normalScale: {type: "v2", value: new THREE.Vector2(1, 1)}},
    fog: {
        fogDensity: {type: "f", value: .00025},
        fogNear: {type: "f", value: 1},
        fogFar: {type: "f", value: 2e3},
        fogColor: {type: "c", value: new THREE.Color(16777215)}
    },
    lights: {
        ambientLightColor: {type: "fv", value: []},
        directionalLightDirection: {type: "fv", value: []},
        directionalLightColor: {type: "fv", value: []},
        hemisphereLightDirection: {type: "fv", value: []},
        hemisphereLightSkyColor: {type: "fv", value: []},
        hemisphereLightGroundColor: {type: "fv", value: []},
        pointLightColor: {type: "fv", value: []},
        pointLightPosition: {type: "fv", value: []},
        pointLightDistance: {type: "fv1", value: []},
        pointLightDecay: {type: "fv1", value: []},
        spotLightColor: {type: "fv", value: []},
        spotLightPosition: {type: "fv", value: []},
        spotLightDirection: {type: "fv", value: []},
        spotLightDistance: {type: "fv1", value: []},
        spotLightAngleCos: {type: "fv1", value: []},
        spotLightExponent: {type: "fv1", value: []},
        spotLightDecay: {type: "fv1", value: []}
    },
    particle: {
        psColor: {type: "c", value: new THREE.Color(15658734)},
        opacity: {type: "f", value: 1},
        size: {type: "f", value: 1},
        scale: {type: "f", value: 1},
        map: {type: "t", value: null},
        offsetRepeat: {type: "v4", value: new THREE.Vector4(0, 0, 1, 1)},
        fogDensity: {type: "f", value: .00025},
        fogNear: {type: "f", value: 1},
        fogFar: {type: "f", value: 2e3},
        fogColor: {type: "c", value: new THREE.Color(16777215)}
    },
    shadowmap: {
        shadowMap: {type: "tv", value: []},
        shadowMapSize: {type: "v2v", value: []},
        shadowBias: {type: "fv1", value: []},
        shadowDarkness: {type: "fv1", value: []},
        shadowMatrix: {type: "m4v", value: []}
    }
};
THREE.ShaderLib = {
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "\t#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "\t#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "\toutgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            }, wrapRGB: {type: "v3", value: new THREE.Vector3(1, 1, 1)}
        }]),
        vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "\t#ifdef DOUBLE_SIDED\n\t\tif ( gl_FrontFacing )\n\t\t\toutgoingLight += diffuseColor.rgb * vLightFront + emissive;\n\t\telse\n\t\t\toutgoingLight += diffuseColor.rgb * vLightBack + emissive;\n\t#else\n\t\toutgoingLight += diffuseColor.rgb * vLightFront + emissive;\n\t#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {type: "c", value: new THREE.Color(1118481)},
            shininess: {type: "f", value: 30},
            wrapRGB: {type: "v3", value: new THREE.Vector3(1, 1, 1)}
        }]),
        vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "\tvViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\tgl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( psColor, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphatest_fragment, "\toutgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    dashed: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
            scale: {
                type: "f",
                value: 1
            }, dashSize: {type: "f", value: 1}, totalSize: {type: "f", value: 2}
        }]),
        vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.color_fragment, "\toutgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}"].join("\n")
    },
    depth: {
        uniforms: {mNear: {type: "f", value: 1}, mFar: {type: "f", value: 2e3}, opacity: {type: "f", value: 1}},
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float mNear;\nuniform float mFar;\nuniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\tfloat color = 1.0 - smoothstep( mNear, mFar, depth );\n\tgl_FragColor = vec4( vec3( color ), opacity );\n}"].join("\n")
    },
    normal: {
        uniforms: {opacity: {type: "f", value: 1}},
        vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n\tvNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;\nvarying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tgl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    cube: {
        uniforms: {tCube: {type: "t", value: null}, tFlip: {type: "f", value: -1}},
        vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    equirect: {
        uniforms: {tEquirect: {type: "t", value: null}, tFlip: {type: "f", value: -1}},
        vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\nvec3 direction = normalize( vWorldPosition );\nvec2 sampleUV;\nsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\nsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\ngl_FragColor = texture2D( tEquirect, sampleUV );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {\n\tconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n\tconst vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n\tvec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );\n\tres -= res.xxyz * bit_mask;\n\treturn res;\n}\nvoid main() {", THREE.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tgl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );\n\t#else\n\t\tgl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n\t#endif\n}"].join("\n")
    }
};
THREE.WebGLRenderer = function (n) {
    function li(n) {
        var u = n.geometry, e, f, i, r;
        if (n = n.material, e = u.vertices.length, n.attributes) {
            void 0 === u.__webglCustomAttributesList && (u.__webglCustomAttributesList = []);
            for (f in n.attributes)i = n.attributes[f], (!i.__webglInitialized || i.createUniqueBuffers) && (i.__webglInitialized = !0, r = 1, "v2" === i.type ? r = 2 : "v3" === i.type ? r = 3 : "v4" === i.type ? r = 4 : "c" === i.type && (r = 3), i.size = r, i.array = new Float32Array(e * r), i.buffer = t.createBuffer(), i.buffer.belongsToAttribute = f, i.needsUpdate = !0), u.__webglCustomAttributesList.push(i)
        }
    }

    function ut(n, t) {
        return n.material instanceof THREE.MeshFaceMaterial ? n.material.materials[t.materialIndex] : n.material
    }

    function a(n, i, u, f) {
        var c, s, l, e, o, h;
        for (u = u.attributes, c = i.attributes, i = i.attributesKeys, s = 0, l = i.length; s < l; s++)e = i[s], o = c[e], 0 <= o && (h = u[e], void 0 !== h ? (e = h.itemSize, t.bindBuffer(t.ARRAY_BUFFER, h.buffer), r.enableAttribute(o), t.vertexAttribPointer(o, e, t.FLOAT, !1, 0, f * e * 4)) : void 0 !== n.defaultAttributeValues && (2 === n.defaultAttributeValues[e].length ? t.vertexAttrib2fv(o, n.defaultAttributeValues[e]) : 3 === n.defaultAttributeValues[e].length && t.vertexAttrib3fv(o, n.defaultAttributeValues[e])));
        r.disableUnusedAttributes()
    }

    function wr(n, t) {
        return n.object.renderOrder !== t.object.renderOrder ? n.object.renderOrder - t.object.renderOrder : n.material.id !== t.material.id ? n.material.id - t.material.id : n.z !== t.z ? n.z - t.z : n.id - t.id
    }

    function br(n, t) {
        return n.object.renderOrder !== t.object.renderOrder ? n.object.renderOrder - t.object.renderOrder : n.z !== t.z ? t.z - n.z : n.id - t.id
    }

    function ai(n, t) {
        return t[0] - n[0]
    }

    function vi(n) {
        var r, u;
        if (!1 !== n.visible) {
            if (!(n instanceof THREE.Scene || n instanceof THREE.Group)) {
                if (void 0 === n.__webglInit && (n.__webglInit = !0, n._modelViewMatrix = new THREE.Matrix4, n._normalMatrix = new THREE.Matrix3, n.addEventListener("removed", hr)), r = n.geometry, void 0 !== r && void 0 === r.__webglInit && ((r.__webglInit = !0, r.addEventListener("dispose", cr), r instanceof THREE.BufferGeometry) ? i.info.memory.geometries++ : n instanceof THREE.Mesh ? yi(n, r) : n instanceof THREE.Line ? void 0 === r.__webglVertexBuffer && (r.__webglVertexBuffer = t.createBuffer(), r.__webglColorBuffer = t.createBuffer(), r.__webglLineDistanceBuffer = t.createBuffer(), i.info.memory.geometries++, u = r.vertices.length, r.__vertexArray = new Float32Array(3 * u), r.__colorArray = new Float32Array(3 * u), r.__lineDistanceArray = new Float32Array(1 * u), r.__webglLineCount = u, li(n), r.verticesNeedUpdate = !0, r.colorsNeedUpdate = !0, r.lineDistancesNeedUpdate = !0) : n instanceof THREE.PointCloud && void 0 === r.__webglVertexBuffer && (r.__webglVertexBuffer = t.createBuffer(), r.__webglColorBuffer = t.createBuffer(), i.info.memory.geometries++, u = r.vertices.length, r.__vertexArray = new Float32Array(3 * u), r.__colorArray = new Float32Array(3 * u), r.__webglParticleCount = u, li(n), r.verticesNeedUpdate = !0, r.colorsNeedUpdate = !0)), void 0 === n.__webglActive)if (n.__webglActive = !0, n instanceof THREE.Mesh) {
                    if (r instanceof THREE.BufferGeometry)et(v, r, n); else if (r instanceof THREE.Geometry)for (var r = k[r.id], u = 0, s = r.length; u < s; u++)et(v, r[u], n)
                } else n instanceof THREE.Line || n instanceof THREE.PointCloud ? et(v, r, n) : (n instanceof THREE.ImmediateRenderObject || n.immediateRenderCallback) && p.push({
                    id: null,
                    object: n,
                    opaque: null,
                    transparent: null,
                    z: 0
                });
                if (n instanceof THREE.Light)l.push(n); else if (n instanceof THREE.Sprite)ni.push(n); else if (n instanceof THREE.LensFlare)ti.push(n); else if ((r = v[n.id]) && (!1 === n.frustumCulled || !0 === ui.intersectsObject(n)))for (u = 0, s = r.length; u < s; u++) {
                    var h = r[u], e = h, f = e.object, c = e.buffer, a = f.geometry, f = f.material;
                    f instanceof THREE.MeshFaceMaterial ? (f = f.materials[a instanceof THREE.BufferGeometry ? 0 : c.materialIndex], e.material = f, f.transparent ? nt.push(e) : g.push(e)) : f && (e.material = f, f.transparent ? nt.push(e) : g.push(e));
                    h.render = !0;
                    !0 === i.sortObjects && (o.setFromMatrixPosition(n.matrixWorld), o.applyProjection(fi), h.z = o.z)
                }
            }
            for (u = 0, s = n.children.length; u < s; u++)vi(n.children[u])
        }
    }

    function ft(n, t, r, u, f) {
        for (var e, s, h, o = 0, c = n.length; o < c; o++) {
            if (e = n[o], s = e.object, h = e.buffer, bi(s, t), f)e = f; else {
                if (e = e.material, !e)continue;
                bt(e)
            }
            i.setMaterialFaces(e);
            h instanceof THREE.BufferGeometry ? i.renderBufferDirect(t, r, u, e, h, s) : i.renderBuffer(t, r, u, e, h, s)
        }
    }

    function yt(n, t, r, u, f, e) {
        for (var o, h, s = 0, c = n.length; s < c; s++)if (o = n[s], h = o.object, h.visible) {
            if (e)o = e; else {
                if (o = o[t], !o)continue;
                bt(o)
            }
            i.renderImmediateObject(r, u, f, o, h)
        }
    }

    function kr(n) {
        var t = n.object.material;
        t.transparent ? (n.transparent = t, n.opaque = null) : (n.opaque = t, n.transparent = null)
    }

    function yi(n, r) {
        var b = n.material, f = !1, y, l, e, nt;
        if (void 0 === k[r.id] || !0 === r.groupsNeedUpdate) {
            delete v[n.id];
            for (var g = k, d = r.id, b = b instanceof THREE.MeshFaceMaterial, p = u.get("OES_element_index_uint") ? 4294967296 : 65535, a, f = {}, o = r.morphTargets.length, c = r.morphNormals.length, w, s = {}, l = [], e = 0, h = r.faces.length; e < h; e++)a = r.faces[e], y = b ? a.materialIndex : 0, y in f || (f[y] = {
                hash: y,
                counter: 0
            }), a = f[y].hash + "_" + f[y].counter, a in s || (w = {
                id: pr++,
                faces3: [],
                materialIndex: y,
                vertices: 0,
                numMorphTargets: o,
                numMorphNormals: c
            }, s[a] = w, l.push(w)), s[a].vertices + 3 > p && (f[y].counter += 1, a = f[y].hash + "_" + f[y].counter, a in s || (w = {
                id: pr++,
                faces3: [],
                materialIndex: y,
                vertices: 0,
                numMorphTargets: o,
                numMorphNormals: c
            }, s[a] = w, l.push(w))), s[a].faces3.push(e), s[a].vertices += 3;
            g[d] = l;
            r.groupsNeedUpdate = !1
        }
        for (g = k[r.id], d = 0, b = g.length; d < b; d++) {
            if (p = g[d], void 0 === p.__webglVertexBuffer) {
                if (f = p, f.__webglVertexBuffer = t.createBuffer(), f.__webglNormalBuffer = t.createBuffer(), f.__webglTangentBuffer = t.createBuffer(), f.__webglColorBuffer = t.createBuffer(), f.__webglUVBuffer = t.createBuffer(), f.__webglUV2Buffer = t.createBuffer(), f.__webglSkinIndicesBuffer = t.createBuffer(), f.__webglSkinWeightsBuffer = t.createBuffer(), f.__webglFaceBuffer = t.createBuffer(), f.__webglLineBuffer = t.createBuffer(), c = f.numMorphTargets)for (f.__webglMorphTargetsBuffers = [], o = 0; o < c; o++)f.__webglMorphTargetsBuffers.push(t.createBuffer());
                if (c = f.numMorphNormals)for (f.__webglMorphNormalsBuffers = [], o = 0; o < c; o++)f.__webglMorphNormalsBuffers.push(t.createBuffer());
                if (i.info.memory.geometries++, f = p, e = n, h = e.geometry, c = f.faces3, o = 3 * c.length, s = 1 * c.length, l = 3 * c.length, c = ut(e, f), f.__vertexArray = new Float32Array(3 * o), f.__normalArray = new Float32Array(3 * o), f.__colorArray = new Float32Array(3 * o), f.__uvArray = new Float32Array(2 * o), 1 < h.faceVertexUvs.length && (f.__uv2Array = new Float32Array(2 * o)), h.hasTangents && (f.__tangentArray = new Float32Array(4 * o)), e.geometry.skinWeights.length && e.geometry.skinIndices.length && (f.__skinIndexArray = new Float32Array(4 * o), f.__skinWeightArray = new Float32Array(4 * o)), e = null !== u.get("OES_element_index_uint") && 21845 < s ? Uint32Array : Uint16Array, f.__typeArray = e, f.__faceArray = new e(3 * s), f.__lineArray = new e(2 * l), h = f.numMorphTargets)for (f.__morphTargetsArrays = [], e = 0; e < h; e++)f.__morphTargetsArrays.push(new Float32Array(3 * o));
                if (h = f.numMorphNormals)for (f.__morphNormalsArrays = [], e = 0; e < h; e++)f.__morphNormalsArrays.push(new Float32Array(3 * o));
                if (f.__webglFaceCount = 3 * s, f.__webglLineCount = 2 * l, c.attributes)for (s in void 0 === f.__webglCustomAttributesList && (f.__webglCustomAttributesList = []), s = void 0, c.attributes) {
                    l = c.attributes[s];
                    e = {};
                    for (nt in l)e[nt] = l[nt];
                    (!e.__webglInitialized || e.createUniqueBuffers) && (e.__webglInitialized = !0, h = 1, "v2" === e.type ? h = 2 : "v3" === e.type ? h = 3 : "v4" === e.type ? h = 4 : "c" === e.type && (h = 3), e.size = h, e.array = new Float32Array(o * h), e.buffer = t.createBuffer(), e.buffer.belongsToAttribute = s, l.needsUpdate = !0, e.__original = l);
                    f.__webglCustomAttributesList.push(e)
                }
                f.__inittedArrays = !0;
                r.verticesNeedUpdate = !0;
                r.morphTargetsNeedUpdate = !0;
                r.elementsNeedUpdate = !0;
                r.uvsNeedUpdate = !0;
                r.normalsNeedUpdate = !0;
                r.tangentsNeedUpdate = !0;
                f = r.colorsNeedUpdate = !0
            } else f = !1;
            (f || void 0 === n.__webglActive) && et(v, p, n)
        }
        n.__webglActive = !0
    }

    function et(n, t, i) {
        var r = i.id;
        n[r] = n[r] || [];
        n[r].push({id: r, buffer: t, object: i, material: null, z: 0})
    }

    function pi(n) {
        var f = n.geometry, p;
        if (f instanceof THREE.BufferGeometry)for (var ae = f.attributes, lf = f.attributesKeys, ei = 0, ve = lf.length; ei < ve; ei++) {
            var af = lf[ei], tt = ae[af], ai = "index" === af ? t.ELEMENT_ARRAY_BUFFER : t.ARRAY_BUFFER;
            void 0 === tt.buffer ? (tt.buffer = t.createBuffer(), t.bindBuffer(ai, tt.buffer), t.bufferData(ai, tt.array, tt instanceof THREE.DynamicBufferAttribute ? t.DYNAMIC_DRAW : t.STATIC_DRAW), tt.needsUpdate = !1) : !0 === tt.needsUpdate && (t.bindBuffer(ai, tt.buffer), void 0 === tt.updateRange || -1 === tt.updateRange.count ? t.bufferSubData(ai, 0, tt.array) : 0 === tt.updateRange.count ? console.error("THREE.WebGLRenderer.updateObject: using updateRange for THREE.DynamicBufferAttribute and marked as needsUpdate but count is 0, ensure you are using set methods or updating manually.") : (t.bufferSubData(ai, tt.updateRange.offset * tt.array.BYTES_PER_ELEMENT, tt.array.subarray(tt.updateRange.offset, tt.updateRange.offset + tt.updateRange.count)), tt.updateRange.count = 0), tt.needsUpdate = !1)
        } else if (n instanceof THREE.Mesh) {
            !0 === f.groupsNeedUpdate && yi(n, f);
            for (var vf = k[f.id], ei = 0, ye = vf.length; ei < ye; ei++) {
                var yf = vf[ei], st = ut(n, yf), vi = st.attributes && pt(st);
                if (f.verticesNeedUpdate || f.morphTargetsNeedUpdate || f.elementsNeedUpdate || f.uvsNeedUpdate || f.normalsNeedUpdate || f.colorsNeedUpdate || f.tangentsNeedUpdate || vi) {
                    var c = yf, pe = n, lt = t.DYNAMIC_DRAW, we = !f.dynamic, pi = st;
                    if (c.__inittedArrays) {
                        var pf = !1 == pi instanceof THREE.MeshPhongMaterial && pi.shading === THREE.FlatShading, u = void 0, l = void 0, wr = void 0, h = void 0, ku = void 0, br = void 0, wi = void 0, wf = void 0, kr = void 0, du = void 0, gu = void 0, e = void 0, o = void 0, s = void 0, bi = void 0, ki = void 0, di = void 0, gi = void 0, nr = void 0, tr = void 0, ir = void 0, rr = void 0, ur = void 0, fr = void 0, er = void 0, or = void 0, sr = void 0, hr = void 0, cr = void 0, rt = void 0, bf = void 0, dr = void 0, nf = void 0, tf = void 0, ct = void 0, kf = void 0, dt = void 0, gt = void 0, gr = void 0, nu = void 0, ni = 0, ti = 0, tu = 0, iu = 0, ru = 0, fi = 0, at = 0, oi = 0, kt = 0, w = 0, it = 0, r = 0, ht = void 0, ii = c.__vertexArray, rf = c.__uvArray, uf = c.__uv2Array, si = c.__normalArray, vt = c.__tangentArray, ri = c.__colorArray, yt = c.__skinIndexArray, bt = c.__skinWeightArray, df = c.__morphTargetsArrays, gf = c.__morphNormalsArrays, ff = c.__webglCustomAttributesList, i = void 0, uu = c.__faceArray, hi = c.__lineArray, ft = pe.geometry, be = ft.elementsNeedUpdate, ne = ft.uvsNeedUpdate, ke = ft.normalsNeedUpdate, de = ft.tangentsNeedUpdate, ge = ft.colorsNeedUpdate, no = ft.morphTargetsNeedUpdate, ef = ft.vertices, a = c.faces3, ui = ft.faces, te = ft.faceVertexUvs[0], ie = ft.faceVertexUvs[1], of = ft.skinIndices, fu = ft.skinWeights, eu = ft.morphTargets, re = ft.morphNormals;
                        if (ft.verticesNeedUpdate) {
                            for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], e = ef[h.a], o = ef[h.b], s = ef[h.c], ii[ti] = e.x, ii[ti + 1] = e.y, ii[ti + 2] = e.z, ii[ti + 3] = o.x, ii[ti + 4] = o.y, ii[ti + 5] = o.z, ii[ti + 6] = s.x, ii[ti + 7] = s.y, ii[ti + 8] = s.z, ti += 9;
                            t.bindBuffer(t.ARRAY_BUFFER, c.__webglVertexBuffer);
                            t.bufferData(t.ARRAY_BUFFER, ii, lt)
                        }
                        if (no)for (ct = 0, kf = eu.length; ct < kf; ct++) {
                            for (u = it = 0, l = a.length; u < l; u++)gr = a[u], h = ui[gr], e = eu[ct].vertices[h.a], o = eu[ct].vertices[h.b], s = eu[ct].vertices[h.c], dt = df[ct], dt[it] = e.x, dt[it + 1] = e.y, dt[it + 2] = e.z, dt[it + 3] = o.x, dt[it + 4] = o.y, dt[it + 5] = o.z, dt[it + 6] = s.x, dt[it + 7] = s.y, dt[it + 8] = s.z, pi.morphNormals && (pf ? tr = nr = gi = re[ct].faceNormals[gr] : (nu = re[ct].vertexNormals[gr], gi = nu.a, nr = nu.b, tr = nu.c), gt = gf[ct], gt[it] = gi.x, gt[it + 1] = gi.y, gt[it + 2] = gi.z, gt[it + 3] = nr.x, gt[it + 4] = nr.y, gt[it + 5] = nr.z, gt[it + 6] = tr.x, gt[it + 7] = tr.y, gt[it + 8] = tr.z), it += 9;
                            t.bindBuffer(t.ARRAY_BUFFER, c.__webglMorphTargetsBuffers[ct]);
                            t.bufferData(t.ARRAY_BUFFER, df[ct], lt);
                            pi.morphNormals && (t.bindBuffer(t.ARRAY_BUFFER, c.__webglMorphNormalsBuffers[ct]), t.bufferData(t.ARRAY_BUFFER, gf[ct], lt))
                        }
                        if (fu.length) {
                            for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], fr = fu[h.a], er = fu[h.b], or = fu[h.c], bt[w] = fr.x, bt[w + 1] = fr.y, bt[w + 2] = fr.z, bt[w + 3] = fr.w, bt[w + 4] = er.x, bt[w + 5] = er.y, bt[w + 6] = er.z, bt[w + 7] = er.w, bt[w + 8] = or.x, bt[w + 9] = or.y, bt[w + 10] = or.z, bt[w + 11] = or.w, sr = of[h.a], hr = of[h.b], cr = of[h.c], yt[w] = sr.x, yt[w + 1] = sr.y, yt[w + 2] = sr.z, yt[w + 3] = sr.w, yt[w + 4] = hr.x, yt[w + 5] = hr.y, yt[w + 6] = hr.z, yt[w + 7] = hr.w, yt[w + 8] = cr.x, yt[w + 9] = cr.y, yt[w + 10] = cr.z, yt[w + 11] = cr.w, w += 12;
                            0 < w && (t.bindBuffer(t.ARRAY_BUFFER, c.__webglSkinIndicesBuffer), t.bufferData(t.ARRAY_BUFFER, yt, lt), t.bindBuffer(t.ARRAY_BUFFER, c.__webglSkinWeightsBuffer), t.bufferData(t.ARRAY_BUFFER, bt, lt))
                        }
                        if (ge) {
                            for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], wi = h.vertexColors, wf = h.color, 3 === wi.length && pi.vertexColors === THREE.VertexColors ? (ir = wi[0], rr = wi[1], ur = wi[2]) : ur = rr = ir = wf, ri[kt] = ir.r, ri[kt + 1] = ir.g, ri[kt + 2] = ir.b, ri[kt + 3] = rr.r, ri[kt + 4] = rr.g, ri[kt + 5] = rr.b, ri[kt + 6] = ur.r, ri[kt + 7] = ur.g, ri[kt + 8] = ur.b, kt += 9;
                            0 < kt && (t.bindBuffer(t.ARRAY_BUFFER, c.__webglColorBuffer), t.bufferData(t.ARRAY_BUFFER, ri, lt))
                        }
                        if (de && ft.hasTangents) {
                            for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], kr = h.vertexTangents, bi = kr[0], ki = kr[1], di = kr[2], vt[at] = bi.x, vt[at + 1] = bi.y, vt[at + 2] = bi.z, vt[at + 3] = bi.w, vt[at + 4] = ki.x, vt[at + 5] = ki.y, vt[at + 6] = ki.z, vt[at + 7] = ki.w, vt[at + 8] = di.x, vt[at + 9] = di.y, vt[at + 10] = di.z, vt[at + 11] = di.w, at += 12;
                            t.bindBuffer(t.ARRAY_BUFFER, c.__webglTangentBuffer);
                            t.bufferData(t.ARRAY_BUFFER, vt, lt)
                        }
                        if (ke) {
                            for (u = 0, l = a.length; u < l; u++)if (h = ui[a[u]], ku = h.vertexNormals, br = h.normal, 3 === ku.length && !1 === pf)for (rt = 0; 3 > rt; rt++)dr = ku[rt], si[fi] = dr.x, si[fi + 1] = dr.y, si[fi + 2] = dr.z, fi += 3; else for (rt = 0; 3 > rt; rt++)si[fi] = br.x, si[fi + 1] = br.y, si[fi + 2] = br.z, fi += 3;
                            t.bindBuffer(t.ARRAY_BUFFER, c.__webglNormalBuffer);
                            t.bufferData(t.ARRAY_BUFFER, si, lt)
                        }
                        if (ne && te) {
                            for (u = 0, l = a.length; u < l; u++)if (wr = a[u], du = te[wr], void 0 !== du)for (rt = 0; 3 > rt; rt++)nf = du[rt], rf[tu] = nf.x, rf[tu + 1] = nf.y, tu += 2;
                            0 < tu && (t.bindBuffer(t.ARRAY_BUFFER, c.__webglUVBuffer), t.bufferData(t.ARRAY_BUFFER, rf, lt))
                        }
                        if (ne && ie) {
                            for (u = 0, l = a.length; u < l; u++)if (wr = a[u], gu = ie[wr], void 0 !== gu)for (rt = 0; 3 > rt; rt++)tf = gu[rt], uf[iu] = tf.x, uf[iu + 1] = tf.y, iu += 2;
                            0 < iu && (t.bindBuffer(t.ARRAY_BUFFER, c.__webglUV2Buffer), t.bufferData(t.ARRAY_BUFFER, uf, lt))
                        }
                        if (be) {
                            for (u = 0, l = a.length; u < l; u++)uu[ru] = ni, uu[ru + 1] = ni + 1, uu[ru + 2] = ni + 2, ru += 3, hi[oi] = ni, hi[oi + 1] = ni + 1, hi[oi + 2] = ni, hi[oi + 3] = ni + 2, hi[oi + 4] = ni + 1, hi[oi + 5] = ni + 2, oi += 6, ni += 3;
                            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, c.__webglFaceBuffer);
                            t.bufferData(t.ELEMENT_ARRAY_BUFFER, uu, lt);
                            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, c.__webglLineBuffer);
                            t.bufferData(t.ELEMENT_ARRAY_BUFFER, hi, lt)
                        }
                        if (ff)for (rt = 0, bf = ff.length; rt < bf; rt++)if (i = ff[rt], i.__original.needsUpdate) {
                            if (r = 0, 1 === i.size) {
                                if (void 0 === i.boundTo || "vertices" === i.boundTo)for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], i.array[r] = i.value[h.a], i.array[r + 1] = i.value[h.b], i.array[r + 2] = i.value[h.c], r += 3; else if ("faces" === i.boundTo)for (u = 0, l = a.length; u < l; u++)ht = i.value[a[u]], i.array[r] = ht, i.array[r + 1] = ht, i.array[r + 2] = ht, r += 3
                            } else if (2 === i.size) {
                                if (void 0 === i.boundTo || "vertices" === i.boundTo)for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], e = i.value[h.a], o = i.value[h.b], s = i.value[h.c], i.array[r] = e.x, i.array[r + 1] = e.y, i.array[r + 2] = o.x, i.array[r + 3] = o.y, i.array[r + 4] = s.x, i.array[r + 5] = s.y, r += 6; else if ("faces" === i.boundTo)for (u = 0, l = a.length; u < l; u++)s = o = e = ht = i.value[a[u]], i.array[r] = e.x, i.array[r + 1] = e.y, i.array[r + 2] = o.x, i.array[r + 3] = o.y, i.array[r + 4] = s.x, i.array[r + 5] = s.y, r += 6
                            } else if (3 === i.size) {
                                if (p = "c" === i.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === i.boundTo || "vertices" === i.boundTo)for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], e = i.value[h.a], o = i.value[h.b], s = i.value[h.c], i.array[r] = e[p[0]], i.array[r + 1] = e[p[1]], i.array[r + 2] = e[p[2]], i.array[r + 3] = o[p[0]], i.array[r + 4] = o[p[1]], i.array[r + 5] = o[p[2]], i.array[r + 6] = s[p[0]], i.array[r + 7] = s[p[1]], i.array[r + 8] = s[p[2]], r += 9; else if ("faces" === i.boundTo)for (u = 0, l = a.length; u < l; u++)s = o = e = ht = i.value[a[u]], i.array[r] = e[p[0]], i.array[r + 1] = e[p[1]], i.array[r + 2] = e[p[2]], i.array[r + 3] = o[p[0]], i.array[r + 4] = o[p[1]], i.array[r + 5] = o[p[2]], i.array[r + 6] = s[p[0]], i.array[r + 7] = s[p[1]], i.array[r + 8] = s[p[2]], r += 9; else if ("faceVertices" === i.boundTo)for (u = 0, l = a.length; u < l; u++)ht = i.value[a[u]], e = ht[0], o = ht[1], s = ht[2], i.array[r] = e[p[0]], i.array[r + 1] = e[p[1]], i.array[r + 2] = e[p[2]], i.array[r + 3] = o[p[0]], i.array[r + 4] = o[p[1]], i.array[r + 5] = o[p[2]], i.array[r + 6] = s[p[0]], i.array[r + 7] = s[p[1]], i.array[r + 8] = s[p[2]], r += 9
                            } else if (4 === i.size)if (void 0 === i.boundTo || "vertices" === i.boundTo)for (u = 0, l = a.length; u < l; u++)h = ui[a[u]], e = i.value[h.a], o = i.value[h.b], s = i.value[h.c], i.array[r] = e.x, i.array[r + 1] = e.y, i.array[r + 2] = e.z, i.array[r + 3] = e.w, i.array[r + 4] = o.x, i.array[r + 5] = o.y, i.array[r + 6] = o.z, i.array[r + 7] = o.w, i.array[r + 8] = s.x, i.array[r + 9] = s.y, i.array[r + 10] = s.z, i.array[r + 11] = s.w, r += 12; else if ("faces" === i.boundTo)for (u = 0, l = a.length; u < l; u++)s = o = e = ht = i.value[a[u]], i.array[r] = e.x, i.array[r + 1] = e.y, i.array[r + 2] = e.z, i.array[r + 3] = e.w, i.array[r + 4] = o.x, i.array[r + 5] = o.y, i.array[r + 6] = o.z, i.array[r + 7] = o.w, i.array[r + 8] = s.x, i.array[r + 9] = s.y, i.array[r + 10] = s.z, i.array[r + 11] = s.w, r += 12; else if ("faceVertices" === i.boundTo)for (u = 0, l = a.length; u < l; u++)ht = i.value[a[u]], e = ht[0], o = ht[1], s = ht[2], i.array[r] = e.x, i.array[r + 1] = e.y, i.array[r + 2] = e.z, i.array[r + 3] = e.w, i.array[r + 4] = o.x, i.array[r + 5] = o.y, i.array[r + 6] = o.z, i.array[r + 7] = o.w, i.array[r + 8] = s.x, i.array[r + 9] = s.y, i.array[r + 10] = s.z, i.array[r + 11] = s.w, r += 12;
                            t.bindBuffer(t.ARRAY_BUFFER, i.buffer);
                            t.bufferData(t.ARRAY_BUFFER, i.array, lt)
                        }
                        we && (delete c.__inittedArrays, delete c.__colorArray, delete c.__normalArray, delete c.__tangentArray, delete c.__uvArray, delete c.__uv2Array, delete c.__faceArray, delete c.__vertexArray, delete c.__lineArray, delete c.__skinIndexArray, delete c.__skinWeightArray)
                    }
                }
            }
            f.verticesNeedUpdate = !1;
            f.morphTargetsNeedUpdate = !1;
            f.elementsNeedUpdate = !1;
            f.uvsNeedUpdate = !1;
            f.normalsNeedUpdate = !1;
            f.colorsNeedUpdate = !1;
            f.tangentsNeedUpdate = !1;
            st.attributes && wt(st)
        } else if (n instanceof THREE.Line) {
            if (st = ut(n, f), vi = st.attributes && pt(st), f.verticesNeedUpdate || f.colorsNeedUpdate || f.lineDistancesNeedUpdate || vi) {
                var ou = t.DYNAMIC_DRAW, lr, ar, vr, su, b, hu, ue = f.vertices, fe = f.colors, ee = f.lineDistances, to = ue.length, io = fe.length, ro = ee.length, cu = f.__vertexArray, lu = f.__colorArray, oe = f.__lineDistanceArray, uo = f.colorsNeedUpdate, fo = f.lineDistancesNeedUpdate, sf = f.__webglCustomAttributesList, au, se, g, ci, et, v;
                if (f.verticesNeedUpdate) {
                    for (lr = 0; lr < to; lr++)su = ue[lr], b = 3 * lr, cu[b] = su.x, cu[b + 1] = su.y, cu[b + 2] = su.z;
                    t.bindBuffer(t.ARRAY_BUFFER, f.__webglVertexBuffer);
                    t.bufferData(t.ARRAY_BUFFER, cu, ou)
                }
                if (uo) {
                    for (ar = 0; ar < io; ar++)hu = fe[ar], b = 3 * ar, lu[b] = hu.r, lu[b + 1] = hu.g, lu[b + 2] = hu.b;
                    t.bindBuffer(t.ARRAY_BUFFER, f.__webglColorBuffer);
                    t.bufferData(t.ARRAY_BUFFER, lu, ou)
                }
                if (fo) {
                    for (vr = 0; vr < ro; vr++)oe[vr] = ee[vr];
                    t.bindBuffer(t.ARRAY_BUFFER, f.__webglLineDistanceBuffer);
                    t.bufferData(t.ARRAY_BUFFER, oe, ou)
                }
                if (sf)for (au = 0, se = sf.length; au < se; au++)if (v = sf[au], v.needsUpdate && (void 0 === v.boundTo || "vertices" === v.boundTo)) {
                    if (b = 0, ci = v.value.length, 1 === v.size)for (g = 0; g < ci; g++)v.array[g] = v.value[g]; else if (2 === v.size)for (g = 0; g < ci; g++)et = v.value[g], v.array[b] = et.x, v.array[b + 1] = et.y, b += 2; else if (3 === v.size)if ("c" === v.type)for (g = 0; g < ci; g++)et = v.value[g], v.array[b] = et.r, v.array[b + 1] = et.g, v.array[b + 2] = et.b, b += 3; else for (g = 0; g < ci; g++)et = v.value[g], v.array[b] = et.x, v.array[b + 1] = et.y, v.array[b + 2] = et.z, b += 3; else if (4 === v.size)for (g = 0; g < ci; g++)et = v.value[g], v.array[b] = et.x, v.array[b + 1] = et.y, v.array[b + 2] = et.z, v.array[b + 3] = et.w, b += 4;
                    t.bindBuffer(t.ARRAY_BUFFER, v.buffer);
                    t.bufferData(t.ARRAY_BUFFER, v.array, ou);
                    v.needsUpdate = !1
                }
            }
            f.verticesNeedUpdate = !1;
            f.colorsNeedUpdate = !1;
            f.lineDistancesNeedUpdate = !1;
            st.attributes && wt(st)
        } else if (n instanceof THREE.PointCloud) {
            if (st = ut(n, f), vi = st.attributes && pt(st), f.verticesNeedUpdate || f.colorsNeedUpdate || vi) {
                var hf = t.DYNAMIC_DRAW, yr, pr, vu, d, yu, he = f.vertices, eo = he.length, ce = f.colors, oo = ce.length, pu = f.__vertexArray, wu = f.__colorArray, so = f.colorsNeedUpdate, cf = f.__webglCustomAttributesList, bu, le, nt, li, ot, y;
                if (f.verticesNeedUpdate) {
                    for (yr = 0; yr < eo; yr++)vu = he[yr], d = 3 * yr, pu[d] = vu.x, pu[d + 1] = vu.y, pu[d + 2] = vu.z;
                    t.bindBuffer(t.ARRAY_BUFFER, f.__webglVertexBuffer);
                    t.bufferData(t.ARRAY_BUFFER, pu, hf)
                }
                if (so) {
                    for (pr = 0; pr < oo; pr++)yu = ce[pr], d = 3 * pr, wu[d] = yu.r, wu[d + 1] = yu.g, wu[d + 2] = yu.b;
                    t.bindBuffer(t.ARRAY_BUFFER, f.__webglColorBuffer);
                    t.bufferData(t.ARRAY_BUFFER, wu, hf)
                }
                if (cf)for (bu = 0, le = cf.length; bu < le; bu++) {
                    if (y = cf[bu], y.needsUpdate && (void 0 === y.boundTo || "vertices" === y.boundTo))if (li = y.value.length, d = 0, 1 === y.size)for (nt = 0; nt < li; nt++)y.array[nt] = y.value[nt]; else if (2 === y.size)for (nt = 0; nt < li; nt++)ot = y.value[nt], y.array[d] = ot.x, y.array[d + 1] = ot.y, d += 2; else if (3 === y.size)if ("c" === y.type)for (nt = 0; nt < li; nt++)ot = y.value[nt], y.array[d] = ot.r, y.array[d + 1] = ot.g, y.array[d + 2] = ot.b, d += 3; else for (nt = 0; nt < li; nt++)ot = y.value[nt], y.array[d] = ot.x, y.array[d + 1] = ot.y, y.array[d + 2] = ot.z, d += 3; else if (4 === y.size)for (nt = 0; nt < li; nt++)ot = y.value[nt], y.array[d] = ot.x, y.array[d + 1] = ot.y, y.array[d + 2] = ot.z, y.array[d + 3] = ot.w, d += 4;
                    t.bindBuffer(t.ARRAY_BUFFER, y.buffer);
                    t.bufferData(t.ARRAY_BUFFER, y.array, hf);
                    y.needsUpdate = !1
                }
            }
            f.verticesNeedUpdate = !1;
            f.colorsNeedUpdate = !1;
            st.attributes && wt(st)
        }
    }

    function pt(n) {
        for (var t in n.attributes)if (n.attributes[t].needsUpdate)return !0;
        return !1
    }

    function wt(n) {
        for (var t in n.attributes)n.attributes[t].needsUpdate = !1
    }

    function bt(n) {
        !0 === n.transparent ? r.setBlending(n.blending, n.blendEquation, n.blendSrc, n.blendDst, n.blendEquationAlpha, n.blendSrcAlpha, n.blendDstAlpha) : r.setBlending(THREE.NoBlending);
        r.setDepthTest(n.depthTest);
        r.setDepthWrite(n.depthWrite);
        r.setColorWrite(n.colorWrite);
        r.setPolygonOffset(n.polygonOffset, n.polygonOffsetFactor, n.polygonOffsetUnits)
    }

    function kt(n, r, u, e, c) {
        var lf, af, vf, yf, gi, sr, ti, nr, nu, df, ai, hr, yt, vi, iu, ru, cr, lr, pt, uu, fu, ou, ft, kt, tf, rf, uf, ff, at, p, v, st, ut, sf, ye;
        if (ri = 0, e.needsUpdate) {
            e.program && yr(e);
            e.addEventListener("dispose", ar);
            gi = bu[e.type];
            gi ? (sr = THREE.ShaderLib[gi], e.__webglShader = {
                uniforms: THREE.UniformsUtils.clone(sr.uniforms),
                vertexShader: sr.vertexShader,
                fragmentShader: sr.fragmentShader
            }) : e.__webglShader = {
                uniforms: e.uniforms,
                vertexShader: e.vertexShader,
                fragmentShader: e.fragmentShader
            };
            for (var pf = 0, wf = 0, bf = 0, kf = 0, br = 0, pe = r.length; br < pe; br++)ti = r[br], ti.onlyShadow || !1 === ti.visible || (ti instanceof THREE.DirectionalLight && pf++, ti instanceof THREE.PointLight && wf++, ti instanceof THREE.SpotLight && bf++, ti instanceof THREE.HemisphereLight && kf++);
            lf = pf;
            af = wf;
            vf = bf;
            yf = kf;
            for (var kr, dr = 0, gr = 0, we = r.length; gr < we; gr++)nr = r[gr], nr.castShadow && (nr instanceof THREE.SpotLight && dr++, nr instanceof THREE.DirectionalLight && !nr.shadowCascade && dr++);
            if (kr = dr, hi && c && c.skeleton && c.skeleton.useVertexTexture ? nu = 1024 : (df = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS), ai = Math.floor((df - 20) / 4), void 0 !== c && c instanceof THREE.SkinnedMesh && (ai = Math.min(c.skeleton.bones.length, ai), ai < c.skeleton.bones.length && THREE.warn("WebGLRenderer: too many bones - " + c.skeleton.bones.length + ", this GPU supports just " + ai + " (try OpenGL instead of ANGLE)")), nu = ai), hr = {
                    precision: b,
                    supportsVertexTextures: si,
                    map: !!e.map,
                    envMap: !!e.envMap,
                    envMapMode: e.envMap && e.envMap.mapping,
                    lightMap: !!e.lightMap,
                    bumpMap: !!e.bumpMap,
                    normalMap: !!e.normalMap,
                    specularMap: !!e.specularMap,
                    alphaMap: !!e.alphaMap,
                    combine: e.combine,
                    vertexColors: e.vertexColors,
                    fog: u,
                    useFog: e.fog,
                    fogExp: u instanceof THREE.FogExp2,
                    flatShading: e.shading === THREE.FlatShading,
                    sizeAttenuation: e.sizeAttenuation,
                    logarithmicDepthBuffer: gt,
                    skinning: e.skinning,
                    maxBones: nu,
                    useVertexTexture: hi && c && c.skeleton && c.skeleton.useVertexTexture,
                    morphTargets: e.morphTargets,
                    morphNormals: e.morphNormals,
                    maxMorphTargets: i.maxMorphTargets,
                    maxMorphNormals: i.maxMorphNormals,
                    maxDirLights: lf,
                    maxPointLights: af,
                    maxSpotLights: vf,
                    maxHemiLights: yf,
                    maxShadows: kr,
                    shadowMapEnabled: i.shadowMapEnabled && c.receiveShadow && 0 < kr,
                    shadowMapType: i.shadowMapType,
                    shadowMapDebug: i.shadowMapDebug,
                    shadowMapCascade: i.shadowMapCascade,
                    alphaTest: e.alphaTest,
                    metal: e.metal,
                    wrapAround: e.wrapAround,
                    doubleSided: e.side === THREE.DoubleSide,
                    flipSided: e.side === THREE.BackSide
                }, yt = [], gi ? yt.push(gi) : (yt.push(e.fragmentShader), yt.push(e.vertexShader)), void 0 !== e.defines)for (vi in e.defines)yt.push(vi), yt.push(e.defines[vi]);
            for (vi in hr)yt.push(vi), yt.push(hr[vi]);
            for (var gf = yt.join(), ui, tu = 0, be = y.length; tu < be; tu++)if (iu = y[tu], iu.code === gf) {
                ui = iu;
                ui.usedTimes++;
                break
            }
            if (void 0 === ui && (ui = new THREE.WebGLProgram(i, gf, e, hr), y.push(ui), i.info.memory.programs = y.length), e.program = ui, ru = ui.attributes, e.morphTargets)for (e.numSupportedMorphTargets = 0, lr = "morphTarget", pt = 0; pt < i.maxMorphTargets; pt++)cr = lr + pt, 0 <= ru[cr] && e.numSupportedMorphTargets++;
            if (e.morphNormals)for (e.numSupportedMorphNormals = 0, lr = "morphNormal", pt = 0; pt < i.maxMorphNormals; pt++)cr = lr + pt, 0 <= ru[cr] && e.numSupportedMorphNormals++;
            e.uniformsList = [];
            for (uu in e.__webglShader.uniforms)fu = e.program.uniforms[uu], fu && e.uniformsList.push([e.__webglShader.uniforms[uu], fu]);
            e.needsUpdate = !1
        }
        e.morphTargets && !c.__webglMorphTargetInfluences && (c.__webglMorphTargetInfluences = new Float32Array(i.maxMorphTargets));
        var ne = !1, eu = !1, vr = !1, tr = e.program, g = tr.uniforms, l = e.__webglShader.uniforms;
        if (tr.id !== ii && (t.useProgram(tr.program), ii = tr.id, vr = eu = ne = !0), e.id !== it && (-1 === it && (vr = !0), it = e.id, eu = !0), (ne || n !== rt) && (t.uniformMatrix4fv(g.projectionMatrix, !1, n.projectionMatrix.elements), gt && t.uniform1f(g.logDepthBufFC, 2 / (Math.log(n.far + 1) / Math.LN2)), n !== rt && (rt = n), (e instanceof THREE.ShaderMaterial || e instanceof THREE.MeshPhongMaterial || e.envMap) && null !== g.cameraPosition && (o.setFromMatrixPosition(n.matrixWorld), t.uniform3f(g.cameraPosition, o.x, o.y, o.z)), (e instanceof THREE.MeshPhongMaterial || e instanceof THREE.MeshLambertMaterial || e instanceof THREE.MeshBasicMaterial || e instanceof THREE.ShaderMaterial || e.skinning) && null !== g.viewMatrix && t.uniformMatrix4fv(g.viewMatrix, !1, n.matrixWorldInverse.elements)), e.skinning && ((c.bindMatrix && null !== g.bindMatrix && t.uniformMatrix4fv(g.bindMatrix, !1, c.bindMatrix.elements), c.bindMatrixInverse && null !== g.bindMatrixInverse && t.uniformMatrix4fv(g.bindMatrixInverse, !1, c.bindMatrixInverse.elements), hi && c.skeleton && c.skeleton.useVertexTexture) ? (null !== g.boneTexture && (ou = dt(), t.uniform1i(g.boneTexture, ou), i.setTexture(c.skeleton.boneTexture, ou)), null !== g.boneTextureWidth && t.uniform1i(g.boneTextureWidth, c.skeleton.boneTextureWidth), null !== g.boneTextureHeight && t.uniform1i(g.boneTextureHeight, c.skeleton.boneTextureHeight)) : c.skeleton && c.skeleton.boneMatrices && null !== g.boneGlobalMatrices && t.uniformMatrix4fv(g.boneGlobalMatrices, !1, c.skeleton.boneMatrices)), eu) {
            if (u && e.fog && (l.fogColor.value = u.color, u instanceof THREE.Fog ? (l.fogNear.value = u.near, l.fogFar.value = u.far) : u instanceof THREE.FogExp2 && (l.fogDensity.value = u.density)), e instanceof THREE.MeshPhongMaterial || e instanceof THREE.MeshLambertMaterial || e.lights) {
                if (vt) {
                    for (var vr = !0, k, te = 0, ie = 0, re = 0, fi, ue, fe, yi, hu, nt = rr, cu = nt.directional.colors, lu = nt.directional.positions, au = nt.point.colors, vu = nt.point.positions, ke = nt.point.distances, de = nt.point.decays, yu = nt.spot.colors, pu = nt.spot.positions, ge = nt.spot.distances, wu = nt.spot.directions, no = nt.spot.anglesCos, to = nt.spot.exponents, io = nt.spot.decays, ku = nt.hemi.skyColors, du = nt.hemi.groundColors, gu = nt.hemi.positions, pr = 0, pi = 0, wt = 0, ir = 0, ee = 0, oe = 0, se = 0, nf = 0, ur = 0, fr = 0, bt = 0, bi = 0, d = 0, ht = r.length; d < ht; d++)k = r[d], k.onlyShadow || (fi = k.color, yi = k.intensity, hu = k.distance, k instanceof THREE.AmbientLight ? k.visible && (te += fi.r, ie += fi.g, re += fi.b) : k instanceof THREE.DirectionalLight ? (ee += 1, k.visible && (f.setFromMatrixPosition(k.matrixWorld), o.setFromMatrixPosition(k.target.matrixWorld), f.sub(o), f.normalize(), ur = 3 * pr, lu[ur] = f.x, lu[ur + 1] = f.y, lu[ur + 2] = f.z, tt(cu, ur, fi, yi), pr += 1)) : k instanceof THREE.PointLight ? (oe += 1, k.visible && (fr = 3 * pi, tt(au, fr, fi, yi), o.setFromMatrixPosition(k.matrixWorld), vu[fr] = o.x, vu[fr + 1] = o.y, vu[fr + 2] = o.z, ke[pi] = hu, de[pi] = 0 === k.distance ? 0 : k.decay, pi += 1)) : k instanceof THREE.SpotLight ? (se += 1, k.visible && (bt = 3 * wt, tt(yu, bt, fi, yi), f.setFromMatrixPosition(k.matrixWorld), pu[bt] = f.x, pu[bt + 1] = f.y, pu[bt + 2] = f.z, ge[wt] = hu, o.setFromMatrixPosition(k.target.matrixWorld), f.sub(o), f.normalize(), wu[bt] = f.x, wu[bt + 1] = f.y, wu[bt + 2] = f.z, no[wt] = Math.cos(k.angle), to[wt] = k.exponent, io[wt] = 0 === k.distance ? 0 : k.decay, wt += 1)) : k instanceof THREE.HemisphereLight && (nf += 1, k.visible && (f.setFromMatrixPosition(k.matrixWorld), f.normalize(), bi = 3 * ir, gu[bi] = f.x, gu[bi + 1] = f.y, gu[bi + 2] = f.z, ue = k.color, fe = k.groundColor, tt(ku, bi, ue, yi), tt(du, bi, fe, yi), ir += 1)));
                    for (d = 3 * pr, ht = Math.max(cu.length, 3 * ee); d < ht; d++)cu[d] = 0;
                    for (d = 3 * pi, ht = Math.max(au.length, 3 * oe); d < ht; d++)au[d] = 0;
                    for (d = 3 * wt, ht = Math.max(yu.length, 3 * se); d < ht; d++)yu[d] = 0;
                    for (d = 3 * ir, ht = Math.max(ku.length, 3 * nf); d < ht; d++)ku[d] = 0;
                    for (d = 3 * ir, ht = Math.max(du.length, 3 * nf); d < ht; d++)du[d] = 0;
                    nt.directional.length = pr;
                    nt.point.length = pi;
                    nt.spot.length = wt;
                    nt.hemi.length = ir;
                    nt.ambient[0] = te;
                    nt.ambient[1] = ie;
                    nt.ambient[2] = re;
                    vt = !1
                }
                vr ? (ft = rr, l.ambientLightColor.value = ft.ambient, l.directionalLightColor.value = ft.directional.colors, l.directionalLightDirection.value = ft.directional.positions, l.pointLightColor.value = ft.point.colors, l.pointLightPosition.value = ft.point.positions, l.pointLightDistance.value = ft.point.distances, l.pointLightDecay.value = ft.point.decays, l.spotLightColor.value = ft.spot.colors, l.spotLightPosition.value = ft.spot.positions, l.spotLightDistance.value = ft.spot.distances, l.spotLightDirection.value = ft.spot.directions, l.spotLightAngleCos.value = ft.spot.anglesCos, l.spotLightExponent.value = ft.spot.exponents, l.spotLightDecay.value = ft.spot.decays, l.hemisphereLightSkyColor.value = ft.hemi.skyColors, l.hemisphereLightGroundColor.value = ft.hemi.groundColors, l.hemisphereLightDirection.value = ft.hemi.positions, wi(l, !0)) : wi(l, !1)
            }
            if ((e instanceof THREE.MeshBasicMaterial || e instanceof THREE.MeshLambertMaterial || e instanceof THREE.MeshPhongMaterial) && (l.opacity.value = e.opacity, l.diffuse.value = e.color, l.map.value = e.map, l.lightMap.value = e.lightMap, l.specularMap.value = e.specularMap, l.alphaMap.value = e.alphaMap, e.bumpMap && (l.bumpMap.value = e.bumpMap, l.bumpScale.value = e.bumpScale), e.normalMap && (l.normalMap.value = e.normalMap, l.normalScale.value.copy(e.normalScale)), e.map ? kt = e.map : e.specularMap ? kt = e.specularMap : e.normalMap ? kt = e.normalMap : e.bumpMap ? kt = e.bumpMap : e.alphaMap && (kt = e.alphaMap), void 0 !== kt && (tf = kt.offset, rf = kt.repeat, l.offsetRepeat.value.set(tf.x, tf.y, rf.x, rf.y)), l.envMap.value = e.envMap, l.flipEnvMap.value = e.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1, l.reflectivity.value = e.reflectivity, l.refractionRatio.value = e.refractionRatio), e instanceof THREE.LineBasicMaterial ? (l.diffuse.value = e.color, l.opacity.value = e.opacity) : e instanceof THREE.LineDashedMaterial ? (l.diffuse.value = e.color, l.opacity.value = e.opacity, l.dashSize.value = e.dashSize, l.totalSize.value = e.dashSize + e.gapSize, l.scale.value = e.scale) : e instanceof THREE.PointCloudMaterial ? (l.psColor.value = e.color, l.opacity.value = e.opacity, l.size.value = e.size, l.scale.value = s.height / 2, l.map.value = e.map, null !== e.map) && (uf = e.map.offset, ff = e.map.repeat, l.offsetRepeat.value.set(uf.x, uf.y, ff.x, ff.y)) : e instanceof THREE.MeshPhongMaterial ? (l.shininess.value = e.shininess, l.emissive.value = e.emissive, l.specular.value = e.specular, e.wrapAround && l.wrapRGB.value.copy(e.wrapRGB)) : e instanceof THREE.MeshLambertMaterial ? (l.emissive.value = e.emissive, e.wrapAround && l.wrapRGB.value.copy(e.wrapRGB)) : e instanceof THREE.MeshDepthMaterial ? (l.mNear.value = n.near, l.mFar.value = n.far, l.opacity.value = e.opacity) : e instanceof THREE.MeshNormalMaterial && (l.opacity.value = e.opacity), c.receiveShadow && !e._shadowPass && l.shadowMatrix)for (var di = 0, ef = 0, ro = r.length; ef < ro; ef++)at = r[ef], at.castShadow && (at instanceof THREE.SpotLight || at instanceof THREE.DirectionalLight && !at.shadowCascade) && (l.shadowMap.value[di] = at.shadowMap, l.shadowMapSize.value[di] = at.shadowMapSize, l.shadowMatrix.value[di] = at.shadowMatrix, l.shadowDarkness.value[di] = at.shadowDarkness, l.shadowBias.value[di] = at.shadowBias, di++);
            for (var of = e.uniformsList, ct, ei, lt, wr = 0, uo = of.length; wr < uo; wr++)if (p = of[wr][0], !1 !== p.needsUpdate) {
                var he = p.type, a = p.value, w = of[wr][1];
                switch (he) {
                    case"1i":
                        t.uniform1i(w, a);
                        break;
                    case"1f":
                        t.uniform1f(w, a);
                        break;
                    case"2f":
                        t.uniform2f(w, a[0], a[1]);
                        break;
                    case"3f":
                        t.uniform3f(w, a[0], a[1], a[2]);
                        break;
                    case"4f":
                        t.uniform4f(w, a[0], a[1], a[2], a[3]);
                        break;
                    case"1iv":
                        t.uniform1iv(w, a);
                        break;
                    case"3iv":
                        t.uniform3iv(w, a);
                        break;
                    case"1fv":
                        t.uniform1fv(w, a);
                        break;
                    case"2fv":
                        t.uniform2fv(w, a);
                        break;
                    case"3fv":
                        t.uniform3fv(w, a);
                        break;
                    case"4fv":
                        t.uniform4fv(w, a);
                        break;
                    case"Matrix3fv":
                        t.uniformMatrix3fv(w, !1, a);
                        break;
                    case"Matrix4fv":
                        t.uniformMatrix4fv(w, !1, a);
                        break;
                    case"i":
                        t.uniform1i(w, a);
                        break;
                    case"f":
                        t.uniform1f(w, a);
                        break;
                    case"v2":
                        t.uniform2f(w, a.x, a.y);
                        break;
                    case"v3":
                        t.uniform3f(w, a.x, a.y, a.z);
                        break;
                    case"v4":
                        t.uniform4f(w, a.x, a.y, a.z, a.w);
                        break;
                    case"c":
                        t.uniform3f(w, a.r, a.g, a.b);
                        break;
                    case"iv1":
                        t.uniform1iv(w, a);
                        break;
                    case"iv":
                        t.uniform3iv(w, a);
                        break;
                    case"fv1":
                        t.uniform1fv(w, a);
                        break;
                    case"fv":
                        t.uniform3fv(w, a);
                        break;
                    case"v2v":
                        for (void 0 === p._array && (p._array = new Float32Array(2 * a.length)), v = 0, st = a.length; v < st; v++)lt = 2 * v, p._array[lt] = a[v].x, p._array[lt + 1] = a[v].y;
                        t.uniform2fv(w, p._array);
                        break;
                    case"v3v":
                        for (void 0 === p._array && (p._array = new Float32Array(3 * a.length)), v = 0, st = a.length; v < st; v++)lt = 3 * v, p._array[lt] = a[v].x, p._array[lt + 1] = a[v].y, p._array[lt + 2] = a[v].z;
                        t.uniform3fv(w, p._array);
                        break;
                    case"v4v":
                        for (void 0 === p._array && (p._array = new Float32Array(4 * a.length)), v = 0, st = a.length; v < st; v++)lt = 4 * v, p._array[lt] = a[v].x, p._array[lt + 1] = a[v].y, p._array[lt + 2] = a[v].z, p._array[lt + 3] = a[v].w;
                        t.uniform4fv(w, p._array);
                        break;
                    case"m3":
                        t.uniformMatrix3fv(w, !1, a.elements);
                        break;
                    case"m3v":
                        for (void 0 === p._array && (p._array = new Float32Array(9 * a.length)), v = 0, st = a.length; v < st; v++)a[v].flattenToArrayOffset(p._array, 9 * v);
                        t.uniformMatrix3fv(w, !1, p._array);
                        break;
                    case"m4":
                        t.uniformMatrix4fv(w, !1, a.elements);
                        break;
                    case"m4v":
                        for (void 0 === p._array && (p._array = new Float32Array(16 * a.length)), v = 0, st = a.length; v < st; v++)a[v].flattenToArrayOffset(p._array, 16 * v);
                        t.uniformMatrix4fv(w, !1, p._array);
                        break;
                    case"t":
                        if (ct = a, ei = dt(), t.uniform1i(w, ei), !ct)continue;
                        if (ct instanceof THREE.CubeTexture || ct.image instanceof Array && 6 === ct.image.length) {
                            if (ut = ct, sf = ei, 6 === ut.image.length)if (ut.needsUpdate) {
                                ut.image.__webglTextureCube || (ut.addEventListener("dispose", ci), ut.image.__webglTextureCube = t.createTexture(), i.info.memory.textures++);
                                t.activeTexture(t.TEXTURE0 + sf);
                                t.bindTexture(t.TEXTURE_CUBE_MAP, ut.image.__webglTextureCube);
                                t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, ut.flipY);
                                for (var ce = ut instanceof THREE.CompressedTexture, hf = ut.image[0] instanceof THREE.DataTexture, oi = [], et = 0; 6 > et; et++)oi[et] = !i.autoScaleCubemaps || ce || hf ? hf ? ut.image[et].image : ut.image[et] : ki(ut.image[et], su);
                                var le = oi[0], ae = THREE.Math.isPowerOfTwo(le.width) && THREE.Math.isPowerOfTwo(le.height), ni = h(ut.format), cf = h(ut.type);
                                for (ot(t.TEXTURE_CUBE_MAP, ut, ae), et = 0; 6 > et; et++)if (ce)for (var li, ve = oi[et].mipmaps, er = 0, fo = ve.length; er < fo; er++)li = ve[er], ut.format !== THREE.RGBAFormat && ut.format !== THREE.RGBFormat ? -1 < or().indexOf(ni) ? t.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + et, er, ni, li.width, li.height, 0, li.data) : THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()") : t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + et, er, ni, li.width, li.height, 0, ni, cf, li.data); else hf ? t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + et, 0, ni, oi[et].width, oi[et].height, 0, ni, cf, oi[et].data) : t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + et, 0, ni, ni, cf, oi[et]);
                                ut.generateMipmaps && ae && t.generateMipmap(t.TEXTURE_CUBE_MAP);
                                ut.needsUpdate = !1;
                                ut.onUpdate && ut.onUpdate()
                            } else t.activeTexture(t.TEXTURE0 + sf), t.bindTexture(t.TEXTURE_CUBE_MAP, ut.image.__webglTextureCube)
                        } else ct instanceof THREE.WebGLRenderTargetCube ? (ye = ct, t.activeTexture(t.TEXTURE0 + ei), t.bindTexture(t.TEXTURE_CUBE_MAP, ye.__webglTexture)) : i.setTexture(ct, ei);
                        break;
                    case"tv":
                        for (void 0 === p._array && (p._array = []), v = 0, st = p.value.length; v < st; v++)p._array[v] = dt();
                        for (t.uniform1iv(w, p._array), v = 0, st = p.value.length; v < st; v++)ct = p.value[v], ei = p._array[v], ct && i.setTexture(ct, ei);
                        break;
                    default:
                        THREE.warn("THREE.WebGLRenderer: Unknown uniform type: " + he)
                }
            }
        }
        return t.uniformMatrix4fv(g.modelViewMatrix, !1, c._modelViewMatrix.elements), g.normalMatrix && t.uniformMatrix3fv(g.normalMatrix, !1, c._normalMatrix.elements), null !== g.modelMatrix && t.uniformMatrix4fv(g.modelMatrix, !1, c.matrixWorld.elements), tr
    }

    function wi(n, t) {
        n.ambientLightColor.needsUpdate = t;
        n.directionalLightColor.needsUpdate = t;
        n.directionalLightDirection.needsUpdate = t;
        n.pointLightColor.needsUpdate = t;
        n.pointLightPosition.needsUpdate = t;
        n.pointLightDistance.needsUpdate = t;
        n.pointLightDecay.needsUpdate = t;
        n.spotLightColor.needsUpdate = t;
        n.spotLightPosition.needsUpdate = t;
        n.spotLightDistance.needsUpdate = t;
        n.spotLightDirection.needsUpdate = t;
        n.spotLightAngleCos.needsUpdate = t;
        n.spotLightExponent.needsUpdate = t;
        n.spotLightDecay.needsUpdate = t;
        n.hemisphereLightSkyColor.needsUpdate = t;
        n.hemisphereLightGroundColor.needsUpdate = t;
        n.hemisphereLightDirection.needsUpdate = t
    }

    function dt() {
        var n = ri;
        return n >= er && THREE.warn("WebGLRenderer: trying to use " + n + " texture units while this GPU supports only " + er), ri += 1, n
    }

    function bi(n, t) {
        n._modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, n.matrixWorld);
        n._normalMatrix.getNormalMatrix(n._modelViewMatrix)
    }

    function tt(n, t, i, r) {
        n[t] = i.r * r;
        n[t + 1] = i.g * r;
        n[t + 2] = i.b * r
    }

    function ot(n, r, f) {
        f ? (t.texParameteri(n, t.TEXTURE_WRAP_S, h(r.wrapS)), t.texParameteri(n, t.TEXTURE_WRAP_T, h(r.wrapT)), t.texParameteri(n, t.TEXTURE_MAG_FILTER, h(r.magFilter)), t.texParameteri(n, t.TEXTURE_MIN_FILTER, h(r.minFilter))) : (t.texParameteri(n, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(n, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), r.wrapS === THREE.ClampToEdgeWrapping && r.wrapT === THREE.ClampToEdgeWrapping || THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( " + r.sourceFile + " )"), t.texParameteri(n, t.TEXTURE_MAG_FILTER, gi(r.magFilter)), t.texParameteri(n, t.TEXTURE_MIN_FILTER, gi(r.minFilter)), r.minFilter !== THREE.NearestFilter && r.minFilter !== THREE.LinearFilter && THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( " + r.sourceFile + " )"));
        (f = u.get("EXT_texture_filter_anisotropic")) && r.type !== THREE.FloatType && r.type !== THREE.HalfFloatType && (1 < r.anisotropy || r.__currentAnisotropy) && (t.texParameterf(n, f.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(r.anisotropy, i.getMaxAnisotropy())), r.__currentAnisotropy = r.anisotropy)
    }

    function ki(n, t) {
        if (n.width > t || n.height > t) {
            var r = t / Math.max(n.width, n.height), i = document.createElement("canvas");
            return i.width = Math.floor(n.width * r), i.height = Math.floor(n.height * r), i.getContext("2d").drawImage(n, 0, 0, n.width, n.height, 0, 0, i.width, i.height), THREE.warn("THREE.WebGLRenderer: image is too big (" + n.width + "x" + n.height + "). Resized to " + i.width + "x" + i.height, n), i
        }
        return n
    }

    function di(n, i) {
        t.bindRenderbuffer(t.RENDERBUFFER, n);
        i.depthBuffer && !i.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, i.width, i.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, n)) : i.depthBuffer && i.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, i.width, i.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, n)) : t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i.width, i.height)
    }

    function dr(n) {
        n instanceof THREE.WebGLRenderTargetCube ? (t.bindTexture(t.TEXTURE_CUBE_MAP, n.__webglTexture), t.generateMipmap(t.TEXTURE_CUBE_MAP), t.bindTexture(t.TEXTURE_CUBE_MAP, null)) : (t.bindTexture(t.TEXTURE_2D, n.__webglTexture), t.generateMipmap(t.TEXTURE_2D), t.bindTexture(t.TEXTURE_2D, null))
    }

    function gi(n) {
        return n === THREE.NearestFilter || n === THREE.NearestMipMapNearestFilter || n === THREE.NearestMipMapLinearFilter ? t.NEAREST : t.LINEAR
    }

    function h(n) {
        var i;
        if (n === THREE.RepeatWrapping)return t.REPEAT;
        if (n === THREE.ClampToEdgeWrapping)return t.CLAMP_TO_EDGE;
        if (n === THREE.MirroredRepeatWrapping)return t.MIRRORED_REPEAT;
        if (n === THREE.NearestFilter)return t.NEAREST;
        if (n === THREE.NearestMipMapNearestFilter)return t.NEAREST_MIPMAP_NEAREST;
        if (n === THREE.NearestMipMapLinearFilter)return t.NEAREST_MIPMAP_LINEAR;
        if (n === THREE.LinearFilter)return t.LINEAR;
        if (n === THREE.LinearMipMapNearestFilter)return t.LINEAR_MIPMAP_NEAREST;
        if (n === THREE.LinearMipMapLinearFilter)return t.LINEAR_MIPMAP_LINEAR;
        if (n === THREE.UnsignedByteType)return t.UNSIGNED_BYTE;
        if (n === THREE.UnsignedShort4444Type)return t.UNSIGNED_SHORT_4_4_4_4;
        if (n === THREE.UnsignedShort5551Type)return t.UNSIGNED_SHORT_5_5_5_1;
        if (n === THREE.UnsignedShort565Type)return t.UNSIGNED_SHORT_5_6_5;
        if (n === THREE.ByteType)return t.BYTE;
        if (n === THREE.ShortType)return t.SHORT;
        if (n === THREE.UnsignedShortType)return t.UNSIGNED_SHORT;
        if (n === THREE.IntType)return t.INT;
        if (n === THREE.UnsignedIntType)return t.UNSIGNED_INT;
        if (n === THREE.FloatType)return t.FLOAT;
        if (i = u.get("OES_texture_half_float"), null !== i && n === THREE.HalfFloatType)return i.HALF_FLOAT_OES;
        if (n === THREE.AlphaFormat)return t.ALPHA;
        if (n === THREE.RGBFormat)return t.RGB;
        if (n === THREE.RGBAFormat)return t.RGBA;
        if (n === THREE.LuminanceFormat)return t.LUMINANCE;
        if (n === THREE.LuminanceAlphaFormat)return t.LUMINANCE_ALPHA;
        if (n === THREE.AddEquation)return t.FUNC_ADD;
        if (n === THREE.SubtractEquation)return t.FUNC_SUBTRACT;
        if (n === THREE.ReverseSubtractEquation)return t.FUNC_REVERSE_SUBTRACT;
        if (n === THREE.ZeroFactor)return t.ZERO;
        if (n === THREE.OneFactor)return t.ONE;
        if (n === THREE.SrcColorFactor)return t.SRC_COLOR;
        if (n === THREE.OneMinusSrcColorFactor)return t.ONE_MINUS_SRC_COLOR;
        if (n === THREE.SrcAlphaFactor)return t.SRC_ALPHA;
        if (n === THREE.OneMinusSrcAlphaFactor)return t.ONE_MINUS_SRC_ALPHA;
        if (n === THREE.DstAlphaFactor)return t.DST_ALPHA;
        if (n === THREE.OneMinusDstAlphaFactor)return t.ONE_MINUS_DST_ALPHA;
        if (n === THREE.DstColorFactor)return t.DST_COLOR;
        if (n === THREE.OneMinusDstColorFactor)return t.ONE_MINUS_DST_COLOR;
        if (n === THREE.SrcAlphaSaturateFactor)return t.SRC_ALPHA_SATURATE;
        if (i = u.get("WEBGL_compressed_texture_s3tc"), null !== i) {
            if (n === THREE.RGB_S3TC_DXT1_Format)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (n === THREE.RGBA_S3TC_DXT1_Format)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (n === THREE.RGBA_S3TC_DXT3_Format)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (n === THREE.RGBA_S3TC_DXT5_Format)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT
        }
        if (i = u.get("WEBGL_compressed_texture_pvrtc"), null !== i) {
            if (n === THREE.RGB_PVRTC_4BPPV1_Format)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
            if (n === THREE.RGB_PVRTC_2BPPV1_Format)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
            if (n === THREE.RGBA_PVRTC_4BPPV1_Format)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
            if (n === THREE.RGBA_PVRTC_2BPPV1_Format)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
        }
        if (i = u.get("EXT_blend_minmax"), null !== i) {
            if (n === THREE.MinEquation)return i.MIN_EXT;
            if (n === THREE.MaxEquation)return i.MAX_EXT
        }
        return 0
    }

    var ei, r, u;
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    n = n || {};
    var s = void 0 !== n.canvas ? n.canvas : document.createElement("canvas"), gr = void 0 !== n.context ? n.context : null, e = 1, b = void 0 !== n.precision ? n.precision : "highp", nu = void 0 !== n.alpha ? n.alpha : !1, tu = void 0 !== n.depth ? n.depth : !0, iu = void 0 !== n.stencil ? n.stencil : !0, ru = void 0 !== n.antialias ? n.antialias : !1, nr = void 0 !== n.premultipliedAlpha ? n.premultipliedAlpha : !0, uu = void 0 !== n.preserveDrawingBuffer ? n.preserveDrawingBuffer : !1, gt = void 0 !== n.logarithmicDepthBuffer ? n.logarithmicDepthBuffer : !1, c = new THREE.Color(0), d = 0, l = [], v = {}, p = [], g = [], nt = [], ni = [], ti = [];
    this.domElement = s;
    this.context = null;
    this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
    this.gammaFactor = 2;
    this.shadowMapEnabled = this.gammaOutput = this.gammaInput = !1;
    this.shadowMapType = THREE.PCFShadowMap;
    this.shadowMapCullFace = THREE.CullFaceFront;
    this.shadowMapCascade = this.shadowMapDebug = !1;
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;
    this.autoScaleCubemaps = !0;
    this.info = {
        memory: {programs: 0, geometries: 0, textures: 0},
        render: {calls: 0, vertices: 0, faces: 0, points: 0}
    };
    var i = this, y = [], ii = null, st = null, it = -1, w = "", rt = null, ri = 0, ht = 0, ct = 0, lt = s.width, at = s.height, tr = 0, ir = 0, ui = new THREE.Frustum, fi = new THREE.Matrix4, o = new THREE.Vector3, f = new THREE.Vector3, vt = !0, rr = {
        ambient: [0, 0, 0],
        directional: {length: 0, colors: [], positions: []},
        point: {length: 0, colors: [], positions: [], distances: [], decays: []},
        spot: {
            length: 0,
            colors: [],
            positions: [],
            distances: [],
            directions: [],
            anglesCos: [],
            exponents: [],
            decays: []
        },
        hemi: {length: 0, skyColors: [], groundColors: [], positions: []}
    }, t;
    try {
        if (ei = {
                alpha: nu,
                depth: tu,
                stencil: iu,
                antialias: ru,
                premultipliedAlpha: nr,
                preserveDrawingBuffer: uu
            }, t = gr || s.getContext("webgl", ei) || s.getContext("experimental-webgl", ei), null === t) {
            if (null !== s.getContext("webgl"))throw"Error creating WebGL context with your selected attributes.";
            throw"Error creating WebGL context.";
        }
        s.addEventListener("webglcontextlost", function (n) {
            n.preventDefault();
            fr();
            ur();
            v = {}
        }, !1)
    } catch (fu) {
        THREE.error("THREE.WebGLRenderer: " + fu)
    }
    r = new THREE.WebGLState(t, h);
    void 0 === t.getShaderPrecisionFormat && (t.getShaderPrecisionFormat = function () {
        return {rangeMin: 1, rangeMax: 1, precision: 1}
    });
    u = new THREE.WebGLExtensions(t);
    u.get("OES_texture_float");
    u.get("OES_texture_float_linear");
    u.get("OES_texture_half_float");
    u.get("OES_texture_half_float_linear");
    u.get("OES_standard_derivatives");
    gt && u.get("EXT_frag_depth");
    var oi = function (n, i, r, u) {
        !0 === nr && (n *= u, i *= u, r *= u);
        t.clearColor(n, i, r, u)
    }, ur = function () {
        t.clearColor(0, 0, 0, 1);
        t.clearDepth(1);
        t.clearStencil(0);
        t.enable(t.DEPTH_TEST);
        t.depthFunc(t.LEQUAL);
        t.frontFace(t.CCW);
        t.cullFace(t.BACK);
        t.enable(t.CULL_FACE);
        t.enable(t.BLEND);
        t.blendEquation(t.FUNC_ADD);
        t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA);
        t.viewport(ht, ct, lt, at);
        oi(c.r, c.g, c.b, d)
    }, fr = function () {
        rt = ii = null;
        w = "";
        it = -1;
        vt = !0;
        r.reset()
    };
    ur();
    this.context = t;
    this.state = r;
    var er = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), eu = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS), ou = t.getParameter(t.MAX_TEXTURE_SIZE), su = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE), si = 0 < eu, hi = si && u.get("OES_texture_float"), hu = t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT), cu = t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT), lu = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT), au = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT), or = function () {
        var n;
        return function () {
            if (void 0 !== n)return n;
            if (n = [], u.get("WEBGL_compressed_texture_pvrtc") || u.get("WEBGL_compressed_texture_s3tc"))for (var r = t.getParameter(t.COMPRESSED_TEXTURE_FORMATS), i = 0; i < r.length; i++)n.push(r[i]);
            return n
        }
    }(), vu = 0 < hu.precision && 0 < lu.precision, sr = 0 < cu.precision && 0 < au.precision;
    "highp" !== b || vu || (sr ? (b = "mediump", THREE.warn("THREE.WebGLRenderer: highp not supported, using mediump.")) : (b = "lowp", THREE.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp.")));
    "mediump" !== b || sr || (b = "lowp", THREE.warn("THREE.WebGLRenderer: mediump not supported, using lowp."));
    var yu = new THREE.ShadowMapPlugin(this, l, v, p), pu = new THREE.SpritePlugin(this, ni), wu = new THREE.LensFlarePlugin(this, ti);
    this.getContext = function () {
        return t
    };
    this.forceContextLoss = function () {
        u.get("WEBGL_lose_context").loseContext()
    };
    this.supportsVertexTextures = function () {
        return si
    };
    this.supportsFloatTextures = function () {
        return u.get("OES_texture_float")
    };
    this.supportsHalfFloatTextures = function () {
        return u.get("OES_texture_half_float")
    };
    this.supportsStandardDerivatives = function () {
        return u.get("OES_standard_derivatives")
    };
    this.supportsCompressedTextureS3TC = function () {
        return u.get("WEBGL_compressed_texture_s3tc")
    };
    this.supportsCompressedTexturePVRTC = function () {
        return u.get("WEBGL_compressed_texture_pvrtc")
    };
    this.supportsBlendMinMax = function () {
        return u.get("EXT_blend_minmax")
    };
    this.getMaxAnisotropy = function () {
        var n;
        return function () {
            if (void 0 !== n)return n;
            var i = u.get("EXT_texture_filter_anisotropic");
            return n = null !== i ? t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
        }
    }();
    this.getPrecision = function () {
        return b
    };
    this.getPixelRatio = function () {
        return e
    };
    this.setPixelRatio = function (n) {
        e = n
    };
    this.setSize = function (n, t, i) {
        s.width = n * e;
        s.height = t * e;
        !1 !== i && (s.style.width = n + "px", s.style.height = t + "px");
        this.setViewport(0, 0, n, t)
    };
    this.setViewport = function (n, i, r, u) {
        ht = n * e;
        ct = i * e;
        lt = r * e;
        at = u * e;
        t.viewport(ht, ct, lt, at)
    };
    this.setScissor = function (n, i, r, u) {
        t.scissor(n * e, i * e, r * e, u * e)
    };
    this.enableScissorTest = function (n) {
        n ? t.enable(t.SCISSOR_TEST) : t.disable(t.SCISSOR_TEST)
    };
    this.getClearColor = function () {
        return c
    };
    this.setClearColor = function (n, t) {
        c.set(n);
        d = void 0 !== t ? t : 1;
        oi(c.r, c.g, c.b, d)
    };
    this.getClearAlpha = function () {
        return d
    };
    this.setClearAlpha = function (n) {
        d = n;
        oi(c.r, c.g, c.b, d)
    };
    this.clear = function (n, i, r) {
        var u = 0;
        (void 0 === n || n) && (u |= t.COLOR_BUFFER_BIT);
        (void 0 === i || i) && (u |= t.DEPTH_BUFFER_BIT);
        (void 0 === r || r) && (u |= t.STENCIL_BUFFER_BIT);
        t.clear(u)
    };
    this.clearColor = function () {
        t.clear(t.COLOR_BUFFER_BIT)
    };
    this.clearDepth = function () {
        t.clear(t.DEPTH_BUFFER_BIT)
    };
    this.clearStencil = function () {
        t.clear(t.STENCIL_BUFFER_BIT)
    };
    this.clearTarget = function (n, t, i, r) {
        this.setRenderTarget(n);
        this.clear(t, i, r)
    };
    this.resetGLState = fr;
    var hr = function (n) {
        n.target.traverse(function (n) {
            if (n.removeEventListener("remove", hr), n instanceof THREE.Mesh || n instanceof THREE.PointCloud || n instanceof THREE.Line)delete v[n.id]; else if (n instanceof THREE.ImmediateRenderObject || n.immediateRenderCallback)for (var i = p, t = i.length - 1; 0 <= t; t--)i[t].object === n && i.splice(t, 1);
            delete n.__webglInit;
            delete n._modelViewMatrix;
            delete n._normalMatrix;
            delete n.__webglActive
        })
    }, cr = function (n) {
        var e, u, s, r, f, o;
        if (n = n.target, n.removeEventListener("dispose", cr), delete n.__webglInit, n instanceof THREE.BufferGeometry) {
            for (e in n.attributes)u = n.attributes[e], void 0 !== u.buffer && (t.deleteBuffer(u.buffer), delete u.buffer);
            i.info.memory.geometries--
        } else if (e = k[n.id], void 0 !== e) {
            for (u = 0, s = e.length; u < s; u++) {
                if (r = e[u], void 0 !== r.numMorphTargets) {
                    for (f = 0, o = r.numMorphTargets; f < o; f++)t.deleteBuffer(r.__webglMorphTargetsBuffers[f]);
                    delete r.__webglMorphTargetsBuffers
                }
                if (void 0 !== r.numMorphNormals) {
                    for (f = 0, o = r.numMorphNormals; f < o; f++)t.deleteBuffer(r.__webglMorphNormalsBuffers[f]);
                    delete r.__webglMorphNormalsBuffers
                }
                vr(r)
            }
            delete k[n.id]
        } else vr(n);
        w = ""
    }, ci = function (n) {
        n = n.target;
        n.removeEventListener("dispose", ci);
        n.image && n.image.__webglTextureCube ? (t.deleteTexture(n.image.__webglTextureCube), delete n.image.__webglTextureCube) : void 0 !== n.__webglInit && (t.deleteTexture(n.__webglTexture), delete n.__webglTexture, delete n.__webglInit);
        i.info.memory.textures--
    }, lr = function (n) {
        if (n = n.target, n.removeEventListener("dispose", lr), n && void 0 !== n.__webglTexture) {
            if (t.deleteTexture(n.__webglTexture), delete n.__webglTexture, n instanceof THREE.WebGLRenderTargetCube)for (var r = 0; 6 > r; r++)t.deleteFramebuffer(n.__webglFramebuffer[r]), t.deleteRenderbuffer(n.__webglRenderbuffer[r]); else t.deleteFramebuffer(n.__webglFramebuffer), t.deleteRenderbuffer(n.__webglRenderbuffer);
            delete n.__webglFramebuffer;
            delete n.__webglRenderbuffer
        }
        i.info.memory.textures--
    }, ar = function (n) {
        n = n.target;
        n.removeEventListener("dispose", ar);
        yr(n)
    }, vr = function (n) {
        for (var r, f = "__webglVertexBuffer __webglNormalBuffer __webglTangentBuffer __webglColorBuffer __webglUVBuffer __webglUV2Buffer __webglSkinIndicesBuffer __webglSkinWeightsBuffer __webglFaceBuffer __webglLineBuffer __webglLineDistanceBuffer".split(" "), u = 0, e = f.length; u < e; u++)r = f[u], void 0 !== n[r] && (t.deleteBuffer(n[r]), delete n[r]);
        if (void 0 !== n.__webglCustomAttributesList) {
            for (r in n.__webglCustomAttributesList)t.deleteBuffer(n.__webglCustomAttributesList[r].buffer);
            delete n.__webglCustomAttributesList
        }
        i.info.memory.geometries--
    }, yr = function (n) {
        var f = n.program.program, e, r, u;
        if (void 0 !== f) {
            for (n.program = void 0, u = !1, n = 0, e = y.length; n < e; n++)if (r = y[n], r.program === f) {
                r.usedTimes--;
                0 === r.usedTimes && (u = !0);
                break
            }
            if (!0 === u) {
                for (u = [], n = 0, e = y.length; n < e; n++)r = y[n], r.program !== f && u.push(r);
                y = u;
                t.deleteProgram(f);
                i.info.memory.programs--
            }
        }
    };
    this.renderBufferImmediate = function (n, i, u) {
        if (r.initAttributes(), n.hasPositions && !n.__webglVertexBuffer && (n.__webglVertexBuffer = t.createBuffer()), n.hasNormals && !n.__webglNormalBuffer && (n.__webglNormalBuffer = t.createBuffer()), n.hasUvs && !n.__webglUvBuffer && (n.__webglUvBuffer = t.createBuffer()), n.hasColors && !n.__webglColorBuffer && (n.__webglColorBuffer = t.createBuffer()), n.hasPositions && (t.bindBuffer(t.ARRAY_BUFFER, n.__webglVertexBuffer), t.bufferData(t.ARRAY_BUFFER, n.positionArray, t.DYNAMIC_DRAW), r.enableAttribute(i.attributes.position), t.vertexAttribPointer(i.attributes.position, 3, t.FLOAT, !1, 0, 0)), n.hasNormals) {
            if (t.bindBuffer(t.ARRAY_BUFFER, n.__webglNormalBuffer), !1 == u instanceof THREE.MeshPhongMaterial && u.shading === THREE.FlatShading)for (var o, s, h, c, l, a, v, y, p, e, w = 3 * n.count, f = 0; f < w; f += 9)e = n.normalArray, o = e[f], s = e[f + 1], h = e[f + 2], c = e[f + 3], a = e[f + 4], y = e[f + 5], l = e[f + 6], v = e[f + 7], p = e[f + 8], o = (o + c + l) / 3, s = (s + a + v) / 3, h = (h + y + p) / 3, e[f] = o, e[f + 1] = s, e[f + 2] = h, e[f + 3] = o, e[f + 4] = s, e[f + 5] = h, e[f + 6] = o, e[f + 7] = s, e[f + 8] = h;
            t.bufferData(t.ARRAY_BUFFER, n.normalArray, t.DYNAMIC_DRAW);
            r.enableAttribute(i.attributes.normal);
            t.vertexAttribPointer(i.attributes.normal, 3, t.FLOAT, !1, 0, 0)
        }
        n.hasUvs && u.map && (t.bindBuffer(t.ARRAY_BUFFER, n.__webglUvBuffer), t.bufferData(t.ARRAY_BUFFER, n.uvArray, t.DYNAMIC_DRAW), r.enableAttribute(i.attributes.uv), t.vertexAttribPointer(i.attributes.uv, 2, t.FLOAT, !1, 0, 0));
        n.hasColors && u.vertexColors !== THREE.NoColors && (t.bindBuffer(t.ARRAY_BUFFER, n.__webglColorBuffer), t.bufferData(t.ARRAY_BUFFER, n.colorArray, t.DYNAMIC_DRAW), r.enableAttribute(i.attributes.color), t.vertexAttribPointer(i.attributes.color, 3, t.FLOAT, !1, 0, 0));
        r.disableUnusedAttributes();
        t.drawArrays(t.TRIANGLES, 0, n.count);
        n.count = 0
    };
    this.renderBufferDirect = function (n, f, o, s, h, c) {
        var v, y, b, l, p, k;
        if (!1 !== s.visible)if (pi(c), n = kt(n, f, o, s, c), f = !1, o = "direct_" + h.id + "_" + n.id + "_" + (s.wireframe ? 1 : 0), o !== w && (w = o, f = !0), f && r.initAttributes(), c instanceof THREE.Mesh)if (c = !0 === s.wireframe ? t.LINES : t.TRIANGLES, v = h.attributes.index, v)if (v.array instanceof Uint32Array && u.get("OES_element_index_uint") ? (y = t.UNSIGNED_INT, b = 4) : (y = t.UNSIGNED_SHORT, b = 2), o = h.offsets, 0 === o.length)f && (a(s, n, h, 0), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v.buffer)), t.drawElements(c, v.array.length, y, 0), i.info.render.calls++, i.info.render.vertices += v.array.length, i.info.render.faces += v.array.length / 3; else for (f = !0, l = 0, p = o.length; l < p; l++)k = o[l].index, f && (a(s, n, h, k), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v.buffer)), t.drawElements(c, o[l].count, y, o[l].start * b), i.info.render.calls++, i.info.render.vertices += o[l].count, i.info.render.faces += o[l].count / 3; else f && a(s, n, h, 0), s = h.attributes.position, t.drawArrays(c, 0, s.array.length / s.itemSize), i.info.render.calls++, i.info.render.vertices += s.array.length / s.itemSize, i.info.render.faces += s.array.length / (3 * s.itemSize); else if (c instanceof THREE.PointCloud)if (c = t.POINTS, v = h.attributes.index)if (v.array instanceof Uint32Array && u.get("OES_element_index_uint") ? (y = t.UNSIGNED_INT, b = 4) : (y = t.UNSIGNED_SHORT, b = 2), o = h.offsets, 0 === o.length)f && (a(s, n, h, 0), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v.buffer)), t.drawElements(c, v.array.length, y, 0), i.info.render.calls++, i.info.render.points += v.array.length; else for (1 < o.length && (f = !0), l = 0, p = o.length; l < p; l++)k = o[l].index, f && (a(s, n, h, k), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v.buffer)), t.drawElements(c, o[l].count, y, o[l].start * b), i.info.render.calls++, i.info.render.points += o[l].count; else if (f && a(s, n, h, 0), s = h.attributes.position, o = h.offsets, 0 === o.length)t.drawArrays(c, 0, s.array.length / 3), i.info.render.calls++, i.info.render.points += s.array.length / 3; else for (l = 0, p = o.length; l < p; l++)t.drawArrays(c, o[l].index, o[l].count), i.info.render.calls++, i.info.render.points += o[l].count; else if (c instanceof THREE.Line)if (c = c.mode === THREE.LineStrip ? t.LINE_STRIP : t.LINES, r.setLineWidth(s.linewidth * e), v = h.attributes.index)if (v.array instanceof Uint32Array ? (y = t.UNSIGNED_INT, b = 4) : (y = t.UNSIGNED_SHORT, b = 2), o = h.offsets, 0 === o.length)f && (a(s, n, h, 0), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v.buffer)), t.drawElements(c, v.array.length, y, 0), i.info.render.calls++, i.info.render.vertices += v.array.length; else for (1 < o.length && (f = !0), l = 0, p = o.length; l < p; l++)k = o[l].index, f && (a(s, n, h, k), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, v.buffer)), t.drawElements(c, o[l].count, y, o[l].start * b), i.info.render.calls++, i.info.render.vertices += o[l].count; else if (f && a(s, n, h, 0), s = h.attributes.position, o = h.offsets, 0 === o.length)t.drawArrays(c, 0, s.array.length / 3), i.info.render.calls++, i.info.render.vertices += s.array.length / 3; else for (l = 0, p = o.length; l < p; l++)t.drawArrays(c, o[l].index, o[l].count), i.info.render.calls++, i.info.render.vertices += o[l].count
    };
    this.renderBuffer = function (n, u, f, o, s, h) {
        var c, p, y;
        if (!1 !== o.visible) {
            if (pi(h), f = kt(n, u, f, o, h), u = f.attributes, n = !1, f = s.id + "_" + f.id + "_" + (o.wireframe ? 1 : 0), f !== w && (w = f, n = !0), n && r.initAttributes(), !o.morphTargets && 0 <= u.position)n && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglVertexBuffer), r.enableAttribute(u.position), t.vertexAttribPointer(u.position, 3, t.FLOAT, !1, 0, 0)); else if (h.morphTargetBase) {
                if (f = o.program.attributes, -1 !== h.morphTargetBase && 0 <= f.position ? (t.bindBuffer(t.ARRAY_BUFFER, s.__webglMorphTargetsBuffers[h.morphTargetBase]), r.enableAttribute(f.position), t.vertexAttribPointer(f.position, 3, t.FLOAT, !1, 0, 0)) : 0 <= f.position && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglVertexBuffer), r.enableAttribute(f.position), t.vertexAttribPointer(f.position, 3, t.FLOAT, !1, 0, 0)), h.morphTargetForcedOrder.length)for (var c = 0, l = h.morphTargetForcedOrder, v = h.morphTargetInfluences, a; c < o.numSupportedMorphTargets && c < l.length;)a = f["morphTarget" + c], 0 <= a && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglMorphTargetsBuffers[l[c]]), r.enableAttribute(a), t.vertexAttribPointer(a, 3, t.FLOAT, !1, 0, 0)), a = f["morphNormal" + c], 0 <= a && o.morphNormals && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglMorphNormalsBuffers[l[c]]), r.enableAttribute(a), t.vertexAttribPointer(a, 3, t.FLOAT, !1, 0, 0)), h.__webglMorphTargetInfluences[c] = v[l[c]], c++; else {
                    for (l = [], v = h.morphTargetInfluences, c = h.geometry.morphTargets, v.length > c.length && (console.warn("THREE.WebGLRenderer: Influences array is bigger than morphTargets array."), v.length = c.length), c = 0, a = v.length; c < a; c++)l.push([v[c], c]);
                    for (l.length > o.numSupportedMorphTargets ? (l.sort(ai), l.length = o.numSupportedMorphTargets) : l.length > o.numSupportedMorphNormals ? l.sort(ai) : 0 === l.length && l.push([0, 0]), c = 0, p = o.numSupportedMorphTargets; c < p; c++)l[c] ? (y = l[c][1], a = f["morphTarget" + c], 0 <= a && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglMorphTargetsBuffers[y]), r.enableAttribute(a), t.vertexAttribPointer(a, 3, t.FLOAT, !1, 0, 0)), a = f["morphNormal" + c], 0 <= a && o.morphNormals && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglMorphNormalsBuffers[y]), r.enableAttribute(a), t.vertexAttribPointer(a, 3, t.FLOAT, !1, 0, 0)), h.__webglMorphTargetInfluences[c] = v[y]) : h.__webglMorphTargetInfluences[c] = 0
                }
                null !== o.program.uniforms.morphTargetInfluences && t.uniform1fv(o.program.uniforms.morphTargetInfluences, h.__webglMorphTargetInfluences)
            }
            if (n) {
                if (s.__webglCustomAttributesList)for (f = 0, v = s.__webglCustomAttributesList.length; f < v; f++)l = s.__webglCustomAttributesList[f], 0 <= u[l.buffer.belongsToAttribute] && (t.bindBuffer(t.ARRAY_BUFFER, l.buffer), r.enableAttribute(u[l.buffer.belongsToAttribute]), t.vertexAttribPointer(u[l.buffer.belongsToAttribute], l.size, t.FLOAT, !1, 0, 0));
                0 <= u.color && (0 < h.geometry.colors.length || 0 < h.geometry.faces.length ? (t.bindBuffer(t.ARRAY_BUFFER, s.__webglColorBuffer), r.enableAttribute(u.color), t.vertexAttribPointer(u.color, 3, t.FLOAT, !1, 0, 0)) : void 0 !== o.defaultAttributeValues && t.vertexAttrib3fv(u.color, o.defaultAttributeValues.color));
                0 <= u.normal && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglNormalBuffer), r.enableAttribute(u.normal), t.vertexAttribPointer(u.normal, 3, t.FLOAT, !1, 0, 0));
                0 <= u.tangent && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglTangentBuffer), r.enableAttribute(u.tangent), t.vertexAttribPointer(u.tangent, 4, t.FLOAT, !1, 0, 0));
                0 <= u.uv && (h.geometry.faceVertexUvs[0] ? (t.bindBuffer(t.ARRAY_BUFFER, s.__webglUVBuffer), r.enableAttribute(u.uv), t.vertexAttribPointer(u.uv, 2, t.FLOAT, !1, 0, 0)) : void 0 !== o.defaultAttributeValues && t.vertexAttrib2fv(u.uv, o.defaultAttributeValues.uv));
                0 <= u.uv2 && (h.geometry.faceVertexUvs[1] ? (t.bindBuffer(t.ARRAY_BUFFER, s.__webglUV2Buffer), r.enableAttribute(u.uv2), t.vertexAttribPointer(u.uv2, 2, t.FLOAT, !1, 0, 0)) : void 0 !== o.defaultAttributeValues && t.vertexAttrib2fv(u.uv2, o.defaultAttributeValues.uv2));
                o.skinning && 0 <= u.skinIndex && 0 <= u.skinWeight && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglSkinIndicesBuffer), r.enableAttribute(u.skinIndex), t.vertexAttribPointer(u.skinIndex, 4, t.FLOAT, !1, 0, 0), t.bindBuffer(t.ARRAY_BUFFER, s.__webglSkinWeightsBuffer), r.enableAttribute(u.skinWeight), t.vertexAttribPointer(u.skinWeight, 4, t.FLOAT, !1, 0, 0));
                0 <= u.lineDistance && (t.bindBuffer(t.ARRAY_BUFFER, s.__webglLineDistanceBuffer), r.enableAttribute(u.lineDistance), t.vertexAttribPointer(u.lineDistance, 1, t.FLOAT, !1, 0, 0))
            }
            r.disableUnusedAttributes();
            h instanceof THREE.Mesh ? (h = s.__typeArray === Uint32Array ? t.UNSIGNED_INT : t.UNSIGNED_SHORT, o.wireframe ? (r.setLineWidth(o.wireframeLinewidth * e), n && t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, s.__webglLineBuffer), t.drawElements(t.LINES, s.__webglLineCount, h, 0)) : (n && t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, s.__webglFaceBuffer), t.drawElements(t.TRIANGLES, s.__webglFaceCount, h, 0)), i.info.render.calls++, i.info.render.vertices += s.__webglFaceCount, i.info.render.faces += s.__webglFaceCount / 3) : h instanceof THREE.Line ? (h = h.mode === THREE.LineStrip ? t.LINE_STRIP : t.LINES, r.setLineWidth(o.linewidth * e), t.drawArrays(h, 0, s.__webglLineCount), i.info.render.calls++) : h instanceof THREE.PointCloud && (t.drawArrays(t.POINTS, 0, s.__webglParticleCount), i.info.render.calls++, i.info.render.points += s.__webglParticleCount)
        }
    };
    this.render = function (n, t, u, f) {
        var e, h, o, s;
        if (!1 == t instanceof THREE.Camera)THREE.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."); else {
            for (e = n.fog, w = "", it = -1, rt = null, vt = !0, !0 === n.autoUpdate && n.updateMatrixWorld(), void 0 === t.parent && t.updateMatrixWorld(), n.traverse(function (n) {
                n instanceof THREE.SkinnedMesh && n.skeleton.update()
            }), t.matrixWorldInverse.getInverse(t.matrixWorld), fi.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), ui.setFromMatrix(fi), l.length = 0, g.length = 0, nt.length = 0, ni.length = 0, ti.length = 0, vi(n), !0 === i.sortObjects && (g.sort(wr), nt.sort(br)), yu.render(n, t), i.info.render.calls = 0, i.info.render.vertices = 0, i.info.render.faces = 0, i.info.render.points = 0, this.setRenderTarget(u), (this.autoClear || f) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), f = 0, h = p.length; f < h; f++)o = p[f], s = o.object, s.visible && (bi(s, t), kr(o));
            n.overrideMaterial ? (f = n.overrideMaterial, bt(f), ft(g, t, l, e, f), ft(nt, t, l, e, f), yt(p, "", t, l, e, f)) : (r.setBlending(THREE.NoBlending), ft(g, t, l, e, null), yt(p, "opaque", t, l, e, null), ft(nt, t, l, e, null), yt(p, "transparent", t, l, e, null));
            pu.render(n, t);
            wu.render(n, t, tr, ir);
            u && u.generateMipmaps && u.minFilter !== THREE.NearestFilter && u.minFilter !== THREE.LinearFilter && dr(u);
            r.setDepthTest(!0);
            r.setDepthWrite(!0);
            r.setColorWrite(!0)
        }
    };
    this.renderImmediateObject = function (n, r, u, f, e) {
        var o = kt(n, r, u, f, e);
        w = "";
        i.setMaterialFaces(f);
        e.immediateRenderCallback ? e.immediateRenderCallback(o, t, ui) : e.render(function (n) {
            i.renderBufferImmediate(n, o, f)
        })
    };
    var k = {}, pr = 0, bu = {
        MeshDepthMaterial: "depth",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointCloudMaterial: "particle_basic"
    };
    this.setFaceCulling = function (n, i) {
        n === THREE.CullFaceNone ? t.disable(t.CULL_FACE) : (i === THREE.FrontFaceDirectionCW ? t.frontFace(t.CW) : t.frontFace(t.CCW), n === THREE.CullFaceBack ? t.cullFace(t.BACK) : n === THREE.CullFaceFront ? t.cullFace(t.FRONT) : t.cullFace(t.FRONT_AND_BACK), t.enable(t.CULL_FACE))
    };
    this.setMaterialFaces = function (n) {
        r.setDoubleSided(n.side === THREE.DoubleSide);
        r.setFlipSided(n.side === THREE.BackSide)
    };
    this.uploadTexture = function (n) {
        var e, u, o;
        void 0 === n.__webglInit && (n.__webglInit = !0, n.addEventListener("dispose", ci), n.__webglTexture = t.createTexture(), i.info.memory.textures++);
        t.bindTexture(t.TEXTURE_2D, n.__webglTexture);
        t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, n.flipY);
        t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, n.premultiplyAlpha);
        t.pixelStorei(t.UNPACK_ALIGNMENT, n.unpackAlignment);
        n.image = ki(n.image, ou);
        var r = n.image, c = THREE.Math.isPowerOfTwo(r.width) && THREE.Math.isPowerOfTwo(r.height), f = h(n.format), s = h(n.type);
        if (ot(t.TEXTURE_2D, n, c), e = n.mipmaps, n instanceof THREE.DataTexture)if (0 < e.length && c) {
            for (u = 0, o = e.length; u < o; u++)r = e[u], t.texImage2D(t.TEXTURE_2D, u, f, r.width, r.height, 0, f, s, r.data);
            n.generateMipmaps = !1
        } else t.texImage2D(t.TEXTURE_2D, 0, f, r.width, r.height, 0, f, s, r.data); else if (n instanceof THREE.CompressedTexture)for (u = 0, o = e.length; u < o; u++)r = e[u], n.format !== THREE.RGBAFormat && n.format !== THREE.RGBFormat ? -1 < or().indexOf(f) ? t.compressedTexImage2D(t.TEXTURE_2D, u, f, r.width, r.height, 0, r.data) : THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : t.texImage2D(t.TEXTURE_2D, u, f, r.width, r.height, 0, f, s, r.data); else if (0 < e.length && c) {
            for (u = 0, o = e.length; u < o; u++)r = e[u], t.texImage2D(t.TEXTURE_2D, u, f, f, s, r);
            n.generateMipmaps = !1
        } else t.texImage2D(t.TEXTURE_2D, 0, f, f, s, n.image);
        n.generateMipmaps && c && t.generateMipmap(t.TEXTURE_2D);
        n.needsUpdate = !1;
        n.onUpdate && n.onUpdate()
    };
    this.setTexture = function (n, r) {
        t.activeTexture(t.TEXTURE0 + r);
        n.needsUpdate ? i.uploadTexture(n) : t.bindTexture(t.TEXTURE_2D, n.__webglTexture)
    };
    this.setRenderTarget = function (n) {
        var f = n instanceof THREE.WebGLRenderTargetCube, u, s, c;
        if (n && void 0 === n.__webglFramebuffer) {
            void 0 === n.depthBuffer && (n.depthBuffer = !0);
            void 0 === n.stencilBuffer && (n.stencilBuffer = !0);
            n.addEventListener("dispose", lr);
            n.__webglTexture = t.createTexture();
            i.info.memory.textures++;
            var e = THREE.Math.isPowerOfTwo(n.width) && THREE.Math.isPowerOfTwo(n.height), r = h(n.format), o = h(n.type);
            if (f) {
                for (n.__webglFramebuffer = [], n.__webglRenderbuffer = [], t.bindTexture(t.TEXTURE_CUBE_MAP, n.__webglTexture), ot(t.TEXTURE_CUBE_MAP, n, e), u = 0; 6 > u; u++)n.__webglFramebuffer[u] = t.createFramebuffer(), n.__webglRenderbuffer[u] = t.createRenderbuffer(), t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + u, 0, r, n.width, n.height, 0, r, o, null), s = n, c = t.TEXTURE_CUBE_MAP_POSITIVE_X + u, t.bindFramebuffer(t.FRAMEBUFFER, n.__webglFramebuffer[u]), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, c, s.__webglTexture, 0), di(n.__webglRenderbuffer[u], n);
                e && t.generateMipmap(t.TEXTURE_CUBE_MAP)
            } else n.__webglFramebuffer = t.createFramebuffer(), n.__webglRenderbuffer = n.shareDepthFrom ? n.shareDepthFrom.__webglRenderbuffer : t.createRenderbuffer(), t.bindTexture(t.TEXTURE_2D, n.__webglTexture), ot(t.TEXTURE_2D, n, e), t.texImage2D(t.TEXTURE_2D, 0, r, n.width, n.height, 0, r, o, null), r = t.TEXTURE_2D, t.bindFramebuffer(t.FRAMEBUFFER, n.__webglFramebuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, r, n.__webglTexture, 0), n.shareDepthFrom ? n.depthBuffer && !n.stencilBuffer ? t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, n.__webglRenderbuffer) : n.depthBuffer && n.stencilBuffer && t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, n.__webglRenderbuffer) : di(n.__webglRenderbuffer, n), e && t.generateMipmap(t.TEXTURE_2D);
            f ? t.bindTexture(t.TEXTURE_CUBE_MAP, null) : t.bindTexture(t.TEXTURE_2D, null);
            t.bindRenderbuffer(t.RENDERBUFFER, null);
            t.bindFramebuffer(t.FRAMEBUFFER, null)
        }
        n ? (f = f ? n.__webglFramebuffer[n.activeCubeFace] : n.__webglFramebuffer, e = n.width, n = n.height, o = r = 0) : (f = null, e = lt, n = at, r = ht, o = ct);
        f !== st && (t.bindFramebuffer(t.FRAMEBUFFER, f), t.viewport(r, o, e, n), st = f);
        tr = e;
        ir = n
    };
    this.readRenderTargetPixels = function (n, i, r, u, f, e) {
        if (n instanceof THREE.WebGLRenderTarget) {
            if (n.__webglFramebuffer)if (n.format !== THREE.RGBAFormat)console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format."); else {
                var o = !1;
                n.__webglFramebuffer !== st && (t.bindFramebuffer(t.FRAMEBUFFER, n.__webglFramebuffer), o = !0);
                t.checkFramebufferStatus(t.FRAMEBUFFER) === t.FRAMEBUFFER_COMPLETE ? t.readPixels(i, r, u, f, t.RGBA, t.UNSIGNED_BYTE, e) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.");
                o && t.bindFramebuffer(t.FRAMEBUFFER, st)
            }
        } else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
    };
    this.initMaterial = function () {
        THREE.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
    };
    this.addPrePlugin = function () {
        THREE.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
    };
    this.addPostPlugin = function () {
        THREE.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
    };
    this.updateShadowMap = function () {
        THREE.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
    }
};
THREE.WebGLRenderTarget = function (n, t, i) {
    this.width = n;
    this.height = t;
    i = i || {};
    this.wrapS = void 0 !== i.wrapS ? i.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== i.wrapT ? i.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== i.magFilter ? i.magFilter : THREE.LinearFilter;
    this.minFilter = void 0 !== i.minFilter ? i.minFilter : THREE.LinearMipMapLinearFilter;
    this.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.format = void 0 !== i.format ? i.format : THREE.RGBAFormat;
    this.type = void 0 !== i.type ? i.type : THREE.UnsignedByteType;
    this.depthBuffer = void 0 !== i.depthBuffer ? i.depthBuffer : !0;
    this.stencilBuffer = void 0 !== i.stencilBuffer ? i.stencilBuffer : !0;
    this.generateMipmaps = !0;
    this.shareDepthFrom = void 0 !== i.shareDepthFrom ? i.shareDepthFrom : null
};
THREE.WebGLRenderTarget.prototype = {
    constructor: THREE.WebGLRenderTarget, setSize: function (n, t) {
        this.width = n;
        this.height = t
    }, clone: function () {
        var n = new THREE.WebGLRenderTarget(this.width, this.height);
        return n.wrapS = this.wrapS, n.wrapT = this.wrapT, n.magFilter = this.magFilter, n.minFilter = this.minFilter, n.anisotropy = this.anisotropy, n.offset.copy(this.offset), n.repeat.copy(this.repeat), n.format = this.format, n.type = this.type, n.depthBuffer = this.depthBuffer, n.stencilBuffer = this.stencilBuffer, n.generateMipmaps = this.generateMipmaps, n.shareDepthFrom = this.shareDepthFrom, n
    }, dispose: function () {
        this.dispatchEvent({type: "dispose"})
    }
};
THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube = function (n, t, i) {
    THREE.WebGLRenderTarget.call(this, n, t, i);
    this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;
THREE.WebGLExtensions = function (n) {
    var t = {};
    this.get = function (i) {
        if (void 0 !== t[i])return t[i];
        var r;
        switch (i) {
            case"EXT_texture_filter_anisotropic":
                r = n.getExtension("EXT_texture_filter_anisotropic") || n.getExtension("MOZ_EXT_texture_filter_anisotropic") || n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                break;
            case"WEBGL_compressed_texture_s3tc":
                r = n.getExtension("WEBGL_compressed_texture_s3tc") || n.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                break;
            case"WEBGL_compressed_texture_pvrtc":
                r = n.getExtension("WEBGL_compressed_texture_pvrtc") || n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                break;
            default:
                r = n.getExtension(i)
        }
        return null === r && THREE.warn("THREE.WebGLRenderer: " + i + " extension not supported."), t[i] = r
    }
};
THREE.WebGLProgram = function () {
    var n = 0;
    return function (t, i, r, u) {
        var e = t.context, s = r.defines, o = r.__webglShader.uniforms, w = r.attributes, v = r.__webglShader.vertexShader, y = r.__webglShader.fragmentShader, f = r.index0AttributeName, h, g, l, p, nt, c, a;
        void 0 === f && !0 === u.morphTargets && (f = "position");
        h = "SHADOWMAP_TYPE_BASIC";
        u.shadowMapType === THREE.PCFShadowMap ? h = "SHADOWMAP_TYPE_PCF" : u.shadowMapType === THREE.PCFSoftShadowMap && (h = "SHADOWMAP_TYPE_PCF_SOFT");
        var b = "ENVMAP_TYPE_CUBE", d = "ENVMAP_MODE_REFLECTION", k = "ENVMAP_BLENDING_MULTIPLY";
        if (u.envMap) {
            switch (r.envMap.mapping) {
                case THREE.CubeReflectionMapping:
                case THREE.CubeRefractionMapping:
                    b = "ENVMAP_TYPE_CUBE";
                    break;
                case THREE.EquirectangularReflectionMapping:
                case THREE.EquirectangularRefractionMapping:
                    b = "ENVMAP_TYPE_EQUIREC";
                    break;
                case THREE.SphericalReflectionMapping:
                    b = "ENVMAP_TYPE_SPHERE"
            }
            switch (r.envMap.mapping) {
                case THREE.CubeRefractionMapping:
                case THREE.EquirectangularRefractionMapping:
                    d = "ENVMAP_MODE_REFRACTION"
            }
            switch (r.combine) {
                case THREE.MultiplyOperation:
                    k = "ENVMAP_BLENDING_MULTIPLY";
                    break;
                case THREE.MixOperation:
                    k = "ENVMAP_BLENDING_MIX";
                    break;
                case THREE.AddOperation:
                    k = "ENVMAP_BLENDING_ADD"
            }
        }
        g = 0 < t.gammaFactor ? t.gammaFactor : 1;
        l = [];
        for (nt in s)p = s[nt], !1 !== p && (p = "#define " + nt + " " + p, l.push(p));
        l = l.join("\n");
        s = e.createProgram();
        r instanceof THREE.RawShaderMaterial ? t = r = "" : (r = ["precision " + u.precision + " float;", "precision " + u.precision + " int;", l, u.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", t.gammaInput ? "#define GAMMA_INPUT" : "", t.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + g, "#define MAX_DIR_LIGHTS " + u.maxDirLights, "#define MAX_POINT_LIGHTS " + u.maxPointLights, "#define MAX_SPOT_LIGHTS " + u.maxSpotLights, "#define MAX_HEMI_LIGHTS " + u.maxHemiLights, "#define MAX_SHADOWS " + u.maxShadows, "#define MAX_BONES " + u.maxBones, u.map ? "#define USE_MAP" : "", u.envMap ? "#define USE_ENVMAP" : "", u.envMap ? "#define " + d : "", u.lightMap ? "#define USE_LIGHTMAP" : "", u.bumpMap ? "#define USE_BUMPMAP" : "", u.normalMap ? "#define USE_NORMALMAP" : "", u.specularMap ? "#define USE_SPECULARMAP" : "", u.alphaMap ? "#define USE_ALPHAMAP" : "", u.vertexColors ? "#define USE_COLOR" : "", u.flatShading ? "#define FLAT_SHADED" : "", u.skinning ? "#define USE_SKINNING" : "", u.useVertexTexture ? "#define BONE_TEXTURE" : "", u.morphTargets ? "#define USE_MORPHTARGETS" : "", u.morphNormals ? "#define USE_MORPHNORMALS" : "", u.wrapAround ? "#define WRAP_AROUND" : "", u.doubleSided ? "#define DOUBLE_SIDED" : "", u.flipSided ? "#define FLIP_SIDED" : "", u.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", u.shadowMapEnabled ? "#define " + h : "", u.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", u.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", u.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", u.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\n\tattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\n\tattribute vec3 morphTarget0;\n\tattribute vec3 morphTarget1;\n\tattribute vec3 morphTarget2;\n\tattribute vec3 morphTarget3;\n\t#ifdef USE_MORPHNORMALS\n\t\tattribute vec3 morphNormal0;\n\t\tattribute vec3 morphNormal1;\n\t\tattribute vec3 morphNormal2;\n\t\tattribute vec3 morphNormal3;\n\t#else\n\t\tattribute vec3 morphTarget4;\n\t\tattribute vec3 morphTarget5;\n\t\tattribute vec3 morphTarget6;\n\t\tattribute vec3 morphTarget7;\n\t#endif\n#endif\n#ifdef USE_SKINNING\n\tattribute vec4 skinIndex;\n\tattribute vec4 skinWeight;\n#endif\n"].join("\n"), t = ["precision " + u.precision + " float;", "precision " + u.precision + " int;", u.bumpMap || u.normalMap || u.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", l, "#define MAX_DIR_LIGHTS " + u.maxDirLights, "#define MAX_POINT_LIGHTS " + u.maxPointLights, "#define MAX_SPOT_LIGHTS " + u.maxSpotLights, "#define MAX_HEMI_LIGHTS " + u.maxHemiLights, "#define MAX_SHADOWS " + u.maxShadows, u.alphaTest ? "#define ALPHATEST " + u.alphaTest : "", t.gammaInput ? "#define GAMMA_INPUT" : "", t.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + g, u.useFog && u.fog ? "#define USE_FOG" : "", u.useFog && u.fogExp ? "#define FOG_EXP2" : "", u.map ? "#define USE_MAP" : "", u.envMap ? "#define USE_ENVMAP" : "", u.envMap ? "#define " + b : "", u.envMap ? "#define " + d : "", u.envMap ? "#define " + k : "", u.lightMap ? "#define USE_LIGHTMAP" : "", u.bumpMap ? "#define USE_BUMPMAP" : "", u.normalMap ? "#define USE_NORMALMAP" : "", u.specularMap ? "#define USE_SPECULARMAP" : "", u.alphaMap ? "#define USE_ALPHAMAP" : "", u.vertexColors ? "#define USE_COLOR" : "", u.flatShading ? "#define FLAT_SHADED" : "", u.metal ? "#define METAL" : "", u.wrapAround ? "#define WRAP_AROUND" : "", u.doubleSided ? "#define DOUBLE_SIDED" : "", u.flipSided ? "#define FLIP_SIDED" : "", u.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", u.shadowMapEnabled ? "#define " + h : "", u.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", u.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", u.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n"));
        v = new THREE.WebGLShader(e, e.VERTEX_SHADER, r + v);
        y = new THREE.WebGLShader(e, e.FRAGMENT_SHADER, t + y);
        e.attachShader(s, v);
        e.attachShader(s, y);
        void 0 !== f && e.bindAttribLocation(s, 0, f);
        e.linkProgram(s);
        f = e.getProgramInfoLog(s);
        !1 === e.getProgramParameter(s, e.LINK_STATUS) && THREE.error("THREE.WebGLProgram: shader error: " + e.getError(), "gl.VALIDATE_STATUS", e.getProgramParameter(s, e.VALIDATE_STATUS), "gl.getPRogramInfoLog", f);
        "" !== f && THREE.warn("THREE.WebGLProgram: gl.getProgramInfoLog()" + f);
        e.deleteShader(v);
        e.deleteShader(y);
        f = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences bindMatrix bindMatrixInverse".split(" ");
        u.useVertexTexture ? (f.push("boneTexture"), f.push("boneTextureWidth"), f.push("boneTextureHeight")) : f.push("boneGlobalMatrices");
        u.logarithmicDepthBuffer && f.push("logDepthBufFC");
        for (c in o)f.push(c);
        for (o = f, c = {}, f = 0, t = o.length; f < t; f++)h = o[f], c[h] = e.getUniformLocation(s, h);
        for (this.uniforms = c, f = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" "), o = 0; o < u.maxMorphTargets; o++)f.push("morphTarget" + o);
        for (o = 0; o < u.maxMorphNormals; o++)f.push("morphNormal" + o);
        for (a in w)f.push(a);
        for (u = f, w = {}, a = 0, o = u.length; a < o; a++)c = u[a], w[c] = e.getAttribLocation(s, c);
        return this.attributes = w, this.attributesKeys = Object.keys(this.attributes), this.id = n++, this.code = i, this.usedTimes = 1, this.program = s, this.vertexShader = v, this.fragmentShader = y, this
    }
}();
THREE.WebGLShader = function () {
    var n = function (n) {
        n = n.split("\n");
        for (var t = 0; t < n.length; t++)n[t] = t + 1 + ": " + n[t];
        return n.join("\n")
    };
    return function (t, i, r) {
        return i = t.createShader(i), t.shaderSource(i, r), t.compileShader(i), !1 === t.getShaderParameter(i, t.COMPILE_STATUS) && THREE.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(i) && THREE.warn("THREE.WebGLShader: gl.getShaderInfoLog()", t.getShaderInfoLog(i), n(r)), i
    }
}();
THREE.WebGLState = function (n, t) {
    var r = new Uint8Array(16), i = new Uint8Array(16), u = null, f = null, e = null, o = null, s = null, h = null, c = null, l = null, a = null, v = null, y = null, p = null, w = null, b = null, k = null, d = null;
    this.initAttributes = function () {
        for (var n = 0, t = r.length; n < t; n++)r[n] = 0
    };
    this.enableAttribute = function (t) {
        r[t] = 1;
        0 === i[t] && (n.enableVertexAttribArray(t), i[t] = 1)
    };
    this.disableUnusedAttributes = function () {
        for (var t = 0, u = i.length; t < u; t++)i[t] !== r[t] && (n.disableVertexAttribArray(t), i[t] = 0)
    };
    this.setBlending = function (i, r, l, a, v, y, p) {
        i !== u && (i === THREE.NoBlending ? n.disable(n.BLEND) : i === THREE.AdditiveBlending ? (n.enable(n.BLEND), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.SRC_ALPHA, n.ONE)) : i === THREE.SubtractiveBlending ? (n.enable(n.BLEND), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.ONE_MINUS_SRC_COLOR)) : i === THREE.MultiplyBlending ? (n.enable(n.BLEND), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.SRC_COLOR)) : i === THREE.CustomBlending ? n.enable(n.BLEND) : (n.enable(n.BLEND), n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA)), u = i);
        i === THREE.CustomBlending ? (v = v || r, y = y || l, p = p || a, (r !== f || v !== s) && (n.blendEquationSeparate(t(r), t(v)), f = r, s = v), (l !== e || a !== o || y !== h || p !== c) && (n.blendFuncSeparate(t(l), t(a), t(y), t(p)), e = l, o = a, h = y, c = p)) : c = h = s = o = e = f = null
    };
    this.setDepthTest = function (t) {
        l !== t && (t ? n.enable(n.DEPTH_TEST) : n.disable(n.DEPTH_TEST), l = t)
    };
    this.setDepthWrite = function (t) {
        a !== t && (n.depthMask(t), a = t)
    };
    this.setColorWrite = function (t) {
        v !== t && (n.colorMask(t, t, t, t), v = t)
    };
    this.setDoubleSided = function (t) {
        y !== t && (t ? n.disable(n.CULL_FACE) : n.enable(n.CULL_FACE), y = t)
    };
    this.setFlipSided = function (t) {
        p !== t && (t ? n.frontFace(n.CW) : n.frontFace(n.CCW), p = t)
    };
    this.setLineWidth = function (t) {
        t !== w && (n.lineWidth(t), w = t)
    };
    this.setPolygonOffset = function (t, i, r) {
        b !== t && (t ? n.enable(n.POLYGON_OFFSET_FILL) : n.disable(n.POLYGON_OFFSET_FILL), b = t);
        t && (k !== i || d !== r) && (n.polygonOffset(i, r), k = i, d = r)
    };
    this.reset = function () {
        for (var n = 0; n < i.length; n++)i[n] = 0;
        p = y = v = a = l = u = null
    }
};
THREE.LensFlarePlugin = function (n, t) {
    var u, v, y, p, w, e, b, o, s, h, i = n.context, c, l, r, k, f, a;
    this.render = function (d, g, nt, tt) {
        var rt, et, ht, yt, it;
        if (0 !== t.length) {
            d = new THREE.Vector3;
            var lt = tt / nt, at = .5 * nt, vt = .5 * tt, rt = 16 / tt, st = new THREE.Vector2(rt * lt, rt), ft = new THREE.Vector3(1, 1, 0), ot = new THREE.Vector2(1, 1);
            if (void 0 === r) {
                rt = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]);
                et = new Uint16Array([0, 1, 2, 0, 2, 3]);
                c = i.createBuffer();
                l = i.createBuffer();
                i.bindBuffer(i.ARRAY_BUFFER, c);
                i.bufferData(i.ARRAY_BUFFER, rt, i.STATIC_DRAW);
                i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, l);
                i.bufferData(i.ELEMENT_ARRAY_BUFFER, et, i.STATIC_DRAW);
                f = i.createTexture();
                a = i.createTexture();
                i.bindTexture(i.TEXTURE_2D, f);
                i.texImage2D(i.TEXTURE_2D, 0, i.RGB, 16, 16, 0, i.RGB, i.UNSIGNED_BYTE, null);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST);
                i.bindTexture(i.TEXTURE_2D, a);
                i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, 16, 16, 0, i.RGBA, i.UNSIGNED_BYTE, null);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST);
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST);
                var rt = (k = 0 < i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) ? {
                    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                    fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                } : {
                    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                    fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                }, et = i.createProgram(), ct = i.createShader(i.FRAGMENT_SHADER), ut = i.createShader(i.VERTEX_SHADER), ht = "precision " + n.getPrecision() + " float;\n";
                i.shaderSource(ct, ht + rt.fragmentShader);
                i.shaderSource(ut, ht + rt.vertexShader);
                i.compileShader(ct);
                i.compileShader(ut);
                i.attachShader(et, ct);
                i.attachShader(et, ut);
                i.linkProgram(et);
                r = et;
                s = i.getAttribLocation(r, "position");
                h = i.getAttribLocation(r, "uv");
                u = i.getUniformLocation(r, "renderType");
                v = i.getUniformLocation(r, "map");
                y = i.getUniformLocation(r, "occlusionMap");
                p = i.getUniformLocation(r, "opacity");
                w = i.getUniformLocation(r, "color");
                e = i.getUniformLocation(r, "scale");
                b = i.getUniformLocation(r, "rotation");
                o = i.getUniformLocation(r, "screenPosition")
            }
            for (i.useProgram(r), i.enableVertexAttribArray(s), i.enableVertexAttribArray(h), i.uniform1i(y, 0), i.uniform1i(v, 1), i.bindBuffer(i.ARRAY_BUFFER, c), i.vertexAttribPointer(s, 2, i.FLOAT, !1, 16, 0), i.vertexAttribPointer(h, 2, i.FLOAT, !1, 16, 8), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, l), i.disable(i.CULL_FACE), i.depthMask(!1), et = 0, ct = t.length; et < ct; et++)if (rt = 16 / tt, st.set(rt * lt, rt), ut = t[et], d.set(ut.matrixWorld.elements[12], ut.matrixWorld.elements[13], ut.matrixWorld.elements[14]), d.applyMatrix4(g.matrixWorldInverse), d.applyProjection(g.projectionMatrix), ft.copy(d), ot.x = ft.x * at + at, ot.y = ft.y * vt + vt, k || 0 < ot.x && ot.x < nt && 0 < ot.y && ot.y < tt)for (i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, f), i.copyTexImage2D(i.TEXTURE_2D, 0, i.RGB, ot.x - 8, ot.y - 8, 16, 16, 0), i.uniform1i(u, 0), i.uniform2f(e, st.x, st.y), i.uniform3f(o, ft.x, ft.y, ft.z), i.disable(i.BLEND), i.enable(i.DEPTH_TEST), i.drawElements(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, a), i.copyTexImage2D(i.TEXTURE_2D, 0, i.RGBA, ot.x - 8, ot.y - 8, 16, 16, 0), i.uniform1i(u, 1), i.disable(i.DEPTH_TEST), i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, f), i.drawElements(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0), ut.positionScreen.copy(ft), ut.customUpdateCallback ? ut.customUpdateCallback(ut) : ut.updateLensFlares(), i.uniform1i(u, 2), i.enable(i.BLEND), ht = 0, yt = ut.lensFlares.length; ht < yt; ht++)it = ut.lensFlares[ht], .001 < it.opacity && .001 < it.scale && (ft.x = it.x, ft.y = it.y, ft.z = it.z, rt = it.size * it.scale / tt, st.x = rt * lt, st.y = rt, i.uniform3f(o, ft.x, ft.y, ft.z), i.uniform2f(e, st.x, st.y), i.uniform1f(b, it.rotation), i.uniform1f(p, it.opacity), i.uniform3f(w, it.color.r, it.color.g, it.color.b), n.state.setBlending(it.blending, it.blendEquation, it.blendSrc, it.blendDst), n.setTexture(it.texture, 1), i.drawElements(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0));
            i.enable(i.CULL_FACE);
            i.enable(i.DEPTH_TEST);
            i.depthMask(!0);
            n.resetGLState()
        }
    }
};
THREE.ShadowMapPlugin = function (n, t, i, r) {
    function y(n, t, r) {
        var f, u, e, o;
        if (t.visible) {
            if (f = i[t.id], f && t.castShadow && (!1 === t.frustumCulled || !0 === p.intersectsObject(t)))for (u = 0, e = f.length; u < e; u++)o = f[u], t._modelViewMatrix.multiplyMatrices(r.matrixWorldInverse, t.matrixWorld), h.push(o);
            for (u = 0, e = t.children.length; u < e; u++)y(n, t.children[u], r)
        }
    }

    var u = n.context, s, l, a, v, p = new THREE.Frustum, w = new THREE.Matrix4, f = new THREE.Vector3, e = new THREE.Vector3, b = new THREE.Vector3, h = [], o = THREE.ShaderLib.depthRGBA, c = THREE.UniformsUtils.clone(o.uniforms);
    s = new THREE.ShaderMaterial({uniforms: c, vertexShader: o.vertexShader, fragmentShader: o.fragmentShader});
    l = new THREE.ShaderMaterial({
        uniforms: c,
        vertexShader: o.vertexShader,
        fragmentShader: o.fragmentShader,
        morphTargets: !0
    });
    a = new THREE.ShaderMaterial({
        uniforms: c,
        vertexShader: o.vertexShader,
        fragmentShader: o.fragmentShader,
        skinning: !0
    });
    v = new THREE.ShaderMaterial({
        uniforms: c,
        vertexShader: o.vertexShader,
        fragmentShader: o.fragmentShader,
        morphTargets: !0,
        skinning: !0
    });
    s._shadowPass = !0;
    l._shadowPass = !0;
    a._shadowPass = !0;
    v._shadowPass = !0;
    this.render = function (i, o) {
        var ut, et, c, rt, nt, d, k, g, ot, it, tt, ft;
        if (!1 !== n.shadowMapEnabled) {
            for (ot = [], rt = 0, u.clearColor(1, 1, 1, 1), u.disable(u.BLEND), u.enable(u.CULL_FACE), u.frontFace(u.CCW), n.shadowMapCullFace === THREE.CullFaceFront ? u.cullFace(u.FRONT) : u.cullFace(u.BACK), n.state.setDepthTest(!0), ut = 0, et = t.length; ut < et; ut++)if (c = t[ut], c.castShadow)if (c instanceof THREE.DirectionalLight && c.shadowCascade)for (nt = 0; nt < c.shadowCascadeCount; nt++) {
                if (c.shadowCascadeArray[nt])it = c.shadowCascadeArray[nt]; else {
                    for (k = c, tt = nt, it = new THREE.DirectionalLight, it.isVirtual = !0, it.onlyShadow = !0, it.castShadow = !0, it.shadowCameraNear = k.shadowCameraNear, it.shadowCameraFar = k.shadowCameraFar, it.shadowCameraLeft = k.shadowCameraLeft, it.shadowCameraRight = k.shadowCameraRight, it.shadowCameraBottom = k.shadowCameraBottom, it.shadowCameraTop = k.shadowCameraTop, it.shadowCameraVisible = k.shadowCameraVisible, it.shadowDarkness = k.shadowDarkness, it.shadowBias = k.shadowCascadeBias[tt], it.shadowMapWidth = k.shadowCascadeWidth[tt], it.shadowMapHeight = k.shadowCascadeHeight[tt], it.pointsWorld = [], it.pointsFrustum = [], g = it.pointsWorld, d = it.pointsFrustum, ft = 0; 8 > ft; ft++)g[ft] = new THREE.Vector3, d[ft] = new THREE.Vector3;
                    g = k.shadowCascadeNearZ[tt];
                    k = k.shadowCascadeFarZ[tt];
                    d[0].set(-1, -1, g);
                    d[1].set(1, -1, g);
                    d[2].set(-1, 1, g);
                    d[3].set(1, 1, g);
                    d[4].set(-1, -1, k);
                    d[5].set(1, -1, k);
                    d[6].set(-1, 1, k);
                    d[7].set(1, 1, k);
                    it.originalCamera = o;
                    d = new THREE.Gyroscope;
                    d.position.copy(c.shadowCascadeOffset);
                    d.add(it);
                    d.add(it.target);
                    o.add(d);
                    c.shadowCascadeArray[nt] = it
                }
                tt = c;
                g = nt;
                k = tt.shadowCascadeArray[g];
                k.position.copy(tt.position);
                k.target.position.copy(tt.target.position);
                k.lookAt(k.target);
                k.shadowCameraVisible = tt.shadowCameraVisible;
                k.shadowDarkness = tt.shadowDarkness;
                k.shadowBias = tt.shadowCascadeBias[g];
                d = tt.shadowCascadeNearZ[g];
                tt = tt.shadowCascadeFarZ[g];
                k = k.pointsFrustum;
                k[0].z = d;
                k[1].z = d;
                k[2].z = d;
                k[3].z = d;
                k[4].z = tt;
                k[5].z = tt;
                k[6].z = tt;
                k[7].z = tt;
                ot[rt] = it;
                rt++
            } else ot[rt] = c, rt++;
            for (ut = 0, et = ot.length; ut < et; ut++) {
                if (c = ot[ut], c.shadowMap || (nt = THREE.LinearFilter, n.shadowMapType === THREE.PCFSoftShadowMap && (nt = THREE.NearestFilter), c.shadowMap = new THREE.WebGLRenderTarget(c.shadowMapWidth, c.shadowMapHeight, {
                        minFilter: nt,
                        magFilter: nt,
                        format: THREE.RGBAFormat
                    }), c.shadowMapSize = new THREE.Vector2(c.shadowMapWidth, c.shadowMapHeight), c.shadowMatrix = new THREE.Matrix4), !c.shadowCamera) {
                    if (c instanceof THREE.SpotLight)c.shadowCamera = new THREE.PerspectiveCamera(c.shadowCameraFov, c.shadowMapWidth / c.shadowMapHeight, c.shadowCameraNear, c.shadowCameraFar); else if (c instanceof THREE.DirectionalLight)c.shadowCamera = new THREE.OrthographicCamera(c.shadowCameraLeft, c.shadowCameraRight, c.shadowCameraTop, c.shadowCameraBottom, c.shadowCameraNear, c.shadowCameraFar); else {
                        THREE.error("THREE.ShadowMapPlugin: Unsupported light type for shadow", c);
                        continue
                    }
                    i.add(c.shadowCamera);
                    !0 === i.autoUpdate && i.updateMatrixWorld()
                }
                if (c.shadowCameraVisible && !c.cameraHelper && (c.cameraHelper = new THREE.CameraHelper(c.shadowCamera), i.add(c.cameraHelper)), c.isVirtual && it.originalCamera == o) {
                    for (nt = o, rt = c.shadowCamera, d = c.pointsFrustum, k = c.pointsWorld, f.set(Infinity, Infinity, Infinity), e.set(-Infinity, -Infinity, -Infinity), tt = 0; 8 > tt; tt++)g = k[tt], g.copy(d[tt]), g.unproject(nt), g.applyMatrix4(rt.matrixWorldInverse), g.x < f.x && (f.x = g.x), g.x > e.x && (e.x = g.x), g.y < f.y && (f.y = g.y), g.y > e.y && (e.y = g.y), g.z < f.z && (f.z = g.z), g.z > e.z && (e.z = g.z);
                    rt.left = f.x;
                    rt.right = e.x;
                    rt.top = e.y;
                    rt.bottom = f.y;
                    rt.updateProjectionMatrix()
                }
                for (rt = c.shadowMap, d = c.shadowMatrix, nt = c.shadowCamera, nt.position.setFromMatrixPosition(c.matrixWorld), b.setFromMatrixPosition(c.target.matrixWorld), nt.lookAt(b), nt.updateMatrixWorld(), nt.matrixWorldInverse.getInverse(nt.matrixWorld), c.cameraHelper && (c.cameraHelper.visible = c.shadowCameraVisible), c.shadowCameraVisible && c.cameraHelper.update(), d.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), d.multiply(nt.projectionMatrix), d.multiply(nt.matrixWorldInverse), w.multiplyMatrices(nt.projectionMatrix, nt.matrixWorldInverse), p.setFromMatrix(w), n.setRenderTarget(rt), n.clear(), h.length = 0, y(i, i, nt), c = 0, rt = h.length; c < rt; c++)k = h[c], d = k.object, k = k.buffer, tt = d.material instanceof THREE.MeshFaceMaterial ? d.material.materials[0] : d.material, g = void 0 !== d.geometry.morphTargets && 0 < d.geometry.morphTargets.length && tt.morphTargets, ft = d instanceof THREE.SkinnedMesh && tt.skinning, g = d.customDepthMaterial ? d.customDepthMaterial : ft ? g ? v : a : g ? l : s, n.setMaterialFaces(tt), k instanceof THREE.BufferGeometry ? n.renderBufferDirect(nt, t, null, g, k, d) : n.renderBuffer(nt, t, null, g, k, d);
                for (c = 0, rt = r.length; c < rt; c++)k = r[c], d = k.object, d.visible && d.castShadow && (d._modelViewMatrix.multiplyMatrices(nt.matrixWorldInverse, d.matrixWorld), n.renderImmediateObject(nt, t, null, s, d))
            }
            ut = n.getClearColor();
            et = n.getClearAlpha();
            u.clearColor(ut.r, ut.g, ut.b, et);
            u.enable(u.BLEND);
            n.shadowMapCullFace === THREE.CullFaceFront && u.cullFace(u.BACK);
            n.resetGLState()
        }
    }
};
THREE.SpritePlugin = function (n, t) {
    function ut(n, t) {
        return n.z !== t.z ? t.z - n.z : t.id - n.id
    }

    var f, e, v, y, p, w, b, k, d, u, g, nt, tt, it, rt, o, s, i = n.context, h, c, r, l, ft = new THREE.Vector3, et = new THREE.Quaternion, a = new THREE.Vector3;
    this.render = function (ot, st) {
        var lt, vt, ct, yt, at, ht;
        if (0 !== t.length) {
            if (void 0 === r) {
                lt = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]);
                vt = new Uint16Array([0, 1, 2, 0, 2, 3]);
                h = i.createBuffer();
                c = i.createBuffer();
                i.bindBuffer(i.ARRAY_BUFFER, h);
                i.bufferData(i.ARRAY_BUFFER, lt, i.STATIC_DRAW);
                i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, c);
                i.bufferData(i.ELEMENT_ARRAY_BUFFER, vt, i.STATIC_DRAW);
                var lt = i.createProgram(), vt = i.createShader(i.VERTEX_SHADER), ct = i.createShader(i.FRAGMENT_SHADER);
                i.shaderSource(vt, ["precision " + n.getPrecision() + " float;", "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n"));
                i.shaderSource(ct, ["precision " + n.getPrecision() + " float;", "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n"));
                i.compileShader(vt);
                i.compileShader(ct);
                i.attachShader(lt, vt);
                i.attachShader(lt, ct);
                i.linkProgram(lt);
                r = lt;
                o = i.getAttribLocation(r, "position");
                s = i.getAttribLocation(r, "uv");
                f = i.getUniformLocation(r, "uvOffset");
                e = i.getUniformLocation(r, "uvScale");
                v = i.getUniformLocation(r, "rotation");
                y = i.getUniformLocation(r, "scale");
                p = i.getUniformLocation(r, "color");
                w = i.getUniformLocation(r, "map");
                b = i.getUniformLocation(r, "opacity");
                k = i.getUniformLocation(r, "modelViewMatrix");
                d = i.getUniformLocation(r, "projectionMatrix");
                u = i.getUniformLocation(r, "fogType");
                g = i.getUniformLocation(r, "fogDensity");
                nt = i.getUniformLocation(r, "fogNear");
                tt = i.getUniformLocation(r, "fogFar");
                it = i.getUniformLocation(r, "fogColor");
                rt = i.getUniformLocation(r, "alphaTest");
                lt = document.createElement("canvas");
                lt.width = 8;
                lt.height = 8;
                vt = lt.getContext("2d");
                vt.fillStyle = "white";
                vt.fillRect(0, 0, 8, 8);
                l = new THREE.Texture(lt);
                l.needsUpdate = !0
            }
            for (i.useProgram(r), i.enableVertexAttribArray(o), i.enableVertexAttribArray(s), i.disable(i.CULL_FACE), i.enable(i.BLEND), i.bindBuffer(i.ARRAY_BUFFER, h), i.vertexAttribPointer(o, 2, i.FLOAT, !1, 16, 0), i.vertexAttribPointer(s, 2, i.FLOAT, !1, 16, 8), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, c), i.uniformMatrix4fv(d, !1, st.projectionMatrix.elements), i.activeTexture(i.TEXTURE0), i.uniform1i(w, 0), vt = lt = 0, (ct = ot.fog) ? (i.uniform3f(it, ct.color.r, ct.color.g, ct.color.b), ct instanceof THREE.Fog ? (i.uniform1f(nt, ct.near), i.uniform1f(tt, ct.far), i.uniform1i(u, 1), vt = lt = 1) : ct instanceof THREE.FogExp2 && (i.uniform1f(g, ct.density), i.uniform1i(u, 2), vt = lt = 2)) : (i.uniform1i(u, 0), vt = lt = 0), ct = 0, yt = t.length; ct < yt; ct++)at = t[ct], at._modelViewMatrix.multiplyMatrices(st.matrixWorldInverse, at.matrixWorld), at.z = -at._modelViewMatrix.elements[14];
            t.sort(ut);
            for (var pt = [], ct = 0, yt = t.length; ct < yt; ct++)at = t[ct], ht = at.material, i.uniform1f(rt, ht.alphaTest), i.uniformMatrix4fv(k, !1, at._modelViewMatrix.elements), at.matrixWorld.decompose(ft, et, a), pt[0] = a.x, pt[1] = a.y, at = 0, ot.fog && ht.fog && (at = vt), lt !== at && (i.uniform1i(u, at), lt = at), null !== ht.map ? (i.uniform2f(f, ht.map.offset.x, ht.map.offset.y), i.uniform2f(e, ht.map.repeat.x, ht.map.repeat.y)) : (i.uniform2f(f, 0, 0), i.uniform2f(e, 1, 1)), i.uniform1f(b, ht.opacity), i.uniform3f(p, ht.color.r, ht.color.g, ht.color.b), i.uniform1f(v, ht.rotation), i.uniform2fv(y, pt), n.state.setBlending(ht.blending, ht.blendEquation, ht.blendSrc, ht.blendDst), n.state.setDepthTest(ht.depthTest), n.state.setDepthWrite(ht.depthWrite), ht.map && ht.map.image && ht.map.image.width ? n.setTexture(ht.map, 0) : n.setTexture(l, 0), i.drawElements(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0);
            i.enable(i.CULL_FACE);
            n.resetGLState()
        }
    }
};
THREE.GeometryUtils = {
    merge: function (n, t, i) {
        THREE.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
        var r;
        t instanceof THREE.Mesh && (t.matrixAutoUpdate && t.updateMatrix(), r = t.matrix, t = t.geometry);
        n.merge(t, r, i)
    }, center: function (n) {
        return THREE.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), n.center()
    }
};
THREE.ImageUtils = {
    crossOrigin: void 0, loadTexture: function (n, t, i, r) {
        var f = new THREE.ImageLoader, u;
        return f.crossOrigin = this.crossOrigin, u = new THREE.Texture(void 0, t), f.load(n, function (n) {
            u.image = n;
            u.needsUpdate = !0;
            i && i(u)
        }, void 0, function (n) {
            r && r(n)
        }), u.sourceFile = n, u
    }, loadTextureCube: function (n, t, i, r) {
        var o = new THREE.ImageLoader, u, e, f, s;
        for (o.crossOrigin = this.crossOrigin, u = new THREE.CubeTexture([], t), u.flipY = !1, e = 0, t = function (t) {
            o.load(n[t], function (n) {
                u.images[t] = n;
                e += 1;
                6 === e && (u.needsUpdate = !0, i && i(u))
            }, void 0, r)
        }, f = 0, s = n.length; f < s; ++f)t(f);
        return u
    }, loadCompressedTexture: function () {
        THREE.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
    }, loadCompressedTextureCube: function () {
        THREE.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
    }, getNormalMap: function (n, t) {
        var k = function (n) {
            var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
            return [n[0] / t, n[1] / t, n[2] / t]
        }, y, o;
        t |= 1;
        var r = n.width, a = n.height, p = document.createElement("canvas");
        p.width = r;
        p.height = a;
        y = p.getContext("2d");
        y.drawImage(n, 0, 0);
        for (var l = y.getImageData(0, 0, r, a).data, b = y.createImageData(r, a), w = b.data, h = 0; h < r; h++)for (o = 0; o < a; o++) {
            var e = 0 > o - 1 ? 0 : o - 1, u = o + 1 > a - 1 ? a - 1 : o + 1, v = 0 > h - 1 ? 0 : h - 1, f = h + 1 > r - 1 ? r - 1 : h + 1, i = [], s = [0, 0, l[4 * (o * r + h)] / 255 * t];
            for (i.push([-1, 0, l[4 * (o * r + v)] / 255 * t]), i.push([-1, -1, l[4 * (e * r + v)] / 255 * t]), i.push([0, -1, l[4 * (e * r + h)] / 255 * t]), i.push([1, -1, l[4 * (e * r + f)] / 255 * t]), i.push([1, 0, l[4 * (o * r + f)] / 255 * t]), i.push([1, 1, l[4 * (u * r + f)] / 255 * t]), i.push([0, 1, l[4 * (u * r + h)] / 255 * t]), i.push([-1, 1, l[4 * (u * r + v)] / 255 * t]), e = [], v = i.length, u = 0; u < v; u++) {
                var f = i[u], c = i[(u + 1) % v], f = [f[0] - s[0], f[1] - s[1], f[2] - s[2]], c = [c[0] - s[0], c[1] - s[1], c[2] - s[2]];
                e.push(k([f[1] * c[2] - f[2] * c[1], f[2] * c[0] - f[0] * c[2], f[0] * c[1] - f[1] * c[0]]))
            }
            for (i = [0, 0, 0], u = 0; u < e.length; u++)i[0] += e[u][0], i[1] += e[u][1], i[2] += e[u][2];
            i[0] /= e.length;
            i[1] /= e.length;
            i[2] /= e.length;
            s = 4 * (o * r + h);
            w[s] = (i[0] + 1) / 2 * 255 | 0;
            w[s + 1] = (i[1] + 1) / 2 * 255 | 0;
            w[s + 2] = 255 * i[2] | 0;
            w[s + 3] = 255
        }
        return y.putImageData(b, 0, 0), p
    }, generateDataTexture: function (n, t, i) {
        var f = n * t, u = new Uint8Array(3 * f), e = Math.floor(255 * i.r), o = Math.floor(255 * i.g), r;
        for (i = Math.floor(255 * i.b), r = 0; r < f; r++)u[3 * r] = e, u[3 * r + 1] = o, u[3 * r + 2] = i;
        return n = new THREE.DataTexture(u, n, t, THREE.RGBFormat), n.needsUpdate = !0, n
    }
};
THREE.SceneUtils = {
    createMultiMaterialObject: function (n, t) {
        for (var r = new THREE.Object3D, i = 0, u = t.length; i < u; i++)r.add(new THREE.Mesh(n, t[i]));
        return r
    }, detach: function (n, t, i) {
        n.applyMatrix(t.matrixWorld);
        t.remove(n);
        i.add(n)
    }, attach: function (n, t, i) {
        var r = new THREE.Matrix4;
        r.getInverse(i.matrixWorld);
        n.applyMatrix(r);
        t.remove(n);
        i.add(n)
    }
};
THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function () {
        try {
            return this.faces[this.face][this.weight][this.style]
        } catch (n) {
            throw"The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing.";
        }
    },
    loadFace: function (n) {
        var t = n.familyName.toLowerCase();
        return this.faces[t] = this.faces[t] || {}, this.faces[t][n.cssFontWeight] = this.faces[t][n.cssFontWeight] || {}, this.faces[t][n.cssFontWeight][n.cssFontStyle] = n, this.faces[t][n.cssFontWeight][n.cssFontStyle] = n
    },
    drawText: function (n) {
        var r = this.getFace(), e = this.size / r.resolution, t = 0, u = String(n).split(""), o = u.length, f = [];
        for (n = 0; n < o; n++) {
            var i = new THREE.Path, i = this.extractGlyphPoints(u[n], r, e, t, i), t = t + i.offset;
            f.push(i.path)
        }
        return {paths: f, offset: t / 2}
    },
    extractGlyphPoints: function (n, t, i, r, u) {
        var v = [], f, s, e, k, o, y, p, h, c, w, b, l = t.glyphs[n] || t.glyphs["?"], a;
        if (l) {
            if (l.o)for (t = l._cachedOutline || (l._cachedOutline = l.o.split(" ")), k = t.length, n = 0; n < k;)switch (e = t[n++], e) {
                case"m":
                    e = t[n++] * i + r;
                    o = t[n++] * i;
                    u.moveTo(e, o);
                    break;
                case"l":
                    e = t[n++] * i + r;
                    o = t[n++] * i;
                    u.lineTo(e, o);
                    break;
                case"q":
                    if (e = t[n++] * i + r, o = t[n++] * i, h = t[n++] * i + r, c = t[n++] * i, u.quadraticCurveTo(h, c, e, o), f = v[v.length - 1])for (y = f.x, p = f.y, f = 1, s = this.divisions; f <= s; f++)a = f / s, THREE.Shape.Utils.b2(a, y, h, e), THREE.Shape.Utils.b2(a, p, c, o);
                    break;
                case"b":
                    if (e = t[n++] * i + r, o = t[n++] * i, h = t[n++] * i + r, c = t[n++] * i, w = t[n++] * i + r, b = t[n++] * i, u.bezierCurveTo(h, c, w, b, e, o), f = v[v.length - 1])for (y = f.x, p = f.y, f = 1, s = this.divisions; f <= s; f++)a = f / s, THREE.Shape.Utils.b3(a, y, h, w, e), THREE.Shape.Utils.b3(a, p, c, b, o)
            }
            return {offset: l.ha * i, path: u}
        }
    }
};
THREE.FontUtils.generateShapes = function (n, t) {
    t = t || {};
    var r = void 0 !== t.curveSegments ? t.curveSegments : 4, u = void 0 !== t.font ? t.font : "helvetiker", i = void 0 !== t.weight ? t.weight : "normal", f = void 0 !== t.style ? t.style : "normal";
    for (THREE.FontUtils.size = void 0 !== t.size ? t.size : 100, THREE.FontUtils.divisions = r, THREE.FontUtils.face = u, THREE.FontUtils.weight = i, THREE.FontUtils.style = f, r = THREE.FontUtils.drawText(n).paths, u = [], i = 0, f = r.length; i < f; i++)Array.prototype.push.apply(u, r[i].toShapes());
    return u
}, function (n) {
    var t = function (n) {
        for (var r = n.length, u = 0, i = r - 1, t = 0; t < r; i = t++)u += n[i].x * n[t].y - n[t].x * n[i].y;
        return .5 * u
    };
    return n.Triangulate = function (n, i) {
        var f = n.length, g, s;
        if (3 > f)return null;
        var nt = [], u = [], tt = [], e, r, o;
        if (0 < t(n))for (r = 0; r < f; r++)u[r] = r; else for (r = 0; r < f; r++)u[r] = f - 1 - r;
        for (g = 2 * f, r = f - 1; 2 < f;) {
            if (0 >= g--) {
                THREE.warn("THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()");
                break
            }
            e = r;
            f <= e && (e = 0);
            r = e + 1;
            f <= r && (r = 0);
            o = r + 1;
            f <= o && (o = 0);
            n:{
                var l = s = void 0, a = void 0, v = void 0, y = void 0, p = void 0, w = void 0, h = void 0, c = void 0, l = n[u[e]].x, a = n[u[e]].y, v = n[u[r]].x, y = n[u[r]].y, p = n[u[o]].x, w = n[u[o]].y;
                if (1e-10 > (v - l) * (w - a) - (y - a) * (p - l))s = !1; else {
                    var it = void 0, rt = void 0, ut = void 0, ft = void 0, et = void 0, ot = void 0, b = void 0, k = void 0, d = void 0, st = void 0, d = k = b = c = h = void 0, it = p - v, rt = w - y, ut = l - p, ft = a - w, et = v - l, ot = y - a;
                    for (s = 0; s < f; s++)if (h = n[u[s]].x, c = n[u[s]].y, !(h === l && c === a || h === v && c === y || h === p && c === w) && (b = h - l, k = c - a, d = h - v, st = c - y, h -= p, c -= w, d = it * st - rt * d, b = et * k - ot * b, k = ut * c - ft * h, -1e-10 <= d && -1e-10 <= k && -1e-10 <= b)) {
                        s = !1;
                        break n
                    }
                    s = !0
                }
            }
            if (s) {
                for (nt.push([n[u[e]], n[u[r]], n[u[o]]]), tt.push([u[e], u[r], u[o]]), e = r, o = r + 1; o < f; e++, o++)u[e] = u[o];
                f--;
                g = 2 * f
            }
        }
        return i ? tt : nt
    }, n.Triangulate.area = t, n
}(THREE.FontUtils);
self._typeface_js = {faces: THREE.FontUtils.faces, loadFace: THREE.FontUtils.loadFace};
THREE.typeface_js = self._typeface_js;
THREE.Audio = function (n) {
    THREE.Object3D.call(this);
    this.type = "Audio";
    this.context = n.context;
    this.source = this.context.createBufferSource();
    this.source.onended = this.onEnded.bind(this);
    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);
    this.panner = this.context.createPanner();
    this.panner.connect(this.gain);
    this.autoplay = !1;
    this.startTime = 0;
    this.isPlaying = !1
};
THREE.Audio.prototype = Object.create(THREE.Object3D.prototype);
THREE.Audio.prototype.constructor = THREE.Audio;
THREE.Audio.prototype.load = function (n) {
    var t = this, i = new XMLHttpRequest;
    return i.open("GET", n, !0), i.responseType = "arraybuffer", i.onload = function () {
        t.context.decodeAudioData(this.response, function (n) {
            t.source.buffer = n;
            t.autoplay && t.play()
        })
    }, i.send(), this
};
THREE.Audio.prototype.play = function () {
    if (!0 === this.isPlaying)THREE.warn("THREE.Audio: Audio is already playing."); else {
        var n = this.context.createBufferSource();
        n.buffer = this.source.buffer;
        n.loop = this.source.loop;
        n.onended = this.source.onended;
        n.connect(this.panner);
        n.start(0, this.startTime);
        this.isPlaying = !0;
        this.source = n
    }
};
THREE.Audio.prototype.pause = function () {
    this.source.stop();
    this.startTime = this.context.currentTime
};
THREE.Audio.prototype.stop = function () {
    this.source.stop();
    this.startTime = 0
};
THREE.Audio.prototype.onEnded = function () {
    this.isPlaying = !1
};
THREE.Audio.prototype.setLoop = function (n) {
    this.source.loop = n
};
THREE.Audio.prototype.setRefDistance = function (n) {
    this.panner.refDistance = n
};
THREE.Audio.prototype.setRolloffFactor = function (n) {
    this.panner.rolloffFactor = n
};
THREE.Audio.prototype.setVolume = function (n) {
    this.gain.gain.value = n
};
THREE.Audio.prototype.updateMatrixWorld = function () {
    var n = new THREE.Vector3;
    return function (t) {
        THREE.Object3D.prototype.updateMatrixWorld.call(this, t);
        n.setFromMatrixPosition(this.matrixWorld);
        this.panner.setPosition(n.x, n.y, n.z)
    }
}();
THREE.AudioListener = function () {
    THREE.Object3D.call(this);
    this.type = "AudioListener";
    this.context = new (window.AudioContext || window.webkitAudioContext)
};
THREE.AudioListener.prototype = Object.create(THREE.Object3D.prototype);
THREE.AudioListener.prototype.constructor = THREE.AudioListener;
THREE.AudioListener.prototype.updateMatrixWorld = function () {
    var n = new THREE.Vector3, r = new THREE.Quaternion, f = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Vector3, u = new THREE.Vector3;
    return function (e) {
        THREE.Object3D.prototype.updateMatrixWorld.call(this, e);
        e = this.context.listener;
        var o = this.up;
        this.matrixWorld.decompose(n, r, f);
        t.set(0, 0, -1).applyQuaternion(r);
        i.subVectors(n, u);
        e.setPosition(n.x, n.y, n.z);
        e.setOrientation(t.x, t.y, t.z, o.x, o.y, o.z);
        e.setVelocity(i.x, i.y, i.z);
        u.copy(n)
    }
}();
THREE.Curve = function () {
};
THREE.Curve.prototype.getPoint = function () {
    return THREE.warn("THREE.Curve: Warning, getPoint() not implemented!"), null
};
THREE.Curve.prototype.getPointAt = function (n) {
    return n = this.getUtoTmapping(n), this.getPoint(n)
};
THREE.Curve.prototype.getPoints = function (n) {
    n || (n = 5);
    for (var i = [], t = 0; t <= n; t++)i.push(this.getPoint(t / n));
    return i
};
THREE.Curve.prototype.getSpacedPoints = function (n) {
    n || (n = 5);
    for (var i = [], t = 0; t <= n; t++)i.push(this.getPointAt(t / n));
    return i
};
THREE.Curve.prototype.getLength = function () {
    var n = this.getLengths();
    return n[n.length - 1]
};
THREE.Curve.prototype.getLengths = function (n) {
    if (n || (n = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == n + 1 && !this.needsUpdate)return this.cacheArcLengths;
    this.needsUpdate = !1;
    var i = [], r, u = this.getPoint(0), t, f = 0;
    for (i.push(0), t = 1; t <= n; t++)r = this.getPoint(t / n), f += r.distanceTo(u), i.push(f), u = r;
    return this.cacheArcLengths = i
};
THREE.Curve.prototype.updateArcLengths = function () {
    this.needsUpdate = !0;
    this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function (n, t) {
    var u = this.getLengths(), i = 0, e = u.length, o, r, f, s;
    for (o = t ? t : n * u[e - 1], r = 0, f = e - 1; r <= f;)if (i = Math.floor(r + (f - r) / 2), s = u[i] - o, 0 > s)r = i + 1; else if (0 < s)f = i - 1; else {
        f = i;
        break
    }
    return (i = f, u[i] == o) ? i / (e - 1) : (r = u[i], (i + (o - r) / (u[i + 1] - r)) / (e - 1))
};
THREE.Curve.prototype.getTangent = function (n) {
    var t = n - .0001;
    return n += .0001, 0 > t && (t = 0), 1 < n && (n = 1), t = this.getPoint(t), this.getPoint(n).clone().sub(t).normalize()
};
THREE.Curve.prototype.getTangentAt = function (n) {
    return n = this.getUtoTmapping(n), this.getTangent(n)
};
THREE.Curve.Utils = {
    tangentQuadraticBezier: function (n, t, i, r) {
        return 2 * (1 - n) * (i - t) + 2 * n * (r - i)
    }, tangentCubicBezier: function (n, t, i, r, u) {
        return -3 * t * (1 - n) * (1 - n) + 3 * i * (1 - n) * (1 - n) - 6 * n * i * (1 - n) + 6 * n * r * (1 - n) - 3 * n * n * r + 3 * n * n * u
    }, tangentSpline: function (n) {
        return 6 * n * n - 6 * n + (3 * n * n - 4 * n + 1) + (-6 * n * n + 6 * n) + (3 * n * n - 2 * n)
    }, interpolate: function (n, t, i, r, u) {
        n = .5 * (i - n);
        r = .5 * (r - t);
        var f = u * u;
        return (2 * t - 2 * i + n + r) * u * f + (-3 * t + 3 * i - 2 * n - r) * f + n * u + t
    }
};
THREE.Curve.create = function (n, t) {
    return n.prototype = Object.create(THREE.Curve.prototype), n.prototype.constructor = n, n.prototype.getPoint = t, n
};
THREE.CurvePath = function () {
    this.curves = [];
    this.bends = [];
    this.autoClose = !1
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.constructor = THREE.CurvePath;
THREE.CurvePath.prototype.add = function (n) {
    this.curves.push(n)
};
THREE.CurvePath.prototype.checkConnection = function () {
};
THREE.CurvePath.prototype.closePath = function () {
    var n = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
    n.equals(t) || this.curves.push(new THREE.LineCurve(t, n))
};
THREE.CurvePath.prototype.getPoint = function (n) {
    var t = n * this.getLength(), i = this.getCurveLengths();
    for (n = 0; n < i.length;) {
        if (i[n] >= t)return t = i[n] - t, n = this.curves[n], t = 1 - t / n.getLength(), n.getPointAt(t);
        n++
    }
    return null
};
THREE.CurvePath.prototype.getLength = function () {
    var n = this.getCurveLengths();
    return n[n.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function () {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length)return this.cacheLengths;
    for (var t = [], i = 0, r = this.curves.length, n = 0; n < r; n++)i += this.curves[n].getLength(), t.push(i);
    return this.cacheLengths = t
};
THREE.CurvePath.prototype.getBoundingBox = function () {
    var t = this.getPoints(), i, r, s, u, f, h, n, e, c, l, o;
    for (i = r = Number.NEGATIVE_INFINITY, u = f = Number.POSITIVE_INFINITY, o = t[0] instanceof THREE.Vector3, l = o ? new THREE.Vector3 : new THREE.Vector2, e = 0, c = t.length; e < c; e++)n = t[e], n.x > i ? i = n.x : n.x < u && (u = n.x), n.y > r ? r = n.y : n.y < f && (f = n.y), o && (n.z > s ? s = n.z : n.z < h && (h = n.z)), l.add(n);
    return t = {minX: u, minY: f, maxX: i, maxY: r}, o && (t.maxZ = s, t.minZ = h), t
};
THREE.CurvePath.prototype.createPointsGeometry = function (n) {
    return n = this.getPoints(n, !0), this.createGeometry(n)
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (n) {
    return n = this.getSpacedPoints(n, !0), this.createGeometry(n)
};
THREE.CurvePath.prototype.createGeometry = function (n) {
    for (var i = new THREE.Geometry, t = 0; t < n.length; t++)i.vertices.push(new THREE.Vector3(n[t].x, n[t].y, n[t].z || 0));
    return i
};
THREE.CurvePath.prototype.addWrapPath = function (n) {
    this.bends.push(n)
};
THREE.CurvePath.prototype.getTransformedPoints = function (n, t) {
    var r = this.getPoints(n), i, u;
    for (t || (t = this.bends), i = 0, u = t.length; i < u; i++)r = this.getWrapPoints(r, t[i]);
    return r
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (n, t) {
    var r = this.getSpacedPoints(n), i, u;
    for (t || (t = this.bends), i = 0, u = t.length; i < u; i++)r = this.getWrapPoints(r, t[i]);
    return r
};
THREE.CurvePath.prototype.getWrapPoints = function (n, t) {
    for (var s = this.getBoundingBox(), u, r, o, i, f = 0, e = n.length; f < e; f++)u = n[f], r = u.x, o = u.y, i = r / s.maxX, i = t.getUtoTmapping(i, r), r = t.getPoint(i), i = t.getTangent(i), i.set(-i.y, i.x).multiplyScalar(o), u.x = r.x + i.x, u.y = r.y + i.y;
    return n
};
THREE.Gyroscope = function () {
    THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.constructor = THREE.Gyroscope;
THREE.Gyroscope.prototype.updateMatrixWorld = function () {
    var r = new THREE.Vector3, n = new THREE.Quaternion, u = new THREE.Vector3, t = new THREE.Vector3, f = new THREE.Quaternion, i = new THREE.Vector3;
    return function (e) {
        this.matrixAutoUpdate && this.updateMatrix();
        (this.matrixWorldNeedsUpdate || e) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(t, f, i), this.matrix.decompose(r, n, u), this.matrixWorld.compose(t, n, i)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
        for (var o = 0, s = this.children.length; o < s; o++)this.children[o].updateMatrixWorld(e)
    }
}();
THREE.Path = function (n) {
    THREE.CurvePath.call(this);
    this.actions = [];
    n && this.fromPoints(n)
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.Path.prototype.constructor = THREE.Path;
THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc",
    ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function (n) {
    this.moveTo(n[0].x, n[0].y);
    for (var t = 1, i = n.length; t < i; t++)this.lineTo(n[t].x, n[t].y)
};
THREE.Path.prototype.moveTo = function () {
    var n = Array.prototype.slice.call(arguments);
    this.actions.push({action: THREE.PathActions.MOVE_TO, args: n})
};
THREE.Path.prototype.lineTo = function (n, t) {
    var r = Array.prototype.slice.call(arguments), i = this.actions[this.actions.length - 1].args, i = new THREE.LineCurve(new THREE.Vector2(i[i.length - 2], i[i.length - 1]), new THREE.Vector2(n, t));
    this.curves.push(i);
    this.actions.push({action: THREE.PathActions.LINE_TO, args: r})
};
THREE.Path.prototype.quadraticCurveTo = function (n, t, i, r) {
    var f = Array.prototype.slice.call(arguments), u = this.actions[this.actions.length - 1].args, u = new THREE.QuadraticBezierCurve(new THREE.Vector2(u[u.length - 2], u[u.length - 1]), new THREE.Vector2(n, t), new THREE.Vector2(i, r));
    this.curves.push(u);
    this.actions.push({action: THREE.PathActions.QUADRATIC_CURVE_TO, args: f})
};
THREE.Path.prototype.bezierCurveTo = function (n, t, i, r, u, f) {
    var o = Array.prototype.slice.call(arguments), e = this.actions[this.actions.length - 1].args, e = new THREE.CubicBezierCurve(new THREE.Vector2(e[e.length - 2], e[e.length - 1]), new THREE.Vector2(n, t), new THREE.Vector2(i, r), new THREE.Vector2(u, f));
    this.curves.push(e);
    this.actions.push({action: THREE.PathActions.BEZIER_CURVE_TO, args: o})
};
THREE.Path.prototype.splineThru = function (n) {
    var i = Array.prototype.slice.call(arguments), t = this.actions[this.actions.length - 1].args, t = [new THREE.Vector2(t[t.length - 2], t[t.length - 1])];
    Array.prototype.push.apply(t, n);
    t = new THREE.SplineCurve(t);
    this.curves.push(t);
    this.actions.push({action: THREE.PathActions.CSPLINE_THRU, args: i})
};
THREE.Path.prototype.arc = function (n, t, i, r, u, f) {
    var e = this.actions[this.actions.length - 1].args;
    this.absarc(n + e[e.length - 2], t + e[e.length - 1], i, r, u, f)
};
THREE.Path.prototype.absarc = function (n, t, i, r, u, f) {
    this.absellipse(n, t, i, i, r, u, f)
};
THREE.Path.prototype.ellipse = function (n, t, i, r, u, f, e) {
    var o = this.actions[this.actions.length - 1].args;
    this.absellipse(n + o[o.length - 2], t + o[o.length - 1], i, r, u, f, e)
};
THREE.Path.prototype.absellipse = function (n, t, i, r, u, f, e) {
    var s = Array.prototype.slice.call(arguments), o = new THREE.EllipseCurve(n, t, i, r, u, f, e);
    this.curves.push(o);
    o = o.getPoint(1);
    s.push(o.x);
    s.push(o.y);
    this.actions.push({action: THREE.PathActions.ELLIPSE, args: s})
};
THREE.Path.prototype.getSpacedPoints = function (n) {
    n || (n = 40);
    for (var i = [], t = 0; t < n; t++)i.push(this.getPoint(t / n));
    return i
};
THREE.Path.prototype.getPoints = function (n, t) {
    if (this.useSpacedPoints)return console.log("tata"), this.getSpacedPoints(n, t);
    n = n || 12;
    for (var f = [], i, r, c, l, a, y, v, h, s, e, u, o = 0, p = this.actions.length; o < p; o++)switch (i = this.actions[o], r = i.action, i = i.args, r) {
        case THREE.PathActions.MOVE_TO:
            f.push(new THREE.Vector2(i[0], i[1]));
            break;
        case THREE.PathActions.LINE_TO:
            f.push(new THREE.Vector2(i[0], i[1]));
            break;
        case THREE.PathActions.QUADRATIC_CURVE_TO:
            for (c = i[2], l = i[3], v = i[0], h = i[1], 0 < f.length ? (r = f[f.length - 1], s = r.x, e = r.y) : (r = this.actions[o - 1].args, s = r[r.length - 2], e = r[r.length - 1]), i = 1; i <= n; i++)u = i / n, r = THREE.Shape.Utils.b2(u, s, v, c), u = THREE.Shape.Utils.b2(u, e, h, l), f.push(new THREE.Vector2(r, u));
            break;
        case THREE.PathActions.BEZIER_CURVE_TO:
            for (c = i[4], l = i[5], v = i[0], h = i[1], a = i[2], y = i[3], 0 < f.length ? (r = f[f.length - 1], s = r.x, e = r.y) : (r = this.actions[o - 1].args, s = r[r.length - 2], e = r[r.length - 1]), i = 1; i <= n; i++)u = i / n, r = THREE.Shape.Utils.b3(u, s, v, a, c), u = THREE.Shape.Utils.b3(u, e, h, y, l), f.push(new THREE.Vector2(r, u));
            break;
        case THREE.PathActions.CSPLINE_THRU:
            for (r = this.actions[o - 1].args, u = [new THREE.Vector2(r[r.length - 2], r[r.length - 1])], r = n * i[0].length, u = u.concat(i[0]), u = new THREE.SplineCurve(u), i = 1; i <= r; i++)f.push(u.getPointAt(i / r));
            break;
        case THREE.PathActions.ARC:
            for (c = i[0], l = i[1], h = i[2], a = i[3], r = i[4], v = !!i[5], s = r - a, e = 2 * n, i = 1; i <= e; i++)u = i / e, v || (u = 1 - u), u = a + u * s, r = c + h * Math.cos(u), u = l + h * Math.sin(u), f.push(new THREE.Vector2(r, u));
            break;
        case THREE.PathActions.ELLIPSE:
            for (c = i[0], l = i[1], h = i[2], y = i[3], a = i[4], r = i[5], v = !!i[6], s = r - a, e = 2 * n, i = 1; i <= e; i++)u = i / e, v || (u = 1 - u), u = a + u * s, r = c + h * Math.cos(u), u = l + y * Math.sin(u), f.push(new THREE.Vector2(r, u))
    }
    return o = f[f.length - 1], 1e-10 > Math.abs(o.x - f[0].x) && 1e-10 > Math.abs(o.y - f[0].y) && f.splice(f.length - 1, 1), t && f.push(f[0]), f
};
THREE.Path.prototype.toShapes = function (n, t) {
    function p(n) {
        for (var r, t, u = [], i = 0, f = n.length; i < f; i++)r = n[i], t = new THREE.Shape, t.actions = r.actions, t.curves = r.curves, u.push(t);
        return u
    }

    function w(n, t) {
        for (var h = t.length, o = !1, r = h - 1, e = 0; e < h; r = e++) {
            var i = t[r], u = t[e], s = u.x - i.x, f = u.y - i.y;
            if (1e-10 < Math.abs(f)) {
                if (0 > f && (i = t[e], s = -s, u = t[r], f = -f), !(n.y < i.y || n.y > u.y))if (n.y == i.y) {
                    if (n.x == i.x)return !0
                } else {
                    if (r = f * (n.x - i.x) - s * (n.y - i.y), 0 == r)return !0;
                    0 > r || (o = !o)
                }
            } else if (n.y == i.y && (u.x <= n.x && n.x <= i.x || i.x <= n.x && n.x <= u.x))return !0
        }
        return o
    }

    var r = function (n) {
        for (var i, e, u = [], t = new THREE.Path, r = 0, f = n.length; r < f; r++)i = n[r], e = i.args, i = i.action, i == THREE.PathActions.MOVE_TO && 0 != t.actions.length && (u.push(t), t = new THREE.Path), t[i].apply(t, e);
        return 0 != t.actions.length && u.push(t), u
    }(this.actions), h, i, e, y, o, s, l, a;
    if (0 == r.length)return [];
    if (!0 === t)return p(r);
    if (y = [], 1 == r.length)return i = r[0], e = new THREE.Shape, e.actions = i.actions, e.curves = i.curves, y.push(e), y;
    o = !THREE.Shape.Utils.isClockWise(r[0].getPoints());
    o = n ? !o : o;
    e = [];
    var f = [], v = [], u = 0, c;
    for (f[u] = void 0, v[u] = [], s = 0, l = r.length; s < l; s++)i = r[s], c = i.getPoints(), h = THREE.Shape.Utils.isClockWise(c), (h = n ? !h : h) ? (!o && f[u] && u++, f[u] = {
        s: new THREE.Shape,
        p: c
    }, f[u].s.actions = i.actions, f[u].s.curves = i.curves, o && u++, v[u] = []) : v[u].push({h: i, p: c[0]});
    if (!f[0])return p(r);
    if (1 < f.length) {
        for (s = !1, l = [], i = 0, r = f.length; i < r; i++)e[i] = [];
        for (i = 0, r = f.length; i < r; i++)for (h = v[i], o = 0; o < h.length; o++) {
            for (u = h[o], c = !0, a = 0; a < f.length; a++)w(u.p, f[a].p) && (i != a && l.push({
                froms: i,
                tos: a,
                hole: o
            }), c ? (c = !1, e[a].push(u)) : s = !0);
            c && e[i].push(u)
        }
        0 < l.length && (s || (v = e))
    }
    for (s = 0, l = f.length; s < l; s++)for (e = f[s].s, y.push(e), i = v[s], r = 0, h = i.length; r < h; r++)e.holes.push(i[r].h);
    return y
};
THREE.Shape = function () {
    THREE.Path.apply(this, arguments);
    this.holes = []
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.constructor = THREE.Shape;
THREE.Shape.prototype.extrude = function (n) {
    return new THREE.ExtrudeGeometry(this, n)
};
THREE.Shape.prototype.makeGeometry = function (n) {
    return new THREE.ShapeGeometry(this, n)
};
THREE.Shape.prototype.getPointsHoles = function (n) {
    for (var r = this.holes.length, i = [], t = 0; t < r; t++)i[t] = this.holes[t].getTransformedPoints(n, this.bends);
    return i
};
THREE.Shape.prototype.getSpacedPointsHoles = function (n) {
    for (var r = this.holes.length, i = [], t = 0; t < r; t++)i[t] = this.holes[t].getTransformedSpacedPoints(n, this.bends);
    return i
};
THREE.Shape.prototype.extractAllPoints = function (n) {
    return {shape: this.getTransformedPoints(n), holes: this.getPointsHoles(n)}
};
THREE.Shape.prototype.extractPoints = function (n) {
    return this.useSpacedPoints ? this.extractAllSpacedPoints(n) : this.extractAllPoints(n)
};
THREE.Shape.prototype.extractAllSpacedPoints = function (n) {
    return {shape: this.getTransformedSpacedPoints(n), holes: this.getSpacedPointsHoles(n)}
};
THREE.Shape.Utils = {
    triangulateShape: function (n, t) {
        function h(n, t, i) {
            return n.x != t.x ? n.x < t.x ? n.x <= i.x && i.x <= t.x : t.x <= i.x && i.x <= n.x : n.y < t.y ? n.y <= i.y && i.y <= t.y : t.y <= i.y && i.y <= n.y
        }

        function c(n, t, i, r, u) {
            var s = t.x - n.x, o = t.y - n.y, f = r.x - i.x, c = r.y - i.y, a = n.x - i.x, v = n.y - i.y, e = o * f - s * c, l = o * a - s * v;
            if (1e-10 < Math.abs(e)) {
                if (0 < e) {
                    if (0 > l || l > e)return [];
                    if (f = c * a - f * v, 0 > f || f > e)return []
                } else {
                    if (0 < l || l < e)return [];
                    if (f = c * a - f * v, 0 < f || f < e)return []
                }
                return 0 == f ? !u || 0 != l && l != e ? [n] : [] : f == e ? !u || 0 != l && l != e ? [t] : [] : 0 == l ? [i] : l == e ? [r] : (u = f / e, [{
                    x: n.x + u * s,
                    y: n.y + u * o
                }])
            }
            return 0 != l || c * a != f * v ? [] : (o = 0 == s && 0 == o, f = 0 == f && 0 == c, o && f) ? n.x != i.x || n.y != i.y ? [] : [n] : o ? h(i, r, n) ? [n] : [] : f ? h(n, t, i) ? [i] : [] : (0 != s ? (n.x < t.x ? (s = n, f = n.x, o = t, n = t.x) : (s = t, f = t.x, o = n, n = n.x), i.x < r.x ? (t = i, e = i.x, c = r, i = r.x) : (t = r, e = r.x, c = i, i = i.x)) : (n.y < t.y ? (s = n, f = n.y, o = t, n = t.y) : (s = t, f = t.y, o = n, n = n.y), i.y < r.y ? (t = i, e = i.y, c = r, i = r.y) : (t = r, e = r.y, c = i, i = i.y)), f <= e ? n < e ? [] : n == e ? u ? [] : [t] : n <= i ? [t, o] : [t, c] : f > i ? [] : f == i ? u ? [] : [s] : n <= i ? [s, o] : [s, c])
        }

        function l(n, t, i, r) {
            var u = t.x - n.x, e = t.y - n.y, f;
            return t = i.x - n.x, i = i.y - n.y, f = r.x - n.x, r = r.y - n.y, n = u * i - e * t, u = u * r - e * f, 1e-10 < Math.abs(n) ? (t = f * i - r * t, 0 < n ? 0 <= u && 0 <= t : 0 <= u || 0 <= t) : 0 < u
        }

        var i, f, r, e, u, s = {}, o;
        for (r = n.concat(), i = 0, f = t.length; i < f; i++)Array.prototype.push.apply(r, t[i]);
        for (i = 0, f = r.length; i < f; i++)u = r[i].x + ":" + r[i].y, void 0 !== s[u] && THREE.warn("THREE.Shape: Duplicate point", u), s[u] = i;
        for (i = function (n, t) {
            function k(n, t) {
                var u = i.length - 1, e = n - 1, f;
                return (0 > e && (e = u), f = n + 1, f > u && (f = 0), u = l(i[n], i[e], i[f], r[t]), !u) ? !1 : (u = r.length - 1, e = t - 1, 0 > e && (e = u), f = t + 1, f > u && (f = 0), (u = l(r[t], r[e], r[f], i[n])) ? !0 : !1)
            }

            function d(n, t) {
                for (var u, r = 0; r < i.length; r++)if (u = r + 1, u %= i.length, u = c(n, t, i[r], i[u], !0), 0 < u.length)return !0;
                return !1
            }

            function g(n, i) {
                for (var r, f, e, o = 0; o < u.length; o++)for (r = t[u[o]], f = 0; f < r.length; f++)if (e = f + 1, e %= r.length, e = c(n, i, r[f], r[e], !0), 0 < e.length)return !0;
                return !1
            }

            for (var i = n.concat(), r, u = [], e, a, o, y, w = [], v, s, b, h = 0, p, f = t.length; h < f; h++)u.push(h);
            for (v = 0, p = 2 * u.length; 0 < u.length;) {
                if (p--, 0 > p) {
                    console.log("Infinite Loop! Holes left:" + u.length + ", Probably Hole outside Shape!");
                    break
                }
                for (e = v; e < i.length; e++) {
                    for (a = i[e], f = -1, h = 0; h < u.length; h++)if (o = u[h], y = a.x + ":" + a.y + ":" + o, void 0 === w[y]) {
                        for (r = t[o], s = 0; s < r.length; s++)if (o = r[s], k(e, s) && !d(a, o) && !g(a, o)) {
                            f = s;
                            u.splice(h, 1);
                            v = i.slice(0, e + 1);
                            o = i.slice(e);
                            s = r.slice(f);
                            b = r.slice(0, f + 1);
                            i = v.concat(s).concat(b).concat(o);
                            v = e;
                            break
                        }
                        if (0 <= f)break;
                        w[y] = !0
                    }
                    if (0 <= f)break
                }
            }
            return i
        }(n, t), o = THREE.FontUtils.Triangulate(i, !1), i = 0, f = o.length; i < f; i++)for (e = o[i], r = 0; 3 > r; r++)u = e[r].x + ":" + e[r].y, u = s[u], void 0 !== u && (e[r] = u);
        return o.concat()
    }, isClockWise: function (n) {
        return 0 > THREE.FontUtils.Triangulate.area(n)
    }, b2p0: function (n, t) {
        var i = 1 - n;
        return i * i * t
    }, b2p1: function (n, t) {
        return 2 * (1 - n) * n * t
    }, b2p2: function (n, t) {
        return n * n * t
    }, b2: function (n, t, i, r) {
        return this.b2p0(n, t) + this.b2p1(n, i) + this.b2p2(n, r)
    }, b3p0: function (n, t) {
        var i = 1 - n;
        return i * i * i * t
    }, b3p1: function (n, t) {
        var i = 1 - n;
        return 3 * i * i * n * t
    }, b3p2: function (n, t) {
        return 3 * (1 - n) * n * n * t
    }, b3p3: function (n, t) {
        return n * n * n * t
    }, b3: function (n, t, i, r, u) {
        return this.b3p0(n, t) + this.b3p1(n, i) + this.b3p2(n, r) + this.b3p3(n, u)
    }
};
THREE.LineCurve = function (n, t) {
    this.v1 = n;
    this.v2 = t
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.constructor = THREE.LineCurve;
THREE.LineCurve.prototype.getPoint = function (n) {
    var t = this.v2.clone().sub(this.v1);
    return t.multiplyScalar(n).add(this.v1), t
};
THREE.LineCurve.prototype.getPointAt = function (n) {
    return this.getPoint(n)
};
THREE.LineCurve.prototype.getTangent = function () {
    return this.v2.clone().sub(this.v1).normalize()
};
THREE.QuadraticBezierCurve = function (n, t, i) {
    this.v0 = n;
    this.v1 = t;
    this.v2 = i
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve;
THREE.QuadraticBezierCurve.prototype.getPoint = function (n) {
    var t = new THREE.Vector2;
    return t.x = THREE.Shape.Utils.b2(n, this.v0.x, this.v1.x, this.v2.x), t.y = THREE.Shape.Utils.b2(n, this.v0.y, this.v1.y, this.v2.y), t
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (n) {
    var t = new THREE.Vector2;
    return t.x = THREE.Curve.Utils.tangentQuadraticBezier(n, this.v0.x, this.v1.x, this.v2.x), t.y = THREE.Curve.Utils.tangentQuadraticBezier(n, this.v0.y, this.v1.y, this.v2.y), t.normalize()
};
THREE.CubicBezierCurve = function (n, t, i, r) {
    this.v0 = n;
    this.v1 = t;
    this.v2 = i;
    this.v3 = r
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve;
THREE.CubicBezierCurve.prototype.getPoint = function (n) {
    var t;
    return t = THREE.Shape.Utils.b3(n, this.v0.x, this.v1.x, this.v2.x, this.v3.x), n = THREE.Shape.Utils.b3(n, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new THREE.Vector2(t, n)
};
THREE.CubicBezierCurve.prototype.getTangent = function (n) {
    var t;
    return t = THREE.Curve.Utils.tangentCubicBezier(n, this.v0.x, this.v1.x, this.v2.x, this.v3.x), n = THREE.Curve.Utils.tangentCubicBezier(n, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t = new THREE.Vector2(t, n), t.normalize(), t
};
THREE.SplineCurve = function (n) {
    this.points = void 0 == n ? [] : n
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint = function (n) {
    var i = this.points, t;
    n *= i.length - 1;
    t = Math.floor(n);
    n -= t;
    var r = i[0 == t ? t : t - 1], u = i[t], f = i[t > i.length - 2 ? i.length - 1 : t + 1], i = i[t > i.length - 3 ? i.length - 1 : t + 2], t = new THREE.Vector2;
    return t.x = THREE.Curve.Utils.interpolate(r.x, u.x, f.x, i.x, n), t.y = THREE.Curve.Utils.interpolate(r.y, u.y, f.y, i.y, n), t
};
THREE.EllipseCurve = function (n, t, i, r, u, f, e) {
    this.aX = n;
    this.aY = t;
    this.xRadius = i;
    this.yRadius = r;
    this.aStartAngle = u;
    this.aEndAngle = f;
    this.aClockwise = e
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve;
THREE.EllipseCurve.prototype.getPoint = function (n) {
    var t = this.aEndAngle - this.aStartAngle;
    return 0 > t && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), n = !0 === this.aClockwise ? this.aEndAngle + (1 - n) * (2 * Math.PI - t) : this.aStartAngle + n * t, t = new THREE.Vector2, t.x = this.aX + this.xRadius * Math.cos(n), t.y = this.aY + this.yRadius * Math.sin(n), t
};
THREE.ArcCurve = function (n, t, i, r, u, f) {
    THREE.EllipseCurve.call(this, n, t, i, i, r, u, f)
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve;
THREE.LineCurve3 = THREE.Curve.create(function (n, t) {
    this.v1 = n;
    this.v2 = t
}, function (n) {
    var t = new THREE.Vector3;
    return t.subVectors(this.v2, this.v1), t.multiplyScalar(n), t.add(this.v1), t
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function (n, t, i) {
    this.v0 = n;
    this.v1 = t;
    this.v2 = i
}, function (n) {
    var t = new THREE.Vector3;
    return t.x = THREE.Shape.Utils.b2(n, this.v0.x, this.v1.x, this.v2.x), t.y = THREE.Shape.Utils.b2(n, this.v0.y, this.v1.y, this.v2.y), t.z = THREE.Shape.Utils.b2(n, this.v0.z, this.v1.z, this.v2.z), t
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function (n, t, i, r) {
    this.v0 = n;
    this.v1 = t;
    this.v2 = i;
    this.v3 = r
}, function (n) {
    var t = new THREE.Vector3;
    return t.x = THREE.Shape.Utils.b3(n, this.v0.x, this.v1.x, this.v2.x, this.v3.x), t.y = THREE.Shape.Utils.b3(n, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t.z = THREE.Shape.Utils.b3(n, this.v0.z, this.v1.z, this.v2.z, this.v3.z), t
});
THREE.SplineCurve3 = THREE.Curve.create(function (n) {
    this.points = void 0 == n ? [] : n
}, function (n) {
    var i = this.points, t;
    n *= i.length - 1;
    t = Math.floor(n);
    n -= t;
    var r = i[0 == t ? t : t - 1], u = i[t], f = i[t > i.length - 2 ? i.length - 1 : t + 1], i = i[t > i.length - 3 ? i.length - 1 : t + 2], t = new THREE.Vector3;
    return t.x = THREE.Curve.Utils.interpolate(r.x, u.x, f.x, i.x, n), t.y = THREE.Curve.Utils.interpolate(r.y, u.y, f.y, i.y, n), t.z = THREE.Curve.Utils.interpolate(r.z, u.z, f.z, i.z, n), t
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function (n) {
    this.points = void 0 == n ? [] : n
}, function (n) {
    var t = this.points, i;
    n *= t.length - 0;
    i = Math.floor(n);
    n -= i;
    var i = i + (0 < i ? 0 : (Math.floor(Math.abs(i) / t.length) + 1) * t.length), r = t[(i - 1) % t.length], u = t[i % t.length], f = t[(i + 1) % t.length], t = t[(i + 2) % t.length], i = new THREE.Vector3;
    return i.x = THREE.Curve.Utils.interpolate(r.x, u.x, f.x, t.x, n), i.y = THREE.Curve.Utils.interpolate(r.y, u.y, f.y, t.y, n), i.z = THREE.Curve.Utils.interpolate(r.z, u.z, f.z, t.z, n), i
});
THREE.AnimationHandler = {
    LINEAR: 0, CATMULLROM: 1, CATMULLROM_FORWARD: 2, add: function () {
        THREE.warn("THREE.AnimationHandler.add() has been deprecated.")
    }, get: function () {
        THREE.warn("THREE.AnimationHandler.get() has been deprecated.")
    }, remove: function () {
        THREE.warn("THREE.AnimationHandler.remove() has been deprecated.")
    }, animations: [], init: function (n) {
        var i, t, u, r, f, e;
        if (!0 === n.initialized)return n;
        for (i = 0; i < n.hierarchy.length; i++) {
            for (t = 0; t < n.hierarchy[i].keys.length; t++)(0 > n.hierarchy[i].keys[t].time && (n.hierarchy[i].keys[t].time = 0), void 0 === n.hierarchy[i].keys[t].rot || n.hierarchy[i].keys[t].rot instanceof THREE.Quaternion) || (u = n.hierarchy[i].keys[t].rot, n.hierarchy[i].keys[t].rot = (new THREE.Quaternion).fromArray(u));
            if (n.hierarchy[i].keys.length && void 0 !== n.hierarchy[i].keys[0].morphTargets) {
                for (u = {}, t = 0; t < n.hierarchy[i].keys.length; t++)for (r = 0; r < n.hierarchy[i].keys[t].morphTargets.length; r++)f = n.hierarchy[i].keys[t].morphTargets[r], u[f] = -1;
                for (n.hierarchy[i].usedMorphTargets = u, t = 0; t < n.hierarchy[i].keys.length; t++) {
                    e = {};
                    for (f in u) {
                        for (r = 0; r < n.hierarchy[i].keys[t].morphTargets.length; r++)if (n.hierarchy[i].keys[t].morphTargets[r] === f) {
                            e[f] = n.hierarchy[i].keys[t].morphTargetsInfluences[r];
                            break
                        }
                        r === n.hierarchy[i].keys[t].morphTargets.length && (e[f] = 0)
                    }
                    n.hierarchy[i].keys[t].morphTargetsInfluences = e
                }
            }
            for (t = 1; t < n.hierarchy[i].keys.length; t++)n.hierarchy[i].keys[t].time === n.hierarchy[i].keys[t - 1].time && (n.hierarchy[i].keys.splice(t, 1), t--);
            for (t = 0; t < n.hierarchy[i].keys.length; t++)n.hierarchy[i].keys[t].index = t
        }
        return n.initialized = !0, n
    }, parse: function (n) {
        var r = function (n, t) {
            t.push(n);
            for (var i = 0; i < n.children.length; i++)r(n.children[i], t)
        }, i = [], t;
        if (n instanceof THREE.SkinnedMesh)for (t = 0; t < n.skeleton.bones.length; t++)i.push(n.skeleton.bones[t]); else r(n, i);
        return i
    }, play: function (n) {
        -1 === this.animations.indexOf(n) && this.animations.push(n)
    }, stop: function (n) {
        n = this.animations.indexOf(n);
        -1 !== n && this.animations.splice(n, 1)
    }, update: function (n) {
        for (var t = 0; t < this.animations.length; t++)this.animations[t].resetBlendWeights();
        for (t = 0; t < this.animations.length; t++)this.animations[t].update(n)
    }
};
THREE.Animation = function (n, t) {
    this.root = n;
    this.data = THREE.AnimationHandler.init(t);
    this.hierarchy = THREE.AnimationHandler.parse(n);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = !1;
    this.loop = !0;
    this.weight = 0;
    this.interpolationType = THREE.AnimationHandler.LINEAR
};
THREE.Animation.prototype = {
    constructor: THREE.Animation, keyTypes: ["pos", "rot", "scl"], play: function (n, t) {
        this.currentTime = void 0 !== n ? n : 0;
        this.weight = void 0 !== t ? t : 1;
        this.isPlaying = !0;
        this.reset();
        THREE.AnimationHandler.play(this)
    }, stop: function () {
        this.isPlaying = !1;
        THREE.AnimationHandler.stop(this)
    }, reset: function () {
        for (var n, t = 0, e = this.hierarchy.length; t < e; t++) {
            n = this.hierarchy[t];
            void 0 === n.animationCache && (n.animationCache = {
                animations: {},
                blending: {positionWeight: 0, quaternionWeight: 0, scaleWeight: 0}
            });
            var i = this.data.name, r = n.animationCache.animations, f = r[i];
            for (void 0 === f && (f = {
                prevKey: {pos: 0, rot: 0, scl: 0},
                nextKey: {pos: 0, rot: 0, scl: 0},
                originalMatrix: n.matrix
            }, r[i] = f), n = 0; 3 > n; n++) {
                for (var i = this.keyTypes[n], r = this.data.hierarchy[t].keys[0], u = this.getNextKeyWith(i, t, 1); u.time < this.currentTime && u.index > r.index;)r = u, u = this.getNextKeyWith(i, t, u.index + 1);
                f.prevKey[i] = r;
                f.nextKey[i] = u
            }
        }
    }, resetBlendWeights: function () {
        for (var n, t = 0, i = this.hierarchy.length; t < i; t++)n = this.hierarchy[t].animationCache, void 0 !== n && (n = n.blending, n.positionWeight = 0, n.quaternionWeight = 0, n.scaleWeight = 0)
    }, update: function () {
        var t = [], i = new THREE.Vector3, n = new THREE.Vector3, r = new THREE.Quaternion, f = function (n, t) {
            var r = [], e = [], f, i, o, s, h, c;
            return f = (n.length - 1) * t, i = Math.floor(f), f -= i, r[0] = 0 === i ? i : i - 1, r[1] = i, r[2] = i > n.length - 2 ? i : i + 1, r[3] = i > n.length - 3 ? i : i + 2, i = n[r[0]], s = n[r[1]], h = n[r[2]], c = n[r[3]], r = f * f, o = f * r, e[0] = u(i[0], s[0], h[0], c[0], f, r, o), e[1] = u(i[1], s[1], h[1], c[1], f, r, o), e[2] = u(i[2], s[2], h[2], c[2], f, r, o), e
        }, u = function (n, t, i, r, u, f, e) {
            return n = .5 * (i - n), r = .5 * (r - t), (2 * (t - i) + n + r) * e + (-3 * (t - i) - 2 * n - r) * f + n * u + t
        };
        return function (u) {
            var w;
            if (!1 !== this.isPlaying && (this.currentTime += u * this.timeScale, 0 !== this.weight)) {
                for (u = this.data.length, (this.currentTime > u || 0 > this.currentTime) && (this.loop ? (this.currentTime %= u, 0 > this.currentTime && (this.currentTime += u), this.reset()) : this.stop()), u = 0, w = this.hierarchy.length; u < w; u++)for (var a = this.hierarchy[u], y = a.animationCache.animations[this.data.name], l = a.animationCache.blending, p = 0; 3 > p; p++) {
                    var o = this.keyTypes[p], s = y.prevKey[o], h = y.nextKey[o];
                    if (0 < this.timeScale && h.time <= this.currentTime || 0 > this.timeScale && s.time >= this.currentTime) {
                        for (s = this.data.hierarchy[u].keys[0], h = this.getNextKeyWith(o, u, 1); h.time < this.currentTime && h.index > s.index;)s = h, h = this.getNextKeyWith(o, u, h.index + 1);
                        y.prevKey[o] = s;
                        y.nextKey[o] = h
                    }
                    var e = (this.currentTime - s.time) / (h.time - s.time), c = s[o], v = h[o];
                    0 > e && (e = 0);
                    1 < e && (e = 1);
                    "pos" === o ? this.interpolationType === THREE.AnimationHandler.LINEAR ? (n.x = c[0] + (v[0] - c[0]) * e, n.y = c[1] + (v[1] - c[1]) * e, n.z = c[2] + (v[2] - c[2]) * e, s = this.weight / (this.weight + l.positionWeight), a.position.lerp(n, s), l.positionWeight += this.weight) : (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) && (t[0] = this.getPrevKeyWith("pos", u, s.index - 1).pos, t[1] = c, t[2] = v, t[3] = this.getNextKeyWith("pos", u, h.index + 1).pos, e = .33 * e + .33, h = f(t, e), s = this.weight / (this.weight + l.positionWeight), l.positionWeight += this.weight, o = a.position, o.x += (h[0] - o.x) * s, o.y += (h[1] - o.y) * s, o.z += (h[2] - o.z) * s, this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (e = f(t, 1.01 * e), i.set(e[0], e[1], e[2]), i.sub(o), i.y = 0, i.normalize(), e = Math.atan2(i.x, i.z), a.rotation.set(0, e, 0))) : "rot" === o ? (THREE.Quaternion.slerp(c, v, r, e), 0 === l.quaternionWeight ? (a.quaternion.copy(r), l.quaternionWeight = this.weight) : (s = this.weight / (this.weight + l.quaternionWeight), THREE.Quaternion.slerp(a.quaternion, r, a.quaternion, s), l.quaternionWeight += this.weight)) : "scl" === o && (n.x = c[0] + (v[0] - c[0]) * e, n.y = c[1] + (v[1] - c[1]) * e, n.z = c[2] + (v[2] - c[2]) * e, s = this.weight / (this.weight + l.scaleWeight), a.scale.lerp(n, s), l.scaleWeight += this.weight)
                }
                return !0
            }
        }
    }(), getNextKeyWith: function (n, t, i) {
        var r = this.data.hierarchy[t].keys;
        for (i = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? i < r.length - 1 ? i : r.length - 1 : i % r.length; i < r.length; i++)if (void 0 !== r[i][n])return r[i];
        return this.data.hierarchy[t].keys[0]
    }, getPrevKeyWith: function (n, t, i) {
        var r = this.data.hierarchy[t].keys;
        for (i = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? 0 < i ? i : 0 : 0 <= i ? i : i + r.length; 0 <= i; i--)if (void 0 !== r[i][n])return r[i];
        return this.data.hierarchy[t].keys[r.length - 1]
    }
};
THREE.KeyFrameAnimation = function (n) {
    var e, t, r, i, u, f;
    for (this.root = n.node, this.data = THREE.AnimationHandler.init(n), this.hierarchy = THREE.AnimationHandler.parse(this.root), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.loop = this.isPaused = !0, n = 0, e = this.hierarchy.length; n < e; n++)if (t = this.data.hierarchy[n].sids, r = this.hierarchy[n], this.data.hierarchy[n].keys.length && t) {
        for (i = 0; i < t.length; i++)u = t[i], f = this.getNextKeyWith(u, n, 0), f && f.apply(u);
        r.matrixAutoUpdate = !1;
        this.data.hierarchy[n].node.updateMatrix();
        r.matrixWorldNeedsUpdate = !0
    }
};
THREE.KeyFrameAnimation.prototype = {
    constructor: THREE.KeyFrameAnimation, play: function (n) {
        if (this.currentTime = void 0 !== n ? n : 0, !1 === this.isPlaying) {
            this.isPlaying = !0;
            var r = this.hierarchy.length, t, i;
            for (n = 0; n < r; n++)t = this.hierarchy[n], i = this.data.hierarchy[n], void 0 === i.animationCache && (i.animationCache = {}, i.animationCache.prevKey = null, i.animationCache.nextKey = null, i.animationCache.originalMatrix = t.matrix), t = this.data.hierarchy[n].keys, t.length && (i.animationCache.prevKey = t[0], i.animationCache.nextKey = t[1], this.startTime = Math.min(t[0].time, this.startTime), this.endTime = Math.max(t[t.length - 1].time, this.endTime));
            this.update(0)
        }
        this.isPaused = !1;
        THREE.AnimationHandler.play(this)
    }, stop: function () {
        var n, i, t, r;
        for (this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.stop(this), n = 0; n < this.data.hierarchy.length; n++)i = this.hierarchy[n], t = this.data.hierarchy[n], void 0 !== t.animationCache && (r = t.animationCache.originalMatrix, r.copy(i.matrix), i.matrix = r, delete t.animationCache)
    }, update: function (n) {
        var u, r, t;
        if (!1 !== this.isPlaying)for (this.currentTime += n * this.timeScale, n = this.data.length, !0 === this.loop && this.currentTime > n && (this.currentTime %= n), this.currentTime = Math.min(this.currentTime, n), n = 0, u = this.hierarchy.length; n < u; n++) {
            var e = this.hierarchy[n], i = this.data.hierarchy[n], f = i.keys, i = i.animationCache;
            if (f.length) {
                if (r = i.prevKey, t = i.nextKey, t.time <= this.currentTime) {
                    for (; t.time < this.currentTime && t.index > r.index;)r = t, t = f[r.index + 1];
                    i.prevKey = r;
                    i.nextKey = t
                }
                t.time >= this.currentTime ? r.interpolate(t, this.currentTime) : r.interpolate(t, t.time);
                this.data.hierarchy[n].node.updateMatrix();
                e.matrixWorldNeedsUpdate = !0
            }
        }
    }, getNextKeyWith: function (n, t, i) {
        for (t = this.data.hierarchy[t].keys, i %= t.length; i < t.length; i++)if (t[i].hasTarget(n))return t[i];
        return t[0]
    }, getPrevKeyWith: function (n, t, i) {
        for (t = this.data.hierarchy[t].keys, i = 0 <= i ? i : i + t.length; 0 <= i; i--)if (t[i].hasTarget(n))return t[i];
        return t[t.length - 1]
    }
};
THREE.MorphAnimation = function (n) {
    this.mesh = n;
    this.frames = n.morphTargetInfluences.length;
    this.currentTime = 0;
    this.duration = 1e3;
    this.loop = !0;
    this.currentFrame = this.lastFrame = 0;
    this.isPlaying = !1
};
THREE.MorphAnimation.prototype = {
    constructor: THREE.MorphAnimation, play: function () {
        this.isPlaying = !0
    }, pause: function () {
        this.isPlaying = !1
    }, update: function (n) {
        if (!1 !== this.isPlaying) {
            this.currentTime += n;
            !0 === this.loop && this.currentTime > this.duration && (this.currentTime %= this.duration);
            this.currentTime = Math.min(this.currentTime, this.duration);
            n = this.duration / this.frames;
            var i = Math.floor(this.currentTime / n), t = this.mesh.morphTargetInfluences;
            i != this.currentFrame && (t[this.lastFrame] = 0, t[this.currentFrame] = 1, t[i] = 0, this.lastFrame = this.currentFrame, this.currentFrame = i);
            t[i] = this.currentTime % n / n;
            t[this.lastFrame] = 1 - t[i]
        }
    }
};
THREE.BoxGeometry = function (n, t, i, r, u, f) {
    function o(n, t, i, r, u, f, o, s) {
        var v, l = e.widthSegments, a = e.heightSegments, b = u / 2, h = f / 2, y = e.vertices.length, w;
        "x" === n && "y" === t || "y" === n && "x" === t ? v = "z" : "x" === n && "z" === t || "z" === n && "x" === t ? (v = "y", a = e.depthSegments) : ("z" === n && "y" === t || "y" === n && "z" === t) && (v = "x", l = e.depthSegments);
        var p = l + 1, k = a + 1, d = u / l, g = f / a, c = new THREE.Vector3;
        for (c[v] = 0 < o ? 1 : -1, u = 0; u < k; u++)for (f = 0; f < p; f++)w = new THREE.Vector3, w[n] = (f * d - b) * i, w[t] = (u * g - h) * r, w[v] = o, e.vertices.push(w);
        for (u = 0; u < a; u++)for (f = 0; f < l; f++)h = f + p * u, n = f + p * (u + 1), t = f + 1 + p * (u + 1), i = f + 1 + p * u, r = new THREE.Vector2(f / l, 1 - u / a), o = new THREE.Vector2(f / l, 1 - (u + 1) / a), v = new THREE.Vector2((f + 1) / l, 1 - (u + 1) / a), b = new THREE.Vector2((f + 1) / l, 1 - u / a), h = new THREE.Face3(h + y, n + y, i + y), h.normal.copy(c), h.vertexNormals.push(c.clone(), c.clone(), c.clone()), h.materialIndex = s, e.faces.push(h), e.faceVertexUvs[0].push([r, o, b]), h = new THREE.Face3(n + y, t + y, i + y), h.normal.copy(c), h.vertexNormals.push(c.clone(), c.clone(), c.clone()), h.materialIndex = s, e.faces.push(h), e.faceVertexUvs[0].push([o.clone(), v, b.clone()])
    }

    THREE.Geometry.call(this);
    this.type = "BoxGeometry";
    this.parameters = {width: n, height: t, depth: i, widthSegments: r, heightSegments: u, depthSegments: f};
    this.widthSegments = r || 1;
    this.heightSegments = u || 1;
    this.depthSegments = f || 1;
    var e = this;
    r = n / 2;
    u = t / 2;
    f = i / 2;
    o("z", "y", -1, -1, i, t, r, 0);
    o("z", "y", 1, -1, i, t, -r, 1);
    o("x", "z", 1, 1, n, i, u, 2);
    o("x", "z", 1, -1, n, i, -u, 3);
    o("x", "y", 1, -1, n, t, f, 4);
    o("x", "y", -1, -1, n, t, -f, 5);
    this.mergeVertices()
};
THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry;
THREE.CircleGeometry = function (n, t, i, r) {
    var u, e, o, f, s;
    for (THREE.Geometry.call(this), this.type = "CircleGeometry", this.parameters = {
        radius: n,
        segments: t,
        thetaStart: i,
        thetaLength: r
    }, n = n || 50, t = void 0 !== t ? Math.max(3, t) : 8, i = void 0 !== i ? i : 0, r = void 0 !== r ? r : 2 * Math.PI, e = [], u = new THREE.Vector3, o = new THREE.Vector2(.5, .5), this.vertices.push(u), e.push(o), u = 0; u <= t; u++)f = new THREE.Vector3, s = i + u / t * r, f.x = n * Math.cos(s), f.y = n * Math.sin(s), this.vertices.push(f), e.push(new THREE.Vector2((f.x / n + 1) / 2, (f.y / n + 1) / 2));
    for (i = new THREE.Vector3(0, 0, 1), u = 1; u <= t; u++)this.faces.push(new THREE.Face3(u, u + 1, 0, [i.clone(), i.clone(), i.clone()])), this.faceVertexUvs[0].push([e[u].clone(), e[u + 1].clone(), o.clone()]);
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3, n)
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CircleGeometry.prototype.constructor = THREE.CircleGeometry;
THREE.CubeGeometry = function (n, t, i, r, u, f) {
    return THREE.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry."), new THREE.BoxGeometry(n, t, i, r, u, f)
};
THREE.CylinderGeometry = function (n, t, i, r, u, f, e, o) {
    var a, l;
    THREE.Geometry.call(this);
    this.type = "CylinderGeometry";
    this.parameters = {
        radiusTop: n,
        radiusBottom: t,
        height: i,
        radialSegments: r,
        heightSegments: u,
        openEnded: f,
        thetaStart: e,
        thetaLength: o
    };
    n = void 0 !== n ? n : 20;
    t = void 0 !== t ? t : 20;
    i = void 0 !== i ? i : 100;
    r = r || 8;
    u = u || 1;
    f = void 0 !== f ? f : !1;
    e = void 0 !== e ? e : 0;
    o = void 0 !== o ? o : 2 * Math.PI;
    for (var tt = i / 2, s, c = [], v = [], h = 0; h <= u; h++) {
        var w = [], y = [], p = h / u, k = p * (t - n) + n;
        for (s = 0; s <= r; s++)a = s / r, l = new THREE.Vector3, l.x = k * Math.sin(a * o + e), l.y = -p * i + tt, l.z = k * Math.cos(a * o + e), this.vertices.push(l), w.push(this.vertices.length - 1), y.push(new THREE.Vector2(a, 1 - p));
        c.push(w);
        v.push(y)
    }
    for (i = (t - n) / i, s = 0; s < r; s++)for (0 !== n ? (e = this.vertices[c[0][s]].clone(), o = this.vertices[c[0][s + 1]].clone()) : (e = this.vertices[c[1][s]].clone(), o = this.vertices[c[1][s + 1]].clone()), e.setY(Math.sqrt(e.x * e.x + e.z * e.z) * i).normalize(), o.setY(Math.sqrt(o.x * o.x + o.z * o.z) * i).normalize(), h = 0; h < u; h++) {
        var w = c[h][s], y = c[h + 1][s], p = c[h + 1][s + 1], k = c[h][s + 1], a = e.clone(), l = e.clone(), d = o.clone(), it = o.clone(), g = v[h][s].clone(), b = v[h + 1][s].clone(), nt = v[h + 1][s + 1].clone(), rt = v[h][s + 1].clone();
        this.faces.push(new THREE.Face3(w, y, k, [a, l, it]));
        this.faceVertexUvs[0].push([g, b, rt]);
        this.faces.push(new THREE.Face3(y, p, k, [l.clone(), d, it.clone()]));
        this.faceVertexUvs[0].push([b.clone(), nt, rt.clone()])
    }
    if (!1 === f && 0 < n)for (this.vertices.push(new THREE.Vector3(0, tt, 0)), s = 0; s < r; s++)w = c[0][s], y = c[0][s + 1], p = this.vertices.length - 1, a = new THREE.Vector3(0, 1, 0), l = new THREE.Vector3(0, 1, 0), d = new THREE.Vector3(0, 1, 0), g = v[0][s].clone(), b = v[0][s + 1].clone(), nt = new THREE.Vector2(b.x, 0), this.faces.push(new THREE.Face3(w, y, p, [a, l, d])), this.faceVertexUvs[0].push([g, b, nt]);
    if (!1 === f && 0 < t)for (this.vertices.push(new THREE.Vector3(0, -tt, 0)), s = 0; s < r; s++)w = c[u][s + 1], y = c[u][s], p = this.vertices.length - 1, a = new THREE.Vector3(0, -1, 0), l = new THREE.Vector3(0, -1, 0), d = new THREE.Vector3(0, -1, 0), g = v[u][s + 1].clone(), b = v[u][s].clone(), nt = new THREE.Vector2(b.x, 1), this.faces.push(new THREE.Face3(w, y, p, [a, l, d])), this.faceVertexUvs[0].push([g, b, nt]);
    this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;
THREE.ExtrudeGeometry = function (n, t) {
    "undefined" != typeof n && (THREE.Geometry.call(this), this.type = "ExtrudeGeometry", n = n instanceof Array ? n : [n], this.addShapeList(n, t), this.computeFaceNormals())
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;
THREE.ExtrudeGeometry.prototype.addShapeList = function (n, t) {
    for (var r = n.length, i = 0; i < r; i++)this.addShape(n[i], t)
};
THREE.ExtrudeGeometry.prototype.addShape = function (n, t) {
    function rt(n, t, i) {
        return t || THREE.error("THREE.ExtrudeGeometry: vec does not exist"), t.clone().multiplyScalar(i).add(n)
    }

    function kt(n, t, i) {
        var r = 1, r = n.x - t.x, f = n.y - t.y, u = i.x - n.x, e = i.y - n.y, o = r * r + f * f;
        if (1e-10 < Math.abs(r * e - f * u)) {
            var s = Math.sqrt(o), h = Math.sqrt(u * u + e * e), o = t.x - f / s;
            if (t = t.y + r / s, u = ((i.x - e / h - o) * e - (i.y + u / h - t) * u) / (r * e - f * u), i = o + r * u - n.x, n = t + f * u - n.y, r = i * i + n * n, 2 >= r)return new THREE.Vector2(i, n);
            r = Math.sqrt(r / 2)
        } else n = !1, 1e-10 < r ? 1e-10 < u && (n = !0) : -1e-10 > r ? -1e-10 > u && (n = !0) : Math.sign(f) == Math.sign(e) && (n = !0), n ? (i = -f, n = r, r = Math.sqrt(o)) : (i = r, n = f, r = Math.sqrt(o / 2));
        return new THREE.Vector2(i / r, n / r)
    }

    function dt(n, t) {
        var h, e;
        for (i = n.length; 0 <= --i;) {
            h = i;
            e = i - 1;
            0 > e && (e = n.length - 1);
            for (var o = 0, c = y + 2 * nt, o = 0; o < c; o++) {
                var u = d * o, f = d * (o + 1), r = t + h + u, u = t + e + u, s = t + e + f, f = t + h + f, r = r + tt, u = u + tt, s = s + tt, f = f + tt;
                k.faces.push(new THREE.Face3(r, u, f, null, null, gt));
                k.faces.push(new THREE.Face3(u, s, f, null, null, gt));
                r = ni.generateSideWallUV(k, r, u, s, f);
                k.faceVertexUvs[0].push([r[0], r[1], r[3]]);
                k.faceVertexUvs[0].push([r[1], r[2], r[3]])
            }
        }
    }

    function w(n, t, i) {
        k.vertices.push(new THREE.Vector3(n, t, i))
    }

    function lt(n, t, i) {
        n += tt;
        t += tt;
        i += tt;
        k.faces.push(new THREE.Face3(n, t, i, null, null, ti));
        n = ni.generateTopUV(k, n, t, i);
        k.faceVertexUvs[0].push(n)
    }

    var bt = void 0 !== t.amount ? t.amount : 100, at = void 0 !== t.bevelThickness ? t.bevelThickness : 6, vt = void 0 !== t.bevelSize ? t.bevelSize : at - 2, nt = void 0 !== t.bevelSegments ? t.bevelSegments : 3, ft = void 0 !== t.bevelEnabled ? t.bevelEnabled : !0, c = void 0 !== t.curveSegments ? t.curveSegments : 12, y = void 0 !== t.steps ? t.steps : 1, a = t.extrudePath, et, yt = !1, ti = t.material, gt = t.extrudeMaterial, ni = void 0 !== t.UVGenerator ? t.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator, ot, st, ht, b, ut, p, wt, g, ct;
    a && (et = a.getSpacedPoints(y), yt = !0, ft = !1, ot = void 0 !== t.frames ? t.frames : new THREE.TubeGeometry.FrenetFrames(a, y, !1), st = new THREE.Vector3, ht = new THREE.Vector3, b = new THREE.Vector3);
    ft || (vt = at = nt = 0);
    var e, u, v, k = this, tt = this.vertices.length, a = n.extractPoints(c), c = a.shape, l = a.holes;
    if (a = !THREE.Shape.Utils.isClockWise(c)) {
        for (c = c.reverse(), u = 0, v = l.length; u < v; u++)e = l[u], THREE.Shape.Utils.isClockWise(e) && (l[u] = e.reverse());
        a = !1
    }
    for (ut = THREE.Shape.Utils.triangulateShape(c, l), p = c, u = 0, v = l.length; u < v; u++)e = l[u], c = c.concat(e);
    var s, o, r, it, f, d = c.length, h, pt = ut.length, a = [], i = 0;
    for (r = p.length, s = r - 1, o = i + 1; i < r; i++, s++, o++)s === r && (s = 0), o === r && (o = 0), a[i] = kt(p[i], p[s], p[o]);
    for (wt = [], ct = a.concat(), u = 0, v = l.length; u < v; u++) {
        for (e = l[u], g = [], i = 0, r = e.length, s = r - 1, o = i + 1; i < r; i++, s++, o++)s === r && (s = 0), o === r && (o = 0), g[i] = kt(e[i], e[s], e[o]);
        wt.push(g);
        ct = ct.concat(g)
    }
    for (s = 0; s < nt; s++) {
        for (r = s / nt, it = at * (1 - r), o = vt * Math.sin(r * Math.PI / 2), i = 0, r = p.length; i < r; i++)f = rt(p[i], a[i], o), w(f.x, f.y, -it);
        for (u = 0, v = l.length; u < v; u++)for (e = l[u], g = wt[u], i = 0, r = e.length; i < r; i++)f = rt(e[i], g[i], o), w(f.x, f.y, -it)
    }
    for (o = vt, i = 0; i < d; i++)f = ft ? rt(c[i], ct[i], o) : c[i], yt ? (ht.copy(ot.normals[0]).multiplyScalar(f.x), st.copy(ot.binormals[0]).multiplyScalar(f.y), b.copy(et[0]).add(ht).add(st), w(b.x, b.y, b.z)) : w(f.x, f.y, 0);
    for (r = 1; r <= y; r++)for (i = 0; i < d; i++)f = ft ? rt(c[i], ct[i], o) : c[i], yt ? (ht.copy(ot.normals[r]).multiplyScalar(f.x), st.copy(ot.binormals[r]).multiplyScalar(f.y), b.copy(et[r]).add(ht).add(st), w(b.x, b.y, b.z)) : w(f.x, f.y, bt / y * r);
    for (s = nt - 1; 0 <= s; s--) {
        for (r = s / nt, it = at * (1 - r), o = vt * Math.sin(r * Math.PI / 2), i = 0, r = p.length; i < r; i++)f = rt(p[i], a[i], o), w(f.x, f.y, bt + it);
        for (u = 0, v = l.length; u < v; u++)for (e = l[u], g = wt[u], i = 0, r = e.length; i < r; i++)f = rt(e[i], g[i], o), yt ? w(f.x, f.y + et[y - 1].y, et[y - 1].x + it) : w(f.x, f.y, bt + it)
    }
    (function () {
        if (ft) {
            var n;
            for (n = 0 * d, i = 0; i < pt; i++)h = ut[i], lt(h[2] + n, h[1] + n, h[0] + n);
            for (n = y + 2 * nt, n *= d, i = 0; i < pt; i++)h = ut[i], lt(h[0] + n, h[1] + n, h[2] + n)
        } else {
            for (i = 0; i < pt; i++)h = ut[i], lt(h[2], h[1], h[0]);
            for (i = 0; i < pt; i++)h = ut[i], lt(h[0] + d * y, h[1] + d * y, h[2] + d * y)
        }
    })(), function () {
        var n = 0;
        for (dt(p, n), n += p.length, u = 0, v = l.length; u < v; u++)e = l[u], dt(e, n), n += e.length
    }()
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function (n, t, i, r) {
        return n = n.vertices, t = n[t], i = n[i], r = n[r], [new THREE.Vector2(t.x, t.y), new THREE.Vector2(i.x, i.y), new THREE.Vector2(r.x, r.y)]
    }, generateSideWallUV: function (n, t, i, r, u) {
        return n = n.vertices, t = n[t], i = n[i], r = n[r], u = n[u], .01 > Math.abs(t.y - i.y) ? [new THREE.Vector2(t.x, 1 - t.z), new THREE.Vector2(i.x, 1 - i.z), new THREE.Vector2(r.x, 1 - r.z), new THREE.Vector2(u.x, 1 - u.z)] : [new THREE.Vector2(t.y, 1 - t.z), new THREE.Vector2(i.y, 1 - i.z), new THREE.Vector2(r.y, 1 - r.z), new THREE.Vector2(u.y, 1 - u.z)]
    }
};
THREE.ShapeGeometry = function (n, t) {
    THREE.Geometry.call(this);
    this.type = "ShapeGeometry";
    !1 == n instanceof Array && (n = [n]);
    this.addShapeList(n, t);
    this.computeFaceNormals()
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.constructor = THREE.ShapeGeometry;
THREE.ShapeGeometry.prototype.addShapeList = function (n, t) {
    for (var i = 0, r = n.length; i < r; i++)this.addShape(n[i], t);
    return this
};
THREE.ShapeGeometry.prototype.addShape = function (n, t) {
    var u, r, s;
    void 0 === t && (t = {});
    var h = t.material, c = void 0 === t.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : t.UVGenerator, i, e, f, o = this.vertices.length;
    if (i = n.extractPoints(void 0 !== t.curveSegments ? t.curveSegments : 12), u = i.shape, r = i.holes, !THREE.Shape.Utils.isClockWise(u))for (u = u.reverse(), i = 0, e = r.length; i < e; i++)f = r[i], THREE.Shape.Utils.isClockWise(f) && (r[i] = f.reverse());
    for (s = THREE.Shape.Utils.triangulateShape(u, r), i = 0, e = r.length; i < e; i++)f = r[i], u = u.concat(f);
    for (r = u.length, e = s.length, i = 0; i < r; i++)f = u[i], this.vertices.push(new THREE.Vector3(f.x, f.y, 0));
    for (i = 0; i < e; i++)r = s[i], u = r[0] + o, f = r[1] + o, r = r[2] + o, this.faces.push(new THREE.Face3(u, f, r, null, null, h)), this.faceVertexUvs[0].push(c.generateTopUV(this, u, f, r))
};
THREE.LatheGeometry = function (n, t, i, r) {
    var f, e;
    THREE.Geometry.call(this);
    this.type = "LatheGeometry";
    this.parameters = {points: n, segments: t, phiStart: i, phiLength: r};
    t = t || 12;
    i = i || 0;
    r = r || 2 * Math.PI;
    for (var p = 1 / (n.length - 1), c = 1 / t, s = 0, l = t; s <= l; s++)for (var u = i + s * c * r, h = Math.cos(u), o = Math.sin(u), u = 0, a = n.length; u < a; u++)f = n[u], e = new THREE.Vector3, e.x = h * f.x - o * f.y, e.y = o * f.x + h * f.y, e.z = f.z, this.vertices.push(e);
    for (i = n.length, s = 0, l = t; s < l; s++)for (u = 0, a = n.length - 1; u < a; u++) {
        t = o = u + i * s;
        r = o + i;
        var h = o + 1 + i, o = o + 1, f = s * c, e = u * p, v = f + c, y = e + p;
        this.faces.push(new THREE.Face3(t, r, o));
        this.faceVertexUvs[0].push([new THREE.Vector2(f, e), new THREE.Vector2(v, e), new THREE.Vector2(f, y)]);
        this.faces.push(new THREE.Face3(r, h, o));
        this.faceVertexUvs[0].push([new THREE.Vector2(v, e), new THREE.Vector2(v, y), new THREE.Vector2(f, y)])
    }
    this.mergeVertices();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry;
THREE.PlaneGeometry = function (n, t, i, r) {
    console.info("THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint.");
    THREE.Geometry.call(this);
    this.type = "PlaneGeometry";
    this.parameters = {width: n, height: t, widthSegments: i, heightSegments: r};
    this.fromBufferGeometry(new THREE.PlaneBufferGeometry(n, t, i, r))
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;
THREE.PlaneBufferGeometry = function (n, t, i, r) {
    var o, c, y, f;
    THREE.BufferGeometry.call(this);
    this.type = "PlaneBufferGeometry";
    this.parameters = {width: n, height: t, widthSegments: i, heightSegments: r};
    o = n / 2;
    c = t / 2;
    i = i || 1;
    r = r || 1;
    var s = i + 1, h = r + 1, l = n / i, p = t / r;
    t = new Float32Array(s * h * 3);
    n = new Float32Array(s * h * 3);
    for (var a = new Float32Array(s * h * 2), u = 0, v = 0, e = 0; e < h; e++)for (y = e * p - c, f = 0; f < s; f++)t[u] = f * l - o, t[u + 1] = -y, n[u + 2] = 1, a[v] = f / i, a[v + 1] = 1 - e / r, u += 3, v += 2;
    for (u = 0, o = new (65535 < t.length / 3 ? Uint32Array : Uint16Array)(i * r * 6), e = 0; e < r; e++)for (f = 0; f < i; f++)c = f + s * (e + 1), h = f + 1 + s * (e + 1), l = f + 1 + s * e, o[u] = f + s * e, o[u + 1] = c, o[u + 2] = l, o[u + 3] = c, o[u + 4] = h, o[u + 5] = l, u += 6;
    this.addAttribute("index", new THREE.BufferAttribute(o, 1));
    this.addAttribute("position", new THREE.BufferAttribute(t, 3));
    this.addAttribute("normal", new THREE.BufferAttribute(n, 3));
    this.addAttribute("uv", new THREE.BufferAttribute(a, 2))
};
THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry;
THREE.RingGeometry = function (n, t, i, r, u, f) {
    var e, o;
    THREE.Geometry.call(this);
    this.type = "RingGeometry";
    this.parameters = {innerRadius: n, outerRadius: t, thetaSegments: i, phiSegments: r, thetaStart: u, thetaLength: f};
    n = n || 0;
    t = t || 50;
    u = void 0 !== u ? u : 0;
    f = void 0 !== f ? f : 2 * Math.PI;
    i = void 0 !== i ? Math.max(3, i) : 8;
    r = void 0 !== r ? Math.max(1, r) : 8;
    var s, h = [], l = n, c = (t - n) / r;
    for (n = 0; n < r + 1; n++) {
        for (s = 0; s < i + 1; s++)e = new THREE.Vector3, o = u + s / i * f, e.x = l * Math.cos(o), e.y = l * Math.sin(o), this.vertices.push(e), h.push(new THREE.Vector2((e.x / t + 1) / 2, (e.y / t + 1) / 2));
        l += c
    }
    for (t = new THREE.Vector3(0, 0, 1), n = 0; n < r; n++)for (u = n * (i + 1), s = 0; s < i; s++)f = o = s + u, c = o + i + 1, e = o + i + 2, this.faces.push(new THREE.Face3(f, c, e, [t.clone(), t.clone(), t.clone()])), this.faceVertexUvs[0].push([h[f].clone(), h[c].clone(), h[e].clone()]), f = o, c = o + i + 2, e = o + 1, this.faces.push(new THREE.Face3(f, c, e, [t.clone(), t.clone(), t.clone()])), this.faceVertexUvs[0].push([h[f].clone(), h[c].clone(), h[e].clone()]);
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3, l)
};
THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.RingGeometry.prototype.constructor = THREE.RingGeometry;
THREE.SphereGeometry = function (n, t, i, r, u, f, e) {
    var o, s, y, p, l, a;
    for (THREE.Geometry.call(this), this.type = "SphereGeometry", this.parameters = {
        radius: n,
        widthSegments: t,
        heightSegments: i,
        phiStart: r,
        phiLength: u,
        thetaStart: f,
        thetaLength: e
    }, n = n || 50, t = Math.max(3, Math.floor(t) || 8), i = Math.max(2, Math.floor(i) || 6), r = void 0 !== r ? r : 0, u = void 0 !== u ? u : 2 * Math.PI, f = void 0 !== f ? f : 0, e = void 0 !== e ? e : Math.PI, y = [], p = [], s = 0; s <= i; s++) {
        for (l = [], a = [], o = 0; o <= t; o++) {
            var v = o / t, c = s / i, h = new THREE.Vector3;
            h.x = -n * Math.cos(r + v * u) * Math.sin(f + c * e);
            h.y = n * Math.cos(f + c * e);
            h.z = n * Math.sin(r + v * u) * Math.sin(f + c * e);
            this.vertices.push(h);
            l.push(this.vertices.length - 1);
            a.push(new THREE.Vector2(v, 1 - c))
        }
        y.push(l);
        p.push(a)
    }
    for (s = 0; s < i; s++)for (o = 0; o < t; o++) {
        r = y[s][o + 1];
        u = y[s][o];
        f = y[s + 1][o];
        e = y[s + 1][o + 1];
        var l = this.vertices[r].clone().normalize(), a = this.vertices[u].clone().normalize(), v = this.vertices[f].clone().normalize(), c = this.vertices[e].clone().normalize(), h = p[s][o + 1].clone(), b = p[s][o].clone(), w = p[s + 1][o].clone(), k = p[s + 1][o + 1].clone();
        Math.abs(this.vertices[r].y) === n ? (h.x = (h.x + b.x) / 2, this.faces.push(new THREE.Face3(r, f, e, [l, v, c])), this.faceVertexUvs[0].push([h, w, k])) : Math.abs(this.vertices[f].y) === n ? (w.x = (w.x + k.x) / 2, this.faces.push(new THREE.Face3(r, u, f, [l, a, v])), this.faceVertexUvs[0].push([h, b, w])) : (this.faces.push(new THREE.Face3(r, u, e, [l, a, c])), this.faceVertexUvs[0].push([h, b, k]), this.faces.push(new THREE.Face3(u, f, e, [a.clone(), v, c.clone()])), this.faceVertexUvs[0].push([b.clone(), w, k.clone()]))
    }
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3, n)
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;
THREE.TextGeometry = function (n, t) {
    t = t || {};
    var i = THREE.FontUtils.generateShapes(n, t);
    t.amount = void 0 !== t.height ? t.height : 50;
    void 0 === t.bevelThickness && (t.bevelThickness = 10);
    void 0 === t.bevelSize && (t.bevelSize = 8);
    void 0 === t.bevelEnabled && (t.bevelEnabled = !1);
    THREE.ExtrudeGeometry.call(this, i, t);
    this.type = "TextGeometry"
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;
THREE.TorusGeometry = function (n, t, i, r, u) {
    var f, s, a, l;
    THREE.Geometry.call(this);
    this.type = "TorusGeometry";
    this.parameters = {radius: n, tube: t, radialSegments: i, tubularSegments: r, arc: u};
    n = n || 100;
    t = t || 40;
    i = i || 8;
    r = r || 6;
    u = u || 2 * Math.PI;
    for (var o = new THREE.Vector3, h = [], c = [], e = 0; e <= i; e++)for (f = 0; f <= r; f++)s = f / r * u, a = e / i * Math.PI * 2, o.x = n * Math.cos(s), o.y = n * Math.sin(s), l = new THREE.Vector3, l.x = (n + t * Math.cos(a)) * Math.cos(s), l.y = (n + t * Math.cos(a)) * Math.sin(s), l.z = t * Math.sin(a), this.vertices.push(l), h.push(new THREE.Vector2(f / r, e / i)), c.push(l.clone().sub(o).normalize());
    for (e = 1; e <= i; e++)for (f = 1; f <= r; f++)n = (r + 1) * e + f - 1, t = (r + 1) * (e - 1) + f - 1, u = (r + 1) * (e - 1) + f, o = (r + 1) * e + f, s = new THREE.Face3(n, t, o, [c[n].clone(), c[t].clone(), c[o].clone()]), this.faces.push(s), this.faceVertexUvs[0].push([h[n].clone(), h[t].clone(), h[o].clone()]), s = new THREE.Face3(t, u, o, [c[t].clone(), c[u].clone(), c[o].clone()]), this.faces.push(s), this.faceVertexUvs[0].push([h[t].clone(), h[u].clone(), h[o].clone()]);
    this.computeFaceNormals()
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry;
THREE.TorusKnotGeometry = function (n, t, i, r, u, f, e) {
    function b(n, t, i, r, u) {
        var e = Math.cos(n), f = Math.sin(n);
        return n *= t / i, t = Math.cos(n), e *= r * (2 + t) * .5, f = r * (2 + t) * f * .5, r = u * r * Math.sin(n) * .5, new THREE.Vector3(e, f, r)
    }

    THREE.Geometry.call(this);
    this.type = "TorusKnotGeometry";
    this.parameters = {radius: n, tube: t, radialSegments: i, tubularSegments: r, p: u, q: f, heightScale: e};
    n = n || 100;
    t = t || 40;
    i = i || 64;
    r = r || 8;
    u = u || 2;
    f = f || 3;
    e = e || 1;
    for (var l = Array(i), a = new THREE.Vector3, h = new THREE.Vector3, c = new THREE.Vector3, s = 0; s < i; ++s) {
        l[s] = Array(r);
        var o = s / i * 2 * u * Math.PI, y = b(o, f, u, n, e), o = b(o + .01, f, u, n, e);
        for (a.subVectors(o, y), h.addVectors(o, y), c.crossVectors(a, h), h.crossVectors(c, a), c.normalize(), h.normalize(), o = 0; o < r; ++o) {
            var v = o / r * 2 * Math.PI, w = -t * Math.cos(v), v = t * Math.sin(v), p = new THREE.Vector3;
            p.x = y.x + w * h.x + v * c.x;
            p.y = y.y + w * h.y + v * c.y;
            p.z = y.z + w * h.z + v * c.z;
            l[s][o] = this.vertices.push(p) - 1
        }
    }
    for (s = 0; s < i; ++s)for (o = 0; o < r; ++o)u = (s + 1) % i, f = (o + 1) % r, n = l[s][o], t = l[u][o], u = l[u][f], f = l[s][f], e = new THREE.Vector2(s / i, o / r), a = new THREE.Vector2((s + 1) / i, o / r), h = new THREE.Vector2((s + 1) / i, (o + 1) / r), c = new THREE.Vector2(s / i, (o + 1) / r), this.faces.push(new THREE.Face3(n, t, f)), this.faceVertexUvs[0].push([e, a, c]), this.faces.push(new THREE.Face3(t, u, f)), this.faceVertexUvs[0].push([a.clone(), h, c.clone()]);
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry;
THREE.TubeGeometry = function (n, t, i, r, u, f) {
    THREE.Geometry.call(this);
    this.type = "TubeGeometry";
    this.parameters = {path: n, segments: t, radius: i, radialSegments: r, closed: u};
    t = t || 64;
    i = i || 1;
    r = r || 8;
    u = u || !1;
    f = f || THREE.TubeGeometry.NoTaper;
    var a = [], c, p, h = t + 1, o, l, b, w, k, s = new THREE.Vector3, e, v, y;
    for (e = new THREE.TubeGeometry.FrenetFrames(n, t, u), v = e.normals, y = e.binormals, this.tangents = e.tangents, this.normals = v, this.binormals = y, e = 0; e < h; e++)for (a[e] = [], o = e / (h - 1), k = n.getPointAt(o), c = v[e], p = y[e], b = i * f(o), o = 0; o < r; o++)l = o / r * 2 * Math.PI, w = -b * Math.cos(l), l = b * Math.sin(l), s.copy(k), s.x += w * c.x + l * p.x, s.y += w * c.y + l * p.y, s.z += w * c.z + l * p.z, a[e][o] = this.vertices.push(new THREE.Vector3(s.x, s.y, s.z)) - 1;
    for (e = 0; e < t; e++)for (o = 0; o < r; o++)f = u ? (e + 1) % t : e + 1, h = (o + 1) % r, n = a[e][o], i = a[f][o], f = a[f][h], h = a[e][h], s = new THREE.Vector2(e / t, o / r), v = new THREE.Vector2((e + 1) / t, o / r), y = new THREE.Vector2((e + 1) / t, (o + 1) / r), c = new THREE.Vector2(e / t, (o + 1) / r), this.faces.push(new THREE.Face3(n, i, h)), this.faceVertexUvs[0].push([s, v, c]), this.faces.push(new THREE.Face3(i, f, h)), this.faceVertexUvs[0].push([v.clone(), y, c.clone()]);
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry;
THREE.TubeGeometry.NoTaper = function () {
    return 1
};
THREE.TubeGeometry.SinusoidalTaper = function (n) {
    return Math.sin(Math.PI * n)
};
THREE.TubeGeometry.FrenetFrames = function (n, t, i) {
    var e = new THREE.Vector3, u = [], f = [], o = [], s = new THREE.Vector3, c = new THREE.Matrix4, r, h, l;
    for (t += 1, this.tangents = u, this.normals = f, this.binormals = o, r = 0; r < t; r++)h = r / (t - 1), u[r] = n.getTangentAt(h), u[r].normalize();
    for (f[0] = new THREE.Vector3, o[0] = new THREE.Vector3, n = Number.MAX_VALUE, r = Math.abs(u[0].x), h = Math.abs(u[0].y), l = Math.abs(u[0].z), r <= n && (n = r, e.set(1, 0, 0)), h <= n && (n = h, e.set(0, 1, 0)), l <= n && e.set(0, 0, 1), s.crossVectors(u[0], e).normalize(), f[0].crossVectors(u[0], s), o[0].crossVectors(u[0], f[0]), r = 1; r < t; r++)f[r] = f[r - 1].clone(), o[r] = o[r - 1].clone(), s.crossVectors(u[r - 1], u[r]), .0001 < s.length() && (s.normalize(), e = Math.acos(THREE.Math.clamp(u[r - 1].dot(u[r]), -1, 1)), f[r].applyMatrix4(c.makeRotationAxis(s, e))), o[r].crossVectors(u[r], f[r]);
    if (i)for (e = Math.acos(THREE.Math.clamp(f[0].dot(f[t - 1]), -1, 1)), e /= t - 1, 0 < u[0].dot(s.crossVectors(f[0], f[t - 1])) && (e = -e), r = 1; r < t; r++)f[r].applyMatrix4(c.makeRotationAxis(u[r], e * r)), o[r].crossVectors(u[r], f[r])
};
THREE.PolyhedronGeometry = function (n, t, i, r) {
    function e(n) {
        var t = n.normalize().clone(), i;
        return t.index = s.vertices.push(t) - 1, i = Math.atan2(n.z, -n.x) / 2 / Math.PI + .5, n = Math.atan2(-n.y, Math.sqrt(n.x * n.x + n.z * n.z)) / Math.PI + .5, t.uv = new THREE.Vector2(i, 1 - n), t
    }

    function v(n, t, i) {
        var r = new THREE.Face3(n.index, t.index, i.index, [n.clone(), t.clone(), i.clone()]);
        s.faces.push(r);
        a.copy(n).add(t).add(i).divideScalar(3);
        r = Math.atan2(a.z, -a.x);
        s.faceVertexUvs[0].push([l(n.uv, n, r), l(t.uv, t, r), l(i.uv, i, r)])
    }

    function w(n, t) {
        for (var o = Math.pow(2, t), u = e(s.vertices[n.a]), a = e(s.vertices[n.b]), h = e(s.vertices[n.c]), f = [], i = 0; i <= o; i++) {
            f[i] = [];
            for (var c = e(u.clone().lerp(h, i / o)), y = e(a.clone().lerp(h, i / o)), l = o - i, r = 0; r <= l; r++)f[i][r] = 0 == r && i == o ? c : e(c.clone().lerp(y, r / l))
        }
        for (i = 0; i < o; i++)for (r = 0; r < 2 * (o - i) - 1; r++)u = Math.floor(r / 2), 0 == r % 2 ? v(f[i][u + 1], f[i + 1][u], f[i][u]) : v(f[i][u + 1], f[i + 1][u + 1], f[i + 1][u])
    }

    function l(n, t, i) {
        return 0 > i && 1 === n.x && (n = new THREE.Vector2(n.x - 1, n.y)), 0 === t.x && 0 === t.z && (n = new THREE.Vector2(i / 2 / Math.PI + .5, n.y)), n.clone()
    }

    THREE.Geometry.call(this);
    this.type = "PolyhedronGeometry";
    this.parameters = {vertices: n, indices: t, radius: i, detail: r};
    i = i || 1;
    r = r || 0;
    for (var s = this, u = 0, f = n.length; u < f; u += 3)e(new THREE.Vector3(n[u], n[u + 1], n[u + 2]));
    n = this.vertices;
    for (var o = [], h = u = 0, f = t.length; u < f; u += 3, h++) {
        var c = n[t[u]], y = n[t[u + 1]], p = n[t[u + 2]];
        o[h] = new THREE.Face3(c.index, y.index, p.index, [c.clone(), y.clone(), p.clone()])
    }
    for (var a = new THREE.Vector3, u = 0, f = o.length; u < f; u++)w(o[u], r);
    for (u = 0, f = this.faceVertexUvs[0].length; u < f; u++)t = this.faceVertexUvs[0][u], r = t[0].x, n = t[1].x, o = t[2].x, h = Math.max(r, Math.max(n, o)), c = Math.min(r, Math.min(n, o)), .9 < h && .1 > c && (.2 > r && (t[0].x += 1), .2 > n && (t[1].x += 1), .2 > o && (t[2].x += 1));
    for (u = 0, f = this.vertices.length; u < f; u++)this.vertices[u].multiplyScalar(i);
    this.mergeVertices();
    this.computeFaceNormals();
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3, i)
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry;
THREE.DodecahedronGeometry = function (n, t) {
    this.parameters = {radius: n, detail: t};
    var i = (1 + Math.sqrt(5)) / 2, r = 1 / i;
    THREE.PolyhedronGeometry.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -r, -i, 0, -r, i, 0, r, -i, 0, r, i, -r, -i, 0, -r, i, 0, r, -i, 0, r, i, 0, -i, 0, -r, i, 0, -r, -i, 0, r, i, 0, r], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], n, t)
};
THREE.DodecahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.DodecahedronGeometry.prototype.constructor = THREE.DodecahedronGeometry;
THREE.IcosahedronGeometry = function (n, t) {
    var i = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(this, [-1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, 0, 0, -1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, i, 0, -1, i, 0, 1, -i, 0, -1, -i, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], n, t);
    this.type = "IcosahedronGeometry";
    this.parameters = {radius: n, detail: t}
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;
THREE.OctahedronGeometry = function (n, t) {
    this.parameters = {radius: n, detail: t};
    THREE.PolyhedronGeometry.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], n, t);
    this.type = "OctahedronGeometry";
    this.parameters = {radius: n, detail: t}
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry;
THREE.TetrahedronGeometry = function (n, t) {
    THREE.PolyhedronGeometry.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], n, t);
    this.type = "TetrahedronGeometry";
    this.parameters = {radius: n, detail: t}
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry;
THREE.ParametricGeometry = function (n, t, i) {
    var v, h, y, c;
    THREE.Geometry.call(this);
    this.type = "ParametricGeometry";
    this.parameters = {func: n, slices: t, stacks: i};
    for (var e = this.vertices, l = this.faces, a = this.faceVertexUvs[0], u, f, o, s = t + 1, r = 0; r <= i; r++)for (o = r / i, u = 0; u <= t; u++)f = u / t, f = n(f, o), e.push(f);
    for (r = 0; r < i; r++)for (u = 0; u < t; u++)n = r * s + u, e = r * s + u + 1, o = (r + 1) * s + u + 1, f = (r + 1) * s + u, v = new THREE.Vector2(u / t, r / i), h = new THREE.Vector2((u + 1) / t, r / i), y = new THREE.Vector2((u + 1) / t, (r + 1) / i), c = new THREE.Vector2(u / t, (r + 1) / i), l.push(new THREE.Face3(n, e, f)), a.push([v, h, c]), l.push(new THREE.Face3(e, o, f)), a.push([h.clone(), y, c.clone()]);
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry;
THREE.AxisHelper = function (n) {
    n = n || 1;
    var t = new Float32Array([0, 0, 0, n, 0, 0, 0, 0, 0, 0, n, 0, 0, 0, 0, 0, 0, n]), i = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]);
    n = new THREE.BufferGeometry;
    n.addAttribute("position", new THREE.BufferAttribute(t, 3));
    n.addAttribute("color", new THREE.BufferAttribute(i, 3));
    t = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});
    THREE.Line.call(this, n, t, THREE.LinePieces)
};
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype);
THREE.AxisHelper.prototype.constructor = THREE.AxisHelper;
THREE.ArrowHelper = function () {
    var t = new THREE.Geometry, n;
    return t.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)), n = new THREE.CylinderGeometry(0, .5, 1, 5, 1), n.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)), function (i, r, u, f, e, o) {
        THREE.Object3D.call(this);
        void 0 === f && (f = 16776960);
        void 0 === u && (u = 1);
        void 0 === e && (e = .2 * u);
        void 0 === o && (o = .2 * e);
        this.position.copy(r);
        this.line = new THREE.Line(t, new THREE.LineBasicMaterial({color: f}));
        this.line.matrixAutoUpdate = !1;
        this.add(this.line);
        this.cone = new THREE.Mesh(n, new THREE.MeshBasicMaterial({color: f}));
        this.cone.matrixAutoUpdate = !1;
        this.add(this.cone);
        this.setDirection(i);
        this.setLength(u, e, o)
    }
}();
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper;
THREE.ArrowHelper.prototype.setDirection = function () {
    var n = new THREE.Vector3, t;
    return function (i) {
        .99999 < i.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > i.y ? this.quaternion.set(1, 0, 0, 0) : (n.set(i.z, 0, -i.x).normalize(), t = Math.acos(i.y), this.quaternion.setFromAxisAngle(n, t))
    }
}();
THREE.ArrowHelper.prototype.setLength = function (n, t, i) {
    void 0 === t && (t = .2 * n);
    void 0 === i && (i = .2 * t);
    this.line.scale.set(1, n - t, 1);
    this.line.updateMatrix();
    this.cone.scale.set(i, t, i);
    this.cone.position.y = n;
    this.cone.updateMatrix()
};
THREE.ArrowHelper.prototype.setColor = function (n) {
    this.line.material.color.set(n);
    this.cone.material.color.set(n)
};
THREE.BoxHelper = function (n) {
    var t = new THREE.BufferGeometry;
    t.addAttribute("position", new THREE.BufferAttribute(new Float32Array(72), 3));
    THREE.Line.call(this, t, new THREE.LineBasicMaterial({color: 16776960}), THREE.LinePieces);
    void 0 !== n && this.update(n)
};
THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype);
THREE.BoxHelper.prototype.constructor = THREE.BoxHelper;
THREE.BoxHelper.prototype.update = function (n) {
    var i = n.geometry;
    null === i.boundingBox && i.computeBoundingBox();
    var r = i.boundingBox.min, i = i.boundingBox.max, t = this.geometry.attributes.position.array;
    t[0] = i.x;
    t[1] = i.y;
    t[2] = i.z;
    t[3] = r.x;
    t[4] = i.y;
    t[5] = i.z;
    t[6] = r.x;
    t[7] = i.y;
    t[8] = i.z;
    t[9] = r.x;
    t[10] = r.y;
    t[11] = i.z;
    t[12] = r.x;
    t[13] = r.y;
    t[14] = i.z;
    t[15] = i.x;
    t[16] = r.y;
    t[17] = i.z;
    t[18] = i.x;
    t[19] = r.y;
    t[20] = i.z;
    t[21] = i.x;
    t[22] = i.y;
    t[23] = i.z;
    t[24] = i.x;
    t[25] = i.y;
    t[26] = r.z;
    t[27] = r.x;
    t[28] = i.y;
    t[29] = r.z;
    t[30] = r.x;
    t[31] = i.y;
    t[32] = r.z;
    t[33] = r.x;
    t[34] = r.y;
    t[35] = r.z;
    t[36] = r.x;
    t[37] = r.y;
    t[38] = r.z;
    t[39] = i.x;
    t[40] = r.y;
    t[41] = r.z;
    t[42] = i.x;
    t[43] = r.y;
    t[44] = r.z;
    t[45] = i.x;
    t[46] = i.y;
    t[47] = r.z;
    t[48] = i.x;
    t[49] = i.y;
    t[50] = i.z;
    t[51] = i.x;
    t[52] = i.y;
    t[53] = r.z;
    t[54] = r.x;
    t[55] = i.y;
    t[56] = i.z;
    t[57] = r.x;
    t[58] = i.y;
    t[59] = r.z;
    t[60] = r.x;
    t[61] = r.y;
    t[62] = i.z;
    t[63] = r.x;
    t[64] = r.y;
    t[65] = r.z;
    t[66] = i.x;
    t[67] = r.y;
    t[68] = i.z;
    t[69] = i.x;
    t[70] = r.y;
    t[71] = r.z;
    this.geometry.attributes.position.needsUpdate = !0;
    this.geometry.computeBoundingSphere();
    this.matrix = n.matrixWorld;
    this.matrixAutoUpdate = !1
};
THREE.BoundingBoxHelper = function (n, t) {
    var i = void 0 !== t ? t : 8947848;
    this.object = n;
    this.box = new THREE.Box3;
    THREE.Mesh.call(this, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: i, wireframe: !0}))
};
THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.BoundingBoxHelper.prototype.constructor = THREE.BoundingBoxHelper;
THREE.BoundingBoxHelper.prototype.update = function () {
    this.box.setFromObject(this.object);
    this.box.size(this.scale);
    this.box.center(this.position)
};
THREE.CameraHelper = function (n) {
    function t(n, t, i) {
        u(n, i);
        u(t, i)
    }

    function u(n, t) {
        i.vertices.push(new THREE.Vector3);
        i.colors.push(new THREE.Color(t));
        void 0 === r[n] && (r[n] = []);
        r[n].push(i.vertices.length - 1)
    }

    var i = new THREE.Geometry, f = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    }), r = {};
    t("n1", "n2", 16755200);
    t("n2", "n4", 16755200);
    t("n4", "n3", 16755200);
    t("n3", "n1", 16755200);
    t("f1", "f2", 16755200);
    t("f2", "f4", 16755200);
    t("f4", "f3", 16755200);
    t("f3", "f1", 16755200);
    t("n1", "f1", 16755200);
    t("n2", "f2", 16755200);
    t("n3", "f3", 16755200);
    t("n4", "f4", 16755200);
    t("p", "n1", 16711680);
    t("p", "n2", 16711680);
    t("p", "n3", 16711680);
    t("p", "n4", 16711680);
    t("u1", "u2", 43775);
    t("u2", "u3", 43775);
    t("u3", "u1", 43775);
    t("c", "t", 16777215);
    t("p", "c", 3355443);
    t("cn1", "cn2", 3355443);
    t("cn3", "cn4", 3355443);
    t("cf1", "cf2", 3355443);
    t("cf3", "cf4", 3355443);
    THREE.Line.call(this, i, f, THREE.LinePieces);
    this.camera = n;
    this.matrix = n.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.pointMap = r;
    this.update()
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.constructor = THREE.CameraHelper;
THREE.CameraHelper.prototype.update = function () {
    var t, i, r = new THREE.Vector3, u = new THREE.Camera, n = function (n, f, e, o) {
        if (r.set(f, e, o).unproject(u), n = i[n], void 0 !== n)for (f = 0, e = n.length; f < e; f++)t.vertices[n[f]].copy(r)
    };
    return function () {
        t = this.geometry;
        i = this.pointMap;
        u.projectionMatrix.copy(this.camera.projectionMatrix);
        n("c", 0, 0, -1);
        n("t", 0, 0, 1);
        n("n1", -1, -1, -1);
        n("n2", 1, -1, -1);
        n("n3", -1, 1, -1);
        n("n4", 1, 1, -1);
        n("f1", -1, -1, 1);
        n("f2", 1, -1, 1);
        n("f3", -1, 1, 1);
        n("f4", 1, 1, 1);
        n("u1", .7, 1.1, -1);
        n("u2", -.7, 1.1, -1);
        n("u3", 0, 2, -1);
        n("cf1", -1, 0, 1);
        n("cf2", 1, 0, 1);
        n("cf3", 0, -1, 1);
        n("cf4", 0, 1, 1);
        n("cn1", -1, 0, -1);
        n("cn2", 1, 0, -1);
        n("cn3", 0, -1, -1);
        n("cn4", 0, 1, -1);
        t.verticesNeedUpdate = !0
    }
}();
THREE.DirectionalLightHelper = function (n, t) {
    var i, r;
    THREE.Object3D.call(this);
    this.light = n;
    this.light.updateMatrixWorld();
    this.matrix = n.matrixWorld;
    this.matrixAutoUpdate = !1;
    t = t || 1;
    i = new THREE.Geometry;
    i.vertices.push(new THREE.Vector3(-t, t, 0), new THREE.Vector3(t, t, 0), new THREE.Vector3(t, -t, 0), new THREE.Vector3(-t, -t, 0), new THREE.Vector3(-t, t, 0));
    r = new THREE.LineBasicMaterial({fog: !1});
    r.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    this.lightPlane = new THREE.Line(i, r);
    this.add(this.lightPlane);
    i = new THREE.Geometry;
    i.vertices.push(new THREE.Vector3, new THREE.Vector3);
    r = new THREE.LineBasicMaterial({fog: !1});
    r.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    this.targetLine = new THREE.Line(i, r);
    this.add(this.targetLine);
    this.update()
};
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper;
THREE.DirectionalLightHelper.prototype.dispose = function () {
    this.lightPlane.geometry.dispose();
    this.lightPlane.material.dispose();
    this.targetLine.geometry.dispose();
    this.targetLine.material.dispose()
};
THREE.DirectionalLightHelper.prototype.update = function () {
    var t = new THREE.Vector3, i = new THREE.Vector3, n = new THREE.Vector3;
    return function () {
        t.setFromMatrixPosition(this.light.matrixWorld);
        i.setFromMatrixPosition(this.light.target.matrixWorld);
        n.subVectors(i, t);
        this.lightPlane.lookAt(n);
        this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
        this.targetLine.geometry.vertices[1].copy(n);
        this.targetLine.geometry.verticesNeedUpdate = !0;
        this.targetLine.material.color.copy(this.lightPlane.material.color)
    }
}();
THREE.EdgesHelper = function (n, t, i) {
    var a, v, l, s;
    t = void 0 !== t ? t : 16777215;
    i = Math.cos(THREE.Math.degToRad(void 0 !== i ? i : 1));
    var r = [0, 0], h = {}, e = function (n, t) {
        return n - t
    }, o = ["a", "b", "c"], y = new THREE.BufferGeometry, u;
    n.geometry instanceof THREE.BufferGeometry ? (u = new THREE.Geometry, u.fromBufferGeometry(n.geometry)) : u = n.geometry.clone();
    u.mergeVertices();
    u.computeFaceNormals();
    a = u.vertices;
    u = u.faces;
    for (var f = 0, c = 0, p = u.length; c < p; c++)for (v = u[c], l = 0; 3 > l; l++)r[0] = v[o[l]], r[1] = v[o[(l + 1) % 3]], r.sort(e), s = r.toString(), void 0 === h[s] ? (h[s] = {
        vert1: r[0],
        vert2: r[1],
        face1: c,
        face2: void 0
    }, f++) : h[s].face2 = c;
    r = new Float32Array(6 * f);
    e = 0;
    for (s in h)(o = h[s], void 0 === o.face2 || u[o.face1].normal.dot(u[o.face2].normal) <= i) && (f = a[o.vert1], r[e++] = f.x, r[e++] = f.y, r[e++] = f.z, f = a[o.vert2], r[e++] = f.x, r[e++] = f.y, r[e++] = f.z);
    y.addAttribute("position", new THREE.BufferAttribute(r, 3));
    THREE.Line.call(this, y, new THREE.LineBasicMaterial({color: t}), THREE.LinePieces);
    this.matrix = n.matrixWorld;
    this.matrixAutoUpdate = !1
};
THREE.EdgesHelper.prototype = Object.create(THREE.Line.prototype);
THREE.EdgesHelper.prototype.constructor = THREE.EdgesHelper;
THREE.FaceNormalsHelper = function (n, t, i, r) {
    this.object = n;
    this.size = void 0 !== t ? t : 1;
    n = void 0 !== i ? i : 16776960;
    r = void 0 !== r ? r : 1;
    t = new THREE.Geometry;
    i = 0;
    for (var u = this.object.geometry.faces.length; i < u; i++)t.vertices.push(new THREE.Vector3, new THREE.Vector3);
    THREE.Line.call(this, t, new THREE.LineBasicMaterial({color: n, linewidth: r}), THREE.LinePieces);
    this.matrixAutoUpdate = !1;
    this.normalMatrix = new THREE.Matrix3;
    this.update()
};
THREE.FaceNormalsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.FaceNormalsHelper.prototype.constructor = THREE.FaceNormalsHelper;
THREE.FaceNormalsHelper.prototype.update = function () {
    var r = this.geometry.vertices, n = this.object, u = n.geometry.vertices, f = n.geometry.faces, e = n.matrixWorld, t, o, i;
    for (n.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(e), t = n = 0, o = f.length; n < o; n++, t += 2)i = f[n], r[t].copy(u[i.a]).add(u[i.b]).add(u[i.c]).divideScalar(3).applyMatrix4(e), r[t + 1].copy(i.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(r[t]);
    return this.geometry.verticesNeedUpdate = !0, this
};
THREE.GridHelper = function (n, t) {
    var u = new THREE.Geometry, f = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors}), i, r;
    for (this.color1 = new THREE.Color(4473924), this.color2 = new THREE.Color(8947848), i = -n; i <= n; i += t)u.vertices.push(new THREE.Vector3(-n, 0, i), new THREE.Vector3(n, 0, i), new THREE.Vector3(i, 0, -n), new THREE.Vector3(i, 0, n)), r = 0 === i ? this.color1 : this.color2, u.colors.push(r, r, r, r);
    THREE.Line.call(this, u, f, THREE.LinePieces)
};
THREE.GridHelper.prototype = Object.create(THREE.Line.prototype);
THREE.GridHelper.prototype.constructor = THREE.GridHelper;
THREE.GridHelper.prototype.setColors = function (n, t) {
    this.color1.set(n);
    this.color2.set(t);
    this.geometry.colorsNeedUpdate = !0
};
THREE.HemisphereLightHelper = function (n, t) {
    var r, i;
    for (THREE.Object3D.call(this), this.light = n, this.light.updateMatrixWorld(), this.matrix = n.matrixWorld, this.matrixAutoUpdate = !1, this.colors = [new THREE.Color, new THREE.Color], r = new THREE.SphereGeometry(t, 4, 2), r.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2)), i = 0; 8 > i; i++)r.faces[i].color = this.colors[4 > i ? 0 : 1];
    i = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, wireframe: !0});
    this.lightSphere = new THREE.Mesh(r, i);
    this.add(this.lightSphere);
    this.update()
};
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.HemisphereLightHelper.prototype.constructor = THREE.HemisphereLightHelper;
THREE.HemisphereLightHelper.prototype.dispose = function () {
    this.lightSphere.geometry.dispose();
    this.lightSphere.material.dispose()
};
THREE.HemisphereLightHelper.prototype.update = function () {
    var n = new THREE.Vector3;
    return function () {
        this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);
        this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);
        this.lightSphere.lookAt(n.setFromMatrixPosition(this.light.matrixWorld).negate());
        this.lightSphere.geometry.colorsNeedUpdate = !0
    }
}();
THREE.PointLightHelper = function (n, t) {
    this.light = n;
    this.light.updateMatrixWorld();
    var r = new THREE.SphereGeometry(t, 4, 2), i = new THREE.MeshBasicMaterial({wireframe: !0, fog: !1});
    i.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    THREE.Mesh.call(this, r, i);
    this.matrix = this.light.matrixWorld;
    this.matrixAutoUpdate = !1
};
THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype);
THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper;
THREE.PointLightHelper.prototype.dispose = function () {
    this.geometry.dispose();
    this.material.dispose()
};
THREE.PointLightHelper.prototype.update = function () {
    this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
};
THREE.SkeletonHelper = function (n) {
    this.bones = this.getBoneList(n);
    for (var t = new THREE.Geometry, i = 0; i < this.bones.length; i++)this.bones[i].parent instanceof THREE.Bone && (t.vertices.push(new THREE.Vector3), t.vertices.push(new THREE.Vector3), t.colors.push(new THREE.Color(0, 0, 1)), t.colors.push(new THREE.Color(0, 1, 0)));
    i = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors, depthTest: !1, depthWrite: !1, transparent: !0});
    THREE.Line.call(this, t, i, THREE.LinePieces);
    this.root = n;
    this.matrix = n.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.update()
};
THREE.SkeletonHelper.prototype = Object.create(THREE.Line.prototype);
THREE.SkeletonHelper.prototype.constructor = THREE.SkeletonHelper;
THREE.SkeletonHelper.prototype.getBoneList = function (n) {
    var t = [], i;
    for (n instanceof THREE.Bone && t.push(n), i = 0; i < n.children.length; i++)t.push.apply(t, this.getBoneList(n.children[i]));
    return t
};
THREE.SkeletonHelper.prototype.update = function () {
    for (var i, n = this.geometry, f = (new THREE.Matrix4).getInverse(this.root.matrixWorld), t = new THREE.Matrix4, r = 0, u = 0; u < this.bones.length; u++)i = this.bones[u], i.parent instanceof THREE.Bone && (t.multiplyMatrices(f, i.matrixWorld), n.vertices[r].setFromMatrixPosition(t), t.multiplyMatrices(f, i.parent.matrixWorld), n.vertices[r + 1].setFromMatrixPosition(t), r += 2);
    n.verticesNeedUpdate = !0;
    n.computeBoundingSphere()
};
THREE.SpotLightHelper = function (n) {
    THREE.Object3D.call(this);
    this.light = n;
    this.light.updateMatrixWorld();
    this.matrix = n.matrixWorld;
    this.matrixAutoUpdate = !1;
    n = new THREE.CylinderGeometry(0, 1, 1, 8, 1, !0);
    n.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0));
    n.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
    var t = new THREE.MeshBasicMaterial({wireframe: !0, fog: !1});
    this.cone = new THREE.Mesh(n, t);
    this.add(this.cone);
    this.update()
};
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper;
THREE.SpotLightHelper.prototype.dispose = function () {
    this.cone.geometry.dispose();
    this.cone.material.dispose()
};
THREE.SpotLightHelper.prototype.update = function () {
    var n = new THREE.Vector3, t = new THREE.Vector3;
    return function () {
        var i = this.light.distance ? this.light.distance : 1e4, r = i * Math.tan(this.light.angle);
        this.cone.scale.set(r, r, i);
        n.setFromMatrixPosition(this.light.matrixWorld);
        t.setFromMatrixPosition(this.light.target.matrixWorld);
        this.cone.lookAt(t.sub(n));
        this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
    }
}();
THREE.VertexNormalsHelper = function (n, t, i, r) {
    var u, e, f, o;
    for (this.object = n, this.size = void 0 !== t ? t : 1, t = void 0 !== i ? i : 16711680, r = void 0 !== r ? r : 1, i = new THREE.Geometry, n = n.geometry.faces, u = 0, e = n.length; u < e; u++)for (f = 0, o = n[u].vertexNormals.length; f < o; f++)i.vertices.push(new THREE.Vector3, new THREE.Vector3);
    THREE.Line.call(this, i, new THREE.LineBasicMaterial({color: t, linewidth: r}), THREE.LinePieces);
    this.matrixAutoUpdate = !1;
    this.normalMatrix = new THREE.Matrix3;
    this.update()
};
THREE.VertexNormalsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.VertexNormalsHelper.prototype.constructor = THREE.VertexNormalsHelper;
THREE.VertexNormalsHelper.prototype.update = function () {
    var n = new THREE.Vector3;
    return function (t) {
        var s;
        t = ["a", "b", "c", "d"];
        this.object.updateMatrixWorld(!0);
        this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
        for (var u = this.geometry.vertices, h = this.object.geometry.vertices, o = this.object.geometry.faces, c = this.object.matrixWorld, i = 0, f = 0, l = o.length; f < l; f++)for (var e = o[f], r = 0, a = e.vertexNormals.length; r < a; r++)s = e.vertexNormals[r], u[i].copy(h[e[t[r]]]).applyMatrix4(c), n.copy(s).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size), n.add(u[i]), i += 1, u[i].copy(n), i += 1;
        return this.geometry.verticesNeedUpdate = !0, this
    }
}();
THREE.VertexTangentsHelper = function (n, t, i, r) {
    var u, e, f, o;
    for (this.object = n, this.size = void 0 !== t ? t : 1, t = void 0 !== i ? i : 255, r = void 0 !== r ? r : 1, i = new THREE.Geometry, n = n.geometry.faces, u = 0, e = n.length; u < e; u++)for (f = 0, o = n[u].vertexTangents.length; f < o; f++)i.vertices.push(new THREE.Vector3), i.vertices.push(new THREE.Vector3);
    THREE.Line.call(this, i, new THREE.LineBasicMaterial({color: t, linewidth: r}), THREE.LinePieces);
    this.matrixAutoUpdate = !1;
    this.update()
};
THREE.VertexTangentsHelper.prototype = Object.create(THREE.Line.prototype);
THREE.VertexTangentsHelper.prototype.constructor = THREE.VertexTangentsHelper;
THREE.VertexTangentsHelper.prototype.update = function () {
    var n = new THREE.Vector3;
    return function (t) {
        var h;
        t = ["a", "b", "c", "d"];
        this.object.updateMatrixWorld(!0);
        for (var u = this.geometry.vertices, c = this.object.geometry.vertices, o = this.object.geometry.faces, s = this.object.matrixWorld, i = 0, f = 0, l = o.length; f < l; f++)for (var e = o[f], r = 0, a = e.vertexTangents.length; r < a; r++)h = e.vertexTangents[r], u[i].copy(c[e[t[r]]]).applyMatrix4(s), n.copy(h).transformDirection(s).multiplyScalar(this.size), n.add(u[i]), i += 1, u[i].copy(n), i += 1;
        return this.geometry.verticesNeedUpdate = !0, this
    }
}();
THREE.WireframeHelper = function (n, t) {
    var w = void 0 !== t ? t : 16777215, i = [0, 0], v = {}, p = function (n, t) {
        return n - t
    }, e = ["a", "b", "c"], y = new THREE.BufferGeometry, l, r, a;
    if (n.geometry instanceof THREE.Geometry) {
        for (var o = n.geometry.vertices, c = n.geometry.faces, u = 0, s = new Uint32Array(6 * c.length), f = 0, h = c.length; f < h; f++)for (l = c[f], r = 0; 3 > r; r++)i[0] = l[e[r]], i[1] = l[e[(r + 1) % 3]], i.sort(p), a = i.toString(), void 0 === v[a] && (s[2 * u] = i[0], s[2 * u + 1] = i[1], v[a] = !0, u++);
        for (i = new Float32Array(6 * u), f = 0, h = u; f < h; f++)for (r = 0; 2 > r; r++)u = o[s[2 * f + r]], e = 6 * f + 3 * r, i[e + 0] = u.x, i[e + 1] = u.y, i[e + 2] = u.z;
        y.addAttribute("position", new THREE.BufferAttribute(i, 3))
    } else if (n.geometry instanceof THREE.BufferGeometry) {
        if (void 0 !== n.geometry.attributes.index) {
            o = n.geometry.attributes.position.array;
            h = n.geometry.attributes.index.array;
            c = n.geometry.drawcalls;
            u = 0;
            0 === c.length && (c = [{count: h.length, index: 0, start: 0}]);
            for (var s = new Uint32Array(2 * h.length), l = 0, b = c.length; l < b; ++l)for (var r = c[l].start, a = c[l].count, e = c[l].index, f = r, k = r + a; f < k; f += 3)for (r = 0; 3 > r; r++)i[0] = e + h[f + r], i[1] = e + h[f + (r + 1) % 3], i.sort(p), a = i.toString(), void 0 === v[a] && (s[2 * u] = i[0], s[2 * u + 1] = i[1], v[a] = !0, u++);
            for (i = new Float32Array(6 * u), f = 0, h = u; f < h; f++)for (r = 0; 2 > r; r++)e = 6 * f + 3 * r, u = 3 * s[2 * f + r], i[e + 0] = o[u], i[e + 1] = o[u + 1], i[e + 2] = o[u + 2]
        } else for (o = n.geometry.attributes.position.array, u = o.length / 3, s = u / 3, i = new Float32Array(6 * u), f = 0, h = s; f < h; f++)for (r = 0; 3 > r; r++)e = 18 * f + 6 * r, s = 9 * f + 3 * r, i[e + 0] = o[s], i[e + 1] = o[s + 1], i[e + 2] = o[s + 2], u = 9 * f + (r + 1) % 3 * 3, i[e + 3] = o[u], i[e + 4] = o[u + 1], i[e + 5] = o[u + 2];
        y.addAttribute("position", new THREE.BufferAttribute(i, 3))
    }
    THREE.Line.call(this, y, new THREE.LineBasicMaterial({color: w}), THREE.LinePieces);
    this.matrix = n.matrixWorld;
    this.matrixAutoUpdate = !1
};
THREE.WireframeHelper.prototype = Object.create(THREE.Line.prototype);
THREE.WireframeHelper.prototype.constructor = THREE.WireframeHelper;
THREE.ImmediateRenderObject = function () {
    THREE.Object3D.call(this);
    this.render = function () {
    }
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject;
THREE.MorphBlendMesh = function (n, t) {
    THREE.Mesh.call(this, n, t);
    this.animationsMap = {};
    this.animationsList = [];
    var i = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, i - 1, i / 1);
    this.setAnimationWeight("__default", 1)
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh;
THREE.MorphBlendMesh.prototype.createAnimation = function (n, t, i, r) {
    t = {
        startFrame: t,
        endFrame: i,
        length: i - t + 1,
        fps: r,
        duration: (i - t) / r,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    };
    this.animationsMap[n] = t;
    this.animationsList.push(t)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (n) {
    for (var t, i, f, u = {}, e = this.geometry, r = 0, o = e.morphTargets.length; r < o; r++)t = e.morphTargets[r].name.match(/([a-z]+)_?(\d+)/), t && 1 < t.length && (i = t[1], u[i] || (u[i] = {
        start: Infinity,
        end: -Infinity
    }), t = u[i], r < t.start && (t.start = r), r > t.end && (t.end = r), f || (f = i));
    for (i in u)t = u[i], this.createAnimation(i, t.start, t.end, n);
    this.firstAnimation = f
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (n) {
    (n = this.animationsMap[n]) && (n.direction = 1, n.directionBackwards = !1)
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (n) {
    (n = this.animationsMap[n]) && (n.direction = -1, n.directionBackwards = !0)
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function (n, t) {
    var i = this.animationsMap[n];
    i && (i.fps = t, i.duration = (i.end - i.start) / i.fps)
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function (n, t) {
    var i = this.animationsMap[n];
    i && (i.duration = t, i.fps = (i.end - i.start) / i.duration)
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function (n, t) {
    var i = this.animationsMap[n];
    i && (i.weight = t)
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function (n, t) {
    var i = this.animationsMap[n];
    i && (i.time = t)
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function (n) {
    var t = 0;
    return (n = this.animationsMap[n]) && (t = n.time), t
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function (n) {
    var t = -1;
    return (n = this.animationsMap[n]) && (t = n.duration), t
};
THREE.MorphBlendMesh.prototype.playAnimation = function (n) {
    var t = this.animationsMap[n];
    t ? (t.time = 0, t.active = !0) : THREE.warn("THREE.MorphBlendMesh: animation[" + n + "] undefined in .playAnimation()")
};
THREE.MorphBlendMesh.prototype.stopAnimation = function (n) {
    (n = this.animationsMap[n]) && (n.active = !1)
};
THREE.MorphBlendMesh.prototype.update = function (n) {
    for (var t, i, u, f, r = 0, e = this.animationsList.length; r < e; r++)t = this.animationsList[r], t.active && (i = t.duration / t.length, t.time += t.direction * n, t.mirroredLoop ? (t.time > t.duration || 0 > t.time) && (t.direction *= -1, t.time > t.duration && (t.time = t.duration, t.directionBackwards = !0), 0 > t.time && (t.time = 0, t.directionBackwards = !1)) : (t.time %= t.duration, 0 > t.time && (t.time += t.duration)), u = t.startFrame + THREE.Math.clamp(Math.floor(t.time / i), 0, t.length - 1), f = t.weight, u !== t.currentFrame && (this.morphTargetInfluences[t.lastFrame] = 0, this.morphTargetInfluences[t.currentFrame] = 1 * f, this.morphTargetInfluences[u] = 0, t.lastFrame = t.currentFrame, t.currentFrame = u), i = t.time % i / i, t.directionBackwards && (i = 1 - i), this.morphTargetInfluences[t.currentFrame] = i * f, this.morphTargetInfluences[t.lastFrame] = (1 - i) * f)
};
THREE.ColladaLoader = function () {
    function tu(n, t, i, r) {
        var f = 0, u;
        document.implementation && document.implementation.createDocument ? (u = new XMLHttpRequest, u.onreadystatechange = function () {
            if (u.readyState === 4) {
                if (u.status === 0 || u.status === 200)if (u.responseXML)gt = t, si(u.responseXML, undefined, n); else if (u.responseText) {
                    gt = t;
                    var e = new DOMParser, o = e.parseFromString(u.responseText, "application/xml");
                    si(o, undefined, n)
                } else faillCallback ? r() : console.error("ColladaLoader: Empty or non-existing file (" + n + ")")
            } else u.readyState === 3 && i && (f === 0 && (f = u.getResponseHeader("Content-Length")), i({
                total: f,
                loaded: u.responseText.length
            }))
        }, u.open("GET", n, !0), u.send(null)) : alert("Don't know how to parse XML!")
    }

    function si(n, t, i) {
        var f, e, o;
        for (l = n, t = t || gt, i !== undefined && (f = i.split("/"), f.pop(), nr = (f.length < 1 ? "." : f.join("/")) + "/"), ru(), uf(), ht = u("library_images image", ci, "image"), ni = u("library_materials material", lr, "material"), ti = u("library_effects effect", p, "effect"), y = u("library_geometries geometry", sr, "geometry"), ii = u("library_cameras camera", bi, "camera"), ri = u("library_lights light", bt, "light"), a = u("library_controllers controller", or, "controller"), nt = u("library_animations animation", wi, "animation"), ei = u("library_visual_scenes visual_scene", vt, "visual_scene"), oi = u("library_kinematics_models kinematics_model", ki, "kinematics_model"), ct = [], lt = [], r = uu(), g = new THREE.Group, e = 0; e < r.nodes.length; e++)g.add(er(r.nodes[e]));
        return g.scale.multiplyScalar(ir), eu(), b = fu(), lu(), o = {
            scene: g,
            morphs: ct,
            skins: lt,
            animations: ui,
            kinematics: fi,
            dae: {
                images: ht,
                materials: ni,
                cameras: ii,
                lights: ri,
                effects: ti,
                geometries: y,
                controllers: a,
                animations: nt,
                visualScenes: ei,
                visualScene: r,
                scene: r,
                kinematicsModels: oi,
                kinematicsModel: b
            }
        }, t && t(o), o
    }

    function iu(n) {
        tr = n
    }

    function ru() {
        var u = l.querySelectorAll("asset"), n = u[0], t, i, r;
        if (n && n.childNodes)for (t = 0; t < n.childNodes.length; t++) {
            i = n.childNodes[t];
            switch (i.nodeName) {
                case"unit":
                    r = i.getAttribute("meter");
                    r && (ir = parseFloat(r));
                    break;
                case"up_axis":
                    ut = i.textContent.charAt(0)
            }
        }
    }

    function u(n, t, i) {
        for (var f = l.querySelectorAll(n), e = {}, s = 0, h = f.length, o, r, u = 0; u < h; u++)o = f[u], r = (new t).parse(o), r.id && r.id.length !== 0 || (r.id = i + s++), e[r.id] = r;
        return e
    }

    function uu() {
        var t = l.querySelectorAll("scene instance_visual_scene")[0], n;
        return t ? (n = t.getAttribute("url").replace(/^#/, ""), ei[n.length > 0 ? n : "visual_scene0"]) : null
    }

    function fu() {
        var t = l.querySelectorAll("instance_kinematics_model")[0], n;
        return t ? (n = t.getAttribute("url").replace(/^#/, ""), oi[n.length > 0 ? n : "kinematics_model0"]) : null
    }

    function eu() {
        ui = [];
        rr(g)
    }

    function rr(n) {
        var i = r.getChildById(n.colladaId, !0), u = null, t, f, o, e, s;
        if (i && i.keys)for (u = {
            fps: 60,
            hierarchy: [{node: i, keys: i.keys, sids: i.sids}],
            node: n,
            name: "animation_" + n.name,
            length: 0
        }, ui.push(u), t = 0, f = i.keys.length; t < f; t++)u.length = Math.max(u.length, i.keys[t].time); else u = {
            hierarchy: [{
                keys: [],
                sids: []
            }]
        };
        for (t = 0, f = n.children.length; t < f; t++)for (o = rr(n.children[t]), e = 0, s = o.hierarchy.length; e < s; e++)u.hierarchy.push({
            keys: [],
            sids: []
        });
        return u
    }

    function ou() {
        var t = 1e6, u = -t, f = 0, e, o, i, r, n;
        for (o in nt)for (i = nt[o], e = e || i.id, r = 0; r < i.sampler.length; r++)n = i.sampler[r], n.create(), t = Math.min(t, n.startTime), u = Math.max(u, n.endTime), f = Math.max(f, n.input.length);
        return {start: t, end: u, frames: f, ID: e}
    }

    function su(n, t) {
        var u = t instanceof ai ? a[t.url] : t, f, r, o, i, e;
        if (!u || !u.morph) {
            console.log("could not find morph controller!");
            return
        }
        for (f = u.morph, r = 0; r < f.targets.length; r++)(o = f.targets[r], i = y[o], i.mesh && i.mesh.primitives && i.mesh.primitives.length) && (e = i.mesh.primitives[0].geometry, e.vertices.length === n.vertices.length && n.morphTargets.push({
            name: "target_1",
            vertices: e.vertices
        }));
        n.morphTargets.push({name: "target_Z", vertices: n.vertices})
    }

    function hi(n, t, i, r) {
        var e, u, f;
        for (n.world = n.world || new THREE.Matrix4, n.localworld = n.localworld || new THREE.Matrix4, n.world.copy(n.matrix), n.localworld.copy(n.matrix), n.channels && n.channels.length && (e = n.channels[0], u = e.sampler.output[i], u instanceof THREE.Matrix4 && (n.world.copy(u), n.localworld.copy(u), i === 0 && n.matrix.copy(u))), r && n.world.multiplyMatrices(r, n.world), t.push(n), f = 0; f < n.nodes.length; f++)hi(n.nodes[f], t, i, n.world)
    }

    function ur(n, t) {
        for (var i, u, o, r, e, s, f = 0; f < n.length; f++)if (i = n[f], u = -1, i.type == "JOINT") {
            for (r = 0; r < t.joints.length; r++)if (i.sid === t.joints[r]) {
                u = r;
                break
            }
            if (u >= 0)for (o = t.invBindMatrices[u], i.invBindMatrix = o, i.skinningMatrix = new THREE.Matrix4, i.skinningMatrix.multiplyMatrices(i.world, o), i.animatrix = new THREE.Matrix4, i.animatrix.copy(i.localworld), i.weights = [], r = 0; r < t.weights.length; r++)for (e = 0; e < t.weights[r].length; e++)s = t.weights[r][e], s.joint === u && i.weights.push(s); else console.warn("ColladaLoader: Could not find joint '" + i.sid + "'."), i.skinningMatrix = new THREE.Matrix4, i.weights = []
        }
    }

    function hu(n) {
        var t = [], i = function (n, t, r) {
            var f = {}, u, e;
            f.name = t.sid;
            f.parent = n;
            f.matrix = t.matrix;
            u = [new THREE.Vector3, new THREE.Quaternion, new THREE.Vector3];
            f.matrix.decompose(u[0], u[1], u[2]);
            f.pos = [u[0].x, u[0].y, u[0].z];
            f.scl = [u[2].x, u[2].y, u[2].z];
            f.rotq = [u[1].x, u[1].y, u[1].z, u[1].w];
            r.push(f);
            for (e in t.nodes)i(t.sid, t.nodes[e], r)
        };
        return i(-1, n, t), t
    }

    function cu(n, t, i) {
        var u = [], f, r;
        for (hi(t, u, -1), ur(u, i.skin), v = new THREE.Vector3, f = [], r = 0; r < n.vertices.length; r++)f.push(new THREE.Vector3);
        for (r = 0; r < u.length; r++)if (u[r].type == "JOINT")for (j = 0; j < u[r].weights.length; j++)w = u[r].weights[j], vidx = w.index, weight = w.weight, o = n.vertices[vidx], s = f[vidx], v.x = o.x, v.y = o.y, v.z = o.z, v.applyMatrix4(u[r].skinningMatrix), s.x += v.x * weight, s.y += v.y * weight, s.z += v.z * weight;
        for (r = 0; r < n.vertices.length; r++)n.vertices[r] = f[r]
    }

    function fr(n, t, i) {
        var c = a[t.url], tt, nt, b, v, l, it, u, f, h, s;
        if (i = i !== undefined ? i : 40, !c || !c.skin) {
            console.log("ColladaLoader: Could not find skin controller.");
            return
        }
        if (!t.skeleton || !t.skeleton.length) {
            console.log("ColladaLoader: Could not find the skeleton for the skin. ");
            return
        }
        var y = ou(), p = r.getChildById(t.skeleton[0], !0) || r.getChildBySid(t.skeleton[0], !0), w = hu(p), k = c.skin.joints, o = [];
        for (u = 0; u < k.length; u++)for (f = 0; f < w.length; f++)w[f].name === k[u] && (o[u] = w[f]);
        for (u = 0; u < o.length; u++)for (f = 0; f < o.length; f++)o[u].parent === o[f].name && (o[u].parent = f);
        for (tt = new THREE.Vector3, u = 0; u < n.vertices.length; u++)n.vertices[u].applyMatrix4(c.skin.bindShapeMatrix);
        var d = [], g = [], e = c.skin.weights;
        for (u = 0; u < e.length; u++)nt = new THREE.Vector4(e[u][0] ? e[u][0].joint : 0, e[u][1] ? e[u][1].joint : 0, e[u][2] ? e[u][2].joint : 0, e[u][3] ? e[u][3].joint : 0), b = new THREE.Vector4(e[u][0] ? e[u][0].weight : 0, e[u][1] ? e[u][1].weight : 0, e[u][2] ? e[u][2].weight : 0, e[u][3] ? e[u][3].weight : 0), d.push(nt), g.push(b);
        for (n.skinIndices = d, n.skinWeights = g, n.bones = o, v = {
            name: y.ID,
            fps: 30,
            length: y.frames / 30,
            hierarchy: []
        }, f = 0; f < o.length; f++)v.hierarchy.push({parent: o[f].parent, name: o[f].name, keys: []});
        for (console.log("ColladaLoader:", y.ID + " has " + o.length + " bones."), cu(n, p, c), i = 0; i < y.frames; i++) {
            for (l = [], it = [], hi(p, l, i), ur(l, c.skin), u = 0; u < l.length; u++)for (f = 0; f < v.hierarchy.length; f++)v.hierarchy[f].name === l[u].sid && (h = {}, h.time = i / 30, h.matrix = l[u].animatrix, i === 0 && (l[u].matrix = h.matrix), s = [new THREE.Vector3, new THREE.Quaternion, new THREE.Vector3], h.matrix.decompose(s[0], s[1], s[2]), h.pos = [s[0].x, s[0].y, s[0].z], h.scl = [s[2].x, s[2].y, s[2].z], h.rot = s[1], v.hierarchy[f].keys.push(h));
            n.animation = v
        }
    }

    function lu() {
        var i, f, u, n, t, o;
        if (b && b.joints.length === 0) {
            fi = undefined;
            return
        }
        if (i = {}, f = function (n, t) {
                var u = t.getAttribute("id"), e = r.getChildById(u, !0), f = b.joints[n];
                g.traverse(function (t) {
                    t.colladaId == u && (i[n] = {node: t, transforms: e.transforms, joint: f, position: f.zeroPosition})
                })
            }, fi = {
                joints: b && b.joints, getJointValue: function (n) {
                    var t = i[n];
                    if (t)return t.position;
                    console.log("getJointValue: joint " + n + " doesn't exist")
                }, setJointValue: function (t, r) {
                    var c = i[t], e, f, h;
                    if (c)if (e = c.joint, r > e.limits.max || r < e.limits.min)console.log("setJointValue: joint " + t + " value " + r + " outside of limits (min: " + e.limits.min + ", max: " + e.limits.max + ")"); else if (e.static)console.log("setJointValue: joint " + t + " is static"); else {
                        var o = c.node, l = e.axis, a = c.transforms, s = new THREE.Matrix4;
                        for (n = 0; n < a.length; n++)if (f = a[n], f.sid && f.sid.indexOf("joint" + t) !== -1)switch (e.type) {
                            case"revolute":
                                s.multiply(h.makeRotationAxis(l, THREE.Math.degToRad(r)));
                                break;
                            case"prismatic":
                                s.multiply(h.makeTranslation(l.x * r, l.y * r, l.z * r));
                                break;
                            default:
                                console.warn("setJointValue: unknown joint type: " + e.type)
                        } else {
                            h = new THREE.Matrix4;
                            switch (f.type) {
                                case"matrix":
                                    s.multiply(f.obj);
                                    break;
                                case"translate":
                                    s.multiply(h.makeTranslation(f.obj.x, f.obj.y, f.obj.z));
                                    break;
                                case"rotate":
                                    s.multiply(h.makeRotationAxis(f.obj, f.angle))
                            }
                        }
                        var v = s.elements, u = Array.prototype.slice.call(v), y = [u[0], u[4], u[8], u[12], u[1], u[5], u[9], u[13], u[2], u[6], u[10], u[14], u[3], u[7], u[11], u[15]];
                        o.matrix.set.apply(o.matrix, y);
                        o.matrix.decompose(o.position, o.quaternion, o.scale)
                    } else console.log("setJointValue: joint " + t + " doesn't exist")
                }
            }, u = l.querySelector("scene instance_kinematics_scene"), u)for (n = 0; n < u.childNodes.length; n++)if (t = u.childNodes[n], t.nodeType == 1)switch (t.nodeName) {
            case"bind_joint_axis":
                var s = t.getAttribute("target").split("/").pop(), h = t.querySelector("axis param").textContent, c = parseInt(h.split("joint").pop().split(".")[0]), e = l.querySelector('[sid="' + s + '"]');
                e && (o = e.parentElement, f(c, o))
        }
    }

    function er(t) {
        for (var r = new THREE.Object3D, bt = !1, rt, d, o, s, w, u, g, st, h, e, f, ht, it, i = 0; i < t.controllers.length; i++) {
            s = a[t.controllers[i].url];
            switch (s.type) {
                case"skin":
                    y[s.skin.source] ? (u = new ft, u.url = s.skin.source, u.instance_material = t.controllers[i].instance_material, t.geometries.push(u), bt = !0, rt = t.controllers[i]) : a[s.skin.source] && (w = a[s.skin.source], d = w, w.morph && y[w.morph.source] && (u = new ft, u.url = w.morph.source, u.instance_material = t.controllers[i].instance_material, t.geometries.push(u)));
                    break;
                case"morph":
                    y[s.morph.source] && (u = new ft, u.url = s.morph.source, u.instance_material = t.controllers[i].instance_material, t.geometries.push(u), d = t.controllers[i]);
                    console.log("ColladaLoader: Morph-controller partially supported.")
            }
        }
        for (g = {}, i = 0; i < t.geometries.length; i++) {
            var yt = t.geometries[i], ut = yt.instance_material, l = y[yt.url], pt = {}, wt = [], et = 0, ot;
            if (l) {
                if (!l.mesh || !l.mesh.primitives)continue;
                if (r.name.length === 0 && (r.name = l.id), ut)for (o = 0; o < ut.length; o++) {
                    var b = ut[o], k = ni[b.target], kt = k.instance_effect.url, dt = ti[kt].shader, v = dt.material;
                    l.doubleSided && (b.symbol in g || (st = v.clone(), st.side = THREE.DoubleSide, g[b.symbol] = st), v = g[b.symbol]);
                    v.opacity = v.opacity ? v.opacity : 1;
                    pt[b.symbol] = et;
                    wt.push(v);
                    ot = v;
                    ot.name = k.name === null || k.name === "" ? k.id : k.name;
                    et++
                }
                if (e = ot || new THREE.MeshLambertMaterial({
                            color: 14540253,
                            side: l.doubleSided ? THREE.DoubleSide : THREE.FrontSide
                        }), f = l.mesh.geometry3js, et > 1)for (e = new THREE.MeshFaceMaterial(wt), o = 0; o < f.faces.length; o++)ht = f.faces[o], ht.materialIndex = pt[ht.daeMaterial];
                rt !== undefined ? (fr(f, rt), f.morphTargets.length > 0 ? (e.morphTargets = !0, e.skinning = !1) : (e.morphTargets = !1, e.skinning = !0), h = new THREE.SkinnedMesh(f, e, !1), h.name = "skin_" + lt.length, lt.push(h)) : d !== undefined ? (su(f, d), e.morphTargets = !0, h = new THREE.Mesh(f, e), h.name = "morph_" + ct.length, ct.push(h)) : h = f.isLineStrip === !0 ? new THREE.Line(f) : new THREE.Mesh(f, e);
                r.add(h)
            }
        }
        for (i = 0; i < t.cameras.length; i++) {
            var gt = t.cameras[i], nt = ii[gt.url], ui = new THREE.PerspectiveCamera(nt.yfov, parseFloat(nt.aspect_ratio), parseFloat(nt.znear), parseFloat(nt.zfar));
            r.add(ui)
        }
        for (i = 0; i < t.lights.length; i++) {
            var c = null, fi = t.lights[i], p = ri[fi.url];
            if (p && p.technique) {
                var tt = p.color.getHex(), at = p.intensity, vt = p.distance, ei = p.falloff_angle, oi;
                switch (p.technique) {
                    case"directional":
                        c = new THREE.DirectionalLight(tt, at, vt);
                        c.position.set(0, 0, 1);
                        break;
                    case"point":
                        c = new THREE.PointLight(tt, at, vt);
                        break;
                    case"spot":
                        c = new THREE.SpotLight(tt, at, vt, ei, oi);
                        c.position.set(0, 0, 1);
                        break;
                    case"ambient":
                        c = new THREE.AmbientLight(tt)
                }
            }
            c && r.add(c)
        }
        for (r.name = t.name || t.id || "", r.colladaId = t.id || "", r.layer = t.layer || "", r.matrix = t.matrix, r.matrix.decompose(r.position, r.quaternion, r.scale), n.centerGeometry && r.geometry && (it = r.geometry.center(), it.multiply(r.scale), it.applyQuaternion(r.quaternion), r.position.sub(it)), i = 0; i < t.nodes.length; i++)r.add(er(t.nodes[i], t));
        return r
    }

    function au(n) {
        for (var i = l.querySelectorAll("library_nodes node"), r, t = 0; t < i.length; t++)if (r = i[t].attributes.getNamedItem("id"), r && r.value === n)return i[t];
        return undefined
    }

    function vu(n) {
        var f = [], e = 1e6, o = -1e6, i, r, t;
        for (i in nt)for (r = nt[i], t = 0; t < r.channel.length; t++) {
            var s = r.channel[t], u = r.sampler[t], i = s.target.split("/")[0];
            i == n.id && (u.create(), s.sampler = u, e = Math.min(e, u.startTime), o = Math.max(o, u.endTime), f.push(s))
        }
        return f.length && (n.startTime = e, n.endTime = o), f
    }

    function yu(n) {
        var i, e, y, s, a, r, v, t, f;
        if (n.channels && n.channels.length) {
            for (i = [], e = [], r = 0, y = n.channels.length; r < y; r++) {
                var u = n.channels[r], h = u.fullSid, p = u.sampler, w = p.input, c = n.getTransformBySid(u.sid), o;
                if (u.arrIndices)for (o = [], t = 0, s = u.arrIndices.length; t < s; t++)o[t] = ef(u.arrIndices[t]); else o = nu(u.member);
                if (c)for (e.indexOf(h) === -1 && e.push(h), t = 0, s = w.length; t < s; t++) {
                    var l = w[t], b = p.getData(c.type, t, o), f = pu(i, l);
                    f || (f = new it(l), a = wu(i, l), i.splice(a === -1 ? i.length : a, 0, f));
                    f.addTarget(h, c, o, b)
                } else console.log('Could not find transform "' + u.sid + '" in node ' + n.id)
            }
            for (r = 0; r < e.length; r++)for (v = e[r], t = 0; t < i.length; t++)f = i[t], f.hasTarget(v) || bu(i, f, t, v);
            n.keys = i;
            n.sids = e
        }
    }

    function pu(n, t) {
        for (var u = null, r, i = 0, f = n.length; i < f && u === null; i++)if (r = n[i], r.time === t)u = r; else if (r.time > t)break;
        return u
    }

    function wu(n, t) {
        for (var r = -1, f, i = 0, u = n.length; i < u && r === -1; i++)f = n[i], f.time >= t && (r = i);
        return r
    }

    function bu(n, t, i, r) {
        var o = du(n, r, i ? i - 1 : 0), h = ku(n, r, i + 1), f;
        if (o && h) {
            var c = (t.time - o.time) / (h.time - o.time), s = o.getTarget(r), l = h.getTarget(r).data, u = s.data, e;
            if (s.type === "matrix")e = u; else if (u.length)for (e = [], f = 0; f < u.length; ++f)e[f] = u[f] + (l[f] - u[f]) * c; else e = u + (l - u) * c;
            t.addTarget(r, s.transform, s.member, e)
        }
    }

    function ku(n, t, i) {
        for (; i < n.length; i++) {
            var r = n[i];
            if (r.hasTarget(t))return r
        }
        return null
    }

    function du(n, t, i) {
        for (i = i >= 0 ? i : i + n.length; i >= 0; i--) {
            var r = n[i];
            if (r.hasTarget(t))return r
        }
        return null
    }

    function ci() {
        this.id = "";
        this.init_from = ""
    }

    function or() {
        this.id = "";
        this.name = "";
        this.type = "";
        this.skin = null;
        this.morph = null
    }

    function li() {
        this.method = null;
        this.source = null;
        this.targets = null;
        this.weights = null
    }

    function at() {
        this.source = "";
        this.bindShapeMatrix = null;
        this.invBindMatrices = [];
        this.joints = [];
        this.weights = []
    }

    function vt() {
        this.id = "";
        this.name = "";
        this.nodes = [];
        this.scene = new THREE.Group
    }

    function h() {
        this.id = "";
        this.name = "";
        this.sid = "";
        this.nodes = [];
        this.controllers = [];
        this.transforms = [];
        this.geometries = [];
        this.channels = [];
        this.matrix = new THREE.Matrix4
    }

    function k() {
        this.sid = "";
        this.type = "";
        this.data = [];
        this.obj = null
    }

    function ai() {
        this.url = "";
        this.skeleton = [];
        this.instance_material = []
    }

    function vi() {
        this.symbol = "";
        this.target = ""
    }

    function ft() {
        this.url = "";
        this.instance_material = []
    }

    function sr() {
        this.id = "";
        this.mesh = null
    }

    function yi(n) {
        this.geometry = n.id;
        this.primitives = [];
        this.vertices = null;
        this.geometry3js = null
    }

    function c() {
        this.material = "";
        this.count = 0;
        this.inputs = [];
        this.vcount = null;
        this.p = [];
        this.geometry = new THREE.Geometry
    }

    function yt() {
        c.call(this);
        this.vcount = []
    }

    function et() {
        c.call(this);
        this.vcount = 1
    }

    function pt() {
        c.call(this);
        this.vcount = 3
    }

    function hr() {
        this.source = "";
        this.count = 0;
        this.stride = 0;
        this.params = []
    }

    function cr() {
        this.input = {}
    }

    function d() {
        this.semantic = "";
        this.offset = 0;
        this.source = "";
        this.set = 0
    }

    function tt(n) {
        this.id = n;
        this.type = null
    }

    function lr() {
        this.id = "";
        this.name = "";
        this.instance_effect = null
    }

    function f() {
        this.color = new THREE.Color;
        this.color.setRGB(Math.random(), Math.random(), Math.random());
        this.color.a = 1;
        this.texture = null;
        this.texcoord = null;
        this.texOpts = null
    }

    function pi(n, t) {
        this.type = n;
        this.effect = t;
        this.material = null
    }

    function ar(n) {
        this.effect = n;
        this.init_from = null;
        this.format = null
    }

    function vr(n) {
        this.effect = n;
        this.source = null;
        this.wrap_s = null;
        this.wrap_t = null;
        this.minfilter = null;
        this.magfilter = null;
        this.mipfilter = null
    }

    function p() {
        this.id = "";
        this.name = "";
        this.shader = null;
        this.surface = {};
        this.sampler = {}
    }

    function yr() {
        this.url = ""
    }

    function wi() {
        this.id = "";
        this.name = "";
        this.source = {};
        this.sampler = [];
        this.channel = []
    }

    function pr(n) {
        this.animation = n;
        this.source = "";
        this.target = "";
        this.fullSid = null;
        this.sid = null;
        this.dotSyntax = null;
        this.arrSyntax = null;
        this.arrIndices = null;
        this.member = null
    }

    function wt(n) {
        this.id = "";
        this.animation = n;
        this.inputs = [];
        this.input = null;
        this.output = null;
        this.strideOut = null;
        this.interpolation = null;
        this.startTime = null;
        this.endTime = null;
        this.duration = 0
    }

    function it(n) {
        this.targets = [];
        this.time = n
    }

    function bi() {
        this.id = "";
        this.name = "";
        this.technique = ""
    }

    function wr() {
        this.url = ""
    }

    function bt() {
        this.id = "";
        this.name = "";
        this.technique = ""
    }

    function br() {
        this.url = ""
    }

    function ki() {
        this.id = "";
        this.name = "";
        this.joints = [];
        this.links = []
    }

    function kr() {
        this.sid = "";
        this.name = "";
        this.axis = new THREE.Vector3;
        this.limits = {min: 0, max: 0};
        this.type = "";
        this.static = !1;
        this.zeroPosition = 0;
        this.middlePosition = 0
    }

    function di() {
        this.sid = "";
        this.name = "";
        this.transforms = [];
        this.attachments = []
    }

    function dr() {
        this.joint = "";
        this.transforms = [];
        this.links = []
    }

    function gu(n) {
        var t = n.getAttribute("id");
        return e[t] != undefined ? e[t] : (e[t] = new tt(t).parse(n), e[t])
    }

    function nf(n) {
        for (var i = kt(n), r = [], t = 0, u = i.length; t < u; t++)r.push(i[t] === "true" || i[t] === "1" ? !0 : !1);
        return r
    }

    function rt(n) {
        for (var i = kt(n), r = [], t = 0, u = i.length; t < u; t++)r.push(parseFloat(i[t]));
        return r
    }

    function ot(n) {
        for (var i = kt(n), r = [], t = 0, u = i.length; t < u; t++)r.push(parseInt(i[t], 10));
        return r
    }

    function kt(n) {
        return n.length > 0 ? tf(n).split(/\s+/) : []
    }

    function tf(n) {
        return n.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function st(n, t, i) {
        return n.hasAttribute(t) ? parseInt(n.getAttribute(t), 10) : i
    }

    function rf(n, t) {
        loader = new THREE.ImageLoader;
        loader.load(t, function (t) {
            n.image = t;
            n.needsUpdate = !0
        })
    }

    function gr(n, t) {
        n.doubleSided = !1;
        var i = t.querySelectorAll("extra double_sided")[0];
        i && i && parseInt(i.textContent, 10) === 1 && (n.doubleSided = !0)
    }

    function uf() {
        if (n.convertUpAxis !== !0 || ut === n.upAxis)i = null; else switch (ut) {
            case"X":
                i = n.upAxis === "Y" ? "XtoY" : "XtoZ";
                break;
            case"Y":
                i = n.upAxis === "X" ? "YtoX" : "YtoZ";
                break;
            case"Z":
                i = n.upAxis === "X" ? "ZtoX" : "ZtoY"
        }
    }

    function t(t, r) {
        var u;
        if (n.convertUpAxis === !0 && ut !== n.upAxis)switch (i) {
            case"XtoY":
                u = t[0];
                t[0] = r * t[1];
                t[1] = u;
                break;
            case"XtoZ":
                u = t[2];
                t[2] = t[1];
                t[1] = t[0];
                t[0] = u;
                break;
            case"YtoX":
                u = t[0];
                t[0] = t[1];
                t[1] = r * u;
                break;
            case"YtoZ":
                u = t[1];
                t[1] = r * t[2];
                t[2] = u;
                break;
            case"ZtoX":
                u = t[0];
                t[0] = t[1];
                t[1] = t[2];
                t[2] = u;
                break;
            case"ZtoY":
                u = t[1];
                t[1] = t[2];
                t[2] = r * u
        }
    }

    function ff(t, r) {
        if (n.convertUpAxis !== !0 || ut === n.upAxis)return r;
        switch (t) {
            case"X":
                r = i === "XtoY" ? r * -1 : r;
                break;
            case"Y":
                r = i === "YtoZ" || i === "YtoX" ? r * -1 : r;
                break;
            case"Z":
                r = i === "ZtoY" ? r * -1 : r
        }
        return r
    }

    function dt(n, i) {
        var r = [n[i], n[i + 1], n[i + 2]];
        return t(r, -1), new THREE.Vector3(r[0], r[1], r[2])
    }

    function gi(i) {
        if (n.convertUpAxis) {
            var r = [i[0], i[4], i[8]];
            t(r, -1);
            i[0] = r[0];
            i[4] = r[1];
            i[8] = r[2];
            r = [i[1], i[5], i[9]];
            t(r, -1);
            i[1] = r[0];
            i[5] = r[1];
            i[9] = r[2];
            r = [i[2], i[6], i[10]];
            t(r, -1);
            i[2] = r[0];
            i[6] = r[1];
            i[10] = r[2];
            r = [i[0], i[1], i[2]];
            t(r, -1);
            i[0] = r[0];
            i[1] = r[1];
            i[2] = r[2];
            r = [i[4], i[5], i[6]];
            t(r, -1);
            i[4] = r[0];
            i[5] = r[1];
            i[6] = r[2];
            r = [i[8], i[9], i[10]];
            t(r, -1);
            i[8] = r[0];
            i[9] = r[1];
            i[10] = r[2];
            r = [i[3], i[7], i[11]];
            t(r, -1);
            i[3] = r[0];
            i[7] = r[1];
            i[11] = r[2]
        }
        return (new THREE.Matrix4).set(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15])
    }

    function ef(n) {
        if (n > -1 && n < 3)n = nu(["X", "Y", "Z"][n]), n = {X: 0, Y: 1, Z: 2}[n];
        return n
    }

    function nu(t) {
        if (n.convertUpAxis)switch (t) {
            case"X":
                switch (i) {
                    case"XtoY":
                    case"XtoZ":
                    case"YtoX":
                        t = "Y";
                        break;
                    case"ZtoX":
                        t = "Z"
                }
                break;
            case"Y":
                switch (i) {
                    case"XtoY":
                    case"YtoX":
                    case"ZtoX":
                        t = "X";
                        break;
                    case"XtoZ":
                    case"YtoZ":
                    case"ZtoY":
                        t = "Z"
                }
                break;
            case"Z":
                switch (i) {
                    case"XtoZ":
                        t = "X";
                        break;
                    case"YtoZ":
                    case"ZtoX":
                    case"ZtoY":
                        t = "Y"
                }
        }
        return t
    }

    var l = null, g = null, r, b, gt = null, e = {}, ht = {}, nt = {}, a = {}, y = {}, ni = {}, ti = {}, ii = {}, ri = {}, ui, fi, ei, oi, nr, ct, lt, tr = THREE.SmoothShading, n = {
        centerGeometry: !1,
        convertUpAxis: !1,
        subdivideFaces: !0,
        upAxis: "Y",
        defaultEnvMap: null
    }, ir = 1, ut = "Y", i = null;
    return ci.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), t = 0; t < n.childNodes.length; t++)i = n.childNodes[t], i.nodeName === "init_from" && (this.init_from = i.textContent);
        return this
    }, or.prototype.parse = function (n) {
        var i, t;
        for (this.id = n.getAttribute("id"), this.name = n.getAttribute("name"), this.type = "none", i = 0; i < n.childNodes.length; i++) {
            t = n.childNodes[i];
            switch (t.nodeName) {
                case"skin":
                    this.skin = (new at).parse(t);
                    this.type = t.nodeName;
                    break;
                case"morph":
                    this.morph = (new li).parse(t);
                    this.type = t.nodeName
            }
        }
        return this
    }, li.prototype.parse = function (n) {
        var e = {}, u = [], t, r, f, i;
        for (this.method = n.getAttribute("method"), this.source = n.getAttribute("source").replace(/^#/, ""), t = 0; t < n.childNodes.length; t++)if (r = n.childNodes[t], r.nodeType == 1)switch (r.nodeName) {
            case"source":
                i = (new tt).parse(r);
                e[i.id] = i;
                break;
            case"targets":
                u = this.parseInputs(r);
                break;
            default:
                console.log(r.nodeName)
        }
        for (t = 0; t < u.length; t++) {
            f = u[t];
            i = e[f.source];
            switch (f.semantic) {
                case"MORPH_TARGET":
                    this.targets = i.read();
                    break;
                case"MORPH_WEIGHT":
                    this.weights = i.read()
            }
        }
        return this
    }, li.prototype.parseInputs = function (n) {
        for (var r = [], i, t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"input":
                r.push((new d).parse(i))
        }
        return r
    }, at.prototype.parse = function (n) {
        var r = {}, f, e, i, t, o, u;
        for (this.source = n.getAttribute("source").replace(/^#/, ""), this.invBindMatrices = [], this.joints = [], this.weights = [], i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"bind_shape_matrix":
                o = rt(t.textContent);
                this.bindShapeMatrix = gi(o);
                break;
            case"source":
                u = (new tt).parse(t);
                r[u.id] = u;
                break;
            case"joints":
                f = t;
                break;
            case"vertex_weights":
                e = t;
                break;
            default:
                console.log(t.nodeName)
        }
        return this.parseJoints(f, r), this.parseWeights(e, r), this
    }, at.prototype.parseJoints = function (n, t) {
        for (var r, u, f, i = 0; i < n.childNodes.length; i++)if (r = n.childNodes[i], r.nodeType == 1)switch (r.nodeName) {
            case"input":
                u = (new d).parse(r);
                f = t[u.source];
                u.semantic === "JOINT" ? this.joints = f.read() : u.semantic === "INV_BIND_MATRIX" && (this.invBindMatrices = f.read())
        }
    }, at.prototype.parseWeights = function (n, t) {
        for (var v, c, e = [], u, l, y, f, o, s, h, a, r, i = 0; i < n.childNodes.length; i++)if (u = n.childNodes[i], u.nodeType == 1)switch (u.nodeName) {
            case"input":
                e.push((new d).parse(u));
                break;
            case"v":
                v = ot(u.textContent);
                break;
            case"vcount":
                c = ot(u.textContent)
        }
        for (l = 0, i = 0; i < c.length; i++) {
            for (y = c[i], f = [], r = 0; r < y; r++) {
                for (o = {}, s = 0; s < e.length; s++) {
                    h = e[s];
                    a = v[l + h.offset];
                    switch (h.semantic) {
                        case"JOINT":
                            o.joint = a;
                            break;
                        case"WEIGHT":
                            o.weight = t[h.source].data[a]
                    }
                }
                f.push(o);
                l += e.length
            }
            for (r = 0; r < f.length; r++)f[r].index = i;
            this.weights.push(f)
        }
    }, vt.prototype.getChildById = function (n, t) {
        for (var r, i = 0; i < this.nodes.length; i++)if (r = this.nodes[i].getChildById(n, t), r)return r;
        return null
    }, vt.prototype.getChildBySid = function (n, t) {
        for (var r, i = 0; i < this.nodes.length; i++)if (r = this.nodes[i].getChildBySid(n, t), r)return r;
        return null
    }, vt.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), this.name = n.getAttribute("name"), this.nodes = [], t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"node":
                this.nodes.push((new h).parse(i))
        }
        return this
    }, h.prototype.getChannelForTransform = function (n) {
        for (var u, f = 0; f < this.channels.length; f++) {
            var e = this.channels[f], r = e.target.split("/"), c = r.shift(), t = r.shift(), o = t.indexOf(".") >= 0, s = t.indexOf("(") >= 0, i, h;
            if (o)r = t.split("."), t = r.shift(), h = r.shift(); else if (s)for (i = t.split("("), t = i.shift(), u = 0; u < i.length; u++)i[u] = parseInt(i[u].replace(/\)/, ""));
            if (t === n)return e.info = {sid: t, dotSyntax: o, arrSyntax: s, arrIndices: i}, e
        }
        return null
    }, h.prototype.getChildById = function (n, t) {
        var i, r;
        if (this.id === n)return this;
        if (t)for (i = 0; i < this.nodes.length; i++)if (r = this.nodes[i].getChildById(n, t), r)return r;
        return null
    }, h.prototype.getChildBySid = function (n, t) {
        var i, r;
        if (this.sid === n)return this;
        if (t)for (i = 0; i < this.nodes.length; i++)if (r = this.nodes[i].getChildBySid(n, t), r)return r;
        return null
    }, h.prototype.getTransformBySid = function (n) {
        for (var t = 0; t < this.transforms.length; t++)if (this.transforms[t].sid === n)return this.transforms[t];
        return null
    }, h.prototype.parse = function (n) {
        var u, i, t, r;
        for (this.id = n.getAttribute("id"), this.sid = n.getAttribute("sid"), this.name = n.getAttribute("name"), this.type = n.getAttribute("type"), this.layer = n.getAttribute("layer"), this.type = this.type === "JOINT" ? this.type : "NODE", this.nodes = [], this.transforms = [], this.geometries = [], this.cameras = [], this.lights = [], this.controllers = [], this.matrix = new THREE.Matrix4, i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"node":
                this.nodes.push((new h).parse(t));
                break;
            case"instance_camera":
                this.cameras.push((new wr).parse(t));
                break;
            case"instance_controller":
                this.controllers.push((new ai).parse(t));
                break;
            case"instance_geometry":
                this.geometries.push((new ft).parse(t));
                break;
            case"instance_light":
                this.lights.push((new br).parse(t));
                break;
            case"instance_node":
                u = t.getAttribute("url").replace(/^#/, "");
                r = au(u);
                r && this.nodes.push((new h).parse(r));
                break;
            case"rotate":
            case"translate":
            case"scale":
            case"matrix":
            case"lookat":
            case"skew":
                this.transforms.push((new k).parse(t));
                break;
            case"extra":
                break;
            default:
                console.log(t.nodeName)
        }
        return this.channels = vu(this), yu(this), this.updateMatrix(), this
    }, h.prototype.updateMatrix = function () {
        this.matrix.identity();
        for (var n = 0; n < this.transforms.length; n++)this.transforms[n].apply(this.matrix)
    }, k.prototype.parse = function (n) {
        return this.sid = n.getAttribute("sid"), this.type = n.nodeName, this.data = rt(n.textContent), this.convert(), this
    }, k.prototype.convert = function () {
        switch (this.type) {
            case"matrix":
                this.obj = gi(this.data);
                break;
            case"rotate":
                this.angle = THREE.Math.degToRad(this.data[3]);
            case"translate":
                t(this.data, -1);
                this.obj = new THREE.Vector3(this.data[0], this.data[1], this.data[2]);
                break;
            case"scale":
                t(this.data, 1);
                this.obj = new THREE.Vector3(this.data[0], this.data[1], this.data[2]);
                break;
            default:
                console.log("Can not convert Transform of type " + this.type)
        }
    }, k.prototype.apply = function () {
        var n = new THREE.Matrix4;
        return function (t) {
            switch (this.type) {
                case"matrix":
                    t.multiply(this.obj);
                    break;
                case"translate":
                    t.multiply(n.makeTranslation(this.obj.x, this.obj.y, this.obj.z));
                    break;
                case"rotate":
                    t.multiply(n.makeRotationAxis(this.obj, this.angle));
                    break;
                case"scale":
                    t.scale(this.obj)
            }
        }
    }(), k.prototype.update = function (n, t) {
        var i = ["X", "Y", "Z", "ANGLE"], r;
        switch (this.type) {
            case"matrix":
                if (t)if (t.length === 1)switch (t[0]) {
                    case 0:
                        this.obj.n11 = n[0];
                        this.obj.n21 = n[1];
                        this.obj.n31 = n[2];
                        this.obj.n41 = n[3];
                        break;
                    case 1:
                        this.obj.n12 = n[0];
                        this.obj.n22 = n[1];
                        this.obj.n32 = n[2];
                        this.obj.n42 = n[3];
                        break;
                    case 2:
                        this.obj.n13 = n[0];
                        this.obj.n23 = n[1];
                        this.obj.n33 = n[2];
                        this.obj.n43 = n[3];
                        break;
                    case 3:
                        this.obj.n14 = n[0];
                        this.obj.n24 = n[1];
                        this.obj.n34 = n[2];
                        this.obj.n44 = n[3]
                } else t.length === 2 ? (r = "n" + (t[0] + 1) + (t[1] + 1), this.obj[r] = n) : console.log("Incorrect addressing of matrix in transform."); else this.obj.copy(n);
                break;
            case"translate":
            case"scale":
                Object.prototype.toString.call(t) === "[object Array]" && (t = i[t[0]]);
                switch (t) {
                    case"X":
                        this.obj.x = n;
                        break;
                    case"Y":
                        this.obj.y = n;
                        break;
                    case"Z":
                        this.obj.z = n;
                        break;
                    default:
                        this.obj.x = n[0];
                        this.obj.y = n[1];
                        this.obj.z = n[2]
                }
                break;
            case"rotate":
                Object.prototype.toString.call(t) === "[object Array]" && (t = i[t[0]]);
                switch (t) {
                    case"X":
                        this.obj.x = n;
                        break;
                    case"Y":
                        this.obj.y = n;
                        break;
                    case"Z":
                        this.obj.z = n;
                        break;
                    case"ANGLE":
                        this.angle = THREE.Math.degToRad(n);
                        break;
                    default:
                        this.obj.x = n[0];
                        this.obj.y = n[1];
                        this.obj.z = n[2];
                        this.angle = THREE.Math.degToRad(n[3])
                }
        }
    }, ai.prototype.parse = function (n) {
        var i, t, u, r, f;
        for (this.url = n.getAttribute("url").replace(/^#/, ""), this.skeleton = [], this.instance_material = [], i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType === 1)switch (t.nodeName) {
            case"skeleton":
                this.skeleton.push(t.textContent.replace(/^#/, ""));
                break;
            case"bind_material":
                for (u = t.querySelectorAll("instance_material"), r = 0; r < u.length; r++)f = u[r], this.instance_material.push((new vi).parse(f))
        }
        return this
    }, vi.prototype.parse = function (n) {
        return this.symbol = n.getAttribute("symbol"), this.target = n.getAttribute("target").replace(/^#/, ""), this
    }, ft.prototype.parse = function (n) {
        var t, i, u, r, f;
        for (this.url = n.getAttribute("url").replace(/^#/, ""), this.instance_material = [], t = 0; t < n.childNodes.length; t++)if ((i = n.childNodes[t], i.nodeType == 1) && i.nodeName === "bind_material") {
            for (u = i.querySelectorAll("instance_material"), r = 0; r < u.length; r++)f = u[r], this.instance_material.push((new vi).parse(f));
            break
        }
        return this
    }, sr.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), gr(this, n), t = 0; t < n.childNodes.length; t++) {
            i = n.childNodes[t];
            switch (i.nodeName) {
                case"mesh":
                    this.mesh = new yi(this).parse(i)
            }
        }
        return this
    }, yi.prototype.parse = function (n) {
        var i, r, t, u;
        for (this.primitives = [], t = 0; t < n.childNodes.length; t++) {
            i = n.childNodes[t];
            switch (i.nodeName) {
                case"source":
                    gu(i);
                    break;
                case"vertices":
                    this.vertices = (new cr).parse(i);
                    break;
                case"linestrips":
                    this.primitives.push((new et).parse(i));
                    break;
                case"triangles":
                    this.primitives.push((new pt).parse(i));
                    break;
                case"polygons":
                    this.primitives.push((new c).parse(i));
                    break;
                case"polylist":
                    this.primitives.push((new yt).parse(i))
            }
        }
        if (this.geometry3js = new THREE.Geometry, this.vertices === null)return this;
        for (r = e[this.vertices.input.POSITION.source].data, t = 0; t < r.length; t += 3)this.geometry3js.vertices.push(dt(r, t).clone());
        for (t = 0; t < this.primitives.length; t++)u = this.primitives[t], u.setVertices(this.vertices), this.handlePrimitive(u, this.geometry3js);
        return this.geometry3js.calcNormals && (this.geometry3js.computeVertexNormals(), delete this.geometry3js.calcNormals), this
    }, yi.prototype.handlePrimitive = function (t, i) {
        var ot, tt, it, rt, ut, k, a, ht, ct, u, y;
        if (t instanceof et) {
            i.isLineStrip = !0;
            return
        }
        for (var s, st = t.p, g = t.inputs, r, ft, c, f, b, lt = 0, p = 3, d = 0, nt = [], w = 0; w < g.length; w++) {
            r = g[w];
            ot = r.offset + 1;
            d = d < ot ? ot : d;
            switch (r.semantic) {
                case"TEXCOORD":
                    nt.push(r.set)
            }
        }
        for (tt = 0; tt < st.length; ++tt)for (it = st[tt], rt = 0; rt < it.length;) {
            var o = [], l = [], v = null, h = [];
            for (p = t.vcount ? t.vcount.length ? t.vcount[lt++] : t.vcount : it.length / d, w = 0; w < p; w++)for (s = 0; s < g.length; s++) {
                r = g[s];
                f = e[r.source];
                ft = it[rt + w * d + r.offset];
                b = f.accessor.params.length;
                c = ft * b;
                switch (r.semantic) {
                    case"VERTEX":
                        o.push(ft);
                        break;
                    case"NORMAL":
                        l.push(dt(f.data, c));
                        break;
                    case"TEXCOORD":
                        v = v || {};
                        v[r.set] === undefined && (v[r.set] = []);
                        v[r.set].push(new THREE.Vector2(f.data[c], f.data[c + 1]));
                        break;
                    case"COLOR":
                        h.push((new THREE.Color).setRGB(f.data[c], f.data[c + 1], f.data[c + 2]))
                }
            }
            if (l.length === 0)if (r = this.vertices.input.NORMAL, r)for (f = e[r.source], b = f.accessor.params.length, u = 0, y = o.length; u < y; u++)l.push(dt(f.data, o[u] * b)); else i.calcNormals = !0;
            if (!v && (v = {}, r = this.vertices.input.TEXCOORD, r))for (nt.push(r.set), f = e[r.source], b = f.accessor.params.length, u = 0, y = o.length; u < y; u++)c = o[u] * b, v[r.set] === undefined && (v[r.set] = []), v[r.set].push(new THREE.Vector2(f.data[c], 1 - f.data[c + 1]));
            if (h.length === 0 && (r = this.vertices.input.COLOR, r))for (f = e[r.source], b = f.accessor.params.length, u = 0, y = o.length; u < y; u++)c = o[u] * b, h.push((new THREE.Color).setRGB(f.data[c], f.data[c + 1], f.data[c + 2]));
            if (ut = null, k = [], p === 3)k.push(new THREE.Face3(o[0], o[1], o[2], l, h.length ? h : new THREE.Color)); else if (p === 4)k.push(new THREE.Face3(o[0], o[1], o[3], [l[0].clone(), l[1].clone(), l[3].clone()], h.length ? [h[0], h[1], h[3]] : new THREE.Color)), k.push(new THREE.Face3(o[1], o[2], o[3], [l[1].clone(), l[2].clone(), l[3].clone()], h.length ? [h[1], h[2], h[3]] : new THREE.Color)); else if (p > 4 && n.subdivideFaces)for (ct = h.length ? h : new THREE.Color, s = 1; s < p - 1;)k.push(new THREE.Face3(o[0], o[s], o[s + 1], [l[0].clone(), l[s++].clone(), l[s].clone()], ct));
            if (k.length)for (u = 0, y = k.length; u < y; u++)for (ut = k[u], ut.daeMaterial = t.material, i.faces.push(ut), s = 0; s < nt.length; s++)a = v[nt[s]], ht = p > 4 ? [a[0], a[u + 1], a[u + 2]] : p === 4 ? u === 0 ? [a[0], a[1], a[3]] : [a[1].clone(), a[2], a[3].clone()] : [a[0], a[1], a[2]], i.faceVertexUvs[s] === undefined && (i.faceVertexUvs[s] = []), i.faceVertexUvs[s].push(ht); else console.log("dropped face with vcount " + p + " for geometry with id: " + i.id);
            rt += d * p
        }
    }, c.prototype.setVertices = function (n) {
        for (var t = 0; t < this.inputs.length; t++)this.inputs[t].source === n.id && (this.inputs[t].source = n.input.POSITION.source)
    }, c.prototype.parse = function (n) {
        var t, i;
        for (this.material = n.getAttribute("material"), this.count = st(n, "count", 0), t = 0; t < n.childNodes.length; t++) {
            i = n.childNodes[t];
            switch (i.nodeName) {
                case"input":
                    this.inputs.push((new d).parse(n.childNodes[t]));
                    break;
                case"vcount":
                    this.vcount = ot(i.textContent);
                    break;
                case"p":
                    this.p.push(ot(i.textContent));
                    break;
                case"ph":
                    console.warn("polygon holes not yet supported!")
            }
        }
        return this
    }, yt.prototype = Object.create(c.prototype), yt.prototype.constructor = yt, et.prototype = Object.create(c.prototype), et.prototype.constructor = et, pt.prototype = Object.create(c.prototype), pt.prototype.constructor = pt, hr.prototype.parse = function (n) {
        var t, i, r;
        for (this.params = [], this.source = n.getAttribute("source"), this.count = st(n, "count", 0), this.stride = st(n, "stride", 0), t = 0; t < n.childNodes.length; t++)i = n.childNodes[t], i.nodeName === "param" && (r = {}, r.name = i.getAttribute("name"), r.type = i.getAttribute("type"), this.params.push(r));
        return this
    }, cr.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), t = 0; t < n.childNodes.length; t++)n.childNodes[t].nodeName === "input" && (i = (new d).parse(n.childNodes[t]), this.input[i.semantic] = i);
        return this
    }, d.prototype.parse = function (n) {
        return this.semantic = n.getAttribute("semantic"), this.source = n.getAttribute("source").replace(/^#/, ""), this.set = st(n, "set", -1), this.offset = st(n, "offset", 0), this.semantic === "TEXCOORD" && this.set < 0 && (this.set = 0), this
    }, tt.prototype.parse = function (n) {
        var r, t, i;
        for (this.id = n.getAttribute("id"), r = 0; r < n.childNodes.length; r++) {
            t = n.childNodes[r];
            switch (t.nodeName) {
                case"bool_array":
                    this.data = nf(t.textContent);
                    this.type = t.nodeName;
                    break;
                case"float_array":
                    this.data = rt(t.textContent);
                    this.type = t.nodeName;
                    break;
                case"int_array":
                    this.data = ot(t.textContent);
                    this.type = t.nodeName;
                    break;
                case"IDREF_array":
                case"Name_array":
                    this.data = kt(t.textContent);
                    this.type = t.nodeName;
                    break;
                case"technique_common":
                    for (i = 0; i < t.childNodes.length; i++)if (t.childNodes[i].nodeName === "accessor") {
                        this.accessor = (new hr).parse(t.childNodes[i]);
                        break
                    }
            }
        }
        return this
    }, tt.prototype.read = function () {
        var t = [], i = this.accessor.params[0], n, r, u;
        switch (i.type) {
            case"IDREF":
            case"Name":
            case"name":
            case"float":
                return this.data;
            case"float4x4":
                for (n = 0; n < this.data.length; n += 16)r = this.data.slice(n, n + 16), u = gi(r), t.push(u);
                break;
            default:
                console.log("ColladaLoader: Source: Read dont know how to read " + i.type + ".")
        }
        return t
    }, lr.prototype.parse = function (n) {
        this.id = n.getAttribute("id");
        this.name = n.getAttribute("name");
        for (var t = 0; t < n.childNodes.length; t++)if (n.childNodes[t].nodeName === "instance_effect") {
            this.instance_effect = (new yr).parse(n.childNodes[t]);
            break
        }
        return this
    }, f.prototype.isColor = function () {
        return this.texture === null
    }, f.prototype.isTexture = function () {
        return this.texture != null
    }, f.prototype.parse = function (n) {
        var r, t, i;
        for (n.nodeName === "transparent" && (this.opaque = n.getAttribute("opaque")), r = 0; r < n.childNodes.length; r++)if (t = n.childNodes[r], t.nodeType == 1)switch (t.nodeName) {
            case"color":
                i = rt(t.textContent);
                this.color = new THREE.Color;
                this.color.setRGB(i[0], i[1], i[2]);
                this.color.a = i[3];
                break;
            case"texture":
                this.texture = t.getAttribute("texture");
                this.texcoord = t.getAttribute("texcoord");
                this.texOpts = {offsetU: 0, offsetV: 0, repeatU: 1, repeatV: 1, wrapU: 1, wrapV: 1};
                this.parseTexture(t)
        }
        return this
    }, f.prototype.parseTexture = function (n) {
        var i, t;
        if (!n.childNodes)return this;
        for (n.childNodes[1] && n.childNodes[1].nodeName === "extra" && (n = n.childNodes[1], n.childNodes[1] && n.childNodes[1].nodeName === "technique" && (n = n.childNodes[1])), i = 0; i < n.childNodes.length; i++) {
            t = n.childNodes[i];
            switch (t.nodeName) {
                case"offsetU":
                case"offsetV":
                case"repeatU":
                case"repeatV":
                    this.texOpts[t.nodeName] = parseFloat(t.textContent);
                    break;
                case"wrapU":
                case"wrapV":
                    this.texOpts[t.nodeName] = t.textContent.toUpperCase() === "TRUE" ? 1 : parseInt(t.textContent);
                    break;
                default:
                    this.texOpts[t.nodeName] = t.textContent
            }
        }
        return this
    }, pi.prototype.parse = function (n) {
        for (var t, i, u, r = 0; r < n.childNodes.length; r++)if (t = n.childNodes[r], t.nodeType == 1)switch (t.nodeName) {
            case"emission":
            case"diffuse":
            case"specular":
            case"transparent":
                this[t.nodeName] = (new f).parse(t);
                break;
            case"bump":
                i = t.getAttribute("bumptype");
                i ? i.toLowerCase() === "heightfield" ? this.bump = (new f).parse(t) : i.toLowerCase() === "normalmap" ? this.normal = (new f).parse(t) : (console.error("Shader.prototype.parse: Invalid value for attribute 'bumptype' (" + i + ") - valid bumptypes are 'HEIGHTFIELD' and 'NORMALMAP' - defaulting to 'HEIGHTFIELD'"), this.bump = (new f).parse(t)) : (console.warn("Shader.prototype.parse: Attribute 'bumptype' missing from bump node - defaulting to 'HEIGHTFIELD'"), this.bump = (new f).parse(t));
                break;
            case"shininess":
            case"reflectivity":
            case"index_of_refraction":
            case"transparency":
                u = t.querySelectorAll("float");
                u.length > 0 && (this[t.nodeName] = parseFloat(u[0].textContent))
        }
        return this.create(), this
    }, pi.prototype.create = function () {
        var t = {}, a = !1, p, s, v, i, r, y, e, h, c, o, u, l;
        this.transparency !== undefined && this.transparent !== undefined && (p = this.transparent, s = (this.transparent.color.r + this.transparent.color.g + this.transparent.color.b) / 3 * this.transparency, s > 0 && (a = !0, t.transparent = !0, t.opacity = 1 - s));
        v = {
            diffuse: "map",
            ambient: "lightMap",
            specular: "specularMap",
            emission: "emissionMap",
            bump: "bumpMap",
            normal: "normalMap"
        };
        for (i in this)switch (i) {
            case"ambient":
            case"emission":
            case"diffuse":
            case"specular":
            case"bump":
            case"normal":
                r = this[i];
                r instanceof f && (r.isTexture() ? (y = r.texture, e = this.effect.sampler[y], e !== undefined && e.source !== undefined && (h = this.effect.surface[e.source], h !== undefined && (c = ht[h.init_from], c && (o = nr + c.init_from, l = THREE.Loader.Handlers.get(o), l !== null ? u = l.load(o) : (u = new THREE.Texture, rf(u, o)), u.wrapS = r.texOpts.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, u.wrapT = r.texOpts.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, u.offset.x = r.texOpts.offsetU, u.offset.y = r.texOpts.offsetV, u.repeat.x = r.texOpts.repeatU, u.repeat.y = r.texOpts.repeatV, t[v[i]] = u, i === "emission" && (t.emissive = 16777215))))) : i !== "diffuse" && a || (i === "emission" ? t.emissive = r.color.getHex() : t[i] = r.color.getHex()));
                break;
            case"shininess":
                t[i] = this[i];
                break;
            case"reflectivity":
                t[i] = this[i];
                t[i] > 0 && (t.envMap = n.defaultEnvMap);
                t.combine = THREE.MixOperation;
                break;
            case"index_of_refraction":
                t.refractionRatio = this[i];
                this[i] !== 1 && (t.envMap = n.defaultEnvMap)
        }
        t.shading = tr;
        t.side = this.effect.doubleSided ? THREE.DoubleSide : THREE.FrontSide;
        switch (this.type) {
            case"constant":
                t.emissive != undefined && (t.color = t.emissive);
                this.material = new THREE.MeshBasicMaterial(t);
                break;
            case"phong":
            case"blinn":
                t.diffuse != undefined && (t.color = t.diffuse);
                this.material = new THREE.MeshPhongMaterial(t);
                break;
            case"lambert":
            default:
                t.diffuse != undefined && (t.color = t.diffuse);
                this.material = new THREE.MeshLambertMaterial(t)
        }
        return this.material
    }, ar.prototype.parse = function (n) {
        for (var t, i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"init_from":
                this.init_from = t.textContent;
                break;
            case"format":
                this.format = t.textContent;
                break;
            default:
                console.log("unhandled Surface prop: " + t.nodeName)
        }
        return this
    }, vr.prototype.parse = function (n) {
        for (var t, i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"source":
                this.source = t.textContent;
                break;
            case"minfilter":
                this.minfilter = t.textContent;
                break;
            case"magfilter":
                this.magfilter = t.textContent;
                break;
            case"mipfilter":
                this.mipfilter = t.textContent;
                break;
            case"wrap_s":
                this.wrap_s = t.textContent;
                break;
            case"wrap_t":
                this.wrap_t = t.textContent;
                break;
            default:
                console.log("unhandled Sampler2D prop: " + t.nodeName)
        }
        return this
    }, p.prototype.create = function () {
        if (this.shader === null)return null
    }, p.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), this.name = n.getAttribute("name"), gr(this, n), this.shader = null, t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"profile_COMMON":
                this.parseTechnique(this.parseProfileCOMMON(i))
        }
        return this
    }, p.prototype.parseNewparam = function (n) {
        for (var r = n.getAttribute("sid"), t, i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"surface":
                this.surface[r] = new ar(this).parse(t);
                break;
            case"sampler2D":
                this.sampler[r] = new vr(this).parse(t);
                break;
            case"extra":
                break;
            default:
                console.log(t.nodeName)
        }
    }, p.prototype.parseProfileCOMMON = function (n) {
        for (var u, t, r, i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"profile_COMMON":
                this.parseProfileCOMMON(t);
                break;
            case"technique":
                u = t;
                break;
            case"newparam":
                this.parseNewparam(t);
                break;
            case"image":
                r = (new ci).parse(t);
                ht[r.id] = r;
                break;
            case"extra":
                break;
            default:
                console.log(t.nodeName)
        }
        return u
    }, p.prototype.parseTechnique = function (n) {
        for (var t, i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"constant":
            case"lambert":
            case"blinn":
            case"phong":
                this.shader = new pi(t.nodeName, this).parse(t);
                break;
            case"extra":
                this.parseExtra(t)
        }
    }, p.prototype.parseExtra = function (n) {
        for (var i, t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"technique":
                this.parseExtraTechnique(i)
        }
    }, p.prototype.parseExtraTechnique = function (n) {
        for (var i, t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"bump":
                this.shader.parse(n)
        }
    }, yr.prototype.parse = function (n) {
        return this.url = n.getAttribute("url").replace(/^#/, ""), this
    }, wi.prototype.parse = function (n) {
        var f, t, r, u, i;
        for (this.id = n.getAttribute("id"), this.name = n.getAttribute("name"), this.source = {}, f = 0; f < n.childNodes.length; f++)if (t = n.childNodes[f], t.nodeType == 1)switch (t.nodeName) {
            case"animation":
                r = (new wi).parse(t);
                for (i in r.source)this.source[i] = r.source[i];
                for (u = 0; u < r.channel.length; u++)this.channel.push(r.channel[u]), this.sampler.push(r.sampler[u]);
                break;
            case"source":
                i = (new tt).parse(t);
                this.source[i.id] = i;
                break;
            case"sampler":
                this.sampler.push(new wt(this).parse(t));
                break;
            case"channel":
                this.channel.push(new pr(this).parse(t))
        }
        return this
    }, pr.prototype.parse = function (n) {
        var i, u;
        this.source = n.getAttribute("source").replace(/^#/, "");
        this.target = n.getAttribute("target");
        var r = this.target.split("/"), o = r.shift(), t = r.shift(), f = t.indexOf(".") >= 0, e = t.indexOf("(") >= 0;
        if (f)r = t.split("."), this.sid = r.shift(), this.member = r.shift(); else if (e) {
            for (i = t.split("("), this.sid = i.shift(), u = 0; u < i.length; u++)i[u] = parseInt(i[u].replace(/\)/, ""));
            this.arrIndices = i
        } else this.sid = t;
        return this.fullSid = t, this.dotSyntax = f, this.arrSyntax = e, this
    }, wt.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), this.inputs = [], t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"input":
                this.inputs.push((new d).parse(i))
        }
        return this
    }, wt.prototype.create = function () {
        for (var i, t, n = 0; n < this.inputs.length; n++) {
            i = this.inputs[n];
            t = this.animation.source[i.source];
            switch (i.semantic) {
                case"INPUT":
                    this.input = t.read();
                    break;
                case"OUTPUT":
                    this.output = t.read();
                    this.strideOut = t.accessor.stride;
                    break;
                case"INTERPOLATION":
                    this.interpolation = t.read();
                    break;
                case"IN_TANGENT":
                    break;
                case"OUT_TANGENT":
                    break;
                default:
                    console.log(i.semantic)
            }
        }
        if (this.startTime = 0, this.endTime = 0, this.duration = 0, this.input.length) {
            for (this.startTime = 1e8, this.endTime = -1e8, n = 0; n < this.input.length; n++)this.startTime = Math.min(this.startTime, this.input[n]), this.endTime = Math.max(this.endTime, this.input[n]);
            this.duration = this.endTime - this.startTime
        }
    }, wt.prototype.getData = function (n, i, r) {
        var u, f;
        if (n === "matrix" && this.strideOut === 16)u = this.output[i]; else if (this.strideOut > 1) {
            for (u = [], i *= this.strideOut, f = 0; f < this.strideOut; ++f)u[f] = this.output[i + f];
            if (this.strideOut === 3)switch (n) {
                case"rotate":
                case"translate":
                    t(u, -1);
                    break;
                case"scale":
                    t(u, 1)
            } else this.strideOut === 4 && n === "matrix" && t(u, -1)
        } else u = this.output[i], r && n === "translate" && (u = ff(r, u));
        return u
    }, it.prototype.addTarget = function (n, t, i, r) {
        this.targets.push({sid: n, member: i, transform: t, data: r})
    }, it.prototype.apply = function (n) {
        for (var t, i = 0; i < this.targets.length; ++i)t = this.targets[i], n && t.sid !== n || t.transform.update(t.data, t.member)
    }, it.prototype.getTarget = function (n) {
        for (var t = 0; t < this.targets.length; ++t)if (this.targets[t].sid === n)return this.targets[t];
        return null
    }, it.prototype.hasTarget = function (n) {
        for (var t = 0; t < this.targets.length; ++t)if (this.targets[t].sid === n)return !0;
        return !1
    }, it.prototype.interpolate = function (n, t) {
        for (var i, s, e, r, o = 0, h = this.targets.length; o < h; o++) {
            if (i = this.targets[o], s = n.getTarget(i.sid), i.transform.type !== "matrix" && s) {
                var u = (t - this.time) / (n.time - this.time), c = s.data, f = i.data;
                if (u < 0 && (u = 0), u > 1 && (u = 1), f.length)for (e = [], r = 0; r < f.length; ++r)e[r] = f[r] + (c[r] - f[r]) * u; else e = f + (c - f) * u
            } else e = i.data;
            i.transform.update(e, i.member)
        }
    }, bi.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), this.name = n.getAttribute("name"), t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"optics":
                this.parseOptics(i)
        }
        return this
    }, bi.prototype.parseOptics = function (n) {
        for (var f, r, e, o, i, t, u = 0; u < n.childNodes.length; u++)if (n.childNodes[u].nodeName === "technique_common")for (f = n.childNodes[u], r = 0; r < f.childNodes.length; r++)if (this.technique = f.childNodes[r].nodeName, this.technique === "perspective")for (e = f.childNodes[r], i = 0; i < e.childNodes.length; i++) {
            t = e.childNodes[i];
            switch (t.nodeName) {
                case"yfov":
                    this.yfov = t.textContent;
                    break;
                case"xfov":
                    this.xfov = t.textContent;
                    break;
                case"znear":
                    this.znear = t.textContent;
                    break;
                case"zfar":
                    this.zfar = t.textContent;
                    break;
                case"aspect_ratio":
                    this.aspect_ratio = t.textContent
            }
        } else if (this.technique === "orthographic")for (o = f.childNodes[r], i = 0; i < o.childNodes.length; i++) {
            t = o.childNodes[i];
            switch (t.nodeName) {
                case"xmag":
                    this.xmag = t.textContent;
                    break;
                case"ymag":
                    this.ymag = t.textContent;
                    break;
                case"znear":
                    this.znear = t.textContent;
                    break;
                case"zfar":
                    this.zfar = t.textContent;
                    break;
                case"aspect_ratio":
                    this.aspect_ratio = t.textContent
            }
        }
        return this
    }, wr.prototype.parse = function (n) {
        return this.url = n.getAttribute("url").replace(/^#/, ""), this
    }, bt.prototype.parse = function (n) {
        var i, t;
        for (this.id = n.getAttribute("id"), this.name = n.getAttribute("name"), i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"technique_common":
                this.parseCommon(t);
                break;
            case"technique":
                this.parseTechnique(t)
        }
        return this
    }, bt.prototype.parseCommon = function (n) {
        for (var f, u, i, r, e, t = 0; t < n.childNodes.length; t++)switch (n.childNodes[t].nodeName) {
            case"directional":
            case"point":
            case"spot":
            case"ambient":
                for (this.technique = n.childNodes[t].nodeName, f = n.childNodes[t], u = 0; u < f.childNodes.length; u++) {
                    i = f.childNodes[u];
                    switch (i.nodeName) {
                        case"color":
                            r = rt(i.textContent);
                            this.color = new THREE.Color(0);
                            this.color.setRGB(r[0], r[1], r[2]);
                            this.color.a = r[3];
                            break;
                        case"falloff_angle":
                            this.falloff_angle = parseFloat(i.textContent);
                            break;
                        case"quadratic_attenuation":
                            e = parseFloat(i.textContent);
                            this.distance = e ? Math.sqrt(1 / e) : 0
                    }
                }
        }
        return this
    }, bt.prototype.parseTechnique = function (n) {
        var t, i;
        for (this.profile = n.getAttribute("profile"), t = 0; t < n.childNodes.length; t++) {
            i = n.childNodes[t];
            switch (i.nodeName) {
                case"intensity":
                    this.intensity = parseFloat(i.textContent)
            }
        }
        return this
    }, br.prototype.parse = function (n) {
        return this.url = n.getAttribute("url").replace(/^#/, ""), this
    }, ki.prototype.parse = function (n) {
        var t, i;
        for (this.id = n.getAttribute("id"), this.name = n.getAttribute("name"), this.joints = [], this.links = [], t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (i.nodeName) {
            case"technique_common":
                this.parseCommon(i)
        }
        return this
    }, ki.prototype.parseCommon = function (n) {
        for (var i, t = 0; t < n.childNodes.length; t++)if (i = n.childNodes[t], i.nodeType == 1)switch (n.childNodes[t].nodeName) {
            case"joint":
                this.joints.push((new kr).parse(i));
                break;
            case"link":
                this.links.push((new di).parse(i))
        }
        return this
    }, kr.prototype.parse = function (n) {
        var u, f, e, o, i, t, r, s;
        for (this.sid = n.getAttribute("sid"), this.name = n.getAttribute("name"), this.axis = new THREE.Vector3, this.limits = {
            min: 0,
            max: 0
        }, this.type = "", this.static = !1, this.zeroPosition = 0, this.middlePosition = 0, u = n.querySelector("axis"), f = rt(u.textContent), this.axis = dt(f, 0), e = n.querySelector("limits min") ? parseFloat(n.querySelector("limits min").textContent) : -360, o = n.querySelector("limits max") ? parseFloat(n.querySelector("limits max").textContent) : 360, this.limits = {
            min: e,
            max: o
        }, i = ["prismatic", "revolute"], t = 0; t < i.length; t++)r = i[t], s = n.querySelector(r), s && (this.type = r);
        return this.limits.min >= this.limits.max && (this.static = !0), this.middlePosition = (this.limits.min + this.limits.max) / 2, this
    }, di.prototype.parse = function (n) {
        var i, t;
        for (this.sid = n.getAttribute("sid"), this.name = n.getAttribute("name"), this.transforms = [], this.attachments = [], i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"attachment_full":
                this.attachments.push((new dr).parse(t));
                break;
            case"rotate":
            case"translate":
            case"matrix":
                this.transforms.push((new k).parse(t))
        }
        return this
    }, dr.prototype.parse = function (n) {
        var i, t;
        for (this.joint = n.getAttribute("joint").split("/").pop(), this.links = [], i = 0; i < n.childNodes.length; i++)if (t = n.childNodes[i], t.nodeType == 1)switch (t.nodeName) {
            case"link":
                this.links.push((new di).parse(t));
                break;
            case"rotate":
            case"translate":
            case"matrix":
                this.transforms.push((new k).parse(t))
        }
        return this
    }, {load: tu, parse: si, setPreferredShading: iu, applySkin: fr, geometries: y, options: n}
};
THREE.DDSLoader = function () {
    this._parser = THREE.DDSLoader.parse
};
THREE.DDSLoader.prototype = Object.create(THREE.CompressedTextureLoader.prototype);
THREE.DDSLoader.prototype.constructor = THREE.DDSLoader;
THREE.DDSLoader.parse = function (n, t) {
    function h(n) {
        return n.charCodeAt(0) + (n.charCodeAt(1) << 8) + (n.charCodeAt(2) << 16) + (n.charCodeAt(3) << 24)
    }

    function w(n) {
        return String.fromCharCode(n & 255, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255)
    }

    function b(n, t, i, r) {
        for (var c = i * r * 4, o = new Uint8Array(n, t, c), e = new Uint8Array(c), u = 0, f = 0, h, l, a, v, y, s = 0; s < r; s++)for (h = 0; h < i; h++)l = o[f], f++, a = o[f], f++, v = o[f], f++, y = o[f], f++, e[u] = v, u++, e[u] = a, u++, e[u] = l, u++, e[u] = y, u++;
        return e
    }

    var i = {
        mipmaps: [],
        width: 0,
        height: 0,
        format: null,
        mipmapCount: 1
    }, k = h("DXT1"), d = h("DXT3"), g = h("DXT5"), r = new Int32Array(n, 0, 31), e, c, l, v, y, s, o, p;
    if (r[0] !== 542327876)return console.error("THREE.DDSLoader.parse: Invalid magic number in DDS header."), i;
    if (!r[20] & 4)return console.error("THREE.DDSLoader.parse: Unsupported format, must contain a FourCC code."), i;
    c = r[21];
    l = !1;
    switch (c) {
        case k:
            e = 8;
            i.format = THREE.RGB_S3TC_DXT1_Format;
            break;
        case d:
            e = 16;
            i.format = THREE.RGBA_S3TC_DXT3_Format;
            break;
        case g:
            e = 16;
            i.format = THREE.RGBA_S3TC_DXT5_Format;
            break;
        default:
            if (r[22] == 32 && r[23] & 16711680 && r[24] & 65280 && r[25] & 255 && r[26] & 4278190080)l = !0, e = 64, i.format = THREE.RGBAFormat; else return console.error("THREE.DDSLoader.parse: Unsupported FourCC code ", w(c)), i
    }
    i.mipmapCount = 1;
    r[2] & 131072 && t !== !1 && (i.mipmapCount = Math.max(1, r[7]));
    i.isCubemap = r[28] & 512 ? !0 : !1;
    i.width = r[4];
    i.height = r[3];
    var a = r[1] + 4, u = i.width, f = i.height, nt = i.isCubemap ? 6 : 1;
    for (v = 0; v < nt; v++) {
        for (y = 0; y < i.mipmapCount; y++)l ? (o = b(n, a, u, f), s = o.length) : (s = Math.max(4, u) / 4 * Math.max(4, f) / 4 * e, o = new Uint8Array(n, a, s)), p = {
            data: o,
            width: u,
            height: f
        }, i.mipmaps.push(p), a += s, u = Math.max(u * .5, 1), f = Math.max(f * .5, 1);
        u = i.width;
        f = i.height
    }
    return i
};
THREE.MTLLoader = function (n, t, i) {
    this.baseUrl = n;
    this.options = t;
    this.crossOrigin = i
};
THREE.MTLLoader.prototype = {
    constructor: THREE.MTLLoader, load: function (n, t, i, r) {
        var f = this, u = new THREE.XHRLoader;
        u.setCrossOrigin(this.crossOrigin);
        u.load(n, function (n) {
            t(f.parse(n))
        }, i, r)
    }, parse: function (n) {
        for (var h = n.split("\n"), u = {}, c = {}, t, f, i, r, o, s, e = 0; e < h.length; e++)(t = h[e], t = t.trim(), t.length !== 0 && t.charAt(0) !== "#") && (f = t.indexOf(" "), i = f >= 0 ? t.substring(0, f) : t, i = i.toLowerCase(), r = f >= 0 ? t.substring(f + 1) : "", r = r.trim(), i === "newmtl" ? (u = {name: r}, c[r] = u) : u && (i === "ka" || i === "kd" || i === "ks" ? (o = r.split(/\s+/, 3), u[i] = [parseFloat(o[0]), parseFloat(o[1]), parseFloat(o[2])]) : u[i] = r));
        return s = new THREE.MTLLoader.MaterialCreator(this.baseUrl, this.options), s.crossOrigin = this.crossOrigin, s.setMaterials(c), s
    }
};
THREE.MTLLoader.MaterialCreator = function (n, t) {
    this.baseUrl = n;
    this.options = t;
    this.materialsInfo = {};
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};
    this.side = this.options && this.options.side ? this.options.side : THREE.FrontSide;
    this.wrap = this.options && this.options.wrap ? this.options.wrap : THREE.RepeatWrapping
};
THREE.MTLLoader.MaterialCreator.prototype = {
    constructor: THREE.MTLLoader.MaterialCreator, setMaterials: function (n) {
        this.materialsInfo = this.convert(n);
        this.materials = {};
        this.materialsArray = [];
        this.nameLookup = {}
    }, convert: function (n) {
        var i, r, u, f, e;
        if (!this.options)return n;
        i = {};
        for (r in n) {
            u = n[r];
            f = {};
            i[r] = f;
            for (e in u) {
                var o = !0, t = u[e], s = e.toLowerCase();
                switch (s) {
                    case"kd":
                    case"ka":
                    case"ks":
                        this.options && this.options.normalizeRGB && (t = [t[0] / 255, t[1] / 255, t[2] / 255]);
                        this.options && this.options.ignoreZeroRGBs && t[0] === 0 && t[1] === 0 && t[1] === 0 && (o = !1);
                        break;
                    case"d":
                        this.options && this.options.invertTransparency && (t = 1 - t)
                }
                o && (f[s] = t)
            }
        }
        return i
    }, preload: function () {
        for (var n in this.materialsInfo)this.create(n)
    }, getIndex: function (n) {
        return this.nameLookup[n]
    }, getAsArray: function () {
        var n = 0, t;
        for (t in this.materialsInfo)this.materialsArray[n] = this.create(t), this.nameLookup[t] = n, n++;
        return this.materialsArray
    }, create: function (n) {
        return this.materials[n] === undefined && this.createMaterial_(n), this.materials[n]
    }, createMaterial_: function (n) {
        var u = this.materialsInfo[n], t = {name: n, side: this.side}, r, i;
        for (r in u) {
            i = u[r];
            switch (r.toLowerCase()) {
                case"kd":
                    t.diffuse = (new THREE.Color).fromArray(i);
                    break;
                case"ks":
                    t.specular = (new THREE.Color).fromArray(i);
                    break;
                case"map_kd":
                    t.map = this.loadTexture(this.baseUrl + i);
                    t.map.wrapS = this.wrap;
                    t.map.wrapT = this.wrap;
                    break;
                case"ns":
                    t.shininess = i;
                    break;
                case"d":
                    i < 1 && (t.transparent = !0, t.opacity = i);
                    break;
                case"map_bump":
                case"bump":
                    if (t.bumpMap)break;
                    t.bumpMap = this.loadTexture(this.baseUrl + i);
                    t.bumpMap.wrapS = this.wrap;
                    t.bumpMap.wrapT = this.wrap
            }
        }
        return t.diffuse && (t.color = t.diffuse), this.materials[n] = new THREE.MeshPhongMaterial(t), this.materials[n]
    }, loadTexture: function (n, t, i) {
        var r, u = THREE.Loader.Handlers.get(n);
        return u !== null ? r = u.load(n, i) : (r = new THREE.Texture, u = new THREE.ImageLoader, u.crossOrigin = this.crossOrigin, u.load(n, function (n) {
            r.image = THREE.MTLLoader.ensurePowerOfTwo_(n);
            r.needsUpdate = !0;
            i && i(r)
        })), t !== undefined && (r.mapping = t), r
    }
};
THREE.MTLLoader.ensurePowerOfTwo_ = function (n) {
    var t, i;
    return !THREE.Math.isPowerOfTwo(n.width) || !THREE.Math.isPowerOfTwo(n.height) ? (t = document.createElement("canvas"), t.width = THREE.MTLLoader.nextHighestPowerOfTwo_(n.width), t.height = THREE.MTLLoader.nextHighestPowerOfTwo_(n.height), i = t.getContext("2d"), i.drawImage(n, 0, 0, n.width, n.height, 0, 0, t.width, t.height), t) : n
};
THREE.MTLLoader.nextHighestPowerOfTwo_ = function (n) {
    --n;
    for (var t = 1; t < 32; t <<= 1)n = n | n >> t;
    return n + 1
};
THREE.EventDispatcher.prototype.apply(THREE.MTLLoader.prototype);
THREE.OBJMTLLoader = function (n) {
    this.manager = n !== undefined ? n : THREE.DefaultLoadingManager
};
THREE.OBJMTLLoader.prototype = {
    constructor: THREE.OBJMTLLoader, load: function (n, t, i, r, u) {
        var f = this, e = new THREE.MTLLoader(n.substr(0, n.lastIndexOf("/") + 1));
        e.crossOrigin = f.crossOrigin;
        e.load(t, function (t) {
            var o = t, e;
            o.preload();
            e = new THREE.XHRLoader(f.manager);
            e.setCrossOrigin(f.crossOrigin);
            e.load(n, function (n) {
                var t = f.parse(n);
                t.traverse(function (n) {
                    if (n instanceof THREE.Mesh && n.material.name) {
                        var t = o.create(n.material.name);
                        t && (n.material = t)
                    }
                });
                i(t)
            }, r, u)
        }, r, u)
    }, parse: function (n, t) {
        function d(n, t, i) {
            return new THREE.Vector3(n, t, i)
        }

        function tt(n, t) {
            return new THREE.Vector2(n, t)
        }

        function g(n, t, i, r) {
            return new THREE.Face3(n, t, i, r)
        }

        function h(n, t) {
            o.length > 0 && (u.vertices = o, u.mergeVertices(), u.computeFaceNormals(), u.computeBoundingSphere(), c.add(l), u = new THREE.Geometry, l = new THREE.Mesh(u, e));
            n !== undefined && (l.name = n);
            t !== undefined && (e = new THREE.MeshLambertMaterial, e.name = t, l.material = e)
        }

        function s(n, t, i, r) {
            r === undefined ? u.faces.push(g(parseInt(n) - (f + 1), parseInt(t) - (f + 1), parseInt(i) - (f + 1))) : u.faces.push(g(parseInt(n) - (f + 1), parseInt(t) - (f + 1), parseInt(i) - (f + 1), [a[parseInt(r[0]) - 1].clone(), a[parseInt(r[1]) - 1].clone(), a[parseInt(r[2]) - 1].clone()]))
        }

        function k(n, t, i) {
            u.faceVertexUvs[0].push([v[parseInt(n) - 1].clone(), v[parseInt(t) - 1].clone(), v[parseInt(i) - 1].clone()])
        }

        function y(n, t, i) {
            n[3] === undefined ? (s(n[0], n[1], n[2], i), !(t === undefined) && t.length > 0 && k(t[0], t[1], t[2])) : (!(i === undefined) && i.length > 0 ? (s(n[0], n[1], n[3], [i[0], i[1], i[3]]), s(n[1], n[2], n[3], [i[1], i[2], i[3]])) : (s(n[0], n[1], n[3]), s(n[1], n[2], n[3])), !(t === undefined) && t.length > 0 && (k(t[0], t[1], t[3]), k(t[1], t[2], t[3])))
        }

        for (var f = 0, b = new THREE.Group, c = b, u = new THREE.Geometry, e = new THREE.MeshLambertMaterial, l = new THREE.Mesh(u, e), o = [], a = [], v = [], nt = n.split("\n"), r, i, w, p = 0; p < nt.length; p++)if (r = nt[p], r = r.trim(), r.length === 0 || r.charAt(0) === "#")continue; else(i = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/.exec(r)) !== null ? o.push(d(parseFloat(i[1]), parseFloat(i[2]), parseFloat(i[3]))) : (i = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/.exec(r)) !== null ? a.push(d(parseFloat(i[1]), parseFloat(i[2]), parseFloat(i[3]))) : (i = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/.exec(r)) !== null ? v.push(tt(parseFloat(i[1]), parseFloat(i[2]))) : (i = /f( +\d+)( +\d+)( +\d+)( +\d+)?/.exec(r)) !== null ? y([i[1], i[2], i[3], i[4]]) : (i = /f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))?/.exec(r)) !== null ? y([i[2], i[5], i[8], i[11]], [i[3], i[6], i[9], i[12]]) : (i = /f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))?/.exec(r)) !== null ? y([i[2], i[6], i[10], i[14]], [i[3], i[7], i[11], i[15]], [i[4], i[8], i[12], i[16]]) : (i = /f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))?/.exec(r)) !== null ? y([i[2], i[5], i[8], i[11]], [], [i[3], i[6], i[9], i[12]]) : /^o /.test(r) ? (h(), f = f + o.length, o = [], c = new THREE.Object3D, c.name = r.substring(2).trim(), b.add(c)) : /^g /.test(r) ? h(r.substring(2).trim(), undefined) : /^usemtl /.test(r) ? h(undefined, r.substring(7).trim()) : /^mtllib /.test(r) ? t && (w = r.substring(7), w = w.trim(), t(w)) : /^s /.test(r) || console.log("THREE.OBJMTLLoader: Unhandled line " + r);
        return h(undefined, undefined), b
    }
};
THREE.EventDispatcher.prototype.apply(THREE.OBJMTLLoader.prototype);
Stats = function () {
    var c = Date.now(), l = c, s = 0, a = Infinity, v = 0, h = 0, y = Infinity, p = 0, w = 0, b = 0, u = document.createElement("div"), n, f, t, e, i, o, r, k;
    for (u.id = "stats", u.addEventListener("mousedown", function (n) {
        n.preventDefault();
        k(++b % 2)
    }, !1), u.style.cssText = "width:80px;opacity:0.9;cursor:pointer", n = document.createElement("div"), n.id = "fps", n.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002", u.appendChild(n), f = document.createElement("div"), f.id = "fpsText", f.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", f.innerHTML = "FPS", n.appendChild(f), t = document.createElement("div"), t.id = "fpsGraph", t.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", n.appendChild(t); 74 > t.children.length;)e = document.createElement("span"), e.style.cssText = "width:1px;height:30px;float:left;background-color:#113", t.appendChild(e);
    for (i = document.createElement("div"), i.id = "ms", i.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none", u.appendChild(i), o = document.createElement("div"), o.id = "msText", o.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", o.innerHTML = "MS", i.appendChild(o), r = document.createElement("div"), r.id = "msGraph", r.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", i.appendChild(r); 74 > r.children.length;)e = document.createElement("span"), e.style.cssText = "width:1px;height:30px;float:left;background-color:#131", r.appendChild(e);
    return k = function (t) {
        b = t;
        switch (b) {
            case 0:
                n.style.display = "block";
                i.style.display = "none";
                break;
            case 1:
                n.style.display = "none";
                i.style.display = "block"
        }
    }, {
        REVISION: 11, domElement: u, setMode: k, begin: function () {
            c = Date.now()
        }, end: function () {
            var n = Date.now(), i;
            return s = n - c, a = Math.min(a, s), v = Math.max(v, s), o.textContent = s + " MS (" + a + "-" + v + ")", i = Math.min(30, 30 - 30 * (s / 200)), r.appendChild(r.firstChild).style.height = i + "px", w++, n > l + 1e3 && (h = Math.round(1e3 * w / (n - l)), y = Math.min(y, h), p = Math.max(p, h), f.textContent = h + " FPS (" + y + "-" + p + ")", i = Math.min(30, 30 - 30 * (h / 100)), t.appendChild(t.firstChild).style.height = i + "px", l = n, w = 0), n
        }, update: function () {
            c = this.end()
        }
    }
};
TWEEN = TWEEN || function () {
        var n = [];
        return {
            REVISION: "7", getAll: function () {
                return n
            }, removeAll: function () {
                n = []
            }, add: function (t) {
                n.push(t)
            }, remove: function (t) {
                t = n.indexOf(t);
                -1 !== t && n.splice(t, 1)
            }, update: function (t) {
                if (0 === n.length)return !1;
                for (var i = 0, r = n.length, t = void 0 !== t ? t : Date.now(); i < r;)n[i].update(t) ? i++ : (n.splice(i, 1), r--);
                return !0
            }
        }
    }();
TWEEN.Tween = function (n) {
    var i = {}, t = {}, h = 1e3, c = 0, r = null, l = TWEEN.Easing.Linear.None, a = TWEEN.Interpolation.Linear, u = [], f = null, e = !1, o = null, s = null;
    this.to = function (n, i) {
        return null !== i && (h = i), t = n, this
    };
    this.start = function (u) {
        TWEEN.add(this);
        e = !1;
        r = (void 0 !== u ? u : Date.now()) + c;
        for (var f in t)if (null !== n[f]) {
            if (t[f] instanceof Array) {
                if (0 === t[f].length)continue;
                t[f] = [n[f]].concat(t[f])
            }
            i[f] = n[f]
        }
        return this
    };
    this.stop = function () {
        return TWEEN.remove(this), this
    };
    this.delay = function (n) {
        return c = n, this
    };
    this.easing = function (n) {
        return l = n, this
    };
    this.interpolation = function (n) {
        return a = n, this
    };
    this.chain = function () {
        return u = arguments, this
    };
    this.onStart = function (n) {
        return f = n, this
    };
    this.onUpdate = function (n) {
        return o = n, this
    };
    this.onComplete = function (n) {
        return s = n, this
    };
    this.update = function (c) {
        var b, p, w;
        if (c < r)return !0;
        !1 === e && (null !== f && f.call(n), e = !0);
        var v = (c - r) / h, v = 1 < v ? 1 : v, y = l(v);
        for (w in i)b = i[w], p = t[w], n[w] = p instanceof Array ? a(p, y) : b + (p - b) * y;
        if (null !== o && o.call(n, y), 1 == v) {
            for (null !== s && s.call(n), v = 0, y = u.length; v < y; v++)u[v].start(c);
            return !1
        }
        return !0
    }
};
TWEEN.Easing = {
    Linear: {
        None: function (n) {
            return n
        }
    }, Quadratic: {
        In: function (n) {
            return n * n
        }, Out: function (n) {
            return n * (2 - n)
        }, InOut: function (n) {
            return 1 > (n *= 2) ? .5 * n * n : -.5 * (--n * (n - 2) - 1)
        }
    }, Cubic: {
        In: function (n) {
            return n * n * n
        }, Out: function (n) {
            return --n * n * n + 1
        }, InOut: function (n) {
            return 1 > (n *= 2) ? .5 * n * n * n : .5 * ((n -= 2) * n * n + 2)
        }
    }, Quartic: {
        In: function (n) {
            return n * n * n * n
        }, Out: function (n) {
            return 1 - --n * n * n * n
        }, InOut: function (n) {
            return 1 > (n *= 2) ? .5 * n * n * n * n : -.5 * ((n -= 2) * n * n * n - 2)
        }
    }, Quintic: {
        In: function (n) {
            return n * n * n * n * n
        }, Out: function (n) {
            return --n * n * n * n * n + 1
        }, InOut: function (n) {
            return 1 > (n *= 2) ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2)
        }
    }, Sinusoidal: {
        In: function (n) {
            return 1 - Math.cos(n * Math.PI / 2)
        }, Out: function (n) {
            return Math.sin(n * Math.PI / 2)
        }, InOut: function (n) {
            return .5 * (1 - Math.cos(Math.PI * n))
        }
    }, Exponential: {
        In: function (n) {
            return 0 === n ? 0 : Math.pow(1024, n - 1)
        }, Out: function (n) {
            return 1 === n ? 1 : 1 - Math.pow(2, -10 * n)
        }, InOut: function (n) {
            return 0 === n ? 0 : 1 === n ? 1 : 1 > (n *= 2) ? .5 * Math.pow(1024, n - 1) : .5 * (-Math.pow(2, -10 * (n - 1)) + 2)
        }
    }, Circular: {
        In: function (n) {
            return 1 - Math.sqrt(1 - n * n)
        }, Out: function (n) {
            return Math.sqrt(1 - --n * n)
        }, InOut: function (n) {
            return 1 > (n *= 2) ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
        }
    }, Elastic: {
        In: function (n) {
            var i, t = .1;
            return 0 === n ? 0 : 1 === n ? 1 : (!t || 1 > t ? (t = 1, i = .1) : i = .4 * Math.asin(1 / t) / (2 * Math.PI), -(t * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - i) * 2 * Math.PI / .4)))
        }, Out: function (n) {
            var i, t = .1;
            return 0 === n ? 0 : 1 === n ? 1 : (!t || 1 > t ? (t = 1, i = .1) : i = .4 * Math.asin(1 / t) / (2 * Math.PI), t * Math.pow(2, -10 * n) * Math.sin((n - i) * 2 * Math.PI / .4) + 1)
        }, InOut: function (n) {
            var i, t = .1;
            return 0 === n ? 0 : 1 === n ? 1 : (!t || 1 > t ? (t = 1, i = .1) : i = .4 * Math.asin(1 / t) / (2 * Math.PI), 1 > (n *= 2) ? -.5 * t * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - i) * 2 * Math.PI / .4) : .5 * t * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - i) * 2 * Math.PI / .4) + 1)
        }
    }, Back: {
        In: function (n) {
            return n * n * (2.70158 * n - 1.70158)
        }, Out: function (n) {
            return --n * n * (2.70158 * n + 1.70158) + 1
        }, InOut: function (n) {
            return 1 > (n *= 2) ? .5 * n * n * (3.5949095 * n - 2.5949095) : .5 * ((n -= 2) * n * (3.5949095 * n + 2.5949095) + 2)
        }
    }, Bounce: {
        In: function (n) {
            return 1 - TWEEN.Easing.Bounce.Out(1 - n)
        }, Out: function (n) {
            return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
        }, InOut: function (n) {
            return .5 > n ? .5 * TWEEN.Easing.Bounce.In(2 * n) : .5 * TWEEN.Easing.Bounce.Out(2 * n - 1) + .5
        }
    }
};
TWEEN.Interpolation = {
    Linear: function (n, t) {
        var i = n.length - 1, r = i * t, u = Math.floor(r), f = TWEEN.Interpolation.Utils.Linear;
        return 0 > t ? f(n[0], n[1], r) : 1 < t ? f(n[i], n[i - 1], i - r) : f(n[u], n[u + 1 > i ? i : u + 1], r - u)
    }, Bezier: function (n, t) {
        for (var u = 0, r = n.length - 1, f = Math.pow, e = TWEEN.Interpolation.Utils.Bernstein, i = 0; i <= r; i++)u += f(1 - t, r - i) * f(t, i) * n[i] * e(r, i);
        return u
    }, CatmullRom: function (n, t) {
        var i = n.length - 1, u = i * t, r = Math.floor(u), f = TWEEN.Interpolation.Utils.CatmullRom;
        return n[0] === n[i] ? (0 > t && (r = Math.floor(u = i * (1 + t))), f(n[(r - 1 + i) % i], n[r], n[(r + 1) % i], n[(r + 2) % i], u - r)) : 0 > t ? n[0] - (f(n[0], n[0], n[1], n[1], -u) - n[0]) : 1 < t ? n[i] - (f(n[i], n[i], n[i - 1], n[i - 1], u - i) - n[i]) : f(n[r ? r - 1 : 0], n[r], n[i < r + 1 ? i : r + 1], n[i < r + 2 ? i : r + 2], u - r)
    }, Utils: {
        Linear: function (n, t, i) {
            return (t - n) * i + n
        }, Bernstein: function (n, t) {
            var i = TWEEN.Interpolation.Utils.Factorial;
            return i(n) / i(t) / i(n - t)
        }, Factorial: function () {
            var n = [1];
            return function (t) {
                var r = 1, i;
                if (n[t])return n[t];
                for (i = t; 1 < i; i--)r *= i;
                return n[t] = r
            }
        }(), CatmullRom: function (n, t, i, r, u) {
            var n = .5 * (i - n), r = .5 * (r - t), f = u * u;
            return (2 * t - 2 * i + n + r) * u * f + (-3 * t + 3 * i - 2 * n - r) * f + n * u + t
        }
    }
}