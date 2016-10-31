(function() {
  var header = document.getElementById('header');
  var waves = document.getElementById('wave-svg');
  var headerHeight = header.clientHeight;
  window.addEventListener('resize', function() {
    headerHeight = header.clientHeight;
  });
  window.addEventListener('scroll', testy);
  function testy() {
    var scroll = this.scrollY;
    if (scroll < headerHeight) {
      waves.style.cssText = 'transform:translate3D(' + scroll / 5 +'px, 0, 0)';
    }
  }
})();