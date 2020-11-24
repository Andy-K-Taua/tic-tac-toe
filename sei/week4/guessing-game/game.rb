# Title: Guess The Number
#
# Activity:
# You are to generate a basic "guess my number" game.
#
# The computer will pick a random number between 0 and 10.
#
# The user will guess the number until they guess correctly.
#
# Specification:
# The user should be asked to guess a number
# If the user's guess is correct, the user should see a congratulatory message
# If the user's guess is not correct, the user should be asked to guess the number again.
#
# Extensions:
# Let the user choose the maximum value (so they can play a long game with a random value between 0 and 10000, for example).
# Give feedback to the user: "Wrong, guess higher!" or "Wrong, guess lower!"

require 'colorize'

secret_number = Random.rand 20

print "Enter guess:"
guess = gets.to_i

while guess != secret_number

  puts "Bad luck! Incorrect guess".red
  print "Enter guess:"
  guess = gets.to_i

end # while

puts "Congratulation! You guessed correctly".green

# a bit like <script src="js/colorize.js">
