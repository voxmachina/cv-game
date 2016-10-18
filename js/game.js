/**
 * Game
 */
(function (window, document) {
    var nodeIndex = 2;
    var parent;
    var children;
    var char;
    
    var Game = window.Game = function () {
        var elem = document.querySelector(".cv-item.active");

        parent = document.querySelector(".cv-items");
        children = parent.querySelectorAll(".cv-item");
        char = document.querySelector(".char");

        elem.addEventListener("animationstart", this.prepare.bind(this));
        elem.addEventListener("animationend", this.next.bind(this));
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
        }, 9000);
        
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
