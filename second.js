// =========================================================
// SECOND.JS
// JATHAKAM FORM + CAMERA + LOCAL STORAGE
//
// Flow:
//
// first.html
//     ↓
// Save user details + captured photo
//     ↓
// third.html
//     ↓
// four.html
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    // =====================================================
    // FORM ELEMENTS
    // =====================================================

    const form = document.getElementById("jathakaForm");

    const nameInput =
        document.getElementById("f-name");

    const nakshatramInput =
        document.getElementById("f-nakshatram");

    const dobInput =
        document.getElementById("f-dob");

    const birthTimeInput =
        document.getElementById("f-birthtime");

    const crisisInput =
        document.getElementById("crisis-select");


    // =====================================================
    // CAMERA ELEMENTS
    // =====================================================

    const startCameraBtn =
        document.getElementById("startCamera");

    const capturePhotoBtn =
        document.getElementById("capturePhoto");

    const cameraBox =
        document.getElementById("cameraBox");

    const camera =
        document.getElementById("camera");

    const photoCanvas =
        document.getElementById("photoCanvas");

    const photoPreview =
        document.getElementById("photoPreview");


    // =====================================================
    // VARIABLES
    // =====================================================

    let cameraStream = null;

    let capturedPhoto = null;


    // =====================================================
    // CHECK FORM
    // =====================================================

    if (!form) {

        console.error(
            "ERROR: jathakaForm was not found."
        );

        return;

    }


    // =====================================================
    // HELPER: STOP CAMERA
    // =====================================================

    function stopCamera() {

        if (cameraStream) {

            cameraStream
                .getTracks()
                .forEach(function (track) {

                    track.stop();

                });

            cameraStream = null;

        }


        if (camera && camera.srcObject) {

            camera.srcObject = null;

        }


        if (cameraBox) {

            cameraBox.classList.remove(
                "camera-active"
            );

        }

    }


    // =====================================================
    // HELPER: GET SELECTED OPTION TEXT
    // =====================================================

    function getSelectedText(selectElement) {

        if (!selectElement) {

            return "";

        }


        const selectedIndex =
            selectElement.selectedIndex;

        if (
            selectedIndex < 0 ||
            !selectElement.options[selectedIndex]
        ) {

            return "";

        }


        return selectElement.options[
            selectedIndex
        ].textContent.trim();

    }


    // =====================================================
    // CAMERA START
    // =====================================================

    if (startCameraBtn) {

        startCameraBtn.addEventListener(
            "click",
            async function (event) {

                event.preventDefault();


                if (
                    !navigator.mediaDevices ||
                    !navigator.mediaDevices.getUserMedia
                ) {

                    alert(
                        "ഈ ബ്രൗസറിൽ ക്യാമറ സൗകര്യം ലഭ്യമല്ല."
                    );

                    return;

                }


                try {

                    // Stop any previous camera stream

                    stopCamera();


                    // Open camera

                    cameraStream =
                        await navigator.mediaDevices.getUserMedia({

                            video: {

                                facingMode: "user",

                                width: {
                                    ideal: 1280
                                },

                                height: {
                                    ideal: 720
                                }

                            },

                            audio: false

                        });


                    if (camera) {

                        camera.srcObject =
                            cameraStream;

                        camera.style.display =
                            "block";


                        try {

                            await camera.play();

                        } catch (playError) {

                            console.warn(
                                "Camera play warning:",
                                playError
                            );

                        }

                    }


                    if (cameraBox) {

                        cameraBox.classList.add(
                            "camera-active"
                        );

                    }


                    if (capturePhotoBtn) {

                        capturePhotoBtn.disabled =
                            false;

                        capturePhotoBtn.style.display =
                            "inline-flex";

                    }


                    startCameraBtn.textContent =
                        "📷 ക്യാമറ തുറന്നിരിക്കുന്നു";


                } catch (error) {

                    console.error(
                        "Camera opening error:",
                        error
                    );


                    let message =
                        "ക്യാമറ തുറക്കാൻ കഴിഞ്ഞില്ല.";


                    if (
                        error &&
                        (
                            error.name ===
                            "NotAllowedError" ||

                            error.name ===
                            "PermissionDeniedError"
                        )
                    ) {

                        message =
                            "ക്യാമറ ഉപയോഗിക്കാൻ permission അനുവദിക്കുക.";

                    }


                    else if (
                        error &&
                        error.name ===
                        "NotFoundError"
                    ) {

                        message =
                            "ക്യാമറ കണ്ടെത്താൻ കഴിഞ്ഞില്ല.";

                    }


                    else if (
                        error &&
                        error.name ===
                        "NotReadableError"
                    ) {

                        message =
                            "ക്യാമറ മറ്റൊരു ആപ്പ് ഉപയോഗിക്കുന്നു.";

                    }


                    alert(message);

                }

            }
        );

    }


    // =====================================================
    // CAPTURE PHOTO
    // =====================================================

    if (capturePhotoBtn) {

        capturePhotoBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                if (!cameraStream) {

                    alert(
                        "ആദ്യം ക്യാമറ തുറക്കുക."
                    );

                    return;

                }


                if (!camera) {

                    alert(
                        "ക്യാമറ element കണ്ടെത്താൻ കഴിഞ്ഞില്ല."
                    );

                    return;

                }


                if (!photoCanvas) {

                    alert(
                        "Photo canvas കണ്ടെത്താൻ കഴിഞ്ഞില്ല."
                    );

                    return;

                }


                if (
                    camera.readyState < 2 ||
                    !camera.videoWidth ||
                    !camera.videoHeight
                ) {

                    alert(
                        "ക്യാമറ തയ്യാറാകുന്നത് വരെ കാത്തിരിക്കുക."
                    );

                    return;

                }


                // Camera dimensions

                const width =
                    camera.videoWidth;

                const height =
                    camera.videoHeight;


                // Set canvas dimensions

                photoCanvas.width =
                    width;

                photoCanvas.height =
                    height;


                // Get canvas context

                const context =
                    photoCanvas.getContext("2d");


                if (!context) {

                    alert(
                        "Photo capture ചെയ്യാൻ കഴിഞ്ഞില്ല."
                    );

                    return;

                }


                // Mirror image like a selfie camera

                context.save();

                context.translate(
                    width,
                    0
                );

                context.scale(
                    -1,
                    1
                );


                context.drawImage(
                    camera,
                    0,
                    0,
                    width,
                    height
                );


                context.restore();


                // Convert image to Base64

                capturedPhoto =
                    photoCanvas.toDataURL(
                        "image/jpeg",
                        0.88
                    );


                // Show preview

                if (photoPreview) {

                    photoPreview.src =
                        capturedPhoto;

                    photoPreview.style.display =
                        "block";

                }


                // Hide live camera

                camera.style.display =
                    "none";


                // Stop camera

                stopCamera();


                // Update buttons

                if (startCameraBtn) {

                    startCameraBtn.textContent =
                        "📷 വീണ്ടും ഫോട്ടോ എടുക്കുക";

                }


                capturePhotoBtn.textContent =
                    "✓ ഫോട്ടോ എടുത്തു";

                capturePhotoBtn.disabled =
                    true;


                console.log(
                    "Photo captured successfully."
                );

            }
        );

    }


    // =====================================================
    // RESTORE PREVIOUS PHOTO
    // =====================================================

    try {

        const savedPhoto =
            localStorage.getItem(
                "astrologyUserPhoto"
            );


        if (
            savedPhoto &&
            savedPhoto !== "null" &&
            savedPhoto !== "undefined" &&
            photoPreview
        ) {

            capturedPhoto =
                savedPhoto;

            photoPreview.src =
                savedPhoto;

            photoPreview.style.display =
                "block";

        }

    } catch (error) {

        console.warn(
            "Could not restore previous photo:",
            error
        );

    }


    // =====================================================
    // INITIAL CAPTURE BUTTON STATE
    // =====================================================

    if (capturePhotoBtn) {

        capturePhotoBtn.disabled =
            true;


        if (!capturedPhoto) {

            capturePhotoBtn.style.display =
                "none";

        }

    }


    // =====================================================
    // FORM SUBMIT
    // =====================================================

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ---------------------------------------------
            // READ FORM VALUES
            // ---------------------------------------------

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const nakshatramValue =
                nakshatramInput
                    ? nakshatramInput.value
                    : "";


            const dob =
                dobInput
                    ? dobInput.value
                    : "";


            const birthTimeValue =
                birthTimeInput
                    ? birthTimeInput.value
                    : "";


            const crisisValue =
                crisisInput
                    ? crisisInput.value
                    : "";


            // ---------------------------------------------
            // VALIDATION
            // ---------------------------------------------

            if (!name) {

                alert(
                    "ദയവായി പേര് നൽകുക."
                );

                if (nameInput) {

                    nameInput.focus();

                }

                return;

            }


            if (!nakshatramValue) {

                alert(
                    "ദയവായി നക്ഷത്രം തിരഞ്ഞെടുക്കുക."
                );

                if (nakshatramInput) {

                    nakshatramInput.focus();

                }

                return;

            }


            if (!dob) {

                alert(
                    "ദയവായി ജനന തീയതി നൽകുക."
                );

                if (dobInput) {

                    dobInput.focus();

                }

                return;

            }


            if (!birthTimeValue) {

                alert(
                    "ദയവായി ജനിച്ച സമയം തിരഞ്ഞെടുക്കുക."
                );

                if (birthTimeInput) {

                    birthTimeInput.focus();

                }

                return;

            }


            if (!crisisValue) {

                alert(
                    "ദയവായി നിലവിലെ പ്രതിസന്ധി തിരഞ്ഞെടുക്കുക."
                );

                if (crisisInput) {

                    crisisInput.focus();

                }

                return;

            }


            // ---------------------------------------------
            // PHOTO VALIDATION
            // ---------------------------------------------

            if (!capturedPhoto) {

                try {

                    const existingPhoto =
                        localStorage.getItem(
                            "astrologyUserPhoto"
                        );


                    if (existingPhoto) {

                        capturedPhoto =
                            existingPhoto;

                    }

                } catch (error) {

                    console.warn(
                        "Could not read saved photo:",
                        error
                    );

                }

            }


            if (!capturedPhoto) {

                alert(
                    "ദയവായി ആദ്യം നിങ്ങളുടെ ഫോട്ടോ എടുക്കുക."
                );

                return;

            }


            // ---------------------------------------------
            // GET DISPLAY TEXT
            // ---------------------------------------------

            const nakshatramText =
                getSelectedText(
                    nakshatramInput
                );


            const birthTimeText =
                getSelectedText(
                    birthTimeInput
                );


            const crisisText =
                getSelectedText(
                    crisisInput
                );


            // ---------------------------------------------
            // CREATE USER DATA OBJECT
            // ---------------------------------------------

            const userData = {

                name: name,

                nakshatram:
                    nakshatramText ||
                    nakshatramValue,

                dob: dob,

                birthtime:
                    birthTimeText ||
                    birthTimeValue,

                crisis:
                    crisisText ||
                    crisisValue

            };


            // ---------------------------------------------
            // SAVE DATA
            // ---------------------------------------------

            try {

                localStorage.setItem(
                    "swamiUserData",
                    JSON.stringify(userData)
                );


                localStorage.setItem(
                    "astrologyUserPhoto",
                    capturedPhoto
                );


                console.log(
                    "Swami user data saved:",
                    userData
                );


                console.log(
                    "Photo saved:",
                    capturedPhoto
                        ? "YES"
                        : "NO"
                );

            } catch (storageError) {

                console.error(
                    "LocalStorage save error:",
                    storageError
                );


                alert(
                    "വിവരങ്ങൾ save ചെയ്യാൻ കഴിഞ്ഞില്ല. " +
                    "Browser storage അനുവദിച്ചിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക."
                );

                return;

            }


            // ---------------------------------------------
            // STOP CAMERA
            // ---------------------------------------------

            stopCamera();


            // ---------------------------------------------
            // GO TO THIRD PAGE
            // ---------------------------------------------

            window.location.href =
                "third.html";

        }
    );


    // =====================================================
    // STOP CAMERA WHEN PAGE CLOSES
    // =====================================================

    window.addEventListener(
        "beforeunload",
        function () {

            stopCamera();

        }
    );


    // =====================================================
    // STOP CAMERA WHEN TAB BECOMES HIDDEN
    // =====================================================

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                stopCamera();

            }

        }
    );


    // =====================================================
    // FINAL LOG
    // =====================================================

    console.log(
        "second.js loaded successfully."
    );

});