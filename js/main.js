(function () {
  // start with retrieving the elements from the page, and then adding event handling. then write the logic. refer to the seasons example / homework
  var carButtons = document.querySelectorAll('.data-ref');

  function getCarData() {
    const url = './includes/functions.php?carModel=' + this.id;

    fetch(url) //make an ajax call for the video thumbs
      .then((resp) => resp.json()) //convert result to json
      .then((data) => { processCarData(data); })
      .catch(function(error) {
        console.log(error);
      });
  }

  function processCarData(data) {
    const { modelName, priceInfo, modelDetails } = data; // deconstruction assignment

    let model = document.querySelector('.modelName').textContent = modelName;
    let price = document.querySelector('.priceInfo').innerHTML = priceInfo;
    let desc = document.querySelector('.modelDetails').textContent = modelDetails;

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
