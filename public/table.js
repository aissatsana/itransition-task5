let loading = false;
let pageNumber = 'page1';
const regionSelect = document.getElementById('regionSelect');
function loadMore(seed) {
  if (!loading) {
    loading = true;
    const selectedRegion = regionSelect.value;
    fetch(`/loadMore?region=${selectedRegion}&seed=${seed}`)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#userTable tbody');
        data.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.uniqueNumber}</td>
            <td>${user.name}</td>
            <td>${user.address}</td>
            <td>${user.phoneNumber}</td>
          `;
          tableBody.appendChild(row);
        });
        loading = false;
      })
      .catch(error => {
        console.error('Error loading more data:', error);
        loading = false;
      });
  }
}

// Обработка события скроллинга
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  pageNumber = 'page' + (Number(pageNumber.slice(4)) + 1) + inputSeed;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    // Загрузка дополнительных записей при достижении конца страницы
    loadMore(pageNumber);
  }
});

  regionSelect.addEventListener('change', function () {
    loadUsersByRegion();
  });

  function loadUsersByRegion() {
    pageNumber = 'page1';
    const selectedRegion = regionSelect.value;
    const seedValue = inputSeed.value;
    fetch(`/reload?region=${selectedRegion}&seed=${seedValue}`)
      .then(response => {
        window.location.href = response.url;
        regionSelect.value = selectedRegion;
  })
      .catch(error => {
        console.error('Error loading more data:', error);
      });
  }
;


const slider = document.getElementById('slider');
const field = document.getElementById('field');

slider.addEventListener('input', function () {
  field.value = slider.value;
});

field.addEventListener('input', function () {
  slider.value = Math.min(field.value, slider.max = 10)
});


const btnGenerete = document.querySelector('#generateBtn');
const inputSeed = document.querySelector('#seedInput');
btnGenerete.addEventListener('click', () => {
  inputSeed.value = Math.floor(Math.random() * 10000 );
  const inputEvent = new Event('change');
  inputSeed.dispatchEvent(inputEvent);
})
inputSeed.addEventListener('change', () => {
  const seedValue = inputSeed.value;
  const selectedRegion = regionSelect.value;
  fetch(`/reload?region=${selectedRegion}&seed=${seedValue}`)
    .then(response => {
      window.location.href = response.url;
    })
    .catch(error => {
      console.error('Error:', error);
    });
})


export { slider, field, regionSelect };