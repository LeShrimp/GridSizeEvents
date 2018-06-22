var GridSizeEvents = (function() {
    var sizeValues = {
        lg: 1200,
        md: 992,
        sm: 768,
        xs: 0
    };

    var sizesCss = {
        lg: "(min-width: " + sizeValues.lg + "px)",
        md: "(min-width: " + sizeValues.md + "px)",
        sm: "(min-width: " + sizeValues.sm + "px)",
        xs: "all"
    };

    var touchSizes = ["xs", "sm"];
    var desktopSizes = ["md", "lg"];
    var listeners = [];
    var currentSize;

    var getCurrentSize = function() {
        for (var size in sizesCss) {
            if (sizesCss.hasOwnProperty(size) && window.matchMedia(sizesCss[size]).matches) {
                return size;
            }
        }
    };

    var onSizeChange = function(newSize, oldSize) {
        _.each(listeners, function(l) {
            l(newSize, oldSize)
        })
    };

    currentSize = getCurrentSize();
    if (currentSize === undefined) {
        $(function() {
            currentSize = getCurrentSize();
        })
    }

    $(window).resize(_.throttle(function() {
        var size = getCurrentSize();
        if (size !== currentSize) {
            var oldSize = currentSize;
            currentSize = size;
            onSizeChange(currentSize, oldSize);
        }
    }, 100));

    return {
        addListener: function(l) {
            listeners.push(l);

            return this;
        },
        removeListener: function(l) {
            listeners = _.reject(listeners, function(unwantedListener) {
                return unwantedListener === l
            });

            return this;
        },
        trigger: function() {
            onSizeChange(currentSize, currentSize);

            return this;
        },
        getCurrentSize: function() {
            return currentSize;
        },
        detectCurrentSize: function() {
            return getCurrentSize()
        },
        resizedToMobileSize: function(newSize, oldSize) {
            return this.isMobileSize(newSize) && !this.isMobileSize(oldSize);
        },
        resizedToDesktopSize: function(newSize, oldSize) {
            return this.isDesktopSize(newSize) && !this.isDesktopSize(oldSize);
        },
        isMobileSize: function(size) {
            return _.contains(touchSizes, size || this.getCurrentSize());
        },
        isDesktopSize: function(size) {
            return _.contains(desktopSizes, size || this.getCurrentSize());
        }
    }
})();

window.GridSizeEvents = GridSizeEvents;
