// ==UserScript==
// @name          AntiAdware
// @namespace     sak32009-antiadware
// @description   Don't get unwanted applications while downloading with AntiAdware!
// @author        Sak32009
// @version       1.0.0
// @license       MIT
// @homepageURL   https://github.com/Sak32009/AntiAdware
// @supportURL    https://github.com/Sak32009/AntiAdware
// @updateURL     https://github.com/Sak32009/AntiAdware/raw/master/sak32009-antiadware.meta.js
// @downloadURL   https://github.com/Sak32009/AntiAdware/raw/master/sak32009-antiadware.user.js
// @icon          https://raw.githubusercontent.com/Sak32009/AntiAdware/master/sak32009-antiadware-32.png
// @icon64        https://raw.githubusercontent.com/Sak32009/AntiAdware/master/sak32009-antiadware-64.png
// @match         *://*/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js
// @grant         none
// @run-at        document-start
// @noframes
// ==/UserScript==

// MAIN
class Main {

    // CONSTRUCTOR
    constructor() {

        // DEBUG
        this.debug = false;

        // TIME INTERVAL
        this.timeInterval = 100;

        // RULES
        this.rules = [
            // DOUPLOADS.COM
            {
                host: "douploads.com/.",
                hide: [{
                    selector: "input#chkIsAdd",
                    closest: "div"
                }],
                uncheck: "input#chkIsAdd"
            },
            // DAYLYUPLOADS
            {
                host: "dailyuploads.net/.",
                hide: [{
                    selector: "input#chkIsAdd",
                    closest: "label"
                }],
                uncheck: "input#chkIsAdd"
            }
        ];

        // RUN
        this.run();

    }

    // RUN
    run() {

        const self = this;
        const url = window.location.href;

        this.log("Yeah Bitch! Eat my url", url);

        $.each(this.rules, (_index, _values) => {
            const host = _values.host;
            const re = new RegExp(host, "g");
            if (re.test(url) === true) {
                self.log("Find rules.. ", host);
                self.apply(_values);
                return true;
            }
        });

    }

    // APPLY
    apply(data) {

        const self = this;

        // HIDE FUNCTION
        if ("hide" in data) {
            this.log("Have 'hide' function!", this.hide);
            const hideInterval = window.setInterval(() => {
                $.each(data.hide, (_index, _values) => {
                    let $selector = $(_values.selector);
                    const closest = _values.closest;
                    if (typeof closest !== "undefined") {
                        $selector = $selector.closest(closest);
                    }
                    $selector.attr("style", "display: none !important");
                });
            }, this.timeInterval);
        }

        // UNCHECK FUNCTION
        if ("uncheck" in data) {
            this.log("Have 'uncheck' function! Selector: ", data.uncheck);
            const uncheckInterval = window.setInterval(() => {
                $(data.uncheck).attr("checked", false).prop("checked", false);
            }, this.timeInterval);
        }

    }

    // LOG
    log(...args) {
        return this.debug ? console.log(args) : false;
    }

}

// RUN
const main = new Main();