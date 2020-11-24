puts "What is your age?" # ask

age = gets.to_i

print "You entered: #{ age }"
p age

if age < 18
  print "Under Age sorry"
else
  print "Enjoy"
end
# use gets to capture the user input and save into a variable
