// ==UserScript==
// @name         Paywall Bypass
// @description  Bypass paywalls on O Globo, Folha de S.Paulo, VEJA, and Fivewall websites
// @author       Your Name
// @match        *://*/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const removeElement = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    };

    const hideElement = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.style.display = 'none');
    };

    const blockScripts = (urls) => {
        urls.forEach(url => {
            const scriptSelector = `script[src*="${url}"]`;
            removeElement(scriptSelector);
        });
    };

    const domainActions = [
        {
            domain: 'oglobo.globo.com',
            action: () => {
                removeElement('#barreiraRegisterExclusiva');
                removeElement('section.block--advertising.block');
                removeElement('section.four-subpanes-with-advertising.block');
                removeElement('.block__advertising-content');
                removeElement('#pub-fullbanner-1');
                removeElement('#pub-box-materia');
                removeElement('.block__subpane--advertising.block__subpane');
                blockScripts(['static.infoglobo.com.br/paywall/', 'ogjs.infoglobo.com.br/js/contadorDeAcessos.js', 'ogjs.infoglobo.com.br/js/controla-acesso-aux.js']);
            }
        },
        {
            domain: 'folha.uol.com.br',
            action: () => {
                removeElement('#bt-read-more-content');
                removeElement('.c-push-notification');
                removeElement('.u-no-print.c-top-signup--close--bf-azul.c-top-signup--close--bf.c-top-signup--close.c-top-signup--fix.c-top-signup');
                blockScripts(['paywall.folha.uol.com.br/', 'static.folha.uol.com.br/paywall/']);
            }
        },
        {
            domain: 'veja.abril.com.br',
            action: () => {
                blockScripts(['authp.abril.com.br/paywall/', '*.cloudfunctions.net']);
            }
        },
        {
            domain: 'fivewall.com.br',
            action: () => {
                blockScripts(['fivewall.com.br']);
            }
        },
        // Add more domain actions as needed
    ];

    const currentDomain = window.location.hostname;
    const currentAction = domainActions.find(value => currentDomain.includes(value.domain));

    if (currentAction) {
        currentAction.action();
    }
})();
