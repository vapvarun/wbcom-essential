jQuery(document).ready(function($) {
    $('#wb_login_form').on('submit', function(e) {
        e.preventDefault();

        var formData = $(this).serialize() + '&security=' + wbcom_ajax_login_params.security;
        var redirectUrl = $('#wb_login_form input[name="redirect_to"]').val(); // Get redirect URL

        $.ajax({
            type: 'POST',
            url: wbcom_ajax_login_params.ajax_url,
            data: formData,
            dataType: 'json',
            beforeSend: function() {
                $('#wbcom-login-error').hide();
            },
            success: function(response) {
                if (response.loggedin) {
                    window.location.href = response.redirect ? response.redirect : redirectUrl; // Redirect user
                } else {
                    $('#wbcom-login-error').html(response.message).fadeIn();
                }
            }
        });
    });
});
