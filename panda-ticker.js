/*!
 * Panda Ticker v1.0.0
 * https://github.com/pandatemplates/panda-ticker
 *
 * Copyright 2022 PandaTemplates and other contributors
 * Released under the MIT license
 */
! function (t) {
    t.fn.pandaticker = function () {
        return this.each(function () {
            new class {
                constructor(t) {
                    this.ticker = t;
                    this.active = 0;
                    this.tickerInit()
                }
                tickerActive(t) {
                    this.active = t;
                    this.items.each(function () {
                        this.classList.remove("active")
                    });
                    this.items[t].classList.add("active");
                    this.tickerAuto()
                }
                tickerArrows() {
                    this.ticker.append('<div class="ticker-nav"><button class="tn-prev" aria-label="Previous"/><button class="tn-next" aria-label="Next"/></div>')
                }
                prev() {
                    if (this.active > 0) {
                        this.tickerActive(this.active - 1)
                    } else {
                        this.tickerActive(this.items.length - 1)
                    }
                }
                next() {
                    if (this.active < this.items.length - 1) {
                        this.tickerActive(this.active + 1)
                    } else {
                        this.tickerActive(0)
                    }
                }
                tickerNavigation() {
                    const t = this.ticker.find(".tn-prev");
                    this.ticker.find(".tn-next").on("click", this.next);
                    t.on("click", this.prev)
                }
                tickerAuto() {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(this.next, 5e3)
                }
                tickerInit() {
                    this.next = this.next.bind(this);
                    this.prev = this.prev.bind(this);
                    this.items = this.ticker.find(".ticker-items > *");
                    const t = this.items.length;
                    if (t) {
                        this.tickerActive(0)
                        if (t >= 2) {
                            this.tickerArrows();
                            this.tickerNavigation()
                        }
                    }
                }
            }(t(this))
        })
    }
}(jQuery);
