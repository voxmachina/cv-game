/**
 * Game
 */
(function (window, document) {
    var nodeIndex = 2;
    var parent;
    var children;
    var char;
    var windowWidth;
    var windowHeight;
    var charDelay = 8000;
    
    var Game = window.Game = function () {
        var elem = document.querySelector(".cv-item.active");

        parent = document.querySelector(".cv-items");
        children = parent.querySelectorAll(".cv-item");
        char = document.querySelector(".char");

        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        windowWidth = parseInt(windowWidth);
        windowHeight = parseInt(windowHeight);

        elem.addEventListener("animationstart", this.prepare.bind(this));
        elem.addEventListener("animationend", this.next.bind(this));

        if (this.isDesktop()) {
            charDelay = 19000;
        } else if (this.isTablet()) {
            charDelay = 8000;
        }
    };

    Game.prototype.isTablet = function() {
        return windowWidth > 767 && windowWidth < 1024;
    };

    Game.prototype.isDesktop = function() {
        return windowWidth > 1023;
    };

    Game.prototype.prepare = function(evt) {
        var handler = evt.currentTarget || evt.target;
        var next = children[nodeIndex];
        var charBack = this.charWalk;

        char.classList.remove("char-walk-right");

        if (nodeIndex > children.length-2) {
            nodeIndex = 1;
        } else {
            nodeIndex++;
        }

        void char.offsetWidth;
        char.classList.add("char-back-wave");

        setTimeout(function() {
            charBack();
        }, charDelay);
        
        handler.innerHTML = next.innerHTML;
    };

    Game.prototype.next = function(evt) {
        var handler = evt.currentTarget || evt.target;

        handler.classList.remove("active");

        void handler.offsetWidth; // must trigger a reflow to restart animation
        handler.classList.add("active");
    };

    Game.prototype.charWalk = function(evt) {
        char.classList.remove("char-back-wave");

        void char.offsetWidth;
        char.classList.add("char-walk-right");
    };
})(window, document);

/**
 * Load
 */
window.addEventListener("load", function() {
    new Game();
});
