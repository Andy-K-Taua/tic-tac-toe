def values
  [gets, gets].map{ |x| x.chomp.to_i }
end

puts "Pick a operation (+,-,*,/,^,)"
response = gets.chomp

case response
when "+"
  puts "which numbers would you like to add?"
  operator = :+
end

case response
when "-"
  puts "which numbers would you like to minus?"
  operator = :-
end

case response
when "*"
  puts "which numbers would you like to times?"
  operator = :*
end

case response
when "/"
  puts "which numbers would you like to divide?"
  operator = :/
end

case response
when "^"
  puts "which numbers would you like to the power of?"
  operator = :**
end


answer = values.inject(operator)
puts "The answer is... #{ answer }"
