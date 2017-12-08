(function () {
  // start with retrieving the elements from the page, and then adding event handling. then write the logic. refer to the seasons example / homework
  var carButtons = document.querySelectorAll('.data-ref');
  const httpRequest = new XMLHttpRequest();

  function getCarData() {
    const url = './includes/functions.php?carModel=' + this.id;

    // fetch(url)
    //   .then((resp) => resp.json())
    //   .then(data) => { processResult(data); }
    //   .catch(function(error)){
    //     console.log(error);
    //   });
    if (!httpRequest) {
    alert('giving up, your browser sucks');
    return false;
    }

    httpRequest.onreadystatechange = processRequest;
    httpRequest.open('GET', './includes/functions.php?carModel=' + this.id);
    httpRequest.send();
  }

function processRequest() {
  let reqIndicator = document.querySelector('.request-state');
  reqIndicator.textContent = httpRequest.readyState;
  debugger;

  if (httpRequest.readyState === XMLHttpRequest.DONE) {
  if (httpRequest.status === 200) { // 200 means everything is awesome
    debugger;
    let data = JSON.parse(httpRequest.responseText);

    processCarData(data);
    } else {
    alert('There was a problem with the request.');
    }
    }
}

    function processCarData(data) {
      const { modelName, priceInfo, modelDetails } = data; // deconstruction assignment
      debugger;
      let model = document.querySelector('.modelName').textContent = modelName;
      let price = document.querySelector('.priceInfo').innerHTML = priceInfo;
      let desc = document.querySelector('.modelDetails').textContent = modelDetails;

      //model.textContent = carData[this.id].model;
      //price.innerHTML = "$" + carData[this.id].price;
      //desc.textContent = carData[this.id].description

      carButtons.forEach(function(car, index) {
        car.classList.add('nonActive');
      });
      // backticks are new ES6 template strings - look it up
      document.querySelector('#${data.model}').classList.remove('nonActive');
    }
    carButtons.forEach(function(car, index) {
      car.addEventListener('click', getCarData, false);
    });
})();
