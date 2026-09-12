/* =========================================================
   FOUR.JS
   SHIBU SWAMI JYOTHISHAM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       STORAGE
    ===================================================== */

    const DATA_KEY = "swamiUserData";
    const PHOTO_KEY = "astrologyUserPhoto";


    /* =====================================================
       RANDOM ROAST POOLS
    ===================================================== */

    const CAREER_ROASTS = [

        "ലിങ്ക്ഡ്ഇനിൽ മറ്റുള്ളവരുടെ പ്രമോഷൻ കണ്ട് ദേഷ്യപ്പെടുന്നത് അല്ലാതെ സിവിയിൽ എഴുതിവെക്കാൻ യാതൊരു കഴിവും വികസിപ്പിച്ചിട്ടില്ല.",

        "'ഞാൻ നാളെ മുതൽ സീരിയസ് ആകും' എന്ന് പറഞ്ഞു തുടങ്ങിയിട്ട് മൂന്ന് വർഷമായി. ഗ്രഹങ്ങൾക്ക് ഇനി ക്ഷമ ഇല്ല.",

        "Interview-ന് പോകുമ്പോൾ 'strength എന്താ' എന്ന് ചോദിച്ചാൽ ഉത്തരം ഇപ്പോഴും തയ്യാറാക്കിയിട്ടില്ല എന്ന് ഗ്രഹങ്ങൾ കാണുന്നു.",

        "Deadline അടുക്കുമ്പോൾ മാത്രം ഉണരുന്ന ഒരു പ്രത്യേക ഊർജ്ജം നിനക്ക് ഉണ്ട്. അതിനെ 'talent' എന്ന് വിളിക്കാൻ പാടില്ല.",

        "Promotion നിനക്ക് കിട്ടും... പക്ഷെ ആദ്യം ആ email ഒന്ന് reply ചെയ്യ്.",

        "Resignation letter എഴുതി draft-ൽ വെച്ച് 6 മാസം ജോലി എടുക്കുന്ന ലോകത്തിലെ ഒരേയൊരു ജീവി നിങ്ങളാണ്.",

        "Meeting-ൽ 'I will look into it' എന്ന് പറയുന്നത് 'എനിക്ക് ഒന്നും മനസ്സിലായില്ല' എന്നാണെന്ന് മാനേജർക്ക് വരെ മനസ്സിലായി.",

        "Work-from-home തുടങ്ങിയതിൽ പിന്നെ ലാപ്ടോപ്പ് ഓൺ ചെയ്തു വെച്ച് കൂർക്കം വലിക്കുന്ന കഴിവ് മാത്രമേ നിനക്ക് മെച്ചപ്പെട്ടിട്ടുള്ളൂ.",

        "Side hustle തുടങ്ങും എന്ന് പറഞ്ഞ് വാങ്ങിച്ചു കൂട്ടിയ നോട്ട്ബുക്കുകൾ മാത്രം മതി ഒരു ലൈബ്രറി തുടങ്ങാൻ.",

        "നിന്റെ CV കാണുമ്പോൾ HR ചിരിക്കുന്ന ചിരി ശനിയുടെ രാശിയിൽ വരെ പ്രതിധ്വനിക്കുന്നുണ്ട്."

    ];


    const MARRIAGE_ROASTS = [

        "നിന്റെ വൈബ് മാച്ച് ചെയ്യുന്ന ഒരാളെ കണ്ടെത്താൻ ഭൂമിയിൽ ആളില്ല. അന്യഗ്രഹജീവികൾ വന്നാൽ മാത്രമേ വല്ല സാധ്യതയും ഉള്ളൂ.",

        "'Just friends' എന്ന് പറഞ്ഞ ആ ഒരാളെ ഇപ്പോഴും മറന്നിട്ടില്ല എന്ന് ശുക്രൻ പറയുന്നു. ശുക്രൻ പറഞ്ഞത് ഗ്രഹങ്ങളുടെ ഇടയിൽ viral ആയി.",

        "Biodata-യിൽ 'homely' എന്ന് എഴുതിയത് ആരും വിശ്വസിക്കില്ല. അത് സ്വയം ഒന്ന് മാറ്റാൻ ഗ്രഹങ്ങൾ നിർദ്ദേശിക്കുന്നു.",

        "Kalyanam നടക്കും... പക്ഷെ ആദ്യം 'ഞാൻ busy ആണ്' എന്ന excuse പറയുന്നത് നിർത്തണം.",

        "Matrimony സൈറ്റിൽ പ്രൊഫൈൽ ഉണ്ടാക്കി വെച്ചിട്ട് വരുന്ന റിക്വസ്റ്റുകൾ ഒക്കെ reject ചെയ്യുന്നത് കണ്ടാൽ തോന്നും Ambani-യുടെ മക്കളാണ് ചോദിക്കുന്നത് എന്ന്.",

        "വിവാഹം കഴിച്ചാൽ കിട്ടുന്ന പാർട്ണർ ആദ്യത്തെ ആഴ്ചയിൽ തന്നെ സ്വന്തം വീട്ടിലേക്ക് തിരിച്ചു ഓടാൻ 87% ഗ്രഹസാധ്യത.",

        "നിന്റെ chat history കണ്ടാൽ ഏത് പെണ്ണുകാണലും അടുത്ത 5 സെക്കൻഡിനുള്ളിൽ ക്യാൻസൽ ആകും.",

        "Red flags കണ്ടാൽ green light ആണെന്ന് കരുതി ഓടിപ്പോയി വീഴുന്ന ഒരു പ്രത്യേക കഴിവ് നിനക്ക് ജന്മനാ കിട്ടിയിട്ടുണ്ട്.",

        "Arranged marriage-ൽ വന്ന് ഇരിക്കുന്നവരോട് ചോദിക്കാൻ reel trends അല്ലാതെ വേറെ ഒരു വർത്തമാനവും നിന്റെ കയ്യിൽ ഇല്ല."

    ];


    const AYUSSU_ROASTS = [

        "രാത്രി 3 മണിക്ക് കിടന്ന് ഫോൺ ചാർജിലിട്ട് നോക്കുമ്പോൾ കൈയിൽ നിന്ന് വഴുതി മൂക്കിൽ വീണായിരിക്കും അന്ത്യം.",

        "സ്വന്തം reel scroll ചെയ്തുകൊണ്ട് നടക്കുമ്പോൾ തുറന്ന manhole-ൽ വീഴാൻ 42% സാധ്യത ഗ്രഹങ്ങൾ കാണുന്നു.",

        "'അഞ്ച് മിനിറ്റ് കൂടി' എന്ന് പറഞ്ഞ് alarm snooze ചെയ്യുന്നത് ഒരു ദിവസം നിന്റെ ജീവിതം തന്നെ snooze ചെയ്യിക്കും.",

        "Ice-ൽ പോലും ചൂട് chaya കുടിക്കുന്ന നിന്റെ ധൈര്യത്തിന് മുന്നിൽ മരണം പോലും ഒന്ന് മടിക്കും.",

        "വെള്ളം കുടിക്കാൻ മടി കാണിച്ച് അവസാനം dehydration വന്ന് കട്ടിലിൽ കിടക്കുമ്പോഴും 'ഇന്ന് weather മോശമാണ്' എന്ന് ന്യായീകരിക്കും.",

        "Zomato-ൽ ഓർഡർ ചെയ്തത് വരാൻ വൈകിയാൽ വരുന്ന ആ നെഞ്ചിടിപ്പ് വെച്ച് നോക്കിയാൽ ബിപി മെഷീൻ പൊട്ടിത്തെറിക്കും.",

        "രാവിലെ എഴുന്നേൽക്കുമ്പോൾ പുറം വേദനിക്കുന്നത് പ്രായം കൊണ്ടല്ല, നട്ടെല്ല് ഇല്ലാതെ കിടക്കുന്ന നിന്റെ posture കൊണ്ടാണ്.",

        "സ്വന്തം symptoms ഗൂഗിളിൽ അടിച്ച് നോക്കി കാൻസർ ആണെന്ന് ഉറപ്പിച്ച് കരയുന്ന ഒരു അന്ത്യം ശുക്രൻ മുൻകൂട്ടി കാണുന്നു."

    ];


    const NEXTWEEK_ROASTS = [

        "അമ്മ ചോറ് തിന്നാൻ വിളിക്കുമ്പോൾ ഫോണിൽ നോക്കി ഇരിക്കും. അടുത്ത നിമിഷം പറന്നു വരുന്ന ചൂൽ നെറ്റിയിൽ പതിക്കും.",

        "'ഇന്ന് gym പോകും' എന്ന് പറഞ്ഞ് കിടക്കയിൽ തന്നെ കിടക്കുന്നത് തുടരും. ഗ്രഹങ്ങൾക്ക് ഇത് ഒരു പുതിയ കാര്യമല്ല.",

        "ഒരു group chat-ൽ 'ok' എന്ന് reply ചെയ്തതിന് അടുത്ത ഒരാഴ്ച overthink ചെയ്യും.",

        "ആരോ 'നീ വണ്ണം വെച്ചോ?' എന്ന് ചോദിക്കും. ഗ്രഹങ്ങൾക്ക് ഇതിൽ ഒരു ഉത്തരവും ഇല്ല, സഹതാപം മാത്രമേ ഉള്ളൂ.",

        "വാങ്ങാൻ ഉദ്ദേശമില്ലാത്ത ആമസോൺ കാർട്ടിൽ സാധനങ്ങൾ ആഡ് ചെയ്ത് വെച്ച് വെറുതെ നോക്കി നെടുവീർപ്പിടും.",

        "Online-ൽ പൈസ pay ചെയ്യാൻ നോക്കുമ്പോൾ 'Insufficient Balance' കണ്ട് ഫോൺ സൈലന്റിൽ ആക്കി വെക്കും.",

        "ഓഫീസിൽ അല്ലെങ്കിൽ കോളേജിൽ വെച്ച് അബദ്ധത്തിൽ ഒരു cringe പഴയ കഥ ഓർത്തു ചിരിച്ച് എല്ലാവരുടെയും വെറുപ്പ് സമ്പാദിക്കും.",

        "നായ പുറകെ ഓടിക്കാൻ നോക്കുമ്പോൾ ഓടാൻ വയ്യാതെ ഫ്രണ്ട്ഷിപ്പ് സ്ഥാപിക്കാൻ ശ്രമിക്കും."

    ];


    const PARIHAARAM_ROASTS = [

        "വൈഫൈ റൂട്ടറിന് മുൻപിൽ ഒരു കർപ്പൂരം കത്തിച്ചു വെക്കുക.",

        "ആഴ്ചയിൽ ഒരിക്കൽ എങ്കിലും സ്വന്തം to-do list ഒന്ന് തുറന്ന് നോക്കുക. തുറന്ന് നോക്കിയാൽ മതി, ചെയ്യണം എന്നില്ല.",

        "Phone-ന്റെ screen time ഒരു ദിവസത്തേക്ക് കാണാതിരിക്കുക. ഗ്രഹങ്ങൾക്ക് പോലും ആ number ഭയമാണ്.",

        "അമ്മയോട് ഒരു 'sorry' പറയുക. ഏതിനാണെന്ന് അമ്മയ്ക്ക് തന്നെ അറിയാം.",

        "രാവിലെ അലാറം അടിച്ചാൽ snooze ചെയ്യാതെ ജനലിലൂടെ ഫോൺ പുറത്തേക്ക് വലിച്ചെറിയുക.",

        "കുളിക്കാൻ പോകുമ്പോൾ ഫോൺ പുറത്ത് വെക്കുക; ഗ്രഹങ്ങൾ നിങ്ങളുടെ ശുചിത്വം കണ്ട് അത്ഭുതപ്പെടട്ടെ.",

        "മാസത്തിൽ ഒരു ദിവസമെങ്കിലും റീൽസ് ഷെയർ ചെയ്യാതെ അടുത്ത സുഹത്തിന് സ്വസ്ഥത നൽകുക.",

        "ബാങ്ക് അക്കൗണ്ട് ബാലൻസ് ദിവസത്തിൽ 4 തവണ ചെക്ക് ചെയ്യുന്ന ദുശ്ശീലം നിർത്തി വെറും 2 തവണയാക്കുക."

    ];


    /* =====================================================
       RANDOM PICKER
    ===================================================== */

    function randomItem(array) {

        if (!array || array.length === 0) {
            return "";
        }

        const index =
            Math.floor(
                Math.random() * array.length
            );

        return array[index];
    }


    /* =====================================================
       USER DATA
    ===================================================== */

    let userData = {};

    try {

        const savedData =
            localStorage.getItem(DATA_KEY);

        if (savedData) {

            userData =
                JSON.parse(savedData);

        }

    } catch (error) {

        console.error(
            "Could not read user data:",
            error
        );

        userData = {};

    }


    console.log(
        "Loaded horoscope data:",
        userData
    );


    /* =====================================================
       TEXT HELPER
    ===================================================== */

    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        if (
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
        ) {

            element.textContent =
                String(value).trim();

        } else {

            element.textContent = "—";

        }

    }


    /* =====================================================
       DATE
    ===================================================== */

    function formatDate(dateString) {

        if (!dateString) {
            return "—";
        }

        const value =
            String(dateString).trim();

        const parts =
            value.split("-");

        if (parts.length === 3) {

            return (
                parts[2] +
                "-" +
                parts[1] +
                "-" +
                parts[0]
            );

        }

        return value;

    }


    /* =====================================================
       DISPLAY USER INFORMATION
    ===================================================== */

    setText(
        "result-name",
        userData.name
    );

    setText(
        "result-nakshatram",
        userData.nakshatram
    );

    setText(
        "result-dob",
        formatDate(userData.dob)
    );

    setText(
        "result-birthtime",
        userData.birthtime
    );

    setText(
        "result-crisis",
        userData.crisis
    );


    /* =====================================================
       DISPLAY CAPTURED PHOTO
    ===================================================== */

    const profileImage =
        document.getElementById("result-photo");

    const savedPhoto =
        localStorage.getItem(PHOTO_KEY);

    if (
        profileImage &&
        savedPhoto
    ) {

        profileImage.src =
            savedPhoto;

        profileImage.style.display =
            "block";

    } else if (profileImage) {

        profileImage.style.display =
            "none";

    }


    /* =====================================================
       RANDOM PREDICTIONS
    ===================================================== */

    setText(
        "career-text",
        randomItem(CAREER_ROASTS)
    );

    setText(
        "marriage-text",
        randomItem(MARRIAGE_ROASTS)
    );

    setText(
        "health-text",
        randomItem(AYUSSU_ROASTS)
    );

    setText(
        "week-text",
        randomItem(NEXTWEEK_ROASTS)
    );

    setText(
        "remedy-text",
        randomItem(PARIHAARAM_ROASTS)
    );


    /* =====================================================
       PREDICTION ANIMATION
    ===================================================== */

    const predictionRows =
        document.querySelectorAll(
            ".prediction-row"
        );

    predictionRows.forEach(
        function (row, index) {

            row.style.opacity = "0";

            row.style.transform =
                "translateY(10px)";

            row.style.transition =
                "opacity .45s ease, transform .45s ease";

            setTimeout(
                function () {

                    row.style.opacity = "1";

                    row.style.transform =
                        "translateY(0)";

                },
                100 + index * 100
            );

        }
    );


    /* =====================================================
       DOWNLOAD / SAVE AS PDF
    ===================================================== */

    const downloadButton =
        document.getElementById(
            "downloadHoroscope"
        );

    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    }


    /* =====================================================
       TRY AGAIN
       PLAY AUDIO → CLEAR DATA → FIRST PAGE
    ===================================================== */

    const tryAgainButton =
        document.getElementById("tryAgain");

    const tryAgainAudio =
        document.getElementById("tryAgainAudio");


    if (tryAgainButton) {

        tryAgainButton.addEventListener(
            "click",
            function () {

                /* =========================================
                   DISABLE BUTTON
                ========================================= */

                tryAgainButton.disabled = true;


                /* =========================================
                   CLEAR OLD DATA
                ========================================= */

                try {

                    localStorage.removeItem(
                        DATA_KEY
                    );

                    localStorage.removeItem(
                        PHOTO_KEY
                    );

                } catch (error) {

                    console.error(
                        "Could not clear saved horoscope data:",
                        error
                    );

                }


                /* =========================================
                   AUDIO NOT FOUND
                ========================================= */

                if (!tryAgainAudio) {

                    window.location.href =
                        "first.html";

                    return;

                }


                /* =========================================
                   RESET AUDIO
                ========================================= */

                tryAgainAudio.currentTime = 0;

                tryAgainAudio.volume = 1.0;


                /* =========================================
                   AUDIO FINISHED
                   0:02 → FIRST.HTML
                ========================================= */

                tryAgainAudio.onended =
                    function () {

                        window.location.href =
                            "first.html";

                    };


                /* =========================================
                   AUDIO ERROR
                ========================================= */

                tryAgainAudio.onerror =
                    function () {

                        console.error(
                            "Could not load try.mpeg"
                        );

                        window.location.href =
                            "first.html";

                    };


                /* =========================================
                   PLAY AUDIO
                ========================================= */

                tryAgainAudio.play().catch(
                    function (error) {

                        console.error(
                            "Audio could not play:",
                            error
                        );

                        window.location.href =
                            "first.html";

                    }
                );

            }
        );

    }


    /* =====================================================
       PHOTO ERROR
    ===================================================== */

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            function () {

                this.style.display =
                    "none";

            }
        );

    }


    /* =====================================================
       LOG
    ===================================================== */

    console.log(
        "Random horoscope generated successfully."
    );

    console.log(
        "Try Again button connected to first.html."
    );

});