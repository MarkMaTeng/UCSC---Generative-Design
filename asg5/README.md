In this assignment, I use Markov Chain to generate music pieces.
For the midi file, it has two attributes: duration and pitch.
I use Markov Chain to train 500+ music samples and find the pattern of the pitch and duration.
For example, I make a table that has all states. I parse the music track to find the change of the next state.
Then I got the probability of the music pattern and use it to form new music pieces.

![alt text](https://github.com/MarkMaTeng/UCSC-Generative-Design/blob/master/asg5/example_asg5.gif)
