import gensim
import pandas as pd
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

query = "sum total amount"

# tokenize and stemm the input query.
ps = PorterStemmer()
tokenized_query = [w.lower() for w in word_tokenize(query)]
stemmed_query = [ps.stem(w) for w in tokenized_query]

# load dictionary , tf_idf and similarity matrix
dictionary = gensim.corpora.Dictionary.load("./model/dict.data")
query_bow = dictionary.doc2bow(stemmed_query)

tf_idf = gensim.models.TfidfModel.load("./model/tf_idf.model")
query_tf_idf = tf_idf[query_bow]

sims = gensim.similarities.Similarity.load("./model/similarity.matrix")
similarity_matrix = sims[query_tf_idf]

max_value = similarity_matrix.max()
max_index = similarity_matrix.argmax()

interfaces = pd.read_csv('./../output/interfaces.csv', header=None)
similar_interface = interfaces.values[max_index][0];

print("---------------------")
print(similar_interface)
print("(Similarity Distance %f, Index %f)" % (max_value, max_index))
print("---------------------")
