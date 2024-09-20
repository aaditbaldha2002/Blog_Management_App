import sys
import pymongo
from bson.objectid import ObjectId
import ast
import pandas as pd
import numpy as np
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import matplotlib.pyplot as plt

postIdString=sys.argv[1]
postId=ast.literal_eval(postIdString)

#for connection to mongodb
connString="mongodb+srv://aadit:1234@blog-management-db.9g0czhk.mongodb.net/test"
client=pymongo.MongoClient(connString)
db=client['test_ruchit'] 

post=db.posts.find_one({"_id":ObjectId(postId)})

# print(type(sys.argv[1]))
# dict_obj=ast.literal_eval(post[1])
commentsList=[]
commentsList=np.array(commentsList)
ind=0
for values in post['comments']:
    commentsList=np.append(commentsList,values['comment'])

###########################################################################################
sid=SentimentIntensityAnalyzer() #responsible for giving sentiment scores to each post
sentiment_scores=[] #for distiguishing the post's sentiment

for i in commentsList: #needs changes
    score=sid.polarity_scores(i)
    sentiment_scores.append(score)

# dict_to_send={}
# dict_to_send["sentiment_scores"]=sentiment_scores #needs changes


label=[] #for storing label of each posts
postiveCount=0
negativeCount=0
neutralCount=0

for s in sentiment_scores:
    if s['pos']>=0.05:
        label.append('Postive')
        postiveCount+=1
    elif s['neg']<=-0.05:
        label.append('Negative')
        negativeCount+=1
    else:
        label.append('Neutral')
        neutralCount+=1

# print(label)

if neutralCount>=negativeCount and neutralCount>=postiveCount:
    print("neutral")
elif negativeCount>=postiveCount and negativeCount>=neutralCount:
    print("negative")
else:
    print("positive")
