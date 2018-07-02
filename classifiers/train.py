import gensim

gen_docs = []

with open('./../output/features.csv', encoding="utf8") as file:
	firstNlines = file.readlines()
	for featuresStr in firstNlines:
		featuersArr = featuresStr.replace("\n", "").split(",")
		gen_docs.append(featuersArr)

# build a corpus
dictionary = gensim.corpora.Dictionary(gen_docs)
dictionary.save(fname_or_handle="./model/dict.data")
print("saved to dictionary")

corpus = [dictionary.doc2bow(gen_doc) for gen_doc in gen_docs]
tf_idf = gensim.models.TfidfModel(corpus)
tf_idf.save(fname_or_handle='./model/tf_idf.model')
print("saved to corpus")

print("loaded %d in the dictionary" % len(dictionary))
print("model size : %s" % tf_idf)

# similarity measure object in tf-idf space.
sims = gensim.similarities.Similarity('./tmp/',
									  tf_idf[corpus],
									  num_features=len(dictionary))
sims.save(fname="./model/similarity.matrix")
print("saved to similarity matrix")
