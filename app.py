from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = '7e9df764fef97426d3a7f538fd075c98'  # Thay bằng key thật của bạn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    data = request.get_json()
    city = data.get('city')

    if not city:
        return jsonify({'error': 'Vui lòng nhập tên thành phố.'}), 400

    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=vi'

    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'Không tìm thấy thành phố.'}), 404

    weather_data = response.json()
    
    result = {
        'city': weather_data['name'],
        'temp': weather_data['main']['temp'],
        'feels_like': weather_data['main']['feels_like'],
        'humidity': weather_data['main']['humidity'],
        'wind_speed': weather_data['wind']['speed'],
        'pressure': weather_data['main']['pressure'],
        'description': weather_data['weather'][0]['description'].capitalize(),
        'icon': weather_data['weather'][0]['icon']
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
