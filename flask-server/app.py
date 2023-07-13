import os
import flask
import openai
from flask import Flask

openai.api_key = os.getenv('OPENAI_API_KEY')
app = Flask(__name__)


@app.route('/')
def home():
    return """
    <!DOCTYPE html>
    <html>
        <body>
        <h1>response:</h1>
        <div id="result"></div>
        <script>
            var source = new EventSource("/completion");
            source.onmessage = function(event) {
                document.getElementById("result").innerHTML += event.data + "<br>";
            };
        </script>
        </body>
    </html>
    """

@app.route('/completion', methods=['GET'])
def completion_api_text():
    def stream():
        completion = openai.Completion.create(engine="text-davinci-003", prompt="Hello world", stream=True)
        for line in completion:
            yield 'data: %s\n\n' % line.choices[0].text
    return flask.Response(stream(), mimetype='text/event-stream')


@app.route('/completionChat', methods=['GET'])
def completion_api_chat():
    def stream():
        completion = openai.ChatCompletion.create(
            model='gpt-3.5-turbo', 
            messages=[{"role": "user", "content": "Hello world"}],
            stream=True)
        for line in completion:
            chunk = line['choices'][0].get('delta', {}).get('content', '')
            if chunk:
                yield 'data: %s\n' % chunk
    return flask.Response(stream(), mimetype='text/event-stream')



if __name__ == '__main__':
    app.run(port=8888, debug=True)