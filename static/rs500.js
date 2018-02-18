(function ($) {

    function update() {
        $.getJSON('/data', function (data) {
            Object.keys(data).forEach(function(key) {
                $('#' + key).text(data[key]);
            })
        }).fail(function() {
            for (var i = 1; i <= 8; i++) {
                $('#c' + i + 't').text('--.-');
                $('#c' + i + 'h').text('--');
            }
        });
    }

    $(document).ready(function () {
        update();
        setInterval(update, 5000);
    });

})(jQuery);