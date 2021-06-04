// function getLocation() {
//    if (navigator.geolocation) {
//      navigator.geolocation.getCurrentPosition(showLocation);
//    } else {
//      console.log("Your browser doesn't supports this geoLocation.");
//    }
// }
// function showLocation(position) {
//   // var myLocation = [];
//   mylocation = [position.coords.latitude, position.coords.longitude];
//   var mymap = L.map('myMap').setView(mylocation, 10);
// //   var mylocation = [22.511946299999998, 88.2235536]

//   const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//   const attribution =
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Rahul Kumar Gautam with ❤️';
//   const tileLayer = L.tileLayer(tileUrl, { attribution });
//   tileLayer.addTo(mymap);

//   var myIcon = L.icon({
//       iconUrl: 'images/icon-location.svg',
//       iconSize: [38, 55],
//   });

//   const marker = L.marker(mylocation, {icon: myIcon});
//   var popupContent = 'hello world.'
//   marker.bindPopup(popupContent, { closeButton: false, offset: L.point(0, -15) }).openPopup();

//   marker.addTo(mymap);
// }


var myIp = $("#myIp");
var myLocation = $("#myLocation");
var myTimezone = $("#myTimezone");
var myIsp = $("#myIsp");
function showDetails(item) {
   myIp.text(item.ip);
   myLocation.text(item.city);
   myTimezone.text(item.timezone);
   myIsp.text(item.org);
   myFunction(x);
}
function closeInfo() {
  $(".user_info").toggleClass("hideInfo");
  $("#close").toggleClass("rotateClose");
  setTimeout(function() {
    $(".user_info div").toggleClass("hide");
  },400);
}
function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(findLocation);
   } else {
     console.log("Your browser doesn't supports this geoLocation.");
   }
}
getLocation();
// var mylocation = [22.511946299999998, 88.2235536]
function showLocation(response) {
  jQuery.get("https://ipinfo.io", function(response) {
    // console.log(response);
  var lat = response.loc.split(",")[0];
  var long = response.loc.split(",")[1];
  mylocation = [lat, long];
  console.log(mylocation);
  // getMap(mylocation);
  showDetails(response);
  },"jsonp")
}

showLocation();

function getMap(i) {
  mymap = L.map('myMap').setView(i, 10);
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution =
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Rahul Kumar Gautam with ❤️';
  const tileLayer = L.tileLayer(tileUrl, { attribution });
  tileLayer.addTo(mymap);
  myIcon = L.icon({
      iconUrl: 'images/icon-location.svg',
      iconSize: [38, 55],
  });
  marker = L.marker(i, {icon: myIcon});
  var popupContent = 'hello world.'
  marker.bindPopup(popupContent, { closeButton: false, offset: L.point(0, -15) }).openPopup();
  marker.addTo(mymap);
}
var newItem = document.querySelector(".inputBar");
function findLocation(position) {
var newLocation = [position.coords.latitude, position.coords.longitude];
  // L.marker(newLocation, {icon: myIcon}).addTo(mymap);
  getMap(newLocation);
  console.log(newLocation);
}
// findLocation();

x = window.matchMedia("(max-width: 900px)");
myFunction(x);
x.addListener(myFunction);
function myFunction(x) {
    if (!x.matches) {
      $(".user_info").addClass("desk_height");
    } else {
      $(".user_info").addClass("mobile_height");
    }
}
