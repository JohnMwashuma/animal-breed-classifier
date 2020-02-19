## Basic Tensorflow.js terminologies

### What is a Model?
----
When you train a machine-learning algorithm with a dataset, the model is the output of this training process. It’s a bit like a function that takes new data as input and produces a prediction as output.

#### What are Labels And Features?
---
Labels and features relate to the data that you feed an algorithm in the training process.

A label represents how you would classify each entry in your dataset and how you would label it. For example, if our dataset was a CSV file describing different animals, our labels could be words like “dog” or “snake” (depending on what each animal represents).

Features on the other hand, are the characteristics of each entry in your data set. For our animals example, it could be things like “playful, barks”, “reptile, rampant”, and so on.

Using this, a machine-learning algorithm will be able to find some correlation between features and their label that it will use for future predictions.

### Tensorflow.js Features:
---
1. Using a pre-trained model,
2. Transfer learning,
3. Defining, running, and using your own model.

##### 1. Using A Pre-Trained Model
---
Depending on the problem you are trying to solve, there might be a model already trained with a specific data set and for a specific purpose which you can leverage and import in your code.

For example, let’s say we are building an app to predict if an image is a picture of a cat. We could then use a popular image classification model is called MobileNet and is available as a pre-trained model with Tensorflow.js.

##### 2. Transfer learning
---
Transfer learning is the ability to combine a pre-trained model with custom training data. What this means is that you can leverage the functionality of a model and add your own samples without having to create everything from scratch.

For example, an algorithm has been trained with thousands of images to create an image classification model, and instead of creating your own, transfer learning allows you to combine new custom image samples with the pre-trained model to create a new image classifier. This feature makes it really fast and easy to have a more customized classifier.

Good example is here: https://zvs9k.sse.codesandbox.io/

### 3. Training A Model In The Browser
---
The last feature is to define, train and run a model entirely in the browser.

Here data is splitted into a training set and a test set. The reason for this is that we’re going to use our training set to train our algorithm and our test set to check the accuracy of our predictions, to validate if our model is ready to be used or needs to be tweaked.

Good example is here: https://ktncm.codesandbox.io/
