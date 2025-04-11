function getWeather() {
    const city = document.getElementById('cityInput').value;
    fetch('/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }
        const container = document.getElementById('weatherCardContainer');
        container.innerHTML = `
            <div class="weather-card">
                <h2>${data.city}</h2>
                <p><img src="https://openweathermap.org/img/wn/${data.icon}@2x.png"> ${data.description}</p>
                <p>Nhiệt độ: ${data.temp}°C</p>
            </div>
        `;
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('successMessage').innerText = 'Dữ liệu đã được tải thành công!';
    })
    .catch(error => {
        alert('Có lỗi xảy ra khi lấy dữ liệu thời tiết.');
        console.error(error);
    });
}
