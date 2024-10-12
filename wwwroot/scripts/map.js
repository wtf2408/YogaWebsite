
const coordinates = [44.054107, 43.063854]

ymaps.ready(() => {
    var map = new ymaps.Map("map", {
        center: coordinates,
        zoom: 18,
        controls: ['zoomControl'] // 'geolocationControl'
    },
    {
        // geolocationControlFloat: 'right',
        zoomControlFloat: 'right',
        zoomControlSize: 'small'

    });

    map.cursors.push('arrow'); // Заменяем указатель "руку" на "стрелку"
    map.behaviors.disable('scrollZoom');


    var placemark = new ymaps.Placemark(coordinates
        //, {
        // balloonContentHeader: 'Йога Мастерская',
        // balloonContentBody: 'В студеную зимнюю пору',
        // balloonContentFooter: 'Мы пошли в гору',
        // hintContent: 'Зимние происшествия'
        //}
    );

    placemark.events.add('click', function () {
        alert("Это дополнительная информация при нажатии на метку!");
      });
    // Добавляем метку на карту
    map.geoObjects.add(placemark);



    // // Настраиваем скорость зума через scrollZoom
    // map.behaviors.get('scrollZoom').options.set({
    //     speed: 0.2, // Устанавливаем низкую скорость изменения масштаба
    //     maximumDelta: 0.5
    // });

});