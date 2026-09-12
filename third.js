/* =========================================================
   THIRD PAGE
   SHIBU SWAMI JYOTHISHAM

   FLOW:

   Page 2
      ↓
   third.html
      ↓
   swami.mpeg plays
      ↓
   audio "ended"
      ↓
   four.html
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           AUDIO
        ================================================= */

        const audio =
            document.getElementById("swamiAudio");


        if (!audio) {

            console.error(
                "ERROR: #swamiAudio not found."
            );

            return;
        }


        /*
         * Full volume
         */

        audio.volume = 1.0;


        /*
         * IMPORTANT:
         * Never loop the chant.
         */

        audio.loop = false;



        /* =================================================
           REDIRECT CONTROL
        ================================================= */

        let redirectStarted = false;


        function goToFourthPage() {


            /*
             * Prevent duplicate redirects.
             */

            if (redirectStarted) {

                return;
            }


            redirectStarted = true;


            console.log(
                "Swami chant finished."
            );


            console.log(
                "Opening four.html..."
            );


            /*
             * Very small delay so the final
             * animation frame can finish.
             */

            setTimeout(
                function () {

                    window.location.href =
                        "four.html";

                },
                300
            );

        }



        /* =================================================
           AUDIO ENDED
        ================================================= */

        audio.addEventListener(
            "ended",
            function () {

                console.log(
                    "Swami chant audio ended."
                );


                goToFourthPage();

            }
        );



        /* =================================================
           AUDIO ERROR
        ================================================= */

        audio.addEventListener(
            "error",
            function (event) {

                console.error(
                    "Unable to load swami audio.",
                    event
                );


                /*
                 * IMPORTANT:
                 *
                 * We do NOT redirect on audio error.
                 *
                 * Otherwise a temporary loading
                 * problem could skip the Swami page.
                 */

            }
        );



        /* =================================================
           AUDIO LOADED
        ================================================= */

        audio.addEventListener(
            "loadedmetadata",
            function () {

                console.log(
                    "Swami chant duration:",
                    audio.duration,
                    "seconds"
                );

            }
        );



        /* =================================================
           START AUDIO
        ================================================= */

        function startAudio() {


            if (!audio) {

                return;
            }


            /*
             * Already playing.
             */

            if (!audio.paused) {

                return;
            }


            const playPromise =
                audio.play();


            /*
             * Modern browsers return
             * a Promise from audio.play().
             */

            if (
                playPromise &&
                typeof playPromise.catch ===
                    "function"
            ) {


                playPromise
                    .then(
                        function () {

                            console.log(
                                "Swami chant started."
                            );

                        }
                    )
                    .catch(
                        function (error) {

                            console.log(
                                "Autoplay blocked. Waiting for user interaction.",
                                error
                            );

                        }
                    );

            }

        }



        /* =================================================
           FIRST AUTOPLAY ATTEMPT
        ================================================= */

        startAudio();



        /* =================================================
           USER INTERACTION FALLBACK
        ================================================= */

        function handleUserInteraction() {


            if (audio.paused) {

                startAudio();

            }

        }


        /*
         * Touch
         */

        document.addEventListener(
            "touchstart",
            handleUserInteraction,
            {
                once: true,
                passive: true
            }
        );


        /*
         * Click
         */

        document.addEventListener(
            "click",
            handleUserInteraction,
            {
                once: true
            }
        );


        /*
         * Keyboard
         */

        document.addEventListener(
            "keydown",
            handleUserInteraction,
            {
                once: true
            }
        );



        /* =================================================
           ZODIAC SYMBOL ANIMATION
        ================================================= */

        const zodiacSymbols =
            document.querySelectorAll(
                ".symbol"
            );


        zodiacSymbols.forEach(
            function (symbol, index) {


                symbol.style.animationDelay =
                    (index * 0.15) + "s";

            }
        );



        /* =================================================
           RANDOMIZE EXISTING PARTICLES
        ================================================= */

        const particles =
            document.querySelectorAll(
                ".particle"
            );


        particles.forEach(
            function (particle) {


                const duration =
                    3 +
                    Math.random() * 4;


                const delay =
                    Math.random() * 5;


                particle.style.animationDuration =
                    duration + "s";


                particle.style.animationDelay =
                    "-" + delay + "s";


                /*
                 * Slight random position
                 */

                const currentLeft =
                    parseFloat(
                        getComputedStyle(
                            particle
                        ).left
                    );


                const currentTop =
                    parseFloat(
                        getComputedStyle(
                            particle
                        ).top
                    );


                if (
                    Number.isFinite(currentLeft) &&
                    Number.isFinite(currentTop)
                ) {

                    particle.style.transform =
                        "translate("
                        +
                        ((Math.random() - .5) * 20)
                        +
                        "px,"
                        +
                        ((Math.random() - .5) * 20)
                        +
                        "px)";

                }

            }
        );



        /* =================================================
           GENERATE EXTRA PARTICLES
        ================================================= */

        const particleContainer =
            document.querySelector(
                ".particles"
            );


        if (particleContainer) {


            /*
             * Generate additional particles
             * without touching the original 20.
             */

            if (
                !particleContainer.dataset.generated
            ) {


                particleContainer.dataset.generated =
                    "true";


                for (
                    let i = 0;
                    i < 45;
                    i++
                ) {


                    const particle =
                        document.createElement(
                            "span"
                        );


                    particle.className =
                        "generated-particle";


                    particle.style.left =
                        Math.random() * 100
                        + "%";


                    particle.style.top =
                        Math.random() * 100
                        + "%";


                    particle.style.animationDelay =
                        "-" +
                        Math.random() * 5
                        +
                        "s";


                    particle.style.animationDuration =
                        (
                            3 +
                            Math.random() * 4
                        )
                        +
                        "s";


                    const size =
                        2 +
                        Math.random() * 4;


                    particle.style.width =
                        size + "px";


                    particle.style.height =
                        size + "px";


                    particleContainer.appendChild(
                        particle
                    );

                }

            }

        }



        /* =================================================
           SWAMI IMAGE
        ================================================= */

        const swamiImage =
            document.querySelector(
                ".swami-image"
            );


        if (swamiImage) {


            /*
             * Random animation starting phase.
             */

            const delay =
                Math.random() * 1.2;


            swamiImage.style.animationDelay =
                "-" + delay + "s";


            /*
             * Image loaded effect.
             */

            if (swamiImage.complete) {

                swamiImage.classList.add(
                    "image-loaded"
                );

            }


            swamiImage.addEventListener(
                "load",
                function () {

                    swamiImage.classList.add(
                        "image-loaded"
                    );

                }
            );

        }



        /* =================================================
           VISIBILITY CHANGE
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            function () {


                if (
                    document.visibilityState ===
                    "visible"
                ) {


                    /*
                     * Try again if autoplay
                     * was previously blocked.
                     */

                    if (audio.paused) {

                        startAudio();

                    }

                }

            }
        );



        /* =================================================
           DEBUG
        ================================================= */

        console.log(
            "------------------------------------"
        );


        console.log(
            "Third page initialized."
        );


        console.log(
            "Audio:",
            "audio/swami.mpeg"
        );


        console.log(
            "Audio loop:",
            audio.loop
        );


        console.log(
            "Auto redirect:",
            "four.html"
        );


        console.log(
            "------------------------------------"
        );


    }
);