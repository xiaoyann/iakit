window.fastOnClick = function(node, handler) {
    node.addEventListener('touchend', function(event) {
        handler(event);
        event.preventDefault();
    }, false);
    node.addEventListener('click', handler, false);
};