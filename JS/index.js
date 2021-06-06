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
  $(".user_info div").toggleClass("hide");
}
function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(findLocation);
   } else {
     console.log("Your browser doesn't supports this geoLocation.");
   }
}
// getLocation();
function findLocation(position) {
  newLocation = [position.coords.latitude, position.coords.longitude];
  // getMap(newLocation);
  newmarker = L.marker(newLocation, {icon: myIcon});
  newmarker.bindPopup("Your GPS location.", { closeButton: false, offset: L.point(0, -15) }).openPopup();
  myGroup.addLayer(newmarker);
  myGroup.addTo(mymap);
  newmarker.on('dblclick', function(e) {
    mymap.flyTo(e.latlng, 14, {duration: 3})
  });
}

function showLocation(response) {
  jQuery.get("https://ipinfo.io", function(response) {
  var lat = response.loc.split(",")[0];
  var long = response.loc.split(",")[1];
  showDetails(response);
  getMap([lat, long]);
  },"jsonp")
}

showLocation();

places = [];
function deletePlace(list, rItem) {
places = list.filter((item, index) => {
    console.log(item.name+" "+rItem);
     return item.name !== rItem;
  })
  // console.log(placesGroup.getLayers());
  renderPlaces(places);
}
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
  myGroup = L.layerGroup([marker]);
placesGroup = L.layerGroup();
  var popupContent = 'You are here.'
  marker.bindPopup(popupContent, { closeButton: false, offset: L.point(0, -15) }).openPopup();
  myGroup.addTo(mymap);
  mymap.on('click', function(e) {
    console.log(e.latlng);
var item = prompt("Enter name for this place.");
var   place = {
      name: item,
      coord: e.latlng
    }
    places.push(place);
    renderPlaces(places);
  });
  marker.on('dblclick', function(e) {
    mymap.flyTo(e.latlng, 14, {duration: 3})
  });
}
function renderPlaces(i) {
  const ul = document.querySelector("#placeList");
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
  i.forEach((item) => {
    const div = document.createElement('div');
    const li = document.createElement('li');
    const a = document.createElement('a');
    const del = document.createElement('img');
    del.setAttribute("src", "images/icon-cross.svg");
    del.classList.add(item.name);
    del.onclick = function () {
    placesGroup.clearLayers();
    deletePlace(i, this.className);
    return;
    };
    console.log("DONE");
    a.innerText = item.name;
    a.href = '#';
    var markers = L.marker(item.coord, {icon: myIcon});
    popUpContent(item.name, markers);
    placesGroup.addLayer(markers);
    markers.addEventListener('dblclick', () => {
      flyToPlace(item.coord);
    });
    a.addEventListener('click', () => {
      flyToPlace(item.coord);
      toggleMenu();
    });
    div.appendChild(a);
    div.appendChild(del);
    li.appendChild(div);
    ul.appendChild(li);
  });
  placesGroup.addTo(mymap);
}

function flyToPlace(c) {
  mymap.flyTo(c, 14, {duration: 3})
}

function popUpContent(content, layer) {
  layer.bindPopup(content, { closeButton: false, offset: L.point(0, -15) }).openPopup();
}

function toggleMenu() {
    $("#closeMenu").attr("src", (_, attr)=> attr=="images/icon-cross.svg"? "images/icon-hamburger.svg": "images/icon-cross.svg");
    $(".sideBar").toggleClass("hide_side_bar");
}

var recenter = $(".reCenter_container");
var checkGpsOn = false;
function reCenter() {
  if (checkGpsOn) {
    mymap.flyTo(newLocation, 10, {duration: 3});
  } else {
    myGroup.clearLayers();
    getLocation();
  }
  checkGpsOn = true;
}

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
