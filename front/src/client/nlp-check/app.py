import re
import json
from konlpy.tag import Okt
from keras.utils import pad_sequences
from keras.preprocessing.text import Tokenizer
import pickle
import keras
import re

okt = Okt()
tokenizer  = Tokenizer()

DATA_CONFIGS = 'data_configs_test.json'
prepro_configs = json.load(open('DATA/CLEAN_DATA/'+DATA_CONFIGS,'r'))

with open('DATA/CLEAN_DATA/tokenizer_senti.pickle','rb') as handle:
    word_vocab = pickle.load(handle)

prepro_configs['vocab'] = word_vocab

tokenizer.fit_on_texts(word_vocab)

MAX_LENGTH = 8
model = keras.models.load_model('DATA/my_senti_models')
model.load_weights('DATA/DATA_SENTI_OUT/cnn_classifier_kr/weights.h5')


sentence = input()

sentence = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣\\s ]','', sentence)

sentence = okt.morphs(sentence, stem=True)

vector = tokenizer.texts_to_sequences(sentence)
pad_new = pad_sequences(vector, maxlen=MAX_LENGTH)

predictions = model.predict(pad_new)
predictions = float(predictions[0])

if predictions > 0.5:
    print("{:.2f}% 확률로 긍정 리뷰입니다.\n".format(predictions * 100))
else:
    print("{:.2f}% 확률로 부정 리뷰입니다.\n".format((1 - predictions) * 100))
# For this example, we will just reverse the sentence


