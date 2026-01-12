import random
import words_list
import hangman_logo

words = words_list.Words

print(hangman_logo.Logo)

word = random.choice(words)
print(word)
blank = []
for i in range(len(word)):
    blank += "_"
print(" ".join(blank))

lives = 6
end_game = False
while not end_game:

    char = input("Predict a letter: ").lower()

    if char in blank :
        print(f"{char} has been already gussed")

    for i in range(len(word)):
        if word[i] == char:
            blank[i] = char
            print(f"You have {lives} lives")

    if char not in word:
        print(f"You gussed {char}, that is not in the word, so you loose one life-")
        lives -= 1
        print(f"You have {lives} lives")

    print(hangman_logo.Hangman[lives])
        
    if lives == 0:
        end_game = True
        print("You Loose The Game")  

    if "_" not in blank:
        end_game = True       
        print("You Win The Game")    

    print(" ".join(blank)) 
    