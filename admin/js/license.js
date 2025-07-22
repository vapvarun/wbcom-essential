jQuery(document).ready(function($) {
    'use strict';
    
    console.log('License JS loaded');
    if (typeof wbcomEssentialLicense !== 'undefined') {
        console.log('Ajax URL:', wbcomEssentialLicense.ajax_url);
        console.log('Nonce:', wbcomEssentialLicense.nonce);
    } else {
        console.error('wbcomEssentialLicense object not found');
    }
    
    // Show license message
    function showLicenseMessage(message, type) {
        const messageDiv = $('#wbcom-essential-license-message');
        messageDiv.removeClass('success error info').addClass(type).text(message).show();
        
        // Auto hide after 5 seconds
        setTimeout(function() {
            messageDiv.fadeOut();
        }, 5000);
    }
    
    // Handle change license key button
    $('#wbcom-essential-change-license').on('click', function() {
        $('#wbcom-essential-license-display').hide();
        $('#wbcom-essential-license-input-wrapper').show();
        $('#wbcom_essential_license_key').focus();
    });
    
    // Handle cancel change button
    $('#wbcom-essential-cancel-change').on('click', function() {
        $('#wbcom-essential-license-display').show();
        $('#wbcom-essential-license-input-wrapper').hide();
        $('#wbcom_essential_license_key').val('');
    });
    
    // Get the actual license key for AJAX operations
    function getActualLicenseKey() {
        const inputVal = $('#wbcom_essential_license_key').val().trim();
        const hiddenVal = $('#wbcom_essential_license_key_hidden').val().trim();
        
        // If user has entered a new key, use that
        if (inputVal && !inputVal.includes('*')) {
            return inputVal;
        }
        // Otherwise use the stored key
        return hiddenVal;
    }
    
    // Activate license
    $('#wbcom-essential-activate-license').on('click', function() {
        console.log('Activate button clicked');
        const button = $(this);
        const licenseKey = getActualLicenseKey();
        const messageDiv = $('#wbcom-essential-license-message');
        
        if (!licenseKey) {
            showLicenseMessage('Please enter a license key', 'error');
            return;
        }
        
        button.prop('disabled', true).text(wbcomEssentialLicense.strings.activating);
        messageDiv.removeClass('success error info').addClass('info').text('Activating license...').show();
        
        $.ajax({
            url: wbcomEssentialLicense.ajax_url,
            type: 'POST',
            data: {
                action: 'wbcom_essential_activate_license',
                license_key: licenseKey,
                nonce: wbcomEssentialLicense.nonce
            },
            success: function(response) {
                if (response.success) {
                    showLicenseMessage(response.data.message, 'success');
                    // Update status display
                    $('#wbcom-essential-license-status').html(response.data.status_html);
                    // Reload page after a delay
                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                } else {
                    showLicenseMessage(response.data.message, 'error');
                }
            },
            error: function() {
                showLicenseMessage('Error activating license', 'error');
            },
            complete: function() {
                button.prop('disabled', false).text('Activate License');
            }
        });
    });
    
    // Deactivate license
    $('#wbcom-essential-deactivate-license').on('click', function() {
        if (!confirm('Are you sure you want to deactivate your license?')) {
            return;
        }
        
        const button = $(this);
        const messageDiv = $('#wbcom-essential-license-message');
        
        button.prop('disabled', true).text(wbcomEssentialLicense.strings.deactivating);
        messageDiv.removeClass('success error info').addClass('info').text('Deactivating license...').show();
        
        $.ajax({
            url: wbcomEssentialLicense.ajax_url,
            type: 'POST',
            data: {
                action: 'wbcom_essential_deactivate_license',
                nonce: wbcomEssentialLicense.nonce
            },
            success: function(response) {
                if (response.success) {
                    showLicenseMessage(response.data.message, 'success');
                    // Update status display
                    $('#wbcom-essential-license-status').html(response.data.status_html);
                    // Reload page after a delay
                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                } else {
                    showLicenseMessage(response.data.message, 'error');
                }
            },
            error: function() {
                showLicenseMessage('Error deactivating license', 'error');
            },
            complete: function() {
                button.prop('disabled', false).text('Deactivate License');
            }
        });
    });
    
    // Check license
    $('#wbcom-essential-check-license').on('click', function() {
        const button = $(this);
        const messageDiv = $('#wbcom-essential-license-message');
        
        button.prop('disabled', true).text(wbcomEssentialLicense.strings.checking);
        messageDiv.removeClass('success error info').addClass('info').text('Checking license...').show();
        
        $.ajax({
            url: wbcomEssentialLicense.ajax_url,
            type: 'POST',
            data: {
                action: 'wbcom_essential_check_license',
                nonce: wbcomEssentialLicense.nonce
            },
            success: function(response) {
                if (response.success) {
                    showLicenseMessage(response.data.message, 'success');
                    // Update status display
                    $('#wbcom-essential-license-status').html(response.data.status_html);
                } else {
                    showLicenseMessage(response.data.message, 'error');
                }
            },
            error: function() {
                showLicenseMessage('Error checking license', 'error');
            },
            complete: function() {
                button.prop('disabled', false).text('Check License');
            }
        });
    });
    
    // Show message if updated
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('updated') === 'true') {
        showLicenseMessage('License key saved successfully', 'success');
        // Update button text temporarily
        const saveBtn = $('button[name="wbcom_essential_save_license"]');
        if (saveBtn.length) {
            const originalText = saveBtn.text();
            saveBtn.text('Saved');
            setTimeout(function() {
                saveBtn.text(originalText);
            }, 3000);
        }
    }
});