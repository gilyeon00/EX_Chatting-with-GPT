import os
import flask
import openai
from flask import Flask
from flask_cors import CORS


openai.api_key = os.getenv('OPENAI_API_KEY')
app = Flask(__name__)
CORS(app)

from flask import request


def generate_chat_stream():
    completion = openai.ChatCompletion.create(
        model='gpt-3.5-turbo', 
        messages=[{"role": "user", "content": "What should I study as a new developer? I'm currently working on a mini project. " +
                   "Please tell me what skills and features you would like to include. Please answer in Korean"}],
        # 신입 개발자로서 어떤걸 공부하면 좋을까? 나는 현재 미니 프로젝트를 진행하고 있는데 넣으면 좋을 기술, 기능을 알려줘
        stream=True)
    for line in completion:
        chunk = line['choices'][0].get('delta', {}).get('content', '')
        if chunk:
            data = 'data: %s\n' % chunk
            app.logger.info(data)
            yield data

@app.route('/completionChat', methods=['GET'])
def completion_api_chat():
    if request.method == 'GET':
        return flask.Response(generate_chat_stream(), mimetype='text/event-stream')



if __name__ == '__main__':
    app.run(port=8888, debug=True)