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
                <p><strong>Nhiệt độ:</strong> ${data.temp}°C</p>
                <p><strong>Cảm giác như:</strong> ${data.feels_like}°C</p>
                <p><strong>Độ ẩm:</strong> ${data.humidity}%</p>
                <p><strong>Gió:</strong> ${data.wind_speed} m/s</p>
                <p><strong>Áp suất:</strong> ${data.pressure} hPa</p>
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
