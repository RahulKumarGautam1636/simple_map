function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showLocation);
   } else {
     console.log("Your browser doesn't supports this geoLocation.");
   }
}
function showLocation(position) {
  // var myLocation = [];
  mylocation = [position.coords.latitude, position.coords.longitude];
  var mymap = L.map('myMap').setView(mylocation, 10);
  var mylocation = [22.511946299999998, 88.2235536]

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution =
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Rahul Kumar Gautam with ❤️';
  const tileLayer = L.tileLayer(tileUrl, { attribution });
  tileLayer.addTo(mymap);

  var myIcon = L.icon({
      iconUrl: 'images/icon-location.svg',
      iconSize: [38, 55],
  });

  const marker = L.marker(mylocation, {icon: myIcon});
  var popupContent = 'hello world.'
  marker.bindPopup(popupContent, { closeButton: false, offset: L.point(0, -15) }).openPopup();

  marker.addTo(mymap);
}

// console.log(myLocation);

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }
//
// function showPosition(position) {
//   // console.log(position.coords.latitude);
// }

getLocation();
