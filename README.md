# TypeWiz Classifier  

# Usefull links
#Bag of Words

* https://pythonprogramminglanguage.com/bag-of-words-euclidian-distance/
* https://www.oreilly.com/learning/how-do-i-compare-document-similarity-using-python
* https://www.kaggle.com/c/word2vec-nlp-tutorial#part-1-for-beginners-bag-of-words

## Powered By
<div>
<img src="https://user-images.githubusercontent.com/4253088/35522316-a293820c-0524-11e8-9be0-747f9607a0cb.png" alt="es6" height="100"/>
<img src="https://user-images.githubusercontent.com/4253088/35522319-a31ce0ec-0524-11e8-9dbf-0732ce3e84fa.png" alt="ts" height="100"/>
<img src="https://js.tensorflow.org/images/TF_JS_lockup.png" alt="ts" height="50" width="200"/>
</div>

# Tools
## TsQuery
* https://tsquery-playground.firebaseapp.com/


## Useful Queries
### rawinterfaces

* <b> find intefaces with comments</b> 
`db.getCollection('rawinterfaces')
	.find({'declaration.raw':/\*/})`
	
* <b> find very short intefaces</b> 
`db.getCollection('rawinterfaces').find({ $where: 'this.declaration.raw.length < 20' }).limit(10);`
	
