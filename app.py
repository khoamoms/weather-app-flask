from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)
@app.route('/about')
def about():
    return render_template('about.html')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.json.get('city')
    api_key = '7e9df764fef97426d3a7f538fd075c98'
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=vi'
    
    response = requests.get(url)
    data = response.json()
    if response.status_code != 200:
        return jsonify({'error': data.get('message', 'Error')}), 400
    
    result = {
        'city': data['name'],
        'temp': data['main']['temp'],
        'description': data['weather'][0]['description'],
        'icon': data['weather'][0]['icon']
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
