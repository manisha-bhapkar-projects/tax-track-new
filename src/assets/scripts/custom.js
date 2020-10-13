$(window).ready(function() {
    $('#next-one').click(function() {
        // $('#data-add-modal-two').modal('show');
        $('#data-add-modal-one').modal('hide');
    });
    $('#skip-one').click(function() {
        // $('#data-add-modal-two').modal('show');
        $('#data-add-modal-one').modal('hide');
    });

    $('#next-two').click(function() {
        // $('#data-add-modal-three').modal('show');
        $('#data-add-modal-two').modal('hide');
    });
    $('#skip-two').click(function() {
        // $('#data-add-modal-three').modal('show');
        $('#data-add-modal-two').modal('hide');
    });

    $('#next-three').click(function() {
        // $('#data-add-modal-four').modal('show');
        $('#data-add-modal-three').modal('hide');
    });

    $('#skip-three').click(function() {
        // $('#data-add-modal-four').modal('show');
        $('#data-add-modal-three').modal('hide');
    });

    $('#next-four').click(function() {
        // $('#data-add-modal-five').modal('show');
        $('#data-add-modal-four').modal('hide');
    });
    $('#skip-four').click(function() {
        // $('#data-add-modal-five').modal('show');
        $('#data-add-modal-four').modal('hide');
    });

    $('#next-five').click(function() {
        // $('#data-add-modal-six').modal('show');
        $('#data-add-modal-five').modal('hide');
    });
    $('#skip-five').click(function() {
        // $('#data-add-modal-six').modal('show');
        $('#data-add-modal-five').modal('hide');
    });

    $('#next-six').click(function() {
        // $('#data-add-modal-seven').modal('show');
        $('#data-add-modal-six').modal('hide');
    });
    $('#skip-six').click(function() {
        // $('#data-add-modal-seven').modal('show');
        $('#data-add-modal-six').modal('hide');
    });

    $('#next-seven').click(function() {
        // $('#data-add-modal-eight').modal('show');
        $('#data-add-modal-seven').modal('hide');
    });
    $('#skip-seven').click(function() {
        // $('#data-add-modal-eight').modal('show');
        $('#data-add-modal-seven').modal('hide');
    });

    $('#next-eight').click(function() {
        // $('#data-add-modal-nine').modal('show');
        $('#data-add-modal-eight').modal('hide');
    });
    $('#skip-eight').click(function() {
        // $('#data-add-modal-nine').modal('show');
        $('#data-add-modal-eight').modal('hide');
    });

    $('#next-nine').click(function() {
        // $('#data-add-modal-ten').modal('show');
        $('#data-add-modal-nine').modal('hide');
    });
    $('#skip-nine').click(function() {
        // $('#data-add-modal-ten').modal('show');
        $('#data-add-modal-nine').modal('hide');
    });

    $('#next-ten').click(function() {
        // $('#data-add-modal-eleven').modal('show');
        $('#data-add-modal-ten').modal('hide');
    });
    $('#skip-ten').click(function() {
        // $('#data-add-modal-eleven').modal('show');
        $('#data-add-modal-ten').modal('hide');
    });

    $('#next-eleven').click(function() {
        // $('#data-add-modal-twelve').modal('show');
        $('#data-add-modal-eleven').modal('hide');
    });
    $('#skip-eleven').click(function() {
        // $('#data-add-modal-twelve').modal('show');
        $('#data-add-modal-eleven').modal('hide');
    });

    $('#next-twelve').click(function() {
        // $('#data-add-modal-thirteen').modal('show');
        $('#data-add-modal-twelve').modal('hide');
    });
    $('#skip-twelve').click(function() {
        // $('#data-add-modal-thirteen').modal('show');
        $('#data-add-modal-twelve').modal('hide');
    });

    $('#next-thirteen').click(function() {
        // $('#data-add-modal-fourteen').modal('show');
        $('#data-add-modal-thirteen').modal('hide');
    });
    $('#skip-thirteen').click(function() {
        // $('#data-add-modal-fourteen').modal('show');
        $('#data-add-modal-thirteen').modal('hide');
    });

    $('#next-fourteen').click(function() {
        // $('#data-add-modal-fifteen').modal('show');
        $('#data-add-modal-fourteen').modal('hide');
    });
    $('#skip-fourteen').click(function() {
        // $('#data-add-modal-fifteen').modal('show');
        $('#data-add-modal-fourteen').modal('hide');
    });

    $('#next-fifteen').click(function() {
        // $('#data-add-modal-sixteen').modal('show');
        $('#data-add-modal-fifteen').modal('hide');
    });
    $('#skip-fifteen').click(function() {
        // $('#data-add-modal-sixteen').modal('show');
        $('#data-add-modal-fifteen').modal('hide');
    });

    $('#next-sixteen').click(function() {
        // $('#data-add-modal-seventeen').modal('show');
        $('#data-add-modal-sixteen').modal('hide');
    });
    $('#skip-sixteen').click(function() {
        // $('#data-add-modal-seventeen').modal('show');
        $('#data-add-modal-sixteen').modal('hide');
    });
});

$(document).ready(function() {
    $("#send_msg_single").click(function() {
        var msg = $("#send_text_single").val();
        if (msg != '') {
            $("#single-messages").append(
                '<div class="outgoing_msg"> <div class="outgoing_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div> <div class="sent_msg"> <p>' + msg + '</p>        </div>  </div> <span class="time_date_send"> 02/02/2020</span>'
            );
            $("#send_text_single").val('');
        }

    })
});

$(document).ready(function() {
    $("#send_msg").click(function() {
        var msg = $("#send_text").val();
        if (msg != '') {
            $("#messages").append(
                '<div class="message-orange"> <p class="message-content">' + msg + '</p> <div class="message-timestamp-right">SMS 13:37</div></div>'
            );
            $("#send_text").val('');
        }

    })
});

$(document).ready(function() {
    $(".send_msg-new").click(function() {
        var msg = $(".send_text-new").val();
        if (msg != '') {
            $(".messages-new").append(
                '<div class="message-orange"> <p class="message-content">' + msg + '</p> <div class="message-timestamp-right">SMS 13:37</div></div>'
            );
            $(".send_text-new").val('');
        }

    })
});