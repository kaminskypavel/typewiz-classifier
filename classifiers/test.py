import gensim
import inflection
import pandas as pd
from nltk.stem import PorterStemmer

# "modal title color" => IAlertOptions
# "x y" => IPoint
# "x y radius" => ICircleProps
# "thumbnail_url thumbnail_width thumbnail_height" => IGetThumbnailOptions
# "url width height" => IMageProps
# "headers status body" => IResponse
# "href search path host hostname port" => IUrl
# "then catch" => IPromise
# "suit rank" => ICard
# "model year price" => ICar
# "items total" => IPageableResult
# "amount date quantity" => IAccountTransactionInformation

query = "amount date quantity"

# tokenize and stemm the input query.
ps = PorterStemmer()
tokenized_query = query.split(" ")
snakecased_query = [inflection.underscore(w) for w in tokenized_query]
stemmed_query = [ps.stem(w.replace("_", "")) for w in snakecased_query]

print("tokenized properties names :\n%s" % stemmed_query)
# load dictionary , tf_idf and similarity matrix
dictionary = gensim.corpora.Dictionary.load("./../output/model/dict.data")
query_bow = dictionary.doc2bow(stemmed_query)

tf_idf = gensim.models.TfidfModel.load("./../output/model/tf_idf.model")
query_tf_idf = tf_idf[query_bow]

sims = gensim.similarities.Similarity.load("./../output/model/similarity.matrix")
similarity_matrix = sims[query_tf_idf]

max_value = similarity_matrix.max()
max_index = similarity_matrix.argmax()

interfaces = pd.read_csv('./../output/interfaces.csv', header=None)
similar_interface = interfaces.values[max_index][0];

features = pd.read_table('./../output/features.csv', header=None)
print("---------------------")
print("%s\n[%s]" % (similar_interface, features[0][max_index]))
print("<Similarity,%f> , <Index,%f>" % (max_value, max_index))
print("---------------------")
