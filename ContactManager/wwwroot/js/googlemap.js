var map, geocoder, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
    geocoder = new google.maps.Geocoder();
}

$('#txtAddress').on('input', function () {
    geocodeAddress();
});

function geocodeAddress(geocoder, resultsMap) {
    var address = $('#addressInput').val();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            if (marker) {
                marker.setMap(null);
            }
            marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

$(document).ready(function () {
    $('#showMapBtn').click(function () {
        geocodeAddress(geocoder, map);
    });
});