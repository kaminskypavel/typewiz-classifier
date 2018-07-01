import gensim
import pandas as pd
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

query = "id name firstname lastname message"
model_load_size = 10000

# load features in the memory
gen_docs = []

with open('./../output/features.csv') as file:
	firstNlines = file.readlines()[0:model_load_size]
	for featuresStr in firstNlines:
		featuersArr = featuresStr.replace("\n", "").split(",")
		gen_docs.append(featuersArr)

# build a corpus
dictionary = gensim.corpora.Dictionary(gen_docs)

corpus = [dictionary.doc2bow(gen_doc) for gen_doc in gen_docs]
tf_idf = gensim.models.TfidfModel(corpus)
print("loaded %d in the dictionary" % len(dictionary))
print("model size : %s" % tf_idf)

# similarity measure object in tf-idf space.
sims = gensim.similarities.Similarity('.',
									  tf_idf[corpus],
									  num_features=len(dictionary))

# tokenize and stemm the input query.
ps = PorterStemmer()
tokenized_query = [w.lower() for w in word_tokenize(query)]
stemmed_query = [ps.stem(w) for w in tokenized_query]
print(stemmed_query)

query_bow = dictionary.doc2bow(stemmed_query)
query_tf_idf = tf_idf[query_bow]
similarity_matrix = sims[query_tf_idf]

max_value = similarity_matrix.max()
max_index = similarity_matrix.argmax()

interfaces = pd.read_csv('./../output/interfaces.csv',header=None)
similar_interface = interfaces.values[max_index][0];

print("---------------------")
print(similar_interface)
print("(Similarity Distance %f, Index %f)" % (max_value, max_index))
print("---------------------")
