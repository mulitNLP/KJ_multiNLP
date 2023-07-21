import numpy as np
import pandas as pd
import re
import json
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer

DATA_PATH = 'DATA/'
pos_data = pd.read_csv(DATA_PATH + 'pos_pol_word.txt',  header = 0, delimiter='\t', quoting=3)
neg_data = pd.read_csv(DATA_PATH+'neg_pol_word.txt', header = 0, delimiter='\t', quoting=3)
train_data = pd.read_csv(DATA_PATH+'/ratings_train.txt', header = 0, delimiter='\t', quoting=3)
test_data = pd.read_csv(DATA_PATH+'/ratings_test.txt', header = 0, delimiter='\t', quoting=3)
stop_words = ['은','는','이','가','하','아','것','들','의','있','되','수','보','주','등','한', '에']
pattern = '[^가-힣ㄱ-ㅎㅏ-ㅣ\\s]' 
clean_train_review = []
okt = Okt()
def preprocessing(review, okt, remove_stopwords = False, stop_words = []):
    text = re.sub(pattern=pattern, repl=' ', string=review) #한글 제외 언어들을 삭제
    word_text = okt.morphs(text, stem = True) #Okt 객체를 활용하여 형태소 단어로 나눔
    
    if (remove_stopwords == True):
        word_text = [token for token in word_text if not token in stop_words]
    return word_text

okt = Okt()
neg_data_check = 0
pos_data_check = 0
clean_train_review = []
train_labels = []
for i in range(9827+4844):
  if(pos_data_check <= 4843 and i % 2 == 0):
    review = pos_data['document'][pos_data_check]
    # 리뷰가 문자열인 경우만 전처리 진행
    if type(review) == str:
      clean_train_review.append(preprocessing(review,okt))
    else:
      clean_train_review.append([]) #str이 아닌 행은 빈칸으로 놔두기
    pos_data_check += 1
    train_labels.append(1)
  else:
    review = neg_data['document'][neg_data_check]
    if(type(review) == str):
        clean_train_review.append(preprocessing(review, okt))
    else:
        clean_train_review.append([])
    neg_data_check += 1
    train_labels.append(0)
for review in train_data['document']:
  if(type(review) == str):
      clean_train_review.append(preprocessing(review, okt, remove_stopwords=True, stop_words = stop_words))
  else:
      clean_train_review.append([])

for review in test_data['document']:
  if type(review) == str:
      clean_train_review.append(preprocessing(review, okt, remove_stopwords=True, stop_words=stop_words))
  else:
      clean_train_review.append([])
temp_train_labels = np.array(train_labels) 
train_temp_labels = np.array(train_data['label'])
test_temp_labels = np.array(test_data['label'])
train_labels = np.concatenate([temp_train_labels, train_temp_labels, test_temp_labels])
train_labels = np.array(train_labels)
train_labels = train_labels.astype(int)
print(train_labels[:100])
print(len(train_labels))
print(len(clean_train_review))

MAX_SEQUENCE_LENGTH = 8 #문장 최대 길이
tokenizer = Tokenizer()
tokenizer.fit_on_texts(clean_train_review)
train_sequences = tokenizer.texts_to_sequences(clean_train_review)
train_inputs = pad_sequences(train_sequences, maxlen = MAX_SEQUENCE_LENGTH, padding='post')
word_vocab = tokenizer.word_index #단어사전형태
MAX_SEQUENCE_LENGTH = 8 #문장 최대 길이

#학습 데이터
# #학습 데이터 라벨 벡터화
# zeros_array = np.repeat(0, 9827)
# ones_array = np.repeat(1, 4844)

# # 0이라는 숫자를 9827개로 이루어진 배열 생성


# # 두 배열을 합쳐서 하나의 배열로 만들기
# train_labels = np.concatenate((zeros_array, ones_array))


# data = list(zip(train_inputs, train_labels,word_vocab))

# # Shuffle the data
# np.random.shuffle(data)

# # Separate input_data and label_data
# shuffled_input_data, shuffled_label_data, shuffled_word_vocab = zip(*data)

# # Convert the shuffled_input_data and shuffled_label_data back to numpy arrays
# shuffled_input_data = np.array(shuffled_input_data)
# shuffled_label_data = np.array(shuffled_label_data)

#학습 데이터 라벨 벡터화

DEFAULT_PATH  = 'DATA/' # 경로지정
DATA_PATH = 'CLEAN_DATA/' #.npy파일 저장 경로지정
POS_INPUT_DATA = 'nsmc_pos_input.npy'
POS_LABEL_DATA = 'nsmc_pos_label.npy'
NEG_INPUT_DATA = 'nsmc_neg_input.npy'
NEG_LABEL_DATA = 'nsmc_neg_label.npy'
DATA_CONFIGS = 'data_configs_test.json'
DEFAULT_DATA_PATH_SAVE = 'DATA/'
DATA_PATH_SAVE = 'CLEAN_DATA/'
TRAIN_INPUT_DATA = 'nsmc_train_input.npy'
TRAIN_LABEL_DATA = 'nsmc_train_label.npy'

data_configs={}
data_configs['vocab'] = word_vocab
data_configs['vocab_size'] = len(word_vocab) + 1
print(len(word_vocab))
#전처리한 데이터들 파일로저장
import os

if not os.path.exists(DEFAULT_PATH + DATA_PATH):
  os.makedirs(DEFAULT_PATH+DATA_PATH)

#전처리 학습데이터 넘파이로 저장

np.save(open(DEFAULT_DATA_PATH_SAVE+DATA_PATH_SAVE+TRAIN_INPUT_DATA,'wb'),train_inputs)
np.save(open(DEFAULT_DATA_PATH_SAVE+DATA_PATH_SAVE+TRAIN_LABEL_DATA,'wb'),train_labels)


#데이터 사전 json으로 저장
json.dump(data_configs,open(DEFAULT_PATH + DATA_PATH + DATA_CONFIGS,'w'),ensure_ascii=False)
import pickle
with open(DEFAULT_PATH + DATA_PATH + 'tokenizer_senti.pickle', 'wb') as handle:
  pickle.dump(word_vocab, handle)
