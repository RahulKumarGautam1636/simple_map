var myIp = $("#myIp");
var myLocation = $("#myLocation");
var myTimezone = $("#myTimezone");
var myIsp = $("#myIsp");

function showDetails(item) {
   myIp.text(item.ip);
   myLocation.text(item.city);
   myTimezone.text(item.timezone);
   myIsp.text(item.org);
}
function closeInfo() {
  $(".user_info").toggleClass("hideInfo");
  $("#close").toggleClass("rotateClose");
  $(".user_info div").toggleClass("hide");
}
function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(findLocation);
   } else {
     console.log("Your browser doesn't supports this geoLocation.");
   }
}

function findLocation(position) {
  newLocation = [position.coords.latitude, position.coords.longitude];
  myLocationList("MyGPSLocation", newLocation);
}

function showLocation(response) {
  jQuery.get("https://ipinfo.io", function(response) {
  var lat = response.loc.split(",")[0];
  var long = response.loc.split(",")[1];
  showDetails(response);
  ipLocation = [lat, long];
  getMap(ipLocation);
  },"jsonp")
}

showLocation();

places = [];
function deletePlace(list, rItem) {
places = list.filter((item, index) => {
    console.log(item.name+" "+rItem);
     return item.name !== rItem;
  })
  renderPlaces(places);
}
function getMap(i) {
  mymap = L.map('myMap').setView(i, 10);
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Rahul Kumar Gautam with ❤️';
  const tileLayer = L.tileLayer(tileUrl, { attribution });
  tileLayer.addTo(mymap);
  myIcon = L.icon({
      iconUrl: 'images/icon-location.svg',
      iconSize: [38, 55],
  });
  placesGroup = L.layerGroup();
  myLocationList("MyIPLocation", i);
  newPlaceList();
}

function newPlaceList() {
  mymap.on('click', function(e) {
var item = prompt("Enter name for this place.");
var   place = {
      name: item,
      coord: e.latlng
    }
    places.push(place);
    renderPlaces(places);
  });
}

function myLocationList(itemName, coords) {
  var   place = {
        name: itemName,
        coord: coords
      }
      places.push(place);
      renderPlaces(places);
}

function createList(name) {
   div = document.createElement('div');
   li = document.createElement('li');
   a = document.createElement('a');
   del = document.createElement('img');
  del.setAttribute("src", "images/icon-cross.svg");
  div.appendChild(a);
  div.appendChild(del);
  li.appendChild(div);
  ul.appendChild(li);
  a.innerText = name;
  a.href = '#';
}

const ul = document.querySelector("#placeList");
function renderPlaces(i) {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
  i.forEach((item) => {
    createList(item.name);
    del.classList.add(item.name);
    del.onclick = function () {
    placesGroup.clearLayers();
    deletePlace(i, this.className);
    return;
    };
var  markers = L.marker(item.coord, {icon: myIcon});
    renderThis(markers, item.name, placesGroup);
    markers.openPopup();
    a.addEventListener('click', () => {
      flyToPlace(item.coord, item.name);
      toggleMenu();
    });
  });
  placesGroup.addTo(mymap);
}

function flyToPlace(c, p) {
  mymap.flyTo(c, 14, {duration: 3});
  setTimeout(() => {
    L.popup({ closeButton: false, offset: L.point(0, -17) })
   .setLatLng(c)
   .setContent(p)
   .openOn(mymap);
}, 3000);
}

function popUpContent(content, layer) {
  layer.bindPopup(content, { closeButton: false, offset: L.point(0, -15) }).openPopup();
}

function toggleMenu() {
    $("#closeMenu").attr("src", (_, attr)=> attr=="images/icon-cross.svg"? "images/icon-hamburger.svg": "images/icon-cross.svg");
    $(".sideBar").toggleClass("hide_side_bar");
}

var recenter = $(".reCenter_container");
var isGPSon = false;
recenter.on('click', function() {
  if (isGPSon) {
    mymap.flyTo(newLocation , 9, {duration: 3});
  } else {
    mymap.flyTo(ipLocation, 9, {duration: 3});
  }
});
recenter.on('dblclick', function(e) {
  if (!isGPSon) {
    getLocation();
    isGPSon = true;
  }
});

function renderThis(mark, popUp, group) {
  mark.bindPopup(popUp, { closeButton: false, offset: L.point(0, -17) }).openPopup();
  group.addLayer(mark);
  group.addTo(mymap);
  mark.on('dblclick', function(e) {
    flyToPlace(e.latlng, popUp);
  });
}

var findThis = document.querySelector(".inputBar");
function findNew() {
  console.log(findThis.value);
  jQuery.get("https://geo.ipify.org/api/v1?apiKey=at_nf6K91Bp5z0IdHWzspRMGJdnrm0hy&ipAddress="+findThis.value, function(response) {
  console.log(response);
var  searchedLocation = [response.location.lat, response.location.lng];
  searchedMarker = L.marker(searchedLocation, {icon: myIcon});
  searchedGroup = L.layerGroup();
  renderThis(searchedMarker, response.as.domain, searchedGroup);
  flyToPlace(searchedLocation);
  searchedMarker.openPopup();
  })
}
