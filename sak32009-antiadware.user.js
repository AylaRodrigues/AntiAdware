// ==UserScript==
// @name          AntiAdware
// @namespace     sak32009-antiadware
// @description   Don't get unwanted applications while downloading with AntiAdware!
// @author        Sak32009
// @version       1.0.2
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
// @run-at        document-end
// @noframes
// ==/UserScript==

// MAIN
class Main {

    // CONSTRUCTOR
    constructor() {
        // RULES
        this.rules = [
            // DOUPLOADS.COM
            {
                host: "douploads.com",
                hide: [{
                    selector: "input#chkIsAdd",
                    closest: "div"
                }],
                uncheck: ["input#chkIsAdd"],
                intervalCheck: false
            },
            // DAYLYUPLOADS
            {
                host: "dailyuploads.net",
                hide: [{
                    selector: "input#chkIsAdd",
                    closest: "label"
                }],
                uncheck: ["input#chkIsAdd"],
                intervalCheck: false
            },
            // GET.ADOBE.COM
            {
                host: "get\\d?.adobe.com",
                hide: [{
                    selector: ".ContentColumn.ContentColumn-2"
                }],
                uncheck: ["#offerCheckbox", "#offerCheckbox1"],
                intervalCheck: false
            }
        ];
        // FIND
        this.find = {};
        // TIME INTERVAL
        this.timeInterval = 100;
        // RUN
        this.run();
    }

    // RUN
    run() {
        // SELF
        const self = this;
        // GET URL
        const url = window.location.href;
        // CHECK
        $.each(this.rules, (_index, _values) => {
            const host = _values.host;
            if (new RegExp(host, "g").test(url) === true) {
                self.find = _values;
                self.apply();
                return true;
            }
        });
    }

    // APPLY
    apply() {
        // UNCHECK FUNCTION
        this.applyUncheck();
        // HIDE FUNCTION
        this.applyHide();
        // INTERVAL CHECK
        this.intervalCheck();
    }

    // HIDE
    applyHide() {
        var self = this;
        if ("hide" in this.find) {
            $.each(this.find.hide, (_index, _values) => {
                let $selector = $(_values.selector);
                const closest = _values.closest;
                if (typeof closest !== "undefined") {
                    $selector = $selector.closest(closest);
                }
                $selector.attr("style", "display: none !important");
            });
        }
    }

    // UNCHECK
    applyUncheck() {
        var self = this;
        if ("uncheck" in this.find) {
            $.each(this.find.uncheck, function (_index, _values) {
                $(_values).attr("checked", false).prop("checked", false);
            });
        }
    }

    // INTERVAL CHECK
    intervalCheck() {
        var self = this;
        if (this.find.intervalCheck === true) {
            const intCheck = window.setInterval(function () {
                // UNCHECK FUNCTION
                self.applyUncheck();
                // HIDE FUNCTION
                self.applyHide();
            }, this.timeInterval);
        }
    }

}

// RUN
const main = new Main();
