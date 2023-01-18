(function () {
    $(document).ready(function () {

        $('.image-link').magnificPopup({type: 'image'});
        document.getElementById('burger').onclick = function () {
            document.getElementById('menu').classList.add('open');
        }

        document.querySelectorAll('#menu > *').forEach((item) => {
            item.onclick = () => {
                document.getElementById('menu').classList.remove('open');
            }
        })

        new WOW().init();

        let formBtn = $('#formBtn');
        formBtn.click(function () {

            let hasError = false;
            $('input').removeClass('input-warning');
            $('label').removeClass('input-error');

            let name = $('#username');
            if (!name.val()) {
                hasError = true;
                $('#name-error').addClass('input-error');
                name.addClass('input-warning');
            }

            let address = $('#address');
            if (!address.val()) {
                hasError = true;
                $('#address-error').addClass('input-error');
                address.addClass('input-warning');
            }

            let phoneNumber = $('#phone-number');
            if (!phoneNumber.val()) {
                hasError = true;
                $('#phone-number-error').addClass('input-error');
                phoneNumber.addClass('input-warning');
            }

            if (!hasError) {
                $('#loader').css('display', 'flex');
                $.ajax({
                    method: "POST",
                    url: 'https://jsonplaceholder.typicode.com/posts',
                    data: {name: name.val(), address: address.val(), phoneNumber: phoneNumber.val()}
                })
                    .done(function (message) {
                        $('#loader').hide();
                        console.log(message);
                        $('#order-form').remove();
                        $('.success').addClass('active');
                    })
                    .fail(() => {
                        $('#loader').hide();
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                    });
            }
        });


    });

}())