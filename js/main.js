(function () {
  // start with retrieving the elements from the page, and then adding event handling. then write the logic. refer to the seasons example / homework
  var theImages = document.querySelectorAll ('.data-reff'),
  var theHeading = document.querySelector('.modelName'),
  var thePrice = document.querySelector('.priceInfo p'),
  var theDetails = document.querySelector('.modelDetails p'),
  appliedClass;

  function changeElements() {
    debugger;
    let objectIndex = carData[this.id];

    theHeading.firstChild.nodeValue = objectIndex.headline;
    theDetails.firstChild.nodeValue = objectIndex.text;
    appliedClass = this.id;
  }

  theImages.forEach(function(element, index) {

    element.addEventListener('click', changeElements, false);

    });

});
