(function ($) {

    function update() {
        $.getJSON('/data', function (data) {
            Object.keys(data).forEach(function(key) {
                $('#' + key).text(data[key]);
            })
        });
    }

    $(document).ready(function () {
        update();
        setInterval(update, 5000);
    });

})(jQuery);