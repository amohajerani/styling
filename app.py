
from flask import Flask, redirect, render_template, session, request, Response, url_for, send_file
import urllib.parse
app = Flask(__name__)


@app.route("/landing")
def landing():
    return render_template('landing.html')


@app.route("/")
def home():
    summary_txt = "This is a summary of what happened. This is a summary of what happened. This is a summary of what happened.This is a summary of what happened."
    summaries = [{'2023-05-04': summary_txt},
                 {'2023-05-03': summary_txt}, {'2023-05-02': summary_txt}]

    wordcloud = 'image.png'
    return render_template('home.html', summaries=summaries, wordcloud=wordcloud)


@app.route("/chat")
def chat():
    return render_template('chat.html')


@app.route('/get_response', methods=['POST'])
def get_response():
    return "This is a response from get_response function."


@ app.route("/past_entries/<date>")
def past_entries(date):
    entries = [{'role': 'bot', 'txt': 'what is up?'}, {'role': 'user',
                                                       'txt': 'good, good. it is all good. This message can be a paragraph or two'}]
    return render_template('journal-entry.html', entries=entries, date=date)


@app.route('/logo')
def get_log0():
    return send_file('./static/gagalilogo.jpg', mimetype='image/jpg')


@app.route('/subscriptions')
def subscriptions():
    return render_template('subscriptions.html')


@app.route('/remove-subscriber', methods=['POST'])
def remove_subscriber():
    return render_template('subscriptions.html')


@app.route('/add-subscriber', methods=['POST'])
def add_subscriber():
    return request.form.get('email')


@app.route('/get-subscribers')
def get_subscribers():
    return ['john.smith1@gmail.com', 'john.smith2@gmail.com']


@app.route('/get-subscriptions')
def get_subscriptions():
    return ['mary1@gmail.com', 'mary@gmail.com']


@app.route('/subscription/<encoded_email>')
def subscription_content(encoded_email):
    return render_template('home_subscription.html', dates=['2023-05-04', '2023-05-02', '2023-05-01'], email='mary1@gmail.com', encoded_email=urllib.parse.quote('mary1@gmail.com'))


@app.route('/subscription/past_entry/<encoded_email>/<date>')
def subscription_entry(encoded_email, date):
    entries = [{'role': 'bot', 'txt': 'what is up?'},
               {'role': 'user', 'txt': 'good, good. it is all good. This message can be a paragraph or two'},
               {'role': 'bot', 'txt': 'what is up?'},
               {'role': 'user', 'txt': 'good, good. it is all good. This message can be a paragraph or two'}]

    return render_template('journal-entry-subscription.html', entries=entries, date='2023-05-04', email='mary1@gmail.com')


@app.route('/analyze')
def analyze():
    insight = "This has been a good insight. This has been a good insight. This has been a good insight. This has been a good insight. This has been a good insight."
    actions = "Do more work and be happy. Do more work and be happy. Do more work and be happy. Do more work and be happy."
    wordcloud = 'image.png'
    return render_template('analysis.html', insight=insight,
                           actions=actions, wordcloud=wordcloud)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
