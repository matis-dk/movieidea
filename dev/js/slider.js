
  var sliderRating = document.getElementById('mg-slider-rating');
  var sliderRuntime = document.getElementById('mg-slider-runtime');
  var sliderYear = document.getElementById('mg-slider-year');


  noUiSlider.create(sliderRating, {
      start: [2, 6],
      connect: true,
      tooltips: [ wNumb({ decimals: 1 }), wNumb({ decimals: 1 }) ],
      range: {
          'min': [1],
          'max': [10]
      }
  });

  noUiSlider.create(sliderRuntime, {
      start: [80, 150],
      connect: true,
      animationDuration: 300,
      tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
      range: {
          'min': [60],
          'max': [300]
      }
  });

  noUiSlider.create(sliderYear, {
      start: [1990, 2017],
      connect: true,
      orientation: 'vertical',
      tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
      range: {
          'min': [1940],
          '50%': [2000],
          'max': [2020]
      }
  });
